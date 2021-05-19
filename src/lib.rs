//! *blog-site* crate for my personal portfolio and blogging website.
//!
//! https://github.com/AlexanderJDupree/blog-site

#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;

#[macro_use]
extern crate lazy_static;

extern crate rocket_contrib;

use rocket::Request;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;

pub mod routes;

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
    let cors = rocket_cors::CorsOptions::default().to_cors().expect("Error creating CORS Fairing");

    println!("{}", public);

    rocket::ignite()
        .attach(cors)
        .mount(
            "/api/v1",
            routes![
                health_check,
                routes::posts::get_post,
                routes::posts::get_posts
            ],
        )
        .register(catchers![handle_not_found])
}
