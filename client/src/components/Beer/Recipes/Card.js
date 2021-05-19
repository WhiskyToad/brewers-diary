import React from "react";
import moment from "moment";
import { Image, Text, HStack, VStack, Spacer, Flex } from "@chakra-ui/react";
import { FaRegComments, FaStar } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <VStack className="center-card">
        <HStack minW="100%" justify="space-between">
          <Spacer maxW="200px" display={{ base: "none", md: "flex" }} />
          <Text textStyle="heading">{recipe.title}</Text>
          <HStack w={{ base: "100px", md: "200px" }} justify="flex-end">
            <Text textStyle="descriptiveSmall">by {recipe.name}</Text>
            <Text textStyle="descriptiveSmall">
              {moment(recipe.createdAt).fromNow()}
            </Text>
          </HStack>
        </HStack>

        <HStack minW="100%" justify="space-between">
          <VStack
            minH="200px"
            w={{ base: "200px", md: "300px" }}
            justify="center"
          >
            <Flex justify="center">
              <Image
                maxH="200px"
                borderRadius="10px"
                fit="cover"
                src={recipe.selectedFile}
              />
            </Flex>
            <Spacer />
            <HStack
              w="80%"
              justify="space-between"
              textStyle="headingSmall"
              display={{ base: "flex", md: "none" }}
            >
              <Text>{recipe.method}</Text>
              <Text>{recipe.style}</Text>
              <Text>{recipe.targetABV}%</Text>
            </HStack>
            <Spacer />
          </VStack>

          <Spacer />

          <VStack w="50%" minH="200px" m="10px" textAlign="center">
            <HStack
              w="70%"
              justify="space-evenly"
              textStyle="headingSmall"
              display={{ base: "none", md: "flex" }}
            >
              <Text>{recipe.method}</Text>
              <Text>{recipe.style}</Text>
              <Text>{recipe.targetABV}%</Text>
            </HStack>

            <Text px="15px" minW="100%" overflow="hidden">
              {recipe.description}
            </Text>

            <Spacer />

            <HStack textStyle="descriptiveSmall">
              <HStack>
                <Text>
                  {recipe.rating !== 0
                    ? (recipe.rating / recipe.votes.length).toFixed(1)
                    : 0}
                </Text>
                <FaStar fontSize="18px" />
                <Text>
                  {recipe.votes.length}
                  {recipe.votes.length === 1 ? " vote" : " votes"}
                </Text>
              </HStack>
              <Spacer />
              <HStack display={{ base: "none", md: "flex" }}>
                <FaRegComments fontSize="20px" />
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
