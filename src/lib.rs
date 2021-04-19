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
use rocket_contrib::templates::Template;

mod routes;

pub fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![routes::home::index,])
        .mount("/static", StaticFiles::from("./static/"))
        .attach(Template::fairing())
}
