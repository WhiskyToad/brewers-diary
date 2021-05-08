import express from "express";

import {
  recipeList,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
} from "../../controllers/beer/recipes.js";

import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/", recipeList);
router.post("/", createRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.patch("/:id/like", likeRecipe);

export default router;
