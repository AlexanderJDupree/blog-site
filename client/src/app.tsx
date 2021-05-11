import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Heading, Blog, Post, About, Footer } from './components';

const Home = () => {
  return (
    <>
      <Heading />
      <Blog />
      <About />
    </>
  );
};

export default function App() {
  return (
    <main className='App' id='top'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/posts/:title' component={Post} />
          <Route path='/' component={Home} />
        </Switch>
        <Footer />
      </Router>
    </main>
  );
}
