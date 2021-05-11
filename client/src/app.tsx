import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Heading } from './components';

export default function App() {
  return (
    <main className='App'>
      <Router>
        <Navbar />
        <Switch></Switch>
        <Heading />
      </Router>
    </main>
  );
}
