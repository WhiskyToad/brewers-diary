import React from "react";
import { Image, Text, HStack, VStack } from "@chakra-ui/react";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <HStack
        minW="100%"
        h="300px"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
        m="10px"
      >
        <Image src={recipe.selectedFile} h="240px" />
        <VStack w="100%" m="10px" textAlign="center">
          <Text textStyle="heading">{recipe.title}</Text>
          <HStack w="50%" justify="space-evenly">
            <Text textStyle="headingSmall" color="black">
              {recipe.style}
            </Text>
            <Text textStyle="headingSmall" color="black">
              {recipe.targetABV}%
            </Text>
          </HStack>
          <Text textStyle="descriptive">{recipe.description}</Text>
        </VStack>
      </HStack>
    </>
  );
};

export default RecipeCard;
