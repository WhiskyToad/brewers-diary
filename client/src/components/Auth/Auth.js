import React from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
} from "@chakra-ui/react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
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
            <Tab textStyle="headingSmall">Sign In</Tab>
            <Tab textStyle="headingSmall">Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SignIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
};

export default Auth;
