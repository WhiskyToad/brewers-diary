import React from "react";

import {
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
} from "@chakra-ui/react";

import GoogleAuth from "./GoogleAuth";

const SignIn = () => {
  return (
    <VStack spacing={7}>
      <Text textStyle="heading">Sign In</Text>

      <Input placeholder="Username" />
      <PasswordInput />
      <Button textStyle="headingSmall" w="70%">
        Sign In
      </Button>
      <GoogleAuth />
    </VStack>
  );
};

function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SignIn;