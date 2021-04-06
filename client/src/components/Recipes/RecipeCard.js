import React from "react";
import { Image, Text, HStack, VStack, Divider, Spacer } from "@chakra-ui/react";
import { FaRegComments, FaRegLightbulb, FaRegStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <HStack
        minW="100%"
        h="350px"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
        textStyle="descriptiveSmall"
      >
        <Image
          src={recipe.selectedFile}
          h="275px"
          w="410px"
          borderRadius="10px"
        />

        <VStack w="100%" h="275px" m="10px" textAlign="center" spacing={4}>
          <Text textStyle="heading">{recipe.title}</Text>
          <HStack w="50%" justify="space-evenly">
            <Text textStyle="headingSmall">{recipe.method}</Text>
            <Text textStyle="headingSmall">{recipe.style}</Text>
            <Text textStyle="headingSmall">{recipe.targetABV}%</Text>
          </HStack>
          <Text px="15px" textStyle="descriptive">
            {recipe.description}
          </Text>
          <Spacer />
          <HStack minW="90%" justify="space-between">
            <VStack>
              <FaRegStar />
              <Text>42 ratings</Text>
            </VStack>
            <VStack>
              <FaRegComments />
              <Text>20 comments</Text>
            </VStack>
            <VStack>
              <FaRegLightbulb />
              <Text>0 suggestions</Text>
            </VStack>
            <VStack>
              <FiBookOpen />
              <Text>690 diaries</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
    </>
  );
};

export default RecipeCard;
