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
    efficiency: 0,
    batchSize: 0,
    targetOG: 1.23,
    targetFG: 1.23,
    IBUs: 0,
    targetABV: 0,
    malts: [],
    hops: [],
    others: [],
    yeast: "",
    mashLength: 0,
    mashTemp: 0,
    mashDirections: "",
    boilLength: 0,
    boilDirections: "",
    fermentTemp: 0,
    fermentLength: 0,
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
        efficiency: recipeData.efficiency,
        batchSize: recipeData.batchSize,
        targetOG: recipeData.targetOG,
        targetFG: recipeData.targetFG,
        IBUs: recipeData.IBUs,
        targetABV: recipeData.targetABV,
        malts: recipeData.malts,
        hops: recipeData.hops,
        others: recipeData.others,
        yeast: recipeData.yeast,
        mashLength: recipeData.mashLength,
        mashTemp: recipeData.mashTemp,
        mashDirections: recipeData.mashDirections,
        boilLength: recipeData.boilLength,
        boilDirections: recipeData.boilDirections,
        fermentTemp: recipeData.fermentTemp,
        fermentLength: recipeData.fermentLength,
        fermentDirections: recipeData.fermentDirections,
        otherDirections: recipeData.otherDirections,
      },
    });
  };

  // const RECIPE_MUTATION = gql`
  //   mutation (
  //     $selectedFile: String
  //     $title: String
  //     $style: String
  //     $method: String
  //     $description: String
  //     $efficiency: Int
  //     $batchSize: Int
  //     $targetOG: Float
  //     $targetFG: Float
  //     $IBUs: Int
  //     $targetABV: Float
  //     $malts: [MaltsInput]
  //     $hops: [HopsInput]
  //     $others: [String]
  //     $yeast: String
  //     $mashLength: Int
  //     $mashTemp: Int
  //     $mashDirections: String
  //     $boilLength: Int
  //     $boilDirections: String
  //     $fermentTemp: Int
  //     $fermentLength: Int
  //     $fermentDirections: String
  //     $otherDirections: String
  //   ) {
  //     createRecipe(
  //       selectedFile: ${recipeData.selectedFile},
  //       title: ${recipeData.title},
  //       style: ${recipeData.style},
  //       method: ${recipeData.method},
  //       description: ${recipeData.description},
  //       efficiency: ${recipeData.efficiency},
  //       batchSize: ${recipeData.batchSize},
  //       targetOG: ${recipeData.targetOG},
  //       targetFG: ${recipeData.targetFG},
  //       IBUs: ${recipeData.IBUs},
  //       targetABV: ${recipeData.targetABV},
  //       malts: ${recipeData.malts},
  //       hops: ${recipeData.hops},
  //       others: ${recipeData.others},
  //       yeast: ${recipeData.yeast},
  //       mashLength: ${recipeData.mashLength},
  //       mashTemp: ${recipeData.mashTemp},
  //       mashDirections: ${recipeData.mashDirections},
  //       boilLength: ${recipeData.boilLength},
  //       boilDirections: ${recipeData.boilDirections},
  //       fermentTemp: ${recipeData.fermentTemp},
  //       fermentLength: ${recipeData.fermentLength},
  //       fermentDirections: ${recipeData.fermentDirections},
  //       otherDirections: ${recipeData.otherDirections},
  //     ) {
  //       selectedFile
  //       title
  //       style
  //       method
  //       description
  //       efficiency
  //       batchSize
  //       targetOG
  //       targetFG
  //       IBUs
  //       targetABV
  //       malts {
  //         name
  //         grams
  //       }
  //       hops {
  //         name
  //         grams
  //       }
  //       others
  //       yeast
  //       mashLength
  //       mashTemp
  //       mashDirections
  //       boilLength
  //       boilDirections
  //       fermentTemp
  //       fermentLength
  //       fermentDirections
  //       otherDirections
  //     }
  //   }
  // `;

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
