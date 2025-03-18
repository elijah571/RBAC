import { allUserServices, deleteAccountService, singleUser, updateProfile, updateRole } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await allUserServices();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
};
//Get a single User
export const getSingleUser = async (req, res) => {
    const userId = req.params.userId;
    const reqUser =req.user._id.toString();
    try {
        const user = await singleUser(userId, reqUser);
        res.status(200).json({success:true, user})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
}
//update user profile
export const updateUserProfile = async (req, res) => {
    const userId = req.params.userId;
    const reqUser = req.user._id.toString();
    const {name, email, password} = req.body;
    try {
        const  updateUser = updateProfile(userId, reqUser, name, password, email);
        res.status(201).json({message: "user successfully updated"})
    } catch (error) {
        
    }
}
//update role
export const updateUserRole = async (req, res) => {
    const userId = req.params.userId;
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ message: "Role is required" });
    }

    try {
        const updatedUser = await updateRole(userId, role);
        return res.status(200).json({ 
            message: "User role updated successfully", 
            updatedUser 
        });
    } catch (error) {
        console.error("Error updating user role:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
// Delete user controller
export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deleted = await deleteAccountService(userId);
        return res.status(200).json(deleted);
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

