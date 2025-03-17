import { USER } from "../model/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Generate token for authentication
const generateToken = async (userId, role) => { 
   return jwt.sign({ userId, role}, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register Service
export const registerService = async (name, email, password) => {
   const existingUser = await USER.findOne({ email });
   if (existingUser) {
      throw new Error("User already exists");
   }
   const hashPassword = await bcryptjs.hash(password, 10);
   
   const user = new USER({
      name,
      email,
      password: hashPassword
   });

   await user.save();
   return user;
};

// Login Service
export const loginService = async (email, password, res) => {
   const user = await USER.findOne({ email });
   if (!user) {
      throw new Error("User not found or invalid email");
   }

   const isPasswordValid = await bcryptjs.compare(password, user.password);
   if (!isPasswordValid) {
      throw new Error("Invalid Password");
   }

   const token = await generateToken(user._id, user.role);

   res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "production",
   });

   return { message: "Logged in successfully", token, user };
};
