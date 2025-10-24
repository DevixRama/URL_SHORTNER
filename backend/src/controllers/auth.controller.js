
import { cookiesOption } from "../config/config.js";
import { verifyUserCredentials, registerUserWithToken } from "../services/auth.service.js";


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const { token, user } = await registerUserWithToken(username, email, password);
    // req.user = user
    res.cookie("token", token, cookiesOption);
    return res.status(201).json({success: true, message: "User registered successfully", token, user });
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const { token, user } = await verifyUserCredentials(email, password);
    if (!token) { return res.status(400).json({ message: "Invalid credentials" }); }

    res.cookie("token", token, cookiesOption);

    return res.status(200).json({success: true, message: "Login successful", user, token });
};


export const logoutUser = (req, res) => {
    res.clearCookie('token', cookiesOption)
    res.status(200).json({ success:true, message: 'logout success' })
}


export const getCurrentUser = (req, res) => {
    res.status(200).json({success: true, user: req.user })
}