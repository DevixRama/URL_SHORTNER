import { findUserByEmail, createUser } from "../dao/user.dao.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/helper.js";




export const verifyUserCredentials = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) throw new Error("invalid username or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid username or password");
    const token = signToken({ id: user._id });
    return { token, user };

};


export const registerUserWithToken = async (username, email, password) => {
    const isUserExist = await findUserByEmail(email);

    if (isUserExist) throw new Error("user alreay exist");

    const user = await createUser(username, email, password);
    const token = signToken({ id: user._id });
    return {token, user};
}