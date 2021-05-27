import {
  FETCH_ALL_RECIPES,
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  LIKE_RECIPE,
} from "../constants/actionTypes";

const reducer = (recipes = [], action) => {
  switch (action.type) {
    case FETCH_ALL_RECIPES:
      return action.payload;
    case CREATE_RECIPE:
      return [...recipes, action.payload];
    case UPDATE_RECIPE:
    case LIKE_RECIPE:
      return recipes.map((recipe) =>
        recipe.id === action.payload.id ? action.payload : recipe
      );
    case DELETE_RECIPE:
      return recipes.filter((recipe) => recipe._id !== action.payload);
    default:
      return recipes;
  }
};

export default reducer;
