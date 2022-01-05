import { useState } from "react";
import styled from "styled-components/macro";
import mainLogo from "../images/spotifactsLogo.png";
import { setDemoMode } from "../spotify";
const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const StyledLinkButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  font-size: var(--fz-sm);
  padding: 8px;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
  text-align: center;
  display: inline-block;
`;

const StyledImageView = styled.img`
  border-radius: 0%;
  background: "transparent";
  width: 250px;
  height: 250px;
  padding: 15px;
`;
const StyledAboutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;
const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: solid;
  color: #1db954;
  margin:4px;
`;

const StyledDetailsDiv = styled.div`
 width: 340;
            
            position: absolute;
            background: #1db954;
            border-radius: 20%;
            padding: 25px;
transition: width 1s, height 1s, background-color .5s, transform 1s;
`

const StyledCenteredDiv = styled.div`
display: flex;
 justify-content: center;
  margin-top: 20px;
`
const Login = () => {
  let [showInfo, setShowInfo] = useState(false);
  let [showAbout, setShowAbout] = useState(false);

  const demoLogin = () => {
    setDemoMode(true);
    window.location = window.location.origin;
  };

  const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3100/login'
      : 'https://spotifacts-api.deta.dev/login';

  console.log('Running On', process.env.NODE_ENV);

  return (
    <StyledLoginContainer>
      <h2 style={{ margin: 2 }}>Get Your Spotify Facts Straight !</h2>
      <StyledImageView src={mainLogo}></StyledImageView>

      <StyledLoginButton href={LOGIN_URI}>
        Log in to Spotify
      </StyledLoginButton>
      <p style={{ margin: 0, marginTop: 30 }}>Do not have a Spotify Account? </p>
      <StyledLink onClick={() => demoLogin()}>
        Try The Demo
      </StyledLink>

      {/*       
      <StyledLoginButton onClick={() => demoLogin()}>
        Try the Demo
    </StyledLoginButton>
*/}

      {showInfo ? (
        <div
          style={{
            width: 320,
            position: "absolute",
            background: "#1db954",
            borderRadius: 20,
            padding: 25,
            transition:
              "width 1s, height 1s, background-color .5s, transform 1s",
          }}
        >
          <h4> What Spotifacts Does </h4>
          <p>Spotifacts connects to your Spotify account to give you a summary
          and analyze your listening habits. We provide you with your
          playlists with songs catgorized into diffrent genres and themes.
          Additionaly, we also provide you with recommendations for songs that
          should be on your radar.
          </p>
          <p>
            A Spotify  Account is required to
            use Spotifacts or you can try the demo. Spotifacts does not retain or copy any of your infromation from Spotify.
            Everything is kept secure and private.{" "}
          </p>
          <StyledCenteredDiv>
            <button color="#1db954" onClick={() => setShowInfo(false)}>
              Close
          </button>
          </StyledCenteredDiv>
        </div>
      ) : (
          <div>
            {" "}
            <button onClick={() => setShowInfo(true)} style={{ margin: 20 }}>
              What we do ?
          </button>
          </div>
        )}
      {showAbout ? (

        <div
          style={{
            width: 340,

            position: "absolute",
            background: "#212121",
            borderRadius: 20,
            padding: 25,
            transition:
              "width 1s, height 1s, background-color .5s, transform 1s",
          }}
        >
          <p>
            Spotifacts is developed by{" "}
            <a href="https://www.linkedin.com/in/jatinarora08/">Jatin Arora </a>
            and uses Spotify API to deliver and develop features for the app.
            The UI is built using React and Styled Components along with regular
            old JavaScript. HTML and CSS. The app uses a REST API built with
            Express and is integrated with Spotify API. This app and it's source
            code is not available for copying, reproducing and modifying in any
            form. Any mention of this website or it's source code must be
            attributed to{" "}
            <StyledLink href="https://www.linkedin.com/in/jatinarora08/"> Jatin Arora </StyledLink>
          </p>
          <StyledCenteredDiv >

            <StyledLinkButton href="https://github.com/jatinAroraGit">
              Source Code
          </StyledLinkButton>
          </StyledCenteredDiv >

          <h4 style={{ textAlign: "center", margin: 10 }}>Developed By Jatin Arora</h4>
          <div style={{ textAlign: "center" }}>
            <StyledLink href="https://www.linkedin.com/in/jatinarora08/">Linkedin</StyledLink>
            <StyledLink href="https://github.com/jatinAroraGit">Github</StyledLink>
            <StyledLink href="mailto:jatin.arora08@outlook.com">Email</StyledLink>
          </div>
          <h4 style={{ textAlign: "center", margin: 10 }}>Built With</h4>
          <div style={{ textAlign: "center" }}>
            <p>React, Styled Components, JavaScript and Express JS </p>

          </div>
          <StyledCenteredDiv >
            <button color="#1db954" onClick={() => setShowAbout(false)}>
              Close
          </button>
          </StyledCenteredDiv>

        </div>


      ) : (
          <div>
            <StyledAboutButton onClick={() => setShowAbout(true)}>
              About
          </StyledAboutButton>
          </div>
        )}
    </StyledLoginContainer>
  );
};

export default Login;
