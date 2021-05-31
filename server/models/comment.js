import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: { type: String, required: true },
  creatorId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comment: { type: String, required: true },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
});

export default mongoose.model("Comment", commentSchema);
