import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

const Fade = require('react-reveal/Fade');

const About = () => {
  return (
    <div className='about' id='about'>
      <Container>
        <Fade left>
          <Row className='pb-2'>
            <Col xs={3} className='d-flex justify-content-center'>
              <img
                src='/assets/images/profile.png'
                className='profile-pic mt-5'
                alt='Profile'
              />
            </Col>
            <Col xs={9}>
              <h4 className='mt-5'>whoami</h4>
              <p className='description'>
                Given the bash command in the heading it's safe to say I am a
                unix nerd and technophile. I'm also a husband, father, and Army
                veteran. I started programming in 2017 and it's been an
                extremely rewarding journey. I love to learn new things and
                share my passion and experiences with others.
              </p>
            </Col>
          </Row>
          <Row className='pb-5'>
            <Col xs={3}></Col>
            <Col xs={4} className='border-right'>
              <h4 className='mt-1'>Contact Details</h4>
              <p className='contact-details mb-0'>
                <span>Alexander DuPree</span>
                <br />
                <span>(971) 284-1416</span>
                <br />
                <span>work@adupree.dev</span>
                <br />
              </p>
            </Col>
            <Col xs={5}>
              <a
                href='/assets/docs/AlexDuPree_Resume2021.pdf'
                className='btn btn-info mt-5 ml-1'
              >
                <FA icon={faFileDownload} className='download-resume mr-2' />
                Download Resume
              </a>
            </Col>
          </Row>
        </Fade>
      </Container>
    </div>
  );
};

export default About;
