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
    <VStack spacing={6}>
      <Text textStyle="heading">Sign In</Text>
      <GoogleAuth />
      <Input placeholder="Username" />
      <PasswordInput />
      <Button
        type="submit"
        variant="outline"
        bg="white"
        textStyle="heading"
        h="50px"
      >
        Sign In
      </Button>
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
