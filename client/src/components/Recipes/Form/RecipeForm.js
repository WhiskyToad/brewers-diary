import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { HStack, Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { createRecipe, updateRecipe } from "../../../actions/recipes";
import defaultRecipe from "../../Images/defaultRecipe.jpg";

import Title from "./Title";
import Ingredients from "./Ingredients";
import Stats from "./Stats";
import Directions from "./Directions";

const RecipeForm = () => {
  const dispatch = useDispatch();

  //checking to see if we are updating
  const recipeId = window.location.hash.substr(1);
  const recipe = useSelector((state) =>
    state.recipes.find((r) => r._id === recipeId)
  );

  // full recipe data
  const [recipeData, setRecipeData] = useState({
    selectedFile: defaultRecipe,
    title: "Recipe Title",
    method: "All Grain",
    style: "IPA",
    description: "Enter description",
    efficiency: 0,
    batchSize: 0,
    targetOG: 1.23,
    targetFG: 1.23,
    IBUs: 0,
    targetABV: 0,
    malts: [],
    hops: [],
    others: [],
    yeast: "Yeast Strain",
    mashLength: 0,
    mashTemp: 0,
    mashDirections: "Enter mash directions",
    boilLength: 0,
    boilDirections: "Enter boil directions",
    fermentTemp: 0,
    fermentLength: 0,
    fermentDirections: "Enter fermentation directions",
    otherDirections: "Enter other directions",
  });

  //populate for edit
  useEffect(() => {
    if (recipe !== undefined) setRecipeData(recipe);
  }, [recipe]);

  //submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeData.title.length > 30) {
      return alert("Title can only be 30 chars max");
    }
    if (recipe !== undefined) {
      dispatch(updateRecipe(recipeId, recipeData));
    } else {
      dispatch(createRecipe(recipeData));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Title recipeData={recipeData} setRecipeData={setRecipeData} />
        <Stats recipeData={recipeData} setRecipeData={setRecipeData} />
        <Ingredients recipeData={recipeData} setRecipeData={setRecipeData} />
        <Directions recipeData={recipeData} setRecipeData={setRecipeData} />
        <HStack justify="center">
          <Button
            type="submit"
            variant="outline"
            bg="white"
            textStyle="heading"
            h="50px"
          >
            SUBMIT
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default RecipeForm;
