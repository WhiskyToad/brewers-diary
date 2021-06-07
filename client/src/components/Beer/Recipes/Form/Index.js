import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import { useHistory } from "react-router-dom";

import { HStack, Button } from "@chakra-ui/react";

import defaultRecipe from "../../../Images/defaultRecipe.jpg";

import Title from "./Title";
import Ingredients from "./Ingredients";
import Stats from "./Stats";
import Directions from "./Directions";

const RecipeForm = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  // full recipe data
  const [recipeData, setRecipeData] = useState({
    selectedFile: defaultRecipe,
    title: "",
    method: "All Grain",
    style: "IPA",
    description: "",
    efficiency: "",
    batchSize: "",
    targetOG: "",
    targetFG: "",
    IBUs: "",
    targetABV: "",
    malts: [],
    hops: [],
    others: [],
    yeast: "",
    mashLength: "",
    mashTemp: "",
    mashDirections: "",
    boilLength: "",
    boilDirections: "",
    fermentTemp: "",
    fermentLength: "",
    fermentDirections: "",
    otherDirections: "",
  });

  //recipe query
  const RECIPE = gql`
    query recipe($id: ID!) {
      oneRecipe(recipeId: $id) {
        id
        selectedFile
        title
        style
        method
        description
        efficiency
        batchSize
        targetOG
        targetFG
        IBUs
        targetABV
        malts {
          name
          grams
        }
        hops {
          name
          grams
        }
        others
        yeast
        mashLength
        mashTemp
        mashDirections
        boilLength
        boilDirections
        fermentTemp
        fermentLength
        fermentDirections
        otherDirections
        rating
        votes
        createdAt
        name
      }
    }
  `;

  const RECIPE_MUTATION = gql`
    mutation (
      $selectedFile: String
      $title: String
      $style: String
      $method: String
      $description: String
      $efficiency: Int
      $batchSize: Int
      $targetOG: Float
      $targetFG: Float
      $IBUs: Int
      $targetABV: Float
      $malts: [MaltsInput]
      $hops: [HopsInput]
      $others: [String]
      $yeast: String
      $mashLength: Int
      $mashTemp: Int
      $mashDirections: String
      $boilLength: Int
      $boilDirections: String
      $fermentTemp: Int
      $fermentLength: Int
      $fermentDirections: String
      $otherDirections: String
    ) {
      createRecipe(
        selectedFile: $selectedFile
        title: $title
        style: $style
        method: $method
        description: $description
        efficiency: $efficiency
        batchSize: $batchSize
        targetOG: $targetOG
        targetFG: $targetFG
        IBUs: $IBUs
        targetABV: $targetABV
        malts: $malts
        hops: $hops
        others: $others
        yeast: $yeast
        mashLength: $mashLength
        mashTemp: $mashTemp
        mashDirections: $mashDirections
        boilLength: $boilLength
        boilDirections: $boilDirections
        fermentTemp: $fermentTemp
        fermentLength: $fermentLength
        fermentDirections: $fermentDirections
        otherDirections: $otherDirections
      ) {
        selectedFile
        title
        style
        method
        description
        efficiency
        batchSize
        targetOG
        targetFG
        IBUs
        targetABV
        malts {
          name
          grams
        }
        hops {
          name
          grams
        }
        others
        yeast
        mashLength
        mashTemp
        mashDirections
        boilLength
        boilDirections
        fermentTemp
        fermentLength
        fermentDirections
        otherDirections
      }
    }
  `;

  //get recipe id from url and load recipe
  const recipeId = window.location.hash.substr(1);
  // const { loading, error, data } = useQuery(RECIPE, {
  //   variables: { id: recipeId },
  // });

  const [createRecipe, { data }] = useMutation(RECIPE_MUTATION);
  //submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeData.title.length > 30) {
      return alert("Title can only be 30 chars max");
    }
    createRecipe({
      variables: {
        selectedFile: recipeData.selectedFile,
        title: recipeData.title,
        style: recipeData.style,
        method: recipeData.method,
        description: recipeData.description,
        efficiency: parseInt(recipeData.efficiency),
        batchSize: parseInt(recipeData.batchSize),
        targetOG: parseFloat(recipeData.targetOG),
        targetFG: parseFloat(recipeData.targetFG),
        IBUs: parseInt(recipeData.IBUs),
        targetABV: parseFloat(recipeData.targetABV),
        malts: recipeData.malts,
        hops: recipeData.hops,
        others: recipeData.others,
        yeast: recipeData.yeast,
        mashLength: parseInt(recipeData.mashLength),
        mashTemp: parseInt(recipeData.mashTemp),
        mashDirections: recipeData.mashDirections,
        boilLength: parseInt(recipeData.boilLength),
        boilDirections: recipeData.boilDirections,
        fermentTemp: parseInt(recipeData.fermentTemp),
        fermentLength: parseInt(recipeData.fermentLength),
        fermentDirections: recipeData.fermentDirections,
        otherDirections: recipeData.otherDirections,
      },
    });
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
