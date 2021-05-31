import React, { useState } from "react";
import { Link as Router } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import {
  Spinner,
  HStack,
  VStack,
  Box,
  Text,
  Link,
  Spacer,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { RiFireLine, RiTrophyLine } from "react-icons/ri";
import { MdFiberNew } from "react-icons/md";

import RecipeCard from "./Card";

const Recipes = () => {
  const [sort, setSort] = useState("new");

  return (
    <>
      <SortSegment sort={sort} setSort={setSort} />
      <RecipeList />
    </>
  );
};

const SortSegment = ({ sort, setSort }) => {
  const mobileSortDisplay = () => {
    if (sort === "new") {
      return (
        <>
          <MdFiberNew />
          <Text>New</Text>
        </>
      );
    }
    if (sort === "hot") {
      return (
        <>
          <RiFireLine />
          <Text>Hot</Text>
        </>
      );
    }
    if (sort === "best") {
      return (
        <>
          <RiTrophyLine />
          <Text>Best</Text>
        </>
      );
    }
  };

  return (
    <HStack my="40px" className="center-card" textStyle="headingSmall">
      <HStack>
        <Select
          variant="unstyled"
          size="lg"
          w="120px"
          textStyle="headingSmall"
          cursor="pointer"
        >
          <option value="All Grain">All Styles</option>
          <option value="Extract">IPA</option>
        </Select>

        <Select
          variant="unstyled"
          size="lg"
          w="120px"
          textStyle="headingSmall"
          cursor="pointer"
        >
          <option value="all grain">All Grain</option>

          <option value="extract">Extract</option>
          <option value="all">All</option>
        </Select>
      </HStack>

      <Spacer />

      <HStack display={{ base: "none", md: "flex" }}>
        <HStack
          w="70px"
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
          w="70px"
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
          w="70px"
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

      {/* mobile display menu */}
      <Box display={{ base: "flex", md: "none" }}>
        <Popover>
          <PopoverTrigger>
            <HStack
              w="70px"
              cursor="pointer"
              justify="center"
              borderRadius="20px"
              bg="selected"
              color="orange"
            >
              {mobileSortDisplay()}
            </HStack>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack>
                <HStack
                  w="70px"
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
                  w="70px"
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
                  w="70px"
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
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </HStack>
  );
};

const RecipeList = () => {
  //fetches recipe data
  const RECIPE_LIST = gql`
    query {
      beerRecipeList {
        id
        title
        name
        description
        createdAt
        selectedFile
        method
        style
        targetABV
        rating
        votes
      }
    }
  `;

  const { loading, error, data } = useQuery(RECIPE_LIST);

  if (loading) return <Spinner size="xl" />;
  if (error) return <p>Error :(</p>;

  return (
    <VStack display={!data.beerRecipeList.length ? "none" : "flex"}>
      {data.beerRecipeList.map((recipe) => (
        <Link
          as={Router}
          key={recipe.id}
          to={`/recipes/view#${recipe.id}`}
          id="card-link"
        >
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </VStack>
  );
};
export default Recipes;
