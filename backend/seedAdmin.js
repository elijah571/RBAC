import { connect } from './config/connectDB.js';
import bcrypt from 'bcryptjs';
import { User } from './model/users/user.js'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from a .env file
dotenv.config();

// Connect to the MongoDB database
connect();
// Create an Admin user and save it to the database
const createAdmin = async () => {
    try {
        // Check if Admin already exist
        const adminExists = await User.findOne({ email: "elijahfx43@gmail.com"});
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        // Admin user details
        const adminUser = new User({
            name: 'Elijah Peter',
            email: 'elijahfx43@gmail.com',
            password: await bcrypt.hash('1234567890Pe*', 10), 
            role: 'Admin', 
            isVerified: true,
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully.');
        mongoose.connection.close(); 
    } catch (error) {
        console.error('Error creating Admin user:', error);
        mongoose.connection.close();
    }
};

// Run the function to create the admin
createAdmin();
