import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config/config.js";
import { User } from "../models/userModel.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Unauthorized" });

  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const jwtSecret = config.JWT_SECRET || "blabla";
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(400).json({ message: "User does not exist" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};
