import {
  FETCH_ALL_RECIPES,
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from "../constants/actionTypes";
import * as api from "../api";

//action creators

export const getRecipes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipes();
    dispatch({ type: FETCH_ALL_RECIPES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRecipe = (recipe) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipe);
    dispatch({ type: CREATE_RECIPE, payload: data });
    window.location.href = `../../recipes/view#${data._id}`;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, recipe) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, recipe);
    dispatch({ type: UPDATE_RECIPE, payload: data });
    window.location.href = `../../recipes/view#${id}`;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);
    dispatch({ type: DELETE_RECIPE, payload: id });
    window.location.href = `../../recipes`;
  } catch (error) {
    console.log(error);
  }
};
