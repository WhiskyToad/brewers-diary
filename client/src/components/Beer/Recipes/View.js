import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ReactStars from "react-rating-stars-component";
import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Spacer,
  Flex,
  Spinner,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  FaPinterest,
  FaFacebook,
  FaTwitter,
  FaRegBookmark,
} from "react-icons/fa";

import { deleteRecipe, likeRecipe } from "../../../actions/beer/recipes";

const RecipeView = () => {
  const dispatch = useDispatch();

  //get recipe id from url and load recipe
  const recipeId = window.location.hash.substr(1);
  const recipe = useSelector((state) =>
    state.recipes.find((r) => r._id === recipeId)
  );

  //ensure recipe is found
  return recipe === undefined ? (
    <>
      <Box mt="50%" textAlign="center">
        <Spinner size="xl" />
      </Box>
    </>
  ) : (
    <>
      <Title recipe={recipe} dispatch={dispatch} />
      <Stats recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Mash recipe={recipe} />
      <Boil recipe={recipe} />
      <Ferment recipe={recipe} />
      <Other recipe={recipe} />
    </>
  );
};

const Title = ({ recipe, dispatch }) => {
  const id = recipe._id;
  const user = JSON.parse(localStorage.getItem("profile"));

  // sending rating
  const ratingChanged = (newRating) => {
    dispatch(likeRecipe(id, newRating));
  };
  return (
    <VStack className="center-card">
      <Text textStyle="heading">{recipe.title}</Text>
      <HStack
        w="100%"
        alignSelf="center"
        borderRadius="lg"
        overflow="hidden"
        textStyle="descriptiveSmall"
      >
        <HStack w="90%" mx="auto" align="flex-start" justify="space-between">
          <Flex w="50%" h="275px" justify="center">
            <Image
              h="250px"
              borderRadius="10px"
              fit="cover"
              src={recipe.selectedFile}
            />
          </Flex>
          <VStack w="50%" m="10px" textAlign="center" spacing={4}>
            {(user?.result?.googleId === recipe?.creator ||
              user?.result?._id === recipe?.creator) && (
              <HStack
                w={["40%", "40%", "20%", "20%"]}
                justify="space-between"
                fontSize="20px"
              >
                <a href={`../recipe/create?update#${recipe._id}`}>
                  <EditIcon />
                </a>
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => dispatch(deleteRecipe(recipe._id))}
                />
              </HStack>
            )}
            <HStack
              w={["100%", "100%", "50%", "50%"]}
              justify="space-evenly"
              textStyle="headingSmall"
            >
              <Text>{recipe.targetABV}%</Text>
              <Text>{recipe.style}</Text>
              <Text>{recipe.method}</Text>
            </HStack>

            <Text px="15px" textStyle="descriptive">
              {recipe.description}
            </Text>
            <Spacer />
            <HStack
              w={["80%", "80%", "60%", "60%"]}
              justify="space-between"
              fontSize="30px"
            >
              <FaPinterest color="#e60023" cursor="pointer" />
              <FaFacebook color="#4495d4" cursor="pointer" />
              <FaTwitter color="#1da1f2" cursor="pointer" />
              <FaRegBookmark color="gold" cursor="pointer" />
            </HStack>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              activeColor="#ffd700"
            />
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

const Stats = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Stats</Text>
      <HStack w="100%" justify="space-evenly" textStyle="descriptive">
        <VStack>
          <Text textStyle="headingSmall">Efficency</Text>
          <Text>{recipe.efficiency} %</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">Batch Size</Text>
          <Text>{recipe.batchSize} litres</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">OG</Text>
          <Text>{recipe.targetOG}</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">FG</Text>
          <Text>{recipe.targetFG}</Text>
        </VStack>

        <VStack>
          <Text textStyle="headingSmall">IBUs</Text>
          <Text>{recipe.IBUs}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

const Ingredients = ({ recipe }) => {
  return (
    <VStack className="center-card">
      <Text textStyle="heading">Ingredients</Text>
      <HStack w="100%" justify="space-between" align="flex-start">
        <VStack h="100%" w="33%">
          <Text textStyle="headingSmall">Hops</Text>
          {recipe.hops.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack w="33%">
          <Text textStyle="headingSmall">Malts / Grains</Text>
          {recipe.malts.map((item, index) => (
            <HStack key={index}>
              <Text textStyle="descriptive">
                {item.name} - {item.grams} grams
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack w="33%">
          <Text textStyle="headingSmall">Others</Text>
          <Text textStyle="descriptive">{recipe.yeast}</Text>
          {recipe.others.map((item, index) => (
            <Text textStyle="descriptive" key={index}>
              {item}
            </Text>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
};

const Mash = ({ recipe }) => {
  return (
    <VStack className="center-card" textStyle="descriptive">
      <Text textStyle="heading">The Mash</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <Text>{recipe.mashTemp} °C</Text>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <Text>{recipe.mashLength} mins</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Mash Directions</Text>
      <Text>{recipe.mashDirections}</Text>
    </VStack>
  );
};

const Boil = ({ recipe }) => {
  return (
    <VStack className="center-card" textStyle="descriptive">
      <Text textStyle="heading">The Boil</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Length</Text>
          <Text>{recipe.boilLength} minutes</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Boil Directions</Text>
      <Text>{recipe.boilDirections}</Text>
    </VStack>
  );
};

const Ferment = ({ recipe }) => {
  return (
    <VStack className="center-card" textStyle="descriptive">
      <Text textStyle="heading">The Ferment</Text>

      <HStack w="40%" justify="space-evenly" mb="20px">
        <VStack>
          <Text textStyle="headingSmall">Temp</Text>
          <Text>{recipe.fermentTemp} °C</Text>
        </VStack>
        <VStack>
          <Text textStyle="headingSmall">length</Text>
          <Text>{recipe.fermentLength} days</Text>
        </VStack>
      </HStack>
      <Text textStyle="headingSmall">Fermenting Directions</Text>
      <Text>{recipe.fermentDirections}</Text>
    </VStack>
  );
};

const Other = ({ recipe }) => {
  return (
    <VStack className="center-card" textStyle="descriptive">
      <Text textStyle="heading">Other Directions</Text>
      <Text>{recipe.otherDirections}</Text>
    </VStack>
  );
};

export default RecipeView;
