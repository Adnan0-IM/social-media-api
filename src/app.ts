import express from "express";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/userRoute.js";
import { authRouter } from "./routes/auth.js";
import config from "./config/config.js";
import cors from "cors";

const PORT = config.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success: true, message: "Api is running" });
});

app.use("/api", userRouter);
app.use("/api", authRouter);

// Connect to the database when the app initializes
connectDB()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Only start the server in development
if (config.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
