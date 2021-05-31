import {
  FETCH_ALL_RECIPES,
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  LIKE_RECIPE,
} from "../../constants/actionTypes";
import * as api from "../../api/beer/recipes";

//action creators

export const getRecipes = () => async (dispatch) => {
  try {
    const data = await api.fetchRecipes();
    dispatch({ type: FETCH_ALL_RECIPES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOneRecipe = (id, router) => async (dispatch) => {
  try {
    const data = await api.fetchOneRecipe(id);
    dispatch({ type: UPDATE_RECIPE, payload: data });
    router.push(`/recipes/view#${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe = (recipe, router) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipe);
    dispatch({ type: CREATE_RECIPE, payload: data });
    router.push(`/recipes/view#${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, recipe, router) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, recipe);
    dispatch({ type: UPDATE_RECIPE, payload: data });
    router.push(`/recipes/view#${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (id, router) => async (dispatch) => {
  try {
    console.log("delete");
    await api.deleteRecipe(id);
    dispatch({ type: DELETE_RECIPE, payload: id });
    router.push("/recipes");
  } catch (error) {
    console.log(error);
  }
};

export const likeRecipe = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.likeRecipe(id, { value: value });
    dispatch({ type: LIKE_RECIPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
