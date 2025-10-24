import shortUrlModel from '../models/shortUrl.model.js';
import User from '../models/user.model.js';
import { generateHash } from '../utils/helper.js';





export const findUserByUsername = async (username) => {
    return await User.findOne({ username });
}


export const findUserById = async (id) => {
    return await User.findById(id);
}


export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}



export const createUser = async (username, email, password) => {
    const hash = await generateHash(password);
    const user = new User({ username, email, password : hash });
    return await user.save();
};


export const findAllUserUrls = async (user_id) => {
    return await shortUrlModel.find({user_id})
}