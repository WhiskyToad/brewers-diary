import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import {
  Link,
  Box,
  VStack,
  Stack,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import Logo from "./Logo";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // toggle for mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Flex direction={{ base: "column", md: "row" }}>
        <HStack>
          <Logo />
          <MenuToggle toggle={toggle} isOpen={isOpen} />
        </HStack>
        <MenuLinks
          isOpen={isOpen}
          toggle={toggle}
          user={user}
          logout={logout}
        />
      </Flex>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg
    width="38px"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Close</title>
    <path
      fill="#e63312"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="38px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      onClick={toggle}
      align="center"
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuLinks = ({ isOpen, toggle, user, logout }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        textStyle="heading"
        spacing={8}
        align="center"
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Menu>
          <MenuButton as={Button} textStyle="heading" variant="ghost">
            Recipes
          </MenuButton>
          <MenuList>
            <Link as={Router} to="/recipes">
              <MenuItem onClick={toggle}>View</MenuItem>
            </Link>
            {user != null && (
              <Link as={Router} to="/recipe/create">
                <MenuItem onClick={toggle}>Create</MenuItem>
              </Link>
            )}
          </MenuList>
        </Menu>

        <InputGroup>
          <Input
            h="30px"
            type="search"
            placeholder="Search"
            textStyle="heading"
            bg="white"
          />
          <InputRightAddon
            h="30px"
            children={<Search2Icon size="sm" />}
            cursor="pointer"
          />
        </InputGroup>
        {user?.result ? (
          <Menu>
            <MenuButton as={Button} textStyle="heading" variant="ghost">
              Account
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link as={Router} to="/auth">
            <Button textStyle="heading" variant="ghost">
              Sign In
            </Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <VStack as="nav" align="center" w="100%" p={1} bg="blue" {...props}>
      {children}
    </VStack>
  );
};

export default NavBar;
