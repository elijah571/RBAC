import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/connectDB.js";
import { userRoute } from "./routes/userRoute.js";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});
//api 
app.use('/api/user', userRoute)
connect()
