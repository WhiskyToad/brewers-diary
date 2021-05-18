import React from "react";
import { Link as Router } from "react-router-dom";
import { Box, Text, Link } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Link as={Router} to="/">
      <Box minW="300px" {...props}>
        <Text fontSize="30px" color="white" fontFamily="Lobster">
          BREWERS DIARY
        </Text>
      </Box>
    </Link>
  );
}
