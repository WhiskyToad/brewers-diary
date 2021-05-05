import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
} from "@chakra-ui/react";

import GoogleAuth from "./GoogleAuth";

import { signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form));
  };

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

const PasswordInput = ({ placeholder, name, handleChange }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SignUp;
