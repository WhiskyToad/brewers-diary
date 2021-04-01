import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  selectedFile: String,
  title: String,
  style: String,
  method: String,
  description: String,
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
      minutes: Number,
      alphaAcids: Number,
      additionalInfo: String,
    },
  ],
  others: [],
  yeast: String,
  strikeTemp: Number,
  mashTemp: Number,
  mashDirections: String,
  boilLength: Number,
  boilDirections: String,
  fermentDirections: String,
  otherDirections: String,
  //creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const recipeSheet = mongoose.model("recipeSheet", recipeSchema);

export default recipeSheet;
