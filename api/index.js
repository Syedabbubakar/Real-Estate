import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import listingRouter from "./routes/listingRoute.js";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URI + process.env.MONGO_NAME

const _dirname = path.resolve()

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB(MONGO_URL)

app.listen(PORT, () => {
  console.log(`Server is running on port 3000!`);
});

