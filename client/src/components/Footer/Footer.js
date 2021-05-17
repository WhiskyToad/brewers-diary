import React from "react";

import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack
      h="40px"
      mt="20px"
      bg="white"
      textStyle="headingSmall"
      borderTop="1px solid black"
      position="relative"
    >
      <HStack justify="space-between" mx="auto" w="350px">
        <Text>© 2021 Brewers Diary</Text>
        <a
          href="http://www.king-of.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text color="orange">Created by Whisky Toad</Text>
        </a>
      </HStack>
    </HStack>
  );
};

export default Footer;
