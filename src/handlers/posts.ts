import type { Response, Request } from "express";
import { validationResult } from "express-validator";
import { Post } from "../models/postModel.js";

export const createPost = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs", error: errors.array() });
  }

  const { title, description } = req.body;
  // Extract id from req.user (auth middleware)
  // as it represent author of the post
  const { _id } = req.user;

  // CreatPost
  try {
    const post = await Post.create({
      author: _id,
      title,
      description,
    });
    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: author } = req.user;
  try {
    const post = await Post.findOne({ _id: id, author });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    const deleted = await Post.findOneAndDelete({ _id: id, author });
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully", deleted });
  } catch (error) {
    console.log("Error deleting post", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username");

    const totalPosts = await Post.countDocuments({});

    res.status(200).json({
      success: true,
      message: "Fetched posts successfully",
      posts,
      pagination: {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil(totalPosts / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res
      .status(200)
      .json({ success: true, message: "Fetched post successfully", post });
  } catch (error) {
    console.log("Failed to fetch a post by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
