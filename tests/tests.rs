//! Test suite for blog site
//!
//! https://github.com/AlexanderJDupree/blog-site

#[macro_use]
extern crate lazy_static;

use rocket::http::Status;
use rocket::local::{Client, LocalResponse};
use rocket_contrib::json::JsonValue;

lazy_static! {
    static ref TEST_CLIENT: Client =
        Client::new(blog_site::rocket()).expect("Failed to create rocket instance");
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
    let response = &mut TEST_CLIENT.get("/api/v1/health").dispatch();
    let json = parse_response(response);
    let status = json.get("health").and_then(|health| health.as_str());

    assert_eq!(response.status(), Status::Ok);
    assert_eq!(status, Some("ok"));
}
