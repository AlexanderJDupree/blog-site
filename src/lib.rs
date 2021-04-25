//! *blog-site* crate for my personal portfolio and blogging website.
//!
//! adupree.dev
//!
//! https://github.com/AlexanderJDupree/blog-site
//!

#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

use rocket_contrib::serve::StaticFiles;

mod routes;

pub fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/api/v1", routes![routes::posts::get_post])
        .mount("/", StaticFiles::from("./client/build")) // TODO this value from a config file
}
