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

const SignUp = () => {
  return (
    <VStack spacing={7}>
      <Text textStyle="heading">Sign Up</Text>
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <PasswordInput placeholder={"Enter Password"} />
      <PasswordInput placeholder={"Confirm Password"} />
      <Button textStyle="headingSmall" w="70%">
        Sign Up
      </Button>
      <GoogleAuth />
    </VStack>
  );
};

function PasswordInput({ placeholder }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SignUp;
