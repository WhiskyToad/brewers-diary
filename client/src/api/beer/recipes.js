import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://brewers-diary.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchRecipes = () => API.get("/recipes");
export const createRecipe = (newRecipe) => API.post("/recipes", newRecipe);
export const updateRecipe = (id, updatedRecipe) =>
  API.patch(`/recipes/${id}`, updatedRecipe);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const likeRecipe = (id, value) =>
  API.patch(`/recipes/${id}/like`, value);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
