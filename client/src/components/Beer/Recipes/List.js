import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Spinner,
  HStack,
  VStack,
  Box,
  Text,
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
import { getOneRecipe } from "../../../actions/beer/recipes";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);
  const [sort, setSort] = useState("new");
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <SortSegment recipes={recipes} sort={sort} setSort={setSort} />
      <Box textAlign="center" display={!recipes.length ? "block" : "none"}>
        <Spinner size="xl" />
      </Box>
      <RecipeList
        recipes={recipes}
        getOneRecipe={getOneRecipe}
        dispatch={dispatch}
        history={history}
      />
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

const RecipeList = ({ recipes, getOneRecipe, dispatch, history }) => {
  //fetches full recipe data
  const getRecipe = (id) => {
    dispatch(getOneRecipe(id, history));
  };

  return (
    <VStack display={!recipes.length ? "none" : "flex"}>
      {recipes.map((recipe) => (
        // <Link
        //   as={Router}
        //   key={recipe.id}
        //   to={`/recipes/view#${recipe.id}`}
        //   id="card-link"
        // >
        <Box
          key={recipe.id}
          cursor="pointer"
          onClick={() => getRecipe(recipe.id)}
        >
          <RecipeCard recipe={recipe} />
        </Box>
        // </Link>
      ))}
    </VStack>
  );
};
export default Recipes;
