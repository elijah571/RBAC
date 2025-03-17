import { USER } from "../model/user.js";
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