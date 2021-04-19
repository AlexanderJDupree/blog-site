/// blog-site landing page


use serde::Serialize;
use rocket_contrib::templates::Template;

#[derive(Serialize)]
struct IndexContext {
    name: &'static str,
}


#[get("/")]
pub fn index() -> Template {
    Template::render("pages/index", &IndexContext {
        name: "Alex",
    })
}
