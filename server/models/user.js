import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: { type: [String], default: [] },
  favourites: { type: [String], default: [] },
  diaries: { type: [String], default: [] },
  comments: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
