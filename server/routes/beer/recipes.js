import express from "express";

import {
  recipeList,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../controllers/beer/recipes.js";

import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/", recipeList);
router.post("/", createRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
