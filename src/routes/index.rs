//! blog-site landing page
use crate::context::BaseContext;
use rocket_contrib::templates::Template;
use serde::Serialize;

#[derive(Serialize, Default)]
struct IndexContext {
    base: BaseContext,
    name: &'static str,
}

#[get("/")]
pub fn index() -> Template {
    Template::render(
        "pages/index",
        &IndexContext {
            name: "Alex",
            base: BaseContext {
                title: "Test",
                ..Default::default()
            },
        },
    )
}
