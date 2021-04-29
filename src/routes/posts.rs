//! blog-site posts resource endpoints
use glob::glob;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;

/// Get the content of a specific post
#[get("/posts/<slug>")]
pub fn get_post(slug: String) -> JsonValue {
    json!({
        "id": 42,
        "article": "lorem ipsum",
        "slug": slug
    })
}

/// Get a paginated lists of post titles and descriptions
#[get("/posts?<limit>&<offset>")]
pub fn get_posts(limit: Option<usize>, offset: Option<usize>) -> JsonValue {
    let limit = limit.unwrap_or(10);
    let offset = offset.unwrap_or(0);

    // TODO paramterize posts directory
    let posts: Vec<std::path::PathBuf> = glob("posts/*.md")
        .unwrap()
        .skip(offset)
        .take(limit)
        .filter_map(Result::ok)
        .collect();

    json!({
        "limit": limit,
        "offset": offset,
        "posts": posts
    })
}
