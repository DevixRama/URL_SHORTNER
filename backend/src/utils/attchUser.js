import { verifyToken } from "./helper.js"
import { findUserById } from "../dao/user.dao.js"



export const attchUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next()

    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded.id)
        req.user = user
    } catch (error) {
        console.log(error);
    }
    next()
}


