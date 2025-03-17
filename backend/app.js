import express from 'express';
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRoute } from './routes/authRoutes.js';
import { userRoute } from './routes/userRoute.js';
dotenv.config()
export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());
//apis 
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)