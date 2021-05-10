const Fade = require('react-reveal/Fade');

const About = () => {
  const profile = 'images/profile.png';
  const bio =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta labore odit porro facere iusto molestias consequatur mollitia cumque aliquid nesciunt modi nisi necessitatibus sapiente, perspiciatis reprehenderit laboriosam doloribus delectus temporibus.';
  const name = 'Alexander DuPree';
  const phone = '555-555-5555';
  const email = 'info@email.com';
  const resume = '#';

  return (
    <section id='about'>
      <Fade duration={1000}>
        <div className='row'>
          <div className='three columns'>
            <img className='profile-pic' src={profile} alt='profile' />
          </div>
          <div className='nine columns main-col'>
            <h2>About Me</h2>

            <p>{bio}</p>
            <div className='row'>
              <div className='columns contact-details'>
                <h2>Contact Details</h2>
                <p className='address'>
                  <span>{name}</span>
                  <br />
                  <span>{phone}</span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
              <div className='columns download'>
                <p>
                  <a href={resume} className='button'>
                    <i className='fa fa-download'></i>Download Resume
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default About;
