import bcrypt from "bcrypt"
import { sendResponse } from "../utlis/response.js"

const encrytPassword = async (req, res, next) => {
    try {
        let password = req.body.password
        if (!password) {
            throw new Error("Password is required")
        }
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)
        req.body.password = hashPassword
        next()
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export default encrytPassword;