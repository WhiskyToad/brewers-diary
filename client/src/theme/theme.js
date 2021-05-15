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
        lineHeight: "1.64",
        bg: "#eaf4fc",
        overflowX: "hidden",
        fontSize: ["14px", "14px", "16px", "16px"],
      },
      button: {
        loadingText: "Submitting",
        fontFamily: "BebasNeue",
      },
    },
  },
  textStyles: {
    descriptive: {
      fontSize: ["14px", "14px", "16px", "16px"],
    },
    descriptiveSmall: {
      fontSize: ["10px", "10px", "13px", "13px"],
      color: "gray",
    },
    heading: {
      fontFamily: ["BebasNeue"],
      fontSize: ["20px", "20px", "25px", "25px"],
      color: "orange",
      fontWeight: "bold",
    },
    headingSmall: {
      fontFamily: ["BebasNeue"],
      fontSize: ["16px", "16px", "20px", "20px"],
    },
  },
});

export default theme;
