import { USER } from "../model/user.js";
import bcrypt from "bcryptjs";
//get all users
export  const allUserServices = async() => {
    try {
        const users = await USER.find().select("-password"); 
        return users
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
   
}
//sigle user
export const singleUser = async (userId, reqUser) => {
    try {
        const user = await USER.findById(userId).select("-password")
        if (!user) {
            throw new Error("User not found")
    
        }
        if (reqUser !== user._id.toString()) {
            throw new Error("Unauthorized User access")
        }
        return user
    } catch (error) {
        console.error("Error fetching single user:", error);
        throw new Error("Failed to fetch user");
    }
   
}
// update user profile
export const updateProfile = async (userId, reqUser, name, email, password) => {
    try {
        const user = await USER.findById(userId)
        if (!user) {
            throw new Error("User not found");
        }
        if (reqUser !== user._id.toString()) {
            throw new Error("User not authorized")
        }
        if(name) user.name = name;
        if(email) user.email = email;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
        }
        await user.save();
        return ({
            _id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        console.error("Error updating profile:", error.message);
        throw new Error(error.message);
    }
}
// update user role as admin
export const updateRole = async (userId, role) => {
    try {
        const user = await USER.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        
        if (role) {
            user.role = role;
        }

        await user.save();

        return {
            _id: user._id,
            role: user.role
        };
    } catch (error) {
        console.error("Error updating role:", error.message);
        throw new Error(error.message);
    }
};
// Deleting a user
export const deleteAccountService = async (userId) => {
    try {
        const user = await USER.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        await user.deleteOne();

        return { message: "User account deleted successfully" };
    } catch (error) {
        console.error("Error deleting user:", error.message);
        throw new Error(error.message);
    }
};

