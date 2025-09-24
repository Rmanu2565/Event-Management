import mongoose from "mongoose";
import { Users } from "./users.schema.js";
import bcrypt from "bcrypt";

const User = mongoose.model("Users", Users)

export const registerUserService = async (data) => {
    try {
        let user = await User.find({ email: data.email })
        if (user.length > 0) {
            throw new Error("Email already exists")
        }
        let result = await User.create(data)
        return
    } catch (error) {
        throw new Error(error.message);
    }
}

export const userLoginService = async (data) => {
    try {
        let result = await User.find({ email: data.email })
        if (result.length > 0) {
            let result1 = await bcrypt.compare(data.password, result[0].password)
            if (result1) {
                return result
            } else {
                throw new Error("Password or Email is Incorrect");
            }
        }
        else {
            throw new Error("Password or Email is Incorrect");
        }
    }
    catch (error) {
        throw new Error(error.message);

    }
}

export const profileDetailsService = async (data) => {
    try {
        let result = await User.find({ _id: data.id }).select("-password")
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateProfileService = async (data) => {
    try {
        let result = await User.updateOne({ _id: data.id }, { $set: data })
        console.log(result, "profileService")
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllUsersService = async (data) => {
    try {
        let result = await User.find().select("-password")
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateUserRoleService = async (data) => {
    try {
        let result = await User.updateOne({ _id: data.id }, { $set: { role: data.role } })
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}