import React from "react";
import { useSelector } from "react-redux";
import {
  Spinner,
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
      <SortSegment recipes={recipes} />
      <RecipeList recipes={recipes} />
    </>
  );
};

const SortSegment = ({ recipes }) => {
  return (
    <HStack
      justify="space-between"
      my="40px"
      p="10px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
    >
      <Select
        variant="unstyled"
        iconSize="lg"
        textStyle="heading"
        textAlign="right"
        height="60px"
      >
        <option value="All Grain">All Styles</option>
        <option value="Extract">IPA</option>
      </Select>

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
    </HStack>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <VStack
      my="40px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      display={!recipes.length ? "none" : "flex"}
    >
      {recipes.map((recipe) => (
        <a key={recipe._id} href={`recipes/view#${recipe._id}`}>
          <RecipeCard recipe={recipe} />
        </a>
      ))}
    </VStack>
  );
};
export default Recipes;
