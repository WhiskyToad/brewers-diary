import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import GoogleAuth from "./GoogleAuth";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [isSignin, setIsSignin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignin) dispatch(signin(form));
    if (!isSignin) dispatch(signup(form));
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
  return (
    <>
      <VStack
        maxW="450px"
        mx="auto"
        mt="40px"
        p="20px"
        spacing={1}
        bg="white"
        border="1px solid black"
        borderRadius="4px"
      >
        <Tabs variant="line" align="center">
          <TabList>
            <Tab textStyle="headingSmall" onClick={() => setIsSignin(true)}>
              Sign In
            </Tab>
            <Tab textStyle="headingSmall" onClick={() => setIsSignin(false)}>
              Sign Up
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SignIn
                PasswordInput={PasswordInput}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </TabPanel>
            <TabPanel>
              <SignUp
                PasswordInput={PasswordInput}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
};

const SignIn = ({ PasswordInput, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={7}>
        <Text textStyle="heading">Sign In</Text>

        <Input name="email" placeholder="Email" onChange={handleChange} />
        <PasswordInput
          name={"password"}
          placeholder={"Enter Password"}
          handleChange={handleChange}
        />
        <Button type="submit" textStyle="headingSmall" w="70%">
          Sign In
        </Button>
        <GoogleAuth />
      </VStack>
    </form>
  );
};

const SignUp = ({ PasswordInput, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={7}>
        <Text textStyle="heading">Sign Up</Text>
        <Input
          name="firstName"
          label="First Name"
          onChange={handleChange}
          placeholder="First Name"
        />
        <Input
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          placeholder="Last Name"
        />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <PasswordInput
          name={"password"}
          placeholder={"Enter Password"}
          handleChange={handleChange}
        />
        <PasswordInput
          name={"confirmPassword"}
          placeholder={"Confirm Password"}
          handleChange={handleChange}
        />
        <Button type="submit" textStyle="headingSmall" w="70%">
          Sign Up
        </Button>
        <GoogleAuth />
      </VStack>
    </form>
  );
};

export default Auth;
