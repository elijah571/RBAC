import { allUserServices } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await allUserServices();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
};
