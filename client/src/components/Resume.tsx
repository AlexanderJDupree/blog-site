const Slide = require('react-reveal/Slide');

const Resume = () => {
  const education = [
    {
      school: 'Portland State University',
      degree: 'Computer Science',
      graduated: 'June 2021',
      description:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eos repellendus asperiores quo expedita. Ad consectetur quibusdam consequatur',
    },
  ].map((education) => {
    return (
      <div key={education.school}>
        <h3>{education.school}</h3>
        <p className='info'>
          {education.degree} <span>&bull;</span>
          <em className='date'>{education.graduated}</em>
        </p>
        <p>{education.description}</p>
      </div>
    );
  });

  const work = [
    {
      company: 'Garmin',
      title: 'Software Engineer',
      start: 'March 2020',
      end: 'September 2020',
      description:
        'Describe work, special projects, notable achievements, what technologies you have been working with, and anything else that would be useful for an employer to know.',
    },

    {
      company: 'U.S. Army',
      title: 'Infantry Squad Leader',
      start: 'January 2011',
      end: 'June 2017',
      description:
        'Describe work, special projects, notable achievements, what technologies you have been working with, and anything else that would be useful for an employer to know.',
    },
  ].map((work) => {
    return (
      <div key={work.company}>
        <h3>{work.company}</h3>
        <p className='info'>
          {work.title}
          <span>&bull;</span>{' '}
          <em className='date'>
            {work.start} - {work.end}
          </em>
        </p>
        <p>{work.description}</p>
      </div>
    );
  });
  const skills = [
    'C',
    'C++',
    'Python',
    'Rust',
    'Haskell',
    'Typescript',
    'SQL',
    'GCP',
    'AWS',
    'React',
    'git',
    'Docker',
    'Linux',
    'Flask',
  ].map((skill) => {
    return (
      <div key={skill}>
        <span>{skill}</span>
      </div>
    );
  });

  return (
    <section id='resume'>
      <Slide left duration={1300}>
        <div className='row education'>
          <div className='three columns header-col'>
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className='nine columns main-col'>
            <div className='row item'>
              <div className='twelve columns'>{education}</div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide left duration={1300}>
        <div className='row work'>
          <div className='three columns header-col'>
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className='nine columns main-col'>{work}</div>
        </div>
      </Slide>

      <Slide left duration={1300}>
        <div className='row skill'>
          <div className='three columns header-col'>
            <h1>
              <span>Skills</span>
            </h1>
          </div>
          <div className='nine columns main-col'>
            <ul className='skills'>{skills}</ul>
          </div>
        </div>
      </Slide>
    </section>
  );
};

export default Resume;
