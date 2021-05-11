import { useState } from 'react';
import { Card, CardDeck, Container, Pagination } from 'react-bootstrap';

const Fade = require('react-reveal/Fade');

interface PostProps {
  image: string;
  title: string;
  body: string;
  tags: string[];
}

const Post = ({ image, title, body, tags }: PostProps) => {
  const links = tags.map((tag, i) => {
    return (
      <span className='tag' key={i}>
        #{tag}
      </span>
    );
  });

  return (
    <Card className='post shadow'>
      <Card.Body className='body'>
        <Card.Title className='title'>{title}</Card.Title>
        <hr />
        <Card.Text className='text'>{body.slice(0, 125)}...</Card.Text>
        {links}
      </Card.Body>
    </Card>
  );
};

const Blog = () => {
  const posts = [
    {
      image: 'http://placekitten.com/160/100',
      title: 'Post Title',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam tempore officia quaerat, molestias corrupti aspernatur repudiandae nostrum modi, explicabo nam culpa dolorum harum delectus similique reiciendis eligendi voluptate reprehenderit? Velit?',
      tags: ['react', 'typescript', 'rust'],
    },

    {
      image: 'http://placekitten.com/160/100',
      title: 'Post Title',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam tempore officia quaerat, molestias corrupti aspernatur repudiandae nostrum modi, explicabo nam culpa dolorum harum delectus similique reiciendis eligendi voluptate reprehenderit? Velit?',
      tags: ['react', 'typescript', 'rust'],
    },

    {
      image: 'http://placekitten.com/160/100',
      title: 'Post Title',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam tempore officia quaerat, molestias corrupti aspernatur repudiandae nostrum modi, explicabo nam culpa dolorum harum delectus similique reiciendis eligendi voluptate reprehenderit? Velit?',
      tags: ['react', 'typescript', 'rust'],
    },

    {
      image: 'http://placekitten.com/160/100',
      title: 'Post Title',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam tempore officia quaerat, molestias corrupti aspernatur repudiandae nostrum modi, explicabo nam culpa dolorum harum delectus similique reiciendis eligendi voluptate reprehenderit? Velit?',
      tags: ['react', 'typescript', 'rust'],
    },

    {
      image: 'http://placekitten.com/160/100',
      title: 'Post Title',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam tempore officia quaerat, molestias corrupti aspernatur repudiandae nostrum modi, explicabo nam culpa dolorum harum delectus similique reiciendis eligendi voluptate reprehenderit? Velit?',
      tags: ['react', 'typescript', 'rust'],
    },
  ].map((post, i) => {
    return (
      <Post
        key={i}
        image={post.image}
        title={post.title}
        body={post.body}
        tags={post.tags}
      />
    );
  });
  const [page, setPage] = useState(0);

  const postsPerPage = 3;
  const pages = Math.ceil(posts.length / postsPerPage);
  const items = [...Array(pages)].map((_x, i) => {
    return (
      <Pagination.Item key={i} active={page === i} onClick={(e) => setPage(i)}>
        {i + 1}
      </Pagination.Item>
    );
  });

  return (
    <Container className='blog' id='blog'>
      <Fade right>
        <CardDeck>
          {posts.slice(page * postsPerPage, page * postsPerPage + postsPerPage)}
        </CardDeck>
        <Pagination className='mt-3 mx-auto justify-content-center'>
          {items}
        </Pagination>
      </Fade>
    </Container>
  );
};

export default Blog;
