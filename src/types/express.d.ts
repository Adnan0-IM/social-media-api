import { User } from "../models/userModel.ts";
declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property, make it optional
    }
  }
}
