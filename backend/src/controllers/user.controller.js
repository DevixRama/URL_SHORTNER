import { findAllUserUrls } from "../dao/user.dao.js"


export const getUserAllUrls = async (req, res) => {
    console.log(req.user);
    
    const { _id } = req.user

    const urls = await findAllUserUrls(_id)
    res.status(200).json({success: true, message: "fetched All urls", urls })
}