import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { check } from "express-validator";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from "../handlers/posts.js";

export const postRouter = Router();

postRouter.use(auth);
postRouter.post(
  "/posts",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  createPost,
);
postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPost);
postRouter.delete("/posts/:id", deletePost);
