import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleAuth.js";
import { deleteUser, getAllUsers, getSingleUser, updateUserProfile, updateUserRole } from "../controller/userController.js";
export const userRoute = express.Router()

//Get all users
userRoute.get("/", protectedRoute, isAdmin, getAllUsers);
//Get a single user
userRoute.get("/:userId", protectedRoute, getSingleUser);
//update profile
userRoute.put('/:userId', protectedRoute, updateUserProfile);
//update User role as admin
userRoute.put('/role/:userId', protectedRoute, isAdmin, updateUserRole);
// delete user  by addmin
userRoute.delete('/delete/:userId', protectedRoute, isAdmin, deleteUser)