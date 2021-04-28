//! *blog-site* crate for my personal portfolio and blogging website.
//!
//! adupree.dev
//!
//! https://github.com/AlexanderJDupree/blog-site
//!

#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;

#[macro_use]
extern crate diesel;

extern crate rocket_contrib;

use rocket::Request;
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;
use rocket_contrib::serve::StaticFiles;

mod routes;
mod schema;

#[catch(404)]
fn handle_not_found(req: &Request) -> JsonValue {
    json!({
        "status": "404",
        "message": "Not Found",
        "resource": format!("{}", req.uri())
    })
}

pub fn rocket(env_file: Option<&str>) -> rocket::Rocket {
    let env = env_file.unwrap_or(".env");
    dotenv::from_filename(env).ok();

    let public = dotenv::var("PUBLIC_DIRECTORY").unwrap_or_else(|_| "./public".to_string());
    rocket::ignite()
        .mount("/api/v1", routes![routes::posts::get_post])
        .mount("/", StaticFiles::from(public))
        .register(catchers![handle_not_found])
}
