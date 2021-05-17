import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as Router } from "react-router-dom";

import {
  Link,
  Spinner,
  HStack,
  VStack,
  Box,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import { RiFireLine, RiTrophyLine } from "react-icons/ri";
import { MdFiberNew } from "react-icons/md";

import RecipeCard from "./Card";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);
  const [sort, setSort] = useState("new");

  return (
    <>
      <SortSegment recipes={recipes} sort={sort} setSort={setSort} />
      <Box textAlign="center" display={!recipes.length ? "block" : "none"}>
        <Spinner size="xl" />
      </Box>
      <RecipeList recipes={recipes} />
    </>
  );
};

const SortSegment = ({ sort, setSort }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <HStack
      my="40px"
      className="center-card"
      textStyle="headingSmall"
      justify="space-between"
      wrap="wrap"
    >
      <HStack>
        <Select
          variant="unstyled"
          size="lg"
          w={["100px", "100px", "100px", "110px"]}
          textStyle="headingSmall"
          cursor="pointer"
        >
          <option value="All Grain">All Styles</option>
          <option value="Extract">IPA</option>
        </Select>

        <Select
          variant="unstyled"
          size="lg"
          w={["100px", "100px", "100px", "110px"]}
          textStyle="headingSmall"
          cursor="pointer"
        >
          <option value="all grain">All Grain</option>

          <option value="extract">Extract</option>
          <option value="all">All</option>
        </Select>
      </HStack>
      {user != null && (
        <Link as={Router} to="/recipe/create">
          <Button textStyle="headingSmall">Create New</Button>
        </Link>
      )}
      <HStack>
        <HStack
          w={["60px", "60px", "90px", "70px"]}
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
          w={["60px", "60px", "90px", "70px"]}
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
          w={["60px", "60px", "90px", "70px"]}
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
    </HStack>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <VStack display={!recipes.length ? "none" : "flex"}>
      {recipes.map((recipe) => (
        <Link
          as={Router}
          key={recipe._id}
          to={`/recipes/view#${recipe._id}`}
          id="card-link"
        >
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </VStack>
  );
};
export default Recipes;
