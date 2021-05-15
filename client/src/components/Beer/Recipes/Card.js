import React from "react";
import moment from "moment";
import { Image, Text, HStack, VStack, Spacer, Flex } from "@chakra-ui/react";
import { FaRegComments, FaRegLightbulb, FaRegStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <VStack className="center-card">
        <HStack w="97%" justify="space-between">
          <Spacer maxW="200px" />
          <Text textStyle="heading">{recipe.title}</Text>
          <HStack w="200px" justify="flex-end">
            <Text textStyle="descriptiveSmall">by {recipe.name}</Text>
            <Text textStyle="descriptiveSmall">
              {moment(recipe.createdAt).fromNow()}
            </Text>
          </HStack>
        </HStack>
        <HStack w="100%">
          <Flex w="300px" justify="center">
            <Image
              w="300px"
              S
              borderRadius="10px"
              fit="cover"
              src={recipe.selectedFile}
            />
          </Flex>
          <Spacer />
          <VStack w="50%" h="200px" m="10px" textAlign="center">
            <HStack w="70%" justify="space-evenly" textStyle="headingSmall">
              <Text>{recipe.method}</Text>
              <Text>{recipe.style}</Text>
              <Text>{recipe.targetABV}%</Text>
            </HStack>
            <Spacer />
            <Text px="15px" textStyle="descriptive">
              {recipe.description}
            </Text>
            <Spacer />
            <HStack w="200px" textStyle="descriptiveSmall">
              <HStack>
                <FaRegStar />
                <Text>
                  ({(recipe.rating / recipe.votes.length).toFixed(1)})
                </Text>

                <Text>
                  {recipe.votes.length}
                  {recipe.votes.length === 1 ? " vote" : " votes"}
                </Text>
              </HStack>
              <Spacer />
              <HStack>
                <FaRegComments />
                <Text>20 comments</Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default RecipeCard;
