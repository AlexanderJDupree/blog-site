import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
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
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to='#blog'>
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>

            <LinkContainer to='#about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/about'>
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/about'>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
