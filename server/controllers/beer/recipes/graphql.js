import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
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
    grams: String
  }
  input MaltsInput{
    name: String
    grams: String
  }
  type Mutation {
    createRecipe
    (
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
    const newRecipe = new recipeSheet({
      ...args,
      createdAt: new Date().toISOString(),
    });
    try {
      await newRecipe.save();
      return newRecipe;
    } catch (error) {
      console.log(error);
    }
  },
};

const graphql = graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
});

export default graphql;
