import { useState } from "react";
import styled from 'styled-components/macro';
import mainLogo from '../images/spotifactsLogo.png'
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

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const StyledImageView = styled.img`
border-radius: 0%;
background: "transparent";
width: 250px;
height: 250px;
padding: 15px;
`

const Login = () => {
  let [showInfo, setShowInfo] = useState(false);
  return (
    <StyledLoginContainer>
      <h2 style={{ margin: 2 }}>Get Your Spotify Facts Straight !</h2>
      <StyledImageView src={mainLogo} ></StyledImageView>

      <StyledLoginButton href="http://localhost:3100/login">
        Log in to Spotify
    </StyledLoginButton>
      {showInfo ? (<div style={{ width: 320, position: "absolute", background: "#1db954", borderRadius: 20, padding: 25, transition: "width 1s, height 1s, background-color .5s, transform 1s" }}>
        <h4>Spotifacts connects to your Spotify account to give you a summary and analyze your listening habits. We provide you with your playlists with songs catgorized into diffrent genres and themes. Additionaly, we also provide you with recommendations for songs that should be on your radar. A spotify Premium Account is required to use Spotifacts We do not retain or copy any of your infromation. Everything is secure and private. </h4>
        <button color="#1db954" onClick={() => setShowInfo(false)}>Close</button></div>) : (<div> <button onClick={() => setShowInfo(true)} style={{ margin: 20 }}>What we do ?</button></div>)
      }
    </StyledLoginContainer >
  );
}

export default Login;