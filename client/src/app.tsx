import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Navbar,
  Heading,
  Blog,
  Post,
  About,
  Footer,
  Projects,
  NotFound,
} from './components';

const Home = () => {
  return (
    <>
      <Heading />
      <Blog />
      <About />
      <Projects />
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
          <Route path='*' component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </main>
  );
}
