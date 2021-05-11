import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faBook, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  const networks = [
    <span key='project' className='footer'>
      <a href='https://github.com/AlexanderJDupree/blog-site'>
        <FA icon={faBook} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='github' className='footer'>
      <a href='https://github.com/AlexanderJDupree'>
        <FA icon={faGithub} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='twitter' className='footer'>
      <a href='https://twitter.com/dev_null42'>
        <FA icon={faTwitter} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='linkedin' className='footer'>
      <a href='https://www.linkedin.com/in/alexanderdupree/'>
        <FA icon={faLinkedin} className='social-icon mr-3' />
      </a>
    </span>,
  ];

  return (
    <footer className='pb-3'>
      <div id='go-top'>
        <a className='scrollup' title='Scroll To Top' href='#top'>
          <FA icon={faChevronCircleUp} className='icon' />
        </a>
      </div>
      <Container>
        <Row className='d-flex justify-content-center'>{networks}</Row>
        <Row className='d-flex justify-content-center'>
          <div className='copyright'>
            <small>&copy; Copyright 2021 Alex DuPree</small>
            <small className='divider'> | </small>
            <small>Built with Rust 🦀, Rocket 🚀, React ⚛️, Typescript </small>
            <a href='https://emoji.gg/emoji/8584-typescript'>
              <img
                src='https://emoji.gg/assets/emoji/8584-typescript.png'
                width='20px'
                height='20px'
                alt='TypeScript'
              />
            </a>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
