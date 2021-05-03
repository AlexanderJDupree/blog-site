//! blog-site posts resource endpoints

use glob::glob;
use lazy_static;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;
use serde::{Deserialize, Serialize};
use serde_yaml;
use std::fs::File;
use std::io::{BufRead, BufReader, Error};
use std::path::{Path, PathBuf};

lazy_static! {
    static ref POSTS_DIR: String =
        std::env::var("POSTS_DIR").unwrap_or_else(|_| "posts".to_string());
}

#[derive(Debug, Serialize, Deserialize)]
struct Frontmatter {
    title: String,
    tags: Vec<String>,
    categories: Vec<String>,
    image: String,
}

impl Frontmatter {
    fn new() -> Frontmatter {
        Frontmatter {
            title: "Article".to_string(),
            tags: Vec::new(),
            categories: Vec::new(),
            image: "/assets/default.png".to_string(),
        }
    }
}

impl Default for Frontmatter {
    fn default() -> Self {
        Frontmatter::new()
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct PostPreview {
    date: String, // TODO use Datetime<UTC>
    link: String,
    frontmatter: Frontmatter,
    preview: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Post {
    frontmatter: Frontmatter,
    body: String,
}

/// Get the content of a specific post
#[get("/posts/<title>")]
pub fn get_post(title: String) -> JsonValue {
    let post_glob = format!("{}/*_{}.md", *POSTS_DIR, title);

    let post: Vec<Post> = glob(&post_glob)
        .unwrap()
        .filter_map(Result::ok)
        .map(read_post)
        .filter_map(Result::ok)
        .collect();

    json!(post[0])
}

/// Get a paginated lists of post titles and descriptions
#[get("/posts?<limit>&<offset>")]
pub fn get_posts(limit: Option<usize>, offset: Option<usize>) -> JsonValue {
    let limit = limit.unwrap_or(10);
    let offset = offset.unwrap_or(0);
    let posts_glob = format!("{}/*.md", *POSTS_DIR);

    // TODO paramterize posts directory
    let posts: Vec<PostPreview> = glob(&posts_glob)
        .unwrap()
        .skip(offset)
        .take(limit)
        .filter_map(Result::ok)
        .map(fill_post_preview)
        .filter_map(Result::ok)
        .collect();

    json!({
        "posts": posts,
    })
}

fn read_post(path: PathBuf) -> Result<Post, Error> {
    let frontmatter = read_frontmatter(&path)?;
    // Read post body
    let file = File::open(&path)?;
    let reader = BufReader::new(file);

    let body: String = reader
        .lines()
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()) == "---")
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()) != "---")
        .skip(1)
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()).trim().is_empty())
        .filter_map(Result::ok)
        .fold(String::new(), |acc, line| [acc, line].join("\n"));

    Ok(Post { frontmatter, body })
}

fn read_frontmatter(path: &Path) -> Result<Frontmatter, Error> {
    let file = File::open(&path)?;
    let reader = BufReader::new(file);

    let frontmatter: String = reader
        .lines()
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()) == "---")
        .take_while(|s| s.as_ref().unwrap_or(&"".to_string()) != "---")
        .filter_map(Result::ok)
        .fold(String::new(), |acc, line| [acc, line].join("\n"));

    Ok(serde_yaml::from_str(&frontmatter).unwrap_or_default())
}

fn fill_post_preview(post: PathBuf) -> Result<PostPreview, Error> {
    // Parse filename into date, post title
    let components: Vec<&str> = post
        .file_name()
        .unwrap_or_default()
        .to_str()
        .unwrap_or_default()
        .split('_')
        .collect();

    let (date, title) = match components.as_slice() {
        [date, title] => (date.to_string(), title.to_string()),
        _ => ("1971-01-01".to_string(), "invalid".to_string()),
    };
    // Convert title to posts link
    let link = uri!(get_post: title = title.strip_suffix(".md").unwrap_or("invalid")).to_string();

    let frontmatter = read_frontmatter(&post)?;

    // Read Post preview
    let file = File::open(&post)?;
    let reader = BufReader::new(file);

    let preview: String = reader
        .lines()
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()) == "---")
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()) != "---")
        .skip(1)
        .skip_while(|s| s.as_ref().unwrap_or(&"".to_string()).trim().is_empty())
        .take(1)
        .filter_map(Result::ok)
        .fold(String::new(), |acc, line| acc + line.as_str());

    Ok(PostPreview {
        date,
        link,
        frontmatter,
        preview,
    })
}
