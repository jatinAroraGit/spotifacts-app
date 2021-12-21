import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const accessToken = URLparams.get('access_token');
    const refreshToken = URLparams.get('refresh_token');
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:3100/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
