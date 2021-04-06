import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <a href="/">
      <Box minW="300px" {...props}>
        <Text fontSize="40px" color="white" fontFamily="Neoneon">
          BREWERS DIARY
        </Text>
      </Box>
    </a>
  );
}
