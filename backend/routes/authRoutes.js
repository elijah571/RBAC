import express from "express";
import { login, logOutUser, signup } from "../controller/authController.js";
export const authRoute = express.Router()

//SIGN UP USER
authRoute.post('/register', signup)
//lOGIN USER
authRoute.post('/login', login)
//LOG OUT USER
authRoute.post('/logout', logOutUser)