import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import { Button, Flex, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      window.location.href = `../`;
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google log in was unsuccessful");
  };
  return (
    <>
      <GoogleLogin
        clientId="334254596591-hnhq1n4j5sfemggaqvl626640c1f3v5c.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            w="70%"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <Flex textStyle="headingSmall" justify="baseline">
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
