import { Card, Container } from 'react-bootstrap';

const Fade = require('react-reveal/Fade');

interface ProjectProps {
  image: string;
  title: string;
  description: string;
  link: string;
  technologies: { name: string; link: string }[];
}

const Project = ({ project }: { project: ProjectProps }) => {
  const tech = project.technologies.map((tech, i) => {
    return (
      <a href={tech.link} key={i}>
        <span className='tag m-1' key={i}>
          #{tech.name}
        </span>
      </a>
    );
  });
  return (
    <Card className='project shadow'>
      <a href={project.link}>
        <img alt={project.title} src={project.image} />
        <div className='text-overlay'>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <br />
        </div>
      </a>
      <div className='tech-overlay'>{tech}</div>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      image: '/assets/images/oresat.png',
      title: 'OreSat DxWiFi',
      description:
        'Long-range communication software with error-correcting codes',
      link: 'https://github.com/oresat/oresat-dxwifi-software',
      technologies: [
        { name: 'PCAP', link: 'https://www.tcpdump.org/' },
        { name: '802.11', link: 'https://en.wikipedia.org/wiki/IEEE_802.11' },
        { name: 'Radiotap', link: 'https://www.radiotap.org/' },
        {
          name: 'C',
          link: 'https://en.wikipedia.org/wiki/C_(programming_language)',
        },
      ],
    },
    {
      image: '/assets/images/playbattleship.png',
      title: 'playbattleship.com',
      description:
        'Full-stack web application for playing Battleship in the browser',
      link: 'https://github.com/AlexanderJDupree/Battleship',
      technologies: [
        { name: 'React', link: 'https://reactjs.org/' },
        { name: 'Socket.io', link: 'https://socket.io/' },
        { name: 'Firebase', link: 'https://firebase.google.com/' },
        {
          name: 'Express',
          link: 'https://expressjs.com/',
        },
      ],
    },
    {
      image: '/assets/images/portfolio-site.png',
      title: 'Blog Site',
      description:
        'Personal portfolio and blog site to share my experience with others',
      link: 'https://github.com/AlexanderJDupree/blog-site',
      technologies: [
        { name: 'Rust', link: 'https://www.rust-lang.org/' },
        { name: 'Rocket', link: 'https://rocket.rs/' },
        { name: 'React', link: 'https://reactjs.org/' },
        {
          name: 'Typescript',
          link: 'https://www.typescriptlang.org/',
        },
      ],
    },
    {
      image: '/assets/images/githubnetwork.png',
      title: 'GitHub Network',
      description:
        'Command line application to generate directed graphs of a users GitHub social network',
      link: 'https://github.com/AlexanderJDupree/GithubNetwork',
      technologies: [
        { name: 'GitHub API', link: 'https://developer.github.com/v3/' },
        { name: 'networkx', link: 'https://networkx.github.io/' },
        { name: 'matplotlib', link: 'https://matplotlib.org/index.html' },
        {
          name: 'Python',
          link: 'https://www.python.org/',
        },
      ],
    },
  ].map((project, i) => {
    return <Project key={i} project={project} />;
  });

  return (
    <section className='projects' id='projects'>
      <h3 className='text-center heading m-4'>Check Out My Work</h3>
      <Container className='mb-5'>
        <Fade right>
          <div className='project-grid'>{projects}</div>
        </Fade>
      </Container>
    </section>
  );
};

export default Projects;
