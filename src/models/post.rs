use crate::schema::post
use chrono::{DateTime, Utc};

#[derive(Queryable)]
pub struct Post {
    pub id: i32,
    pub slug: String,
    pub title: String,
    pub body: String,
    pub tag_list: Vec<String>
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>
}

#[derive(Insertable)]
#[table_name = "posts"]
struct NewPost<'a> {
    slug: &'a str,
    title: &'a str,
    body: &'a str 
    tag_list: &'a Vec<String>
}