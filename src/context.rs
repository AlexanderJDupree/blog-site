//! Shared templating contexts
use serde::Serialize;

#[derive(Serialize)]
pub struct MetaContext {
    author: &'static str,
    description: &'static str,
    keywords: &'static str,
    robots: &'static str,
}

#[derive(Serialize)]
pub struct BaseContext {
    pub meta: MetaContext,
    pub title: &'static str,
}

impl Default for MetaContext {
    // TODO defaults should be read from some sort of config file
    fn default() -> MetaContext {
        MetaContext {
            author: "Alexander DuPree",
            description: "The aspiring technologists blog",
            keywords: "blog, tech, programming, software, rust",
            robots: "all",
        }
    }
}

impl Default for BaseContext {
    fn default() -> BaseContext {
        BaseContext {
            meta: MetaContext::default(),
            title: "Blog Site",
        }
    }
}
