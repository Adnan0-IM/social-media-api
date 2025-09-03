import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed to create new user",
      error: error,
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ success: true, message: "Fetched users successfully", users });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Failed to fetch users", error });
  }
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res
      .status(200)
      .json({ success: true, message: "Fetched user successfully", user });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: "Failed to fetch user", error });
  }
};
