import React from "react";
import {
  Link,
  Box,
  VStack,
  Text,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import Logo from "./Logo";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <HStack>
        <Logo />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </HStack>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="38px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="orange"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="38px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="yellow"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        textStyle="navbar"
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Button textStyle="navbar" variant="ghost">
          <Search2Icon mr="15px" size="sm" />
          Search
        </Button>

        <MenuItem to="/recipes">RECIPES</MenuItem>

        <Button textStyle="navbar" variant="ghost">
          Sign In
        </Button>
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
