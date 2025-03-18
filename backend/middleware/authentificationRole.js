// Admin has full access to everything, including Shipper routes
export const isAdmin = async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(403).json({ message: "User is not authenticated" });
    }

    if (user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next();
};

//  Only allow Shippers access and admin
export const isShipper = async (req, res, next) => {
    const user = req.user;

    if (user.role !== "Shipper" && user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next();
};

//  Only allow Carriers access and  Admins access
export const isCarrier = async (req, res, next) => {
    const user = req.user;

    if (user.role !== "Carrier" && user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next(); 
};
