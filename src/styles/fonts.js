import { css } from 'styled-components/macro';

const fonts = css`
  @font-face {
    font-family: 'Open Sans';
    src: url('../fonts/Open-Sans-Regular.woff2') format('woff2'),
    url('../fonts/Open-Sans-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/Open-Sans-800.woff2') format('woff2'),
    url('../fonts/Open-Sans-800.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/Open-Sans-600.woff2') format('woff2'),
    url('../fonts/Open-Sans-600.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;