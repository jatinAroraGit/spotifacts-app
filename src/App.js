import { useEffect, useState } from "react";
import logo from "./logo.svg";
import styled, { createGlobalStyle } from 'styled-components/macro';
import { GlobalStyle } from './styles';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { Login } from './pages';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation
} from "react-router-dom";

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
                <Route path="/" element={
                  <div>
                    <h1>User Info Page</h1>
                    <button onClick={logout}>Log Out</button>
                  </div>
                }>
                  {/*
                  <>
                    <button onClick={logout}>Log Out</button>

                    {profile && (
                      <div>
                        <h1>{profile.display_name}</h1>
                        <p>{profile.followers.total} Followers</p>
                        {profile.images.length && profile.images[0].url && (
                          <img src={profile.images[0].url} alt="Avatar" />
                        )}
                      </div>
                    )}
                  </>
                  */}
                </Route>
              </Routes>
            </Router>

          )}
      </header>
    </div>
  );
}

export default App;
