import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleAuth.js";
import { getAllUsers } from "../controller/userController.js";
export const userRoute = express.Router()

//Get all users
userRoute.get("/", protectedRoute, isAdmin, getAllUsers)