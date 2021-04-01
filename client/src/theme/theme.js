import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    orange: "#e63312",
    blue: "#002638",
    pink: "#fff0f5",
    aqua: "#04AEC4",
  },
  styles: {
    global: {
      body: {
        fontFamily: "Open Sans",
        bg: "pink",
      },
      button: {
        loadingText: "Submitting",
        fontFamily: "BebasNeue",
      },
    },
  },
  textStyles: {
    navbar: {
      fontFamily: ["BebasNeue"],
      fontSize: ["28px", "28px", "34px", "34px"],
    },
    descriptive: {
      fontSize: ["18px", "18px", "26px", "26px"],
      fontWeight: "bold",
    },
    heading: {
      fontFamily: ["BebasNeue"],
      fontSize: ["28px", "28px", "34px", "34px"],
      color: "orange",
    },
    title: {
      fontFamily: ["BebasNeue"],
      fontSize: ["45px", "45px", "60px", "80px"],
      color: "aqua",
    },
    headingLarge: {
      fontFamily: ["BebasNeue"],
      fontSize: ["35px", "35px", "55px", "55px"],
      color: "aqua",
    },
    headingMedium: {
      fontFamily: ["BebasNeue"],
      fontSize: ["30px", "30px", "45px", "45px"],
      color: "orange",
    },
    headingSmall: {
      fontFamily: ["BebasNeue"],
      fontSize: ["25px", "25px", "30px", "30px"],
      color: "orange",
    },
  },
});

export default theme;
