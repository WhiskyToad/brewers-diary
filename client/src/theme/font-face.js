/* eslint-disable import/no-anonymous-default-export */
import { Global } from "@emotion/react";
const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'BebasNeue';
      src: url(/fonts/BebasNeue-Regular.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Open Sans';
      src: url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);
    }
    @font-face {
      font-family: 'Neoneon';
      src: url(/fonts/Neoneon.woff2) format('woff2');
    } `}
  />
);

export default Fonts;
