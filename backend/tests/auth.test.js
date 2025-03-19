import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../model/users/user.js";
import { app } from "../app.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Increase Jest timeout globally
jest.setTimeout(30000);
let testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "TestPassword123*",
};

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    await User.deleteMany(); 


    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Seed test user
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword, 
    });

    console.log("Test user seeded successfully.");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
}, 30000); 

afterAll(async () => {
  await mongoose.connection.close();
});

describe(" Auth API Tests", () => {
  test("1 Should sign up a new user", async () => {
    const newUser = {
      name: "New Test User",
      email: "newuser@example.com",
      password: "Str0ngP@ssw0rd!",
    };
  
    const res = await request(app).post("/api/auth/signup").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User successfully created. Check your email for verification.");
  });
  
  test("2 Should log in with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password, 
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("3 Should reject login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "*1wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });
});
