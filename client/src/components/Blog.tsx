import { useState } from 'react';
import { Card, Container, Pagination, Spinner } from 'react-bootstrap';
import useFetch, { FetchStatus } from '../hooks/useFetch';
import { SERVER_URI, API } from '../utils/Config';
import { PostPreview } from '../utils/Types';

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
        <Card.Title className='title'>
          <a href={link}>{frontmatter.title}</a>
        </Card.Title>
        <small className='text-muted'>{date}</small>
        <hr />
        <Card.Text className='text'>{preview.slice(0, 125)}...</Card.Text>
        {links}
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
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Container>
      );
    case FetchStatus.Error:
      return (
        <Container className='blog d-flex justify-content-center' id='blog'>
          <div className='mx-auto mt-4'>Something went wrong... 🤷‍♂️</div>
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
