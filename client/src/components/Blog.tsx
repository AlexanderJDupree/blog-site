import { useState } from 'react';
import { Card, Container, Pagination, Spinner } from 'react-bootstrap';
import useFetch, { FetchStatus } from '../hooks/useFetch';
import { SERVER_URI, API } from '../utils/Config';
import { PostPreview } from '../utils/Types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Fade = require('react-reveal/Fade');

const Post = ({ date, link, frontmatter, preview }: PostPreview) => {
  const links = frontmatter.tags.map((tag, i) => {
    return (
      <span className='tag m-1' key={i}>
        #{tag}
      </span>
    );
  });

  return (
    <Card className='post shadow'>
      <Card.Body className='body'>
        <a href={link}>
          <Card.Title className='title'>{frontmatter.title}</Card.Title>
        </a>
        <small className='text-muted'>{date}</small>
        <hr />
        <div className='preview'>
          <ReactMarkdown remarkPlugins={[gfm]} className='text'>
            {preview}
          </ReactMarkdown>
          <a href={link}>
            <span>...</span>
          </a>
        </div>
        <br />
        <div className='tags'>{links}</div>
      </Card.Body>
    </Card>
  );
};

const Blog = () => {
  const postsPerPage = 6;
  const [page, setPage] = useState(0);
  const res = useFetch<{ posts: PostPreview[] }>(
    `${SERVER_URI}${API}/posts?limit=1000`,
    { posts: [] }
  );

  const pages = Math.ceil(res.data.posts.length / postsPerPage);
  const items = [...Array(pages)].map((_x, i) => {
    return (
      <Pagination.Item key={i} active={page === i} onClick={(e) => setPage(i)}>
        {i + 1}
      </Pagination.Item>
    );
  });

  switch (res.status) {
    case FetchStatus.Loading:
      return (
        <Container className='blog d-flex justify-content-center' id='blog'>
          <Spinner animation='border' role='status' className='m-5'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Container>
      );
    case FetchStatus.Error:
      return (
        <Container className='blog d-flex justify-content-center' id='blog'>
          <div className='mx-auto m-5'>Something went wrong... 🤷‍♂️</div>
        </Container>
      );

    case FetchStatus.Loaded:
      let posts = [...res.data.posts].reverse();
      return (
        <Container className='blog' id='blog'>
          <h3 className='text-center heading'>Latest Posts</h3>
          <Fade right>
            <div className='blog-grid'>
              {posts
                .slice(page * postsPerPage, page * postsPerPage + postsPerPage)
                .map((post) => {
                  return (
                    <Post
                      key={post.frontmatter.title}
                      date={post.date}
                      link={post.link}
                      frontmatter={post.frontmatter}
                      preview={post.preview}
                    />
                  );
                })}
            </div>
            <Pagination className='mt-3 mx-auto justify-content-center'>
              {items}
            </Pagination>
          </Fade>
        </Container>
      );
  }
};

export default Blog;
