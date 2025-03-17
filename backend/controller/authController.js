import { registerService, loginService} from "../services/authServices.js";
export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
           return res.status(400).json({message: "All fields are required"})
        }
        const user  = await registerService(name, email, password)
        res.status(201).json({message: "User successfully created",
            email: user.email,
            name: user.name,
            role: user.role
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
   
}
// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await loginService(email, password, res);

       
        const { password: _, ...userData } = user._doc || user;

        return res.status(200).json({ message: "User Logged In successfully", user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
