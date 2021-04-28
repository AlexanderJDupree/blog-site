//! Test suite for blog site
//!
//! adupree.dev
//!
//! https://github.com/AlexanderJDupree/blog-site

use rocket::http::Status;
use rocket::local::Client;

#[test]
fn test_404_not_found() {
    let client =
        Client::new(blog_site::rocket(Some("test.env"))).expect("Failed to create rocket instance");
    let response = client.get("/not/a/valid/endpoint").dispatch();
    assert_eq!(response.status(), Status::NotFound);
}
