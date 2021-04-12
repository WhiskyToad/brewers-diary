import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    orange: "#e63312",
    blue: "#002638",
    pink: "#fff0f5",
    selected: "#ebf6f7",
  },
  styles: {
    global: {
      body: {
        fontFamily: "Open Sans",
        bg: "#eaf4fc",
        overflowX: "hidden",
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
      fontSize: ["20px", "20px", "30px", "30px"],
      color: "orange",
      fontWeight: "bold",
    },
    descriptive: {
      fontSize: ["14px", "14px", "20px", "20px"],
      fontWeight: "bold",
    },
    descriptiveSmall: {
      fontSize: ["10px", "10px", "15px", "15px"],
    },
    heading: {
      fontFamily: ["BebasNeue"],
      fontSize: ["25px", "25px", "35px", "35px"],
      color: "orange",
      fontWeight: "bold",
    },
    headingSmall: {
      fontFamily: ["BebasNeue"],
      fontSize: ["18px", "18px", "25px", "25px"],
    },
  },
});

export default theme;
