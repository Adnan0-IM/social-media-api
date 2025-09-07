import { Schema, model, type CallbackError } from "mongoose";
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

postSchema.pre("save", async function (next) {
  try {
    const result = await model("User").findByIdAndUpdate(
      this.author,
      { $push: { posts: this._id } },
      { new: true },
    );

    if (!result) {
      throw new Error(`User with ID ${this.author} not found`);
    }

    next();
  } catch (err) {
    console.error("Failed to update user with post reference:", err);
    next(err as CallbackError);
  }
});

export const Post = model("Post", postSchema);
