import { useEffect, useState } from "react";
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';
import { accessToken, logout, getCurrentUserProfile, getDemoMode } from './spotify';
import { catchErrors } from './utils';
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';
import mainLogo from './images/spotifactsLogo.png';
import demoLogo from './images/demoLogoSpotifacts.png';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
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
width: 60px;
height: 60px;
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
  const [demo, setDemo] = useState(false);

  useEffect(() => {

    setToken(accessToken);
    const fetchData = async () => {

      let isDemoMode = await getDemoMode();
      setDemo(isDemoMode);
      if (isDemoMode === false) {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      }

    }

    catchErrors(fetchData());

  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {/**
        {!token  ? (
          <Login />
        ) : (
            <>

              <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
              <Router>
                <Link to='/'>
                  <StyledHeaderLogo src={mainLogo}></StyledHeaderLogo>
                </Link>
                <ScrollToTop />
                <Routes>
                  <Route element={<TopArtists />} path="/top-artists">

                  </Route>
                  <Route element={<TopTracks />} path="/top-tracks">
                  </Route>

                  <Route element={<h1>Playlist with ID</h1>} path="/playlists/:id">
                  </Route>

                  <Route element={<h1>Playlists</h1>} path="/playlists">
                  </Route>
                  <Route path="/" element={<Profile demoMode={isDemoMode} />}>
                  </Route>
                </Routes>
              </Router>
            </>
          )}
          ****/}
        {!token && !demo && <Login />}
        {token &&
          <>

            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
            <Router>
              <Link to='/'>
                <StyledHeaderLogo src={mainLogo}></StyledHeaderLogo>
              </Link>
              <ScrollToTop />
              <Routes>
                <Route element={<TopArtists />} path="/top-artists">

                </Route>
                <Route element={<TopTracks />} path="/top-tracks">
                </Route>

                <Route element={<Playlist />} path="/playlists/:id">
                </Route>

                <Route element={<Playlists />} path="/playlists">
                </Route>
                <Route path="/" element={<Profile />}>
                </Route>
              </Routes>
            </Router>
          </>
        }
        {demo &&

          <>

            <StyledLogoutButton onClick={logout}>Exit Demo</StyledLogoutButton>
            <Router>
              <Link to='/'>
                <StyledHeaderLogo src={demoLogo}></StyledHeaderLogo>
              </Link>
              <ScrollToTop />
              <Routes>
                <Route element={<TopArtists demoMode={demo} />} path="/top-artists">

                </Route>
                <Route element={<TopTracks demoMode={demo} />} path="/top-tracks">
                </Route>

                <Route element={<Playlist demoMode={demo} />} path="/playlists/:id">
                </Route>

                <Route element={<Playlists demoMode={demo} />} path="/playlists">
                </Route>
                <Route path="/" element={<Profile demoMode={demo} />}>
                </Route>
              </Routes>
            </Router>
          </>
        }
      </header>
    </div>
  );
}

export default App;
