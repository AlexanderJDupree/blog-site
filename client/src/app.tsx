import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Heading, Blog, Post } from './components';

const Home = () => {
  return (
    <>
      <Heading />
      <Blog />
    </>
  );
};

export default function App() {
  return (
    <main className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/posts/:title' component={Post} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </main>
  );
}
