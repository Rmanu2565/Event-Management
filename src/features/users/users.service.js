import mongoose from "mongoose";
import { Users } from "./users.schema.js";

const User = mongoose.model("Users", Users)

export const registerUserService = async (data) => {
    try {
        let result = await User.create(data)
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}