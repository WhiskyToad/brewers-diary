import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: "https://brewers-diary.herokuapp.com" });

const URL = "http://localhost:5000";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchRecipes = async () => {
  try {
    const res = await axios({
      url: `${URL}/recipes/beer`,
      method: "post",
      data: {
        query: `
       query {
          beerRecipeList{
            id
            title
            name
            description
            createdAt
            selectedFile
            method
            style
            targetABV
            rating
            votes
      }
     }
     `,
      },
    });
    return res.data.data.beerRecipeList;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchOneRecipe = async (recipeId) => {
  try {
    const res = await axios({
      url: `${URL}/recipes/beer`,
      method: "post",
      data: {
        query: `
       query recipe($id: ID!){
          oneRecipe(recipeId: $id){
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
     
     `,
        variables: { id: recipeId },
      },
    });
    return res.data.data.oneRecipe;
  } catch (error) {
    console.log(error);
  }
};
export const createRecipe = async (newRecipe) => {
  try {
    const res = await axios({
      url: `${URL}/recipes/beer`,
      method: "post",
      data: {
        query: `
       mutation recipe($id: ID!){
          oneRecipe(recipeId: $id){
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
     
     `,
        variables: {},
      },
    });
    return res.data.data.oneRecipe;
  } catch (error) {}
};
export const updateRecipe = (id, updatedRecipe) =>
  API.patch(`/recipes/${id}`, updatedRecipe);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const likeRecipe = (id, value) =>
  API.patch(`/recipes/${id}/like`, value);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
