import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/connectDB.js";
import { userRouter } from "./routes/userRoute.js";
import { authRouter } from "./routes/authRoute.js";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//api 
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
connect()

