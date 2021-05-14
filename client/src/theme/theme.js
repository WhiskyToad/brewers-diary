import { extendTheme } from "@chakra-ui/react";

import CenterCard from "./CentreCard";

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
      fontWeight: "bold",
    },
    descriptiveSmall: {
      fontSize: ["10px", "10px", "12px", "12px"],
    },
    heading: {
      fontFamily: ["BebasNeue"],
      fontSize: ["25px", "25px", "25px", "25px"],
      color: "orange",
      fontWeight: "bold",
    },
    headingSmall: {
      fontFamily: ["BebasNeue"],
      fontSize: ["18px", "18px", "20px", "20px"],
    },
  },
  components: {
    CenterCard,
  },
});

export default theme;
