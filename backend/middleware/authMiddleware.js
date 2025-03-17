import jwt from 'jsonwebtoken'
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
       
        req.user = { _id: decoded.userId, role: decoded.role };

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
};
