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
    // Get pagination parameters from query string with defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get total count for calculating total pages
    const totalUsers = await User.countDocuments();

    // Get paginated users
    const users = await User.find().skip(skip).limit(limit).select("-password"); // Exclude sensitive data

    return res.status(200).json({
      success: true,
      message: "Fetched users successfully",
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil(totalUsers / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error,
    });
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
