import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { USER } from './model/user.js';
import { connectDB } from './config/dataBase.js';

dotenv.config();

const createAdmin = async () => {
    try {
        // Wait for database connection
        await connectDB();

        // Check if Admin already exists
        const adminExists = await USER.findOne({ email: "elijahfx43@gmail.com" });
        if (adminExists) {
            console.log('Admin user already exists.');
            mongoose.connection.close(); // Close connection if user exists
            return;
        }

        // Admin user details
        const hashedPassword = await bcrypt.hash('1234567890', 10);
        const adminUser = new USER({
            name: 'Elijah Peter',
            email: 'elijahfx43@gmail.com',
            password: hashedPassword,
            role: 'Admin',
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully.');

    } catch (error) {
        console.error('Error creating Admin user:', error);
    } finally {
        mongoose.connection.close(); // Ensure connection is closed after execution
    }
};

// Run the function
createAdmin();
