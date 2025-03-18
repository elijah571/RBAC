import { jest } from "@jest/globals"; // Ensure Jest globals are loaded
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../model/users/user.js";
import { app } from "../app.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Increase Jest timeout globally
jest.setTimeout(30000); // Jest timeout for async operations

let testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "TestPassword123*", // Ensure it matches the seeded password
};

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    await User.deleteMany(); // Clear users before seeding

    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Seed test user
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword, // Store hashed password
    });

    console.log("✅ Test user seeded successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}, 30000); // Explicit timeout for `beforeAll()`

afterAll(async () => {
  await mongoose.connection.close();
});

describe("🔹 Auth API Tests", () => {
  test("1️⃣ Should sign up a new user", async () => {
    const newUser = {
      name: "New Test User",
      email: "newuser@example.com",
      password: "password123*",
    };

    const res = await request(app).post("/api/auth/signup").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  test("2️⃣ Should log in with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password, // Use the correct password
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("3️⃣ Should reject login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "*1wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials"); // ✅ Fixed expected response
  });
});
