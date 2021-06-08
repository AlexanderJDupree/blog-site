# Blog-Site

Source code and content for my personal portfolio and blogging site hosted at [adupree.dev](https://adupree.dev)

## Built With

- [Rust](https://www.rust-lang.org/) - Performant and safe systems language
- [Rocket](https://socket.io/) - Rust web framework
- [React](https://reactjs.org/) - Front end framework
- [Typescript](https://www.typescriptlang.org/) - Typed Javascript
- [Firebase](https://firebase.google.com/) - Hosting and platform service

## Usage

You can visit the deployed website at [adupree.dev](https://adupree.dev), but if you really want to run it locally
the following will get you going:

- First, make sure `rustup` is installed, along with the latest `nightly` compiler
- **Emphasis** on `nightly` version here since it is required to compile the `rocket` framework.
- You will also need to install the client dependencies first with `cd client && yarn install`.
- Use `cargo run` to start the server on `localhost:8080`.
- Then in a seperate terminal use `cd client && yarn start` to startup the client on `localhost:3000`.
- Lastly, you can use `cargo test` to run the servers unit tests.

## Project Writeup

This site was built as a final project for CS410-Rust at Portland State University.
The purpose of this project was to build a blog site from the ground up with Rust
and replace my now defunct [blog site](alexanderjdupree.com) that was built from a [jekyll](https://jekyllrb.com/docs/themes/) template.

The first iteration of this project was centered around server-side rendering with Handlebars as the templating engine. Whenever a user visited a site, the
Rocket server would grab whatever data it needed and render out the frontend via Handlebars HTML templates. However, I wasn't a fan of Handlebars and found
the templating engine hard to work with. I was also learning React + Typescript for front end development at this time as well, and because of the issues I was
having with handlebars I decided early on to make the frontend a React application and make the backend server a RESTful API service that manages resources
like posts, comments, authentication, etc.

After building and deploying a very basic skeleton with my chosen technology stack, my first order of business was to migrate the content from
my old site to the new one. One thing I really enjoyed about my old site was how easy it was to add new posts. I would just create a new
markdown file in the `__posts` directory, fill out some YAML frontmatter, write out the actual content, and then git commit and push, which would
deploy a new version of the site. I wanted to try and keep this workflow the same as much as possible. So, I simply copied and pasted the old
`posts` directory over to this project and then started writing out some Rust code to deliver these posts. I ended up writing a `/post` endpoint
that the Rocket server exposed for retrieving posts or a list of posts. The React frontend just fetches from this endpoint and handles parsing the
JSON response into actual HTML.

This comes with it's own problems though, namely these static markdown files are actually deployed with the website which is, as of right now, a massive Docker container that's running on the Google Cloud Run service. There's also no easy way to run queries on these posts. I can't sort them by category, or find a post with a specific keyword without some expensive IO operations. Since it's all just files and yaml frontmatter, in order to run a query I would have to open each file, examine the frontmatter, and then store the results. This would be sub-optimal at best. To remedy this, I decided to migrate all my post content into an actual database and use `Diesel` as the ORM for it. However, as of the time of this writing I have not quite finished setting up the `Diesel` migrations but will hopefully get it done soon.

The biggeset issue i've had with this project is time! Unfortunately, capstone, other projects, and kids, all kept eating away the little time I had for working on this project and I didn't get to add all the features I wanted. Another big time sink was the frontend. As mentioned earlier, I've been learning React + Typescript, but that doesn't mean I am any good at it. I had a specific look I was going for in the frontend, but was really hamstringed by my lack of knowledge in how to actually implement it. I did, eventually, get the frontend to a level of polish that I can present, however the process was extremely time consuming. In retrospect I should have just settled for a very simple UI layout and just used an HTML template or something so that I could've focused on the actual Rust part of the project more.

Since this is my personal site, and one that I plan on showcasing in upcoming interviews, I do plan on continuing this project. Eventually, the Rust portion of the project will be a lot more substantial and I look forward to continue learning about Rust and it's wonderful web ecosystem along the way.

## License

See [LICENSE](https://github.com/AlexanderJDupree/blog-site/blob/main/LICENSE) for details.
