import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Spinner } from "@chakra-ui/react";

import RecipeForm from "../components/Beer/Recipes/Form/Index";

const EditRecipe = () => {
  // get recipe id from url and load recipe
  const recipeId = window.location.hash.substr(1);
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id: recipeId },
  });

  if (loading) return <Spinner size="xl" />;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <RecipeForm edit={data.oneRecipe} />
    </>
  );
};

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

export default EditRecipe;
