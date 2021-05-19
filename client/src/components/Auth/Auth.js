import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignin) dispatch(signin(form, history, setError));
    if (!isSignin) dispatch(signup(form, history, setError));
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <HStack mx="auto">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </HStack>
        </Alert>
      )}
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
                setError={setError}
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

const SignUp = ({ form, handleChange, handleSubmit, setError }) => {
  // Shows/Hides password field
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);

  // controllers for warning messages
  const [inputCheck, setInputCheck] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // checks input values
  const checkValues = (e) => {
    e.preventDefault();
    setInputCheck({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    if (form.name.length < 4) {
      setError("Usernames need to be at least 4 characters.");
      setInputCheck({
        name: true,
      });
      return;
    }
    if (form.email.length < 1) {
      setError("You need an email address");
      setInputCheck({
        email: true,
      });
      return;
    }
    if (form.password.length < 1) {
      setError("You need a password");
      setInputCheck({
        password: true,
      });
      return;
    }
    if (form.confirmPassword !== form.password) {
      setError("Passwords do not match");
      setInputCheck({
        confirmPassword: true,
      });
      return;
    }

    handleSubmit(e);
  };

  return (
    <form onSubmit={checkValues}>
      <VStack spacing={7}>
        <Text textStyle="heading">Sign Up</Text>
        <Input
          name="name"
          type="name"
          label="Username"
          onChange={handleChange}
          placeholder="Username"
          isInvalid={inputCheck.name}
          errorBorderColor="crimson"
        />

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
            isInvalid={inputCheck.password}
            errorBorderColor="crimson"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showTwo ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            isInvalid={inputCheck.confirmPassword}
            errorBorderColor="crimson"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShowTwo(!showTwo)}>
              {showTwo ? "Hide" : "Show"}
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
