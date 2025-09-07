import { Router } from "express";
import { createUser, getUser, getUsers } from "../handlers/users.js";
import { auth } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.get("/users", auth, getUsers);
userRouter.get("/users/:id", auth, getUser);
userRouter.post("/register", createUser);
