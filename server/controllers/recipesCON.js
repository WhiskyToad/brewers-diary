import mongoose from "mongoose";
import recipeSheet from "../models/recipeSheet.js";

export const recipeList = async (req, res) => {
  try {
    const recipes = await recipeSheet.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecipePost = async (req, res) => {
  const body = req.body;
  const newRecipe = new recipeSheet(body);
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const recipe = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("error: recipe not found");
  const updatedRecipe = await recipeSheet.findByIdAndUpdate(_id, recipe, {
    new: true,
  });
  res.json(updatedRecipe);
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    await recipeSheet.findByIdAndRemove(id);
  res.json({ message: "Recipe deleted successfuly" });
};
