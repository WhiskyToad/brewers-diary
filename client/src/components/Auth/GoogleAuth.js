import React from "react";
import { GoogleLogin } from "react-google-login";

import { Button, Flex, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const googleSuccess = () => {};

  const googleFailure = () => {
    console.log("Google log in was unsuccessful");
  };
  return (
    <>
      <GoogleLogin
        clientId="334254596591-hnhq1n4j5sfemggaqvl626640c1f3v5c.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            w="50%"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <Flex fontSize="20px" justify="baseline">
              <FcGoogle />
              <Text ml="10px">Google Sign In</Text>
            </Flex>
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleAuth;
