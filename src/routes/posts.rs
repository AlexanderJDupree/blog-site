//! blog-site posts resource endpoints
use glob::glob;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;
use serde::Serialize;
use std::fs::File;
use std::io::{BufRead, BufReader, Error};
use std::path::PathBuf;

#[derive(Serialize)]
struct PostPreview {
    title: String,
    preview: String,
}

/// Get the content of a specific post
#[get("/posts/<title>")]
pub fn get_post(title: String) -> JsonValue {
    json!({
        "id": 42,
        "body": "lorem ipsum",
        "title": title
    })
}

/// Get a paginated lists of post titles and descriptions
#[get("/posts?<limit>&<offset>")]
pub fn get_posts(limit: Option<usize>, offset: Option<usize>) -> JsonValue {
    let limit = limit.unwrap_or(10);
    let offset = offset.unwrap_or(0);

    // TODO paramterize posts directory
    let posts: Vec<PostPreview> = glob("posts/*.md")
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

fn fill_post_preview(post: PathBuf) -> Result<PostPreview, Error> {
    let title = post.file_name().unwrap().to_str().unwrap().to_owned();
    let file = File::open(post)?;

    // TODO: Read front matter into struct as well and then read first line as preview
    let preview: String = BufReader::new(file)
        .lines()
        .take(1)
        .filter_map(Result::ok)
        .fold(String::new(), |acc, line| acc + line.as_str());

    Ok(PostPreview { title, preview })
}
