import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Spinner,
  HStack,
  VStack,
  Box,
  Text,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { RiFireLine, RiTrophyLine } from "react-icons/ri";
import { MdFiberNew } from "react-icons/md";

import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);
  const [sort, setSort] = useState("new");

  return (
    <>
      <Box textAlign="center" display={!recipes.length ? "block" : "none"}>
        <Spinner size="xl" />
      </Box>
      <SortSegment recipes={recipes} sort={sort} setSort={setSort} />
      <RecipeList recipes={recipes} />
    </>
  );
};

const SortSegment = ({ recipes, sort, setSort }) => {
  return (
    <HStack
      my="20px"
      p="10px"
      maxW="950px"
      mx="auto"
      bg="white"
      border="1px solid black"
      borderRadius="4px"
      textStyle="headingSmall"
      textAlign="center"
    >
      <Select
        variant="unstyled"
        size="lg"
        w="150px"
        textStyle="headingSmall"
        cursor="pointer"
      >
        <option value="All Grain">All Styles</option>
        <option value="Extract">IPA</option>
      </Select>

      <Select
        variant="unstyled"
        size="lg"
        w="150px"
        textStyle="headingSmall"
        cursor="pointer"
      >
        <option value="all grain">All Grain</option>

        <option value="extract">Extract</option>
        <option value="all">All</option>
      </Select>
      <Spacer />
      <HStack
        w="90px"
        cursor="pointer"
        justify="center"
        borderRadius="20px"
        color={sort === "new" ? "orange" : null}
        bg={sort === "new" ? "selected" : null}
        onClick={() => setSort("new")}
      >
        <MdFiberNew />
        <Text>New</Text>
      </HStack>
      <HStack
        w="90px"
        cursor="pointer"
        justify="center"
        borderRadius="20px"
        color={sort === "hot" ? "orange" : null}
        bg={sort === "hot" ? "selected" : null}
        onClick={() => setSort("hot")}
      >
        <RiFireLine />
        <Text>Hot</Text>
      </HStack>
      <HStack
        w="90px"
        cursor="pointer"
        justify="center"
        borderRadius="20px"
        color={sort === "best" ? "orange" : null}
        bg={sort === "best" ? "selected" : null}
        onClick={() => setSort("best")}
      >
        <RiTrophyLine />
        <Text>Best</Text>
      </HStack>
    </HStack>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <VStack
      maxW="950px"
      mx="auto"
      p="10px"
      spacing={1}
      bg="white"
      border="1px solid black"
      borderRadius="4px"
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
