/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Global } from "@emotion/react";
const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'BebasNeue';
      src: url(/fonts/BebasNeue-Regular.woff2) format('woff2');
    }

    `}
  />
);

export default Fonts;
