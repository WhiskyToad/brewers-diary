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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  signInPass: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [isSignin, setIsSignin] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignin) dispatch(signin(form));
    if (!isSignin) dispatch(signup(form));
  };

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
              <SignIn handleChange={handleChange} handleSubmit={handleSubmit} />
            </TabPanel>
            <TabPanel>
              <SignUp
                form={form}
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

const SignIn = ({ handleChange, handleSubmit }) => {
  // Shows/Hides password field
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={7}>
        <Text textStyle="heading">Sign In</Text>

        <Input name="email" placeholder="Email" onChange={handleChange} />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="signInPass"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button type="submit" textStyle="headingSmall" w="70%">
          Sign In
        </Button>
        <GoogleAuth />
      </VStack>
    </form>
  );
};

const SignUp = ({ form, handleChange, handleSubmit }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // controllers for warning messages
  const [inputCheck, setInputCheck] = useState({
    name: false,
    email: false,
  });

  // checks input values
  const checkValues = (e) => {
    e.preventDefault();
    if (form.name.length < 4) {
      setInputCheck({
        name: true,
      });
      return;
    }
    if (form.email.length < 1) {
      setInputCheck({
        email: true,
      });
      return;
    }
    setInputCheck({
      name: false,
      email: false,
    });
    handleSubmit(e);
  };

  return (
    <form onSubmit={checkValues}>
      <VStack spacing={7}>
        <Text textStyle="heading">Sign Up</Text>
        {inputCheck.name && (
          <Text textStyle="descriptiveSmall" color="crimson">
            name's need to be atleast 4 characters
          </Text>
        )}
        <Input
          name="name"
          type="name"
          label="Username"
          onChange={handleChange}
          placeholder="name"
          isInvalid={inputCheck.name}
          errorBorderColor="crimson"
        />
        {inputCheck.email && (
          <Text textStyle="descriptiveSmall" color="crimson">
            Email needs to be atleast 1 character
          </Text>
        )}
        <Input
          name="email"
          placeholder="Email - doesnt need to be real"
          onChange={handleChange}
          isInvalid={inputCheck.email}
          errorBorderColor="crimson"
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            isInvalid={form.password !== form.confirmPassword}
            errorBorderColor="crimson"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button type="submit" textStyle="headingSmall" w="70%">
          Sign Up
        </Button>
        <GoogleAuth />
      </VStack>
    </form>
  );
};

export default Auth;
