import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <a href="/">
      <Box minW="300px" {...props}>
        <Text fontSize="60px" color="orange" fontFamily="Neoneon">
          BREWERS DIARY
        </Text>
      </Box>
    </a>
  );
}
