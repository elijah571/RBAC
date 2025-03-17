import { USER } from "../model/user.js";

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "Invalid request, user not authenticated" });
        }

        const user = await USER.findById(req.user._id).select("role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
