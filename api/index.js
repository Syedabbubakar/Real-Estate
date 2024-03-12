import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
// import bodyParser from "body-parser";
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const MONGO_URL = process.env.MONGO_URI + process.env.MONGO_NAME

connectDB(MONGO_URL)
app.listen(3000, () => {
  console.log(`Server is running on port 3000!`);
});

