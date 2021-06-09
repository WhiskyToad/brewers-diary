import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import recipeSheet from "../../../models/beer/recipeSheet.js";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type recipe {
    id: ID
    selectedFile: String
    title: String
    style: String
    method: String
    description: String
    efficiency: Int
    batchSize: Int
    targetOG: Float
    targetFG: Float
    IBUs: Int
    targetABV: Float
    malts: [Malt]
    hops: [Hop]
    others: [String]
    yeast: String
    mashLength: Int
    mashTemp: Int
    mashDirections: String
    boilLength: Int
    boilDirections: String
    fermentTemp: Int
    fermentLength: Int
    fermentDirections: String
    otherDirections: String
    rating: Int
    votes: [ID]
    createdAt: String
    name: String
  }
  type Malt {
    name: String
    grams: Int
  }
  type Hop {
    name: String
    grams: Int
  }
  type Query {
    beerRecipeList: [recipe]
    oneRecipe(recipeId: ID!): recipe
  }
  input HopsInput{
    name: String
    grams: Int
  }
  input MaltsInput{
    name: String
    grams: Int
  }
  type Mutation {
    createRecipe
    (
      id: ID
      selectedFile: String
      title: String
      style: String
      method: String
      description: String
      efficiency: Int
      batchSize: Int
      targetOG: Float
      targetFG: Float
      IBUs: Int
      targetABV: Float
      malts: [MaltsInput]
      hops: [HopsInput]
      others: [String]
      yeast: String
      mashLength: Int
      mashTemp: Int
      mashDirections: String
      boilLength: Int
      boilDirections: String
      fermentTemp: Int
      fermentLength: Int
      fermentDirections: String
      otherDirections: String
    ): recipe!
    deleteRecipe(recipeId: ID!): String!
  }
`);

const resolvers = {
  beerRecipeList: async () => {
    try {
      const recipes = await recipeSheet.find();
      return recipes;
    } catch (error) {
      console.log(error);
    }
  },
  oneRecipe: async (args) => {
    try {
      const recipe = await recipeSheet.findById(args.recipeId);
      return recipe;
    } catch (error) {
      console.log(error);
    }
  },
  createRecipe: async (args) => {
    let creating = mongoose.Types.ObjectId.isValid(args.id);
    try {
      //if creating
      if (!creating) {
        const newRecipe = new recipeSheet({
          ...args,
          createdAt: new Date().toISOString(),
        });
        await newRecipe.save();
        return newRecipe;
      }
      //editing
      const updatedRecipe = await recipeSheet.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return updatedRecipe;
    } catch (error) {
      console.log(error);
    }
  },

  deleteRecipe: async (args) => {
    if (!mongoose.Types.ObjectId.isValid(args.recipeId)) {
      return "No recipe with that ID found";
    }
    await recipeSheet.findByIdAndRemove(args.recipeId);
    return "Recipe deleted succesfully";
  },
};

const graphql = graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
});

export default graphql;
