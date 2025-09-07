import express from "express";
import type { Request, Response } from "express";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import config from "./config/config.js";
import cors from "cors";
import { postRouter } from "./routes/posts.js";

const PORT = config.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send({ success: true, message: "Api is running" });
});

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);

connectDB()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

if (config.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
