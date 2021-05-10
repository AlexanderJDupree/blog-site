import ParticlesBg from 'particles-bg';
import Navbar from './Navbar';

// This import style is get around type errors
const Fade = require('react-reveal/Fade');

const Header = () => {
  const heading = `Hi, I'm Alex DuPree.`;
  const description = `I'm a software engineer with experience in embedded systems and cloud/web technologies`;
  const networks = [
    <li key='project'>
      <a href='#'>
        <i className='fa fa-book'></i>
      </a>
    </li>,

    <li key='github'>
      <a href='#'>
        <i className='fa fa-github'></i>
      </a>
    </li>,

    <li key='twitter'>
      <a href='#'>
        <i className='fa fa-twitter'></i>
      </a>
    </li>,

    <li key='linkedin'>
      <a href='#'>
        <i className='fa fa-linkedin'></i>
      </a>
    </li>,
  ];
  return (
    <header id='home'>
      <ParticlesBg type='circle' bg={true} />

      <Navbar />

      <div className='row banner'>
        <div className='banner-text'>
          <Fade bottom>
            <h1 className='responsive-headline'>{heading}</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h3>{description}</h3>
          </Fade>
          <hr />
          <Fade bottom duration={2000}>
            <ul className='social'>{networks}</ul>
          </Fade>
        </div>
      </div>

      <p className='scrolldown'>
        <a className='smoothscroll' href='#about'>
          <i className='icon-down-circle'></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
