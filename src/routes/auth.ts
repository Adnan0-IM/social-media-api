import { Router, type Response, type Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  console.log(user);

  if (!user)
    return res.status(401).json({ message: "Email or password is incorrect" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: "Email or password is incorrect" });

  const jwtSecret = config.JWT_SECRET || "blalbla";
  const token = jwt.sign({ userId: user._id }, jwtSecret);

  return res.json({ token });
});
