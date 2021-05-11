import { Container, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import Typing from 'react-typing-animation';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ScrollDown from './ScrollDown';

const Heading = () => {
  const networks = [
    <span key='project' className='banner'>
      <a href='https://github.com/AlexanderJDupree/blog-site'>
        <FA icon={faBook} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='github' className='banner'>
      <a href='https://github.com/AlexanderJDupree'>
        <FA icon={faGithub} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='twitter' className='banner'>
      <a href='https://twitter.com/dev_null42'>
        <FA icon={faTwitter} className='social-icon mr-3' />
      </a>
    </span>,

    <span key='linkedin' className='banner'>
      <a href='https://www.linkedin.com/in/alexanderdupree/'>
        <FA icon={faLinkedin} className='social-icon mr-3' />
      </a>
    </span>,
  ];

  const nouns = ['Father', 'Blogger', 'Coder', 'Software Engineer'];
  const animatedNouns = nouns.map((noun, i) => {
    return (
      <div key={i} className='d-inline'>
        <span className='banner text'>{noun}</span>
        <Typing.Delay ms={1000} />
        {i !== 3 ? <Typing.Backspace count={noun.length} /> : <></>}
      </div>
    );
  });

  return (
    <div className='heading' id='top'>
      <Jumbotron className='mb-2 pb-0'>
        <Container>
          <Typing>
            <span className='banner prompt'>{'> '}</span>
            <span className='banner text'>Hi! I'm Alex DuPree</span>
            <Typing.Delay ms={2000} />
            <br />
            <span className='banner prompt'>{'> '}</span>
            <span className='banner text'>I'm a </span>
            {animatedNouns}
            <br />
            <Typing.Delay ms={1000} />
            <span className='banner prompt'>{'> '}</span>
            <span className='banner text'>Contact Me: </span>
            {networks}
            &nbsp;
            <Typing.Delay ms={8640000} />
          </Typing>
        </Container>
        <ScrollDown next='#blog' />
      </Jumbotron>
    </div>
  );
};

export default Heading;
