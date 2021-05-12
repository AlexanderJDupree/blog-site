import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

interface LinkWrapperProps {
  onMain: boolean;
  to: string;
  children?: React.ReactNode;
}

const LinkWrapper = ({ onMain, to, children }: LinkWrapperProps) => {
  return onMain ? (
    <Link activeClass='active' to={to} spy={true} smooth={true} duration={500}>
      {children}
    </Link>
  ) : (
    <LinkContainer to={`/#${to}`}>{children}</LinkContainer>
  );
};

export default function Navigation() {
  const location = useLocation();
  const onMain = location.pathname === '/';

  return (
    <Navbar collapseOnSelect expand='md'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <FA icon={faLaptopCode} className='brand-icon mr-2' />
            <span id='brand-text'>/dev/null</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkWrapper onMain={onMain} to='top'>
              <Nav.Link as='div'>Home</Nav.Link>
            </LinkWrapper>

            <LinkWrapper onMain={onMain} to='blog'>
              <Nav.Link as='div'>Blog</Nav.Link>
            </LinkWrapper>

            <LinkWrapper onMain={onMain} to='about'>
              <Nav.Link as='div'>About</Nav.Link>
            </LinkWrapper>

            <LinkWrapper onMain={onMain} to='projects'>
              <Nav.Link as='div'>Projects</Nav.Link>
            </LinkWrapper>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
