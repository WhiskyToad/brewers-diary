import React from "react";
import {
  Image,
  Text,
  HStack,
  VStack,
  Divider,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { FaRegComments, FaRegLightbulb, FaRegStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <HStack
        w={["100%", "100%", "940px", "940px"]}
        h="350px"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
        textStyle="descriptiveSmall"
      >
        <Flex w="50%" h="275px" justify="center">
          <Image
            h="250px"
            borderRadius="10px"
            fit="cover"
            src={recipe.selectedFile}
          />
        </Flex>
        <VStack w="50%" h="275px" m="10px" textAlign="center" spacing={4}>
          <Text textStyle="heading">{recipe.title}</Text>
          <HStack w="50%" justify="space-evenly" textStyle="headingSmall">
            <Text>{recipe.method}</Text>
            <Text>{recipe.style}</Text>
            <Text>{recipe.targetABV}%</Text>
          </HStack>
          <Text px="15px" textStyle="descriptive">
            {recipe.description}
          </Text>
          <Spacer />
          <HStack
            minW="90%"
            justify="space-between"
            display={{ base: "none", md: "flex" }}
          >
            <VStack>
              <HStack>
                <FaRegStar />
                <Text>
                  ({(recipe.rating / recipe.votes.length).toFixed(1)})
                </Text>
              </HStack>
              <Text>
                {recipe.votes.length}
                {recipe.votes.length === 1 ? " vote" : " votes"}
              </Text>
            </VStack>
            <VStack>
              <FaRegComments />
              <Text>20 comments</Text>
            </VStack>
            <VStack>
              <FaRegLightbulb />
              <Text>4 suggestions</Text>
            </VStack>
            <VStack>
              <FiBookOpen />
              <Text>14 diaries</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
    </>
  );
};

export default RecipeCard;
