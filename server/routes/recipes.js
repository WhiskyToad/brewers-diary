import express from "express";

import {
  recipeList,
  createRecipePost,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipesCON.js";

const router = express.Router();

router.get("/", recipeList);
router.post("/", createRecipePost);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
