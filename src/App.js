import { useEffect, useState } from "react";
import logo from "./logo.svg";
import styled, { createGlobalStyle } from 'styled-components/macro';
import { GlobalStyle } from './styles';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { Login, Profile } from './pages';
import mainLogo from './images/spotifactsLogo.png';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation
} from "react-router-dom";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const StyledHeaderLogo = styled.img`
width: 80px;
height: 80px;
  position: absolute;
  top: var(--spacing-sm)+100;
  left: var(--spacing-md);
  padding: 0px;
  margin: 0px;
  color: var(--white);
  z-index: 10;

  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    console.log(accessToken);
    const fetchData = async () => {

      const { data } = await getCurrentUserProfile();
      console.log(data);
      setProfile(data);
    }

    catchErrors(fetchData());

  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
            <>
              <StyledHeaderLogo src={mainLogo}></StyledHeaderLogo>
              <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
              <Router>
                <ScrollToTop />
                <Routes>
                  <Route element={<h1>Top Artists</h1>} path="/top-artists">

                  </Route>
                  <Route element={<h1>Top Tracks</h1>} path="/top-tracks">
                  </Route>

                  <Route element={<h1>Playlist with ID</h1>} path="/playlists/:id">
                  </Route>

                  <Route element={<h1>Playlists</h1>} path="/playlists">
                  </Route>
                  <Route path="/" element={<Profile />}>
                  </Route>
                </Routes>
              </Router>
            </>
          )}
      </header>
    </div>
  );
}

export default App;
