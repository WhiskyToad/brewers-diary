import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <Image src={recipe.selectedFile} minW="100%" h="160px" />
      <Box m="10px" textAlign="center">
        <Text textStyle="headingSmall" color="black">
          {recipe.title} | {recipe.style} | {recipe.targetABV}%
        </Text>
      </Box>
    </>
  );
};

export default RecipeCard;
