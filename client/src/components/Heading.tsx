import { Container, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import Typing from 'react-typing-animation';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ScrollDown from './ScrollDown';

const Heading = () => {
  const networks = [
    <span key='email' className='banner'>
      <a href='mailto: alexander.j.dupree@gmail.com'>
        <FA icon={faEnvelope} className='social-icon mr-3' />
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
    <div className='heading' id='heading'>
      <Jumbotron className='mb-3 pb-0 banner'>
        <Container>
          <Typing>
            <span className='banner prompt'>{'> '}</span>
            <span className='banner text'>Hi! I'm Alex DuPree</span>
            <Typing.Delay ms={2000} />
            <br />
            <span className='banner prompt'>{'> '}</span>
            <span className='banner text'>I am a </span>
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
