import { Container, Jumbotron } from 'react-bootstrap';

const NotFound = () => {
  return (
    <section className='not-found' id='not-found'>
      <Jumbotron>
        <Container>
          <h1>Nothings here... 🤷‍♂️</h1>
        </Container>
      </Jumbotron>
    </section>
  );
};

export default NotFound;
