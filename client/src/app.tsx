import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, About, Resume } from './components';

export default function App() {
  return (
    <main className='App'>
      <Router>
        <Header />
        <About />
        <Resume />
      </Router>
    </main>
  );
}
