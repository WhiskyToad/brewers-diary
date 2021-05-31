import express from "express";

import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
} from "../../controllers/beer/recipes/rest.js";
import graphql from "../../controllers/beer/recipes/graphql.js";

import auth from "../../middleware/auth.js";

const app = express();

const router = express.Router();

router.post("/graphql", graphql);

router.post("/", auth, createRecipe);
router.patch("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);
router.patch("/:id/like", auth, likeRecipe);

export default router;
