import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Image, Text, HStack, VStack, Divider } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { deleteRecipe } from "../../actions/recipes";

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
      <Box>
        <Text color="black" fontSize="80px" textAlign="center">
          No Recipe Found
        </Text>
      </Box>
    </>
  ) : (
    <>
      <Box
        w="50%"
        mx="auto"
        my="100px"
        p="40px"
        color="black"
        bg="white"
        textAlign="center"
        border="1px solid black"
        boxShadow="l"
      >
        <Text textStyle="title">{recipe.title}</Text>
        <HStack mx="auto" align="flex-start">
          <Image w="50%" m="20px" src={recipe.selectedFile} />

          <VStack h="300px" mx="auto" justify="space-evenly">
            <HStack w="60%" justify="space-between">
              <Text textStyle="heading">{recipe.targetABV}%</Text>
              <Text textStyle="heading">{recipe.style}</Text>
              <Text textStyle="heading">{recipe.method}</Text>
              <a href={`../recipe/create?update#${recipe._id}`}>
                <EditIcon />
              </a>
              <DeleteIcon onClick={() => dispatch(deleteRecipe(recipe._id))} />
            </HStack>

            <Text textStyle="descriptive">{recipe.description}</Text>
          </VStack>
        </HStack>

        <HStack m="3%" justify="space-between" textStyle="descriptive">
          <VStack>
            <Text textStyle="headingSmall">Efficency</Text>
            <Text> %</Text>
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

        <HStack w="90%" mx="auto" my="20px">
          <Divider />
        </HStack>

        <HStack mx="auto" w="100%" justify="space-between" align="flex-start">
          <VStack justify="flex-start" h="100%">
            <Text textStyle="heading">Hops</Text>
            {recipe.hops.map((item, index) => (
              <HStack key={index}>
                <Text textStyle="descriptive">
                  {item.name} - {item.grams} grams
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack justify="flex-start">
            <Text textStyle="heading">Malts / Grains</Text>
            {recipe.malts.map((item, index) => (
              <HStack key={index}>
                <Text textStyle="descriptive">
                  {item.name} - {item.grams} grams
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack justify="flex-start">
            <Text textStyle="heading">Others</Text>
            <Text textStyle="descriptive">{recipe.yeast}</Text>
          </VStack>
        </HStack>

        <HStack w="90%" mx="auto" my="20px">
          <Divider />
        </HStack>

        <VStack textStyle="descriptive">
          <Text textStyle="headingLarge">The Mash</Text>

          <HStack w="40%" justify="space-evenly" mb="20px">
            <VStack>
              <Text textStyle="headingSmall">Temp</Text>
              <Text>{recipe.mashTemp} °C</Text>
            </VStack>
            <VStack>
              <Text textStyle="headingSmall">Strike Temp</Text>
              <Text>{recipe.strikeTemp} °C</Text>
            </VStack>
          </HStack>
          <Text textStyle="headingSmall">Mash Directions</Text>
          <Text>{recipe.mashDirections}</Text>
        </VStack>

        <HStack w="90%" mx="auto" my="20px">
          <Divider />
        </HStack>

        <VStack textStyle="descriptive">
          <Text textStyle="headingLarge">The Boil</Text>

          <HStack w="40%" justify="space-evenly" mb="20px">
            <VStack>
              <Text textStyle="headingSmall">Length</Text>
              <Text>{recipe.boilLength} minutes</Text>
            </VStack>
          </HStack>
          <Text textStyle="headingSmall">Boil Directions</Text>
          <Text>{recipe.boilDirections}</Text>
        </VStack>

        <HStack w="90%" mx="auto" my="20px">
          <Divider />
        </HStack>

        <VStack textStyle="descriptive">
          <Text textStyle="headingLarge">The Ferment</Text>

          <HStack w="40%" justify="space-evenly" mb="20px">
            <VStack>
              <Text textStyle="headingSmall">Temp</Text>
              <Text>{recipe.fermentTemp} °C</Text>
            </VStack>
            <VStack>
              <Text textStyle="headingSmall">length</Text>
              <Text>{recipe.fermentLength} °C</Text>
            </VStack>
          </HStack>
          <Text textStyle="headingSmall">Fermenting Directions</Text>
          <Text>{recipe.fermentDirections}</Text>
        </VStack>

        <HStack w="90%" mx="auto" my="20px">
          <Divider />
        </HStack>
        <VStack>
          <Text textStyle="headingSmall">Other Directions</Text>
          <Text>{recipe.otherDirections}</Text>
        </VStack>
      </Box>
    </>
  );
};

export default RecipeView;
