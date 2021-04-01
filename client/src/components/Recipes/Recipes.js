import React from "react";
import { useSelector } from "react-redux";
import {
  Spinner,
  Flex,
  HStack,
  VStack,
  Button,
  Box,
  Text,
  Select,
} from "@chakra-ui/react";

import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <>
      <Box textAlign="center" display={!recipes.length ? "block" : "none"}>
        <Spinner size="xl" />
      </Box>
      <VStack
        my="100px"
        p="40px"
        w="50%"
        mx="auto"
        bg="white"
        border="1px solid black"
        display={!recipes.length ? "none" : "flex"}
      >
        <HStack
          textAlign="center"
          w="100%"
          my="20px"
          justify="space-between"
          color="aqua"
        >
          <VStack>
            <Text textStyle="headingLarge">Display</Text>
            <Select
              variant="unstyled"
              iconSize="lg"
              textStyle="headingMedium"
              textAlign="right"
              height="60px"
            >
              <option value="All Grain">All Recipes</option>
              <option value="Extract">IPA</option>
            </Select>
          </VStack>
          <a href="./recipe/create">
            <Button
              variant="ghost"
              h="60px"
              textStyle="headingMedium"
              ml="-60px"
            >
              New Recipe
            </Button>
          </a>
          <VStack>
            <Text textStyle="headingLarge">Sort</Text>
            <Select
              variant="unstyled"
              iconSize="lg"
              textStyle="headingMedium"
              textAlign="right"
              height="60px"
            >
              <option value="All Grain">Newest</option>
              <option value="Extract">ABV</option>
            </Select>
          </VStack>
        </HStack>
        <Flex flexWrap="wrap" mx="auto" justify="center">
          {recipes.map((recipe) => (
            <a key={recipe._id} href={`recipes/view#${recipe._id}`}>
              <Box
                w="240px"
                h="300px"
                alignSelf="center"
                borderRadius="lg"
                overflow="hidden"
                m="10px"
              >
                <RecipeCard recipe={recipe} />
              </Box>
            </a>
          ))}
        </Flex>
      </VStack>
    </>
  );
};

export default Recipes;
