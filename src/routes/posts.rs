//! blog-site posts resource endpoints
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;

#[get("/posts/<slug>")]
pub fn get_post(slug: String) -> JsonValue {
    json!({
        "id": 42,
        "article": "lorem ipsum",
        "slug": slug
    })
}
