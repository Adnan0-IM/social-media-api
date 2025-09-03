import { Router } from "express";
import { createUser, getUser, getUsers } from "../handlers/userHandler.js";

export const userRouter = Router();

userRouter.get("/user", getUsers);
userRouter.post("/register", createUser);
userRouter.get("/:id", getUser);
