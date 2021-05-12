import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PostContent } from '../utils/Types';
import { SERVER_URI, API } from '../utils/Config';
import useFetch, { FetchStatus } from '../hooks/useFetch';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Fade = require('react-reveal/Fade');

const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={darcula}
        language={match[1]}
        PreTag='div'
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code
        className={className}
        {...props}
        children={String(children).replace(/\n$/, '')}
      />
    );
  },
};

const Post = () => {
  let { title } = useParams<{ title: string }>();
  const res = useFetch<{ status: string; post: PostContent }>(
    `${SERVER_URI}${API}/posts/${title}`,
    {
      status: '',
      post: {
        frontmatter: { title: '', tags: [], categories: [], image: '' },
        body: '',
      },
    }
  );

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
      return (
        <Container className='article mt-2' id='post'>
          <Fade bottom>
            <h1 className='mb-3'>{res.data.post.frontmatter.title}</h1>
            <ReactMarkdown
              remarkPlugins={[gfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {res.data.post.body}
            </ReactMarkdown>
          </Fade>
          <br />
        </Container>
      );
  }
};

export default Post;
