import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Shipper", "Carrier", "user"],
        default: "user"
    }

}, {timestamps: true});

export const USER = mongoose.model('USER', userSchema)