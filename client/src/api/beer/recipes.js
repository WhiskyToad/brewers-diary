import axios from "axios";

const url = "http://localhost:5000/recipes";
// const url = "https://brewers-diary.herokuapp.com/recipes";

export const fetchRecipes = () => axios.get(url);
export const createRecipe = (newRecipe) => axios.post(url, newRecipe);
export const updateRecipe = (id, updatedRecipe) =>
  axios.patch(`${url}/${id}`, updatedRecipe);
export const deleteRecipe = (id) => axios.delete(`${url}/${id}`);
export const likeRecipe = (id, value) =>
  axios.patch(`${url}/${id}/like`, value);
