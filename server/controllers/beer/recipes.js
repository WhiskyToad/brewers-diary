import mongoose from "mongoose";
import recipeSheet from "../../models/beer/recipeSheet.js";

export const recipeList = async (req, res) => {
  try {
    const recipes = await recipeSheet.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new recipeSheet({
    ...recipe,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("error: recipe not found");
  const updatedRecipe = await recipeSheet.findByIdAndUpdate(id, recipe, {
    new: true,
  });
  res.json(updatedRecipe);
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await recipeSheet.findByIdAndRemove(id);
  res.json({ message: "Recipe deleted successfuly" });
};

export const likeRecipe = async (req, res) => {
  const { id } = req.params;
  const value = req.body.value;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const recipe = await recipeSheet.findById(id);

  const index = recipe.votes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    recipe.votes.push(req.userId);
    recipe.rating = recipe.rating + value;
  } else {
    return res.json({ message: "You have already rated this recipe." });
  }

  const updatedRecipe = await recipeSheet.findByIdAndUpdate(id, recipe, {
    new: true,
  });
  res.json(updatedRecipe);
};
