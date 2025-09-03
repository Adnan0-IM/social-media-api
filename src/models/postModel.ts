import { Schema, model } from "mongoose";
const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre("save", async function () {
  try {
    // Find the user document and update its posts array with the new post
    await model("User").findByIdAndUpdate(
      this.author,
      { $push: { posts: this._id } },
      { new: true },
    );
  } catch (err) {
    console.error(err);
  }
});

export const Post = model("Post", postSchema);
