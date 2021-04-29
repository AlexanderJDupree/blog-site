//! *blog-site* crate for my personal portfolio and blogging website.
//!
//! https://github.com/AlexanderJDupree/blog-site

#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

use rocket::Request;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;
use rocket_contrib::serve::StaticFiles;

mod routes;

/// Sanity check endpoint to make sure everything is running
#[get("/health")]
pub fn health_check() -> JsonValue {
    json!({
        "health" : "ok"
    })
}

#[catch(404)]
fn handle_not_found(req: &Request) -> JsonValue {
    json!({
        "status": "404",
        "message": "Not Found",
        "resource": format!("{}", req.uri())
    })
}

pub fn rocket() -> rocket::Rocket {
    let public = std::env::var("STATIC_DIR").unwrap_or_else(|_| "./client/build".to_string());

    rocket::ignite()
        .mount(
            "/api/v1",
            routes![
                health_check,
                routes::posts::get_post,
                routes::posts::get_posts
            ],
        )
        .mount("/", StaticFiles::from(public))
        .register(catchers![handle_not_found])
}
