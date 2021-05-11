import { useState } from 'react';
import {
  Card,
  CardDeck,
  Container,
  Pagination,
  Spinner,
} from 'react-bootstrap';
import useFetch, { FetchStatus } from '../hooks/useFetch';

const Fade = require('react-reveal/Fade');

interface Frontmatter {
  title: string;
  tags: string[];
  categories: string[];
  image: string;
}

interface PostPreview {
  date: string;
  link: string;
  frontmatter: Frontmatter;
  preview: string;
}

const Post = ({ date, link, frontmatter, preview }: PostPreview) => {
  const links = frontmatter.tags.map((tag, i) => {
    return (
      <span className='tag' key={i}>
        #{tag}
      </span>
    );
  });

  return (
    <Card className='post shadow'>
      <Card.Body className='body'>
        <Card.Title className='title'>{frontmatter.title}</Card.Title>
        <hr />
        <Card.Text className='text'>{preview.slice(0, 125)}...</Card.Text>
        {links}
      </Card.Body>
    </Card>
  );
};

const Blog = () => {
  const postsPerPage = 3;
  const [page, setPage] = useState(0);
  const res = useFetch<{ posts: PostPreview[] }>(
    `http://localhost:8000/api/v1/posts?limit=1000`,
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
        <Container className='blog justify-content-center' id='blog'>
          <Spinner
            animation='border'
            role='status'
            className='theme-secondary-light'
          >
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Container>
      );
    case FetchStatus.Error:
      return (
        <Container className='blog justify-content-center' id='blog'>
          <div className='mx-auto mt-4'>Something went wrong... 🤷‍♂️</div>
        </Container>
      );

    case FetchStatus.Loaded:
      return (
        <Container className='blog' id='blog'>
          <Fade right>
            <CardDeck>
              {res.data.posts
                .slice(page * postsPerPage, page * postsPerPage + postsPerPage)
                .map((post) => {
                  return (
                    <Post
                      date={post.date}
                      link={post.link}
                      frontmatter={post.frontmatter}
                      preview={post.preview}
                    />
                  );
                })}
            </CardDeck>
            <Pagination className='mt-3 mx-auto justify-content-center'>
              {items}
            </Pagination>
          </Fade>
        </Container>
      );
  }
};

export default Blog;
