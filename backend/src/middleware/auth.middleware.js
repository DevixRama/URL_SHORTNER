import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";



export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verifyToken(token);
    const userId = decoded.id;
    if (!userId) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const user = await findUserById(userId)

    req.user = user;

    next();
};
