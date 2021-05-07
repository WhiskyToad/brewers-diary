import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  selectedFile: String,
  title: String,
  style: String,
  method: String,
  description: String,
  efficiency: Number,
  batchSize: Number,
  targetOG: Number,
  targetFG: Number,
  IBUs: Number,
  targetABV: Number,
  malts: [
    {
      name: String,
      grams: Number,
    },
  ],
  hops: [
    {
      name: String,
      grams: Number,
    },
  ],
  others: [],
  yeast: String,
  mashLength: Number,
  mashTemp: Number,
  mashDirections: String,
  boilLength: Number,
  boilDirections: String,
  fermentTemp: Number,
  fermentLength: Number,
  fermentDirections: String,
  otherDirections: String,
  rating: { total: Number, votes: Number },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const recipeSheet = mongoose.model("recipeSheet", recipeSchema);

export default recipeSheet;
