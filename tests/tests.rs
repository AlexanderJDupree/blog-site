//! Test suite for blog site
//!
//! https://github.com/AlexanderJDupree/blog-site

#[macro_use]
extern crate lazy_static;

use rocket::http::Status;
use rocket::local::{Client, LocalResponse};
use rocket_contrib::json::JsonValue;

static API: &str = "/api/v1";

lazy_static! {
    static ref TEST_CLIENT: Client = {
        std::env::set_var("POSTS_DIR", "tests/data/posts");
        Client::new(blog_site::rocket()).expect("Failed to create rocket instance")
    };
}

pub fn parse_response(resp: &mut LocalResponse) -> JsonValue {
    let body = resp.body().expect("Response does not have a body");
    serde_json::from_reader(body.into_inner()).expect("unable to parse")
}

#[test]
fn test_404_not_found() {
    let response = TEST_CLIENT.get("/not/a/valid/endpoint").dispatch();
    assert_eq!(response.status(), Status::NotFound);
}

#[test]
fn test_health_check() {
    let response = &mut TEST_CLIENT.get(format!("{}/health", API)).dispatch();
    let json = parse_response(response);
    let status = json.get("health").and_then(|health| health.as_str());

    assert_eq!(response.status(), Status::Ok);
    assert_eq!(status, Some("ok"));
}

// TODO move all the get posts endpoint tests into a seperate file
#[test]
fn test_get_posts_with_limit_query() {
    let response = &mut TEST_CLIENT.get(format!("{}/posts?limit=2", API)).dispatch();
    let json = parse_response(response);

    let posts = json
        .get("posts")
        .and_then(|posts| posts.as_array())
        .unwrap();

    assert_eq!(posts.len(), 2);
}

#[test]
fn test_get_posts_with_offset_query() {
    let response = &mut TEST_CLIENT
        .get(format!("{}/posts?offset=2", API))
        .dispatch();
    let json = parse_response(response);

    let posts = json
        .get("posts")
        .and_then(|posts| posts.as_array())
        .unwrap();

    assert_eq!(
        posts[0]["frontmatter"]["title"].as_str(),
        Some("Test Post 3")
    );
}

#[test]
fn test_get_posts_with_limit_and_offset_query() {
    let response = &mut TEST_CLIENT
        .get(format!("{}/posts?offset=3&limit=1", API))
        .dispatch();
    let json = parse_response(response);

    let posts = json
        .get("posts")
        .and_then(|posts| posts.as_array())
        .unwrap();

    assert_eq!(posts.len(), 1);
    assert_eq!(
        posts[0]["frontmatter"]["title"].as_str(),
        Some("Test Post 4")
    );
}

#[test]
fn test_get_posts_with_limit_greater_than_number_of_posts() {
    let response = &mut TEST_CLIENT
        .get(format!("{}/posts?limit=99999", API))
        .dispatch();
    let json = parse_response(response);

    let posts = json
        .get("posts")
        .and_then(|posts| posts.as_array())
        .unwrap();

    assert_eq!(posts.len(), 5); // TODO magic number, this is the total number of md files in data/posts
}

#[test]
fn test_get_posts_with_offset_greater_than_number_of_posts() {
    let response = &mut TEST_CLIENT
        .get(format!("{}/posts?offset=99999", API))
        .dispatch();
    let json = parse_response(response);

    let posts = json
        .get("posts")
        .and_then(|posts| posts.as_array())
        .unwrap();

    assert_eq!(posts.len(), 0); // TODO magic number, this is the total number of md files in data/posts
}
