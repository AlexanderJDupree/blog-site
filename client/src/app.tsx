import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Heading, Blog } from './components';

export default function App() {
  return (
    <main className='App'>
      <Router>
        <Navbar />
        <Switch></Switch>
        <Heading />
        <Blog />
      </Router>
    </main>
  );
}
