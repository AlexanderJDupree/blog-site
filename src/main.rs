/// blog-site entry point - launches the rocket

fn main() {
    let environment = Some(".env");
    blog_site::rocket(environment).launch();
}
