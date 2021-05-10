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
router.post("/", auth, createRecipe);
router.patch("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);
router.patch("/:id/like", auth, likeRecipe);

export default router;
