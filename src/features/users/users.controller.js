import { sendResponse } from "../../../utlis/response.js"
import { registerUserService } from "./users.service.js"

export const userRegisterController = async (req, res) => {
    try {
        let data = req.body
        let result = await registerUserService(data)
        sendResponse(res, true, 200, "User registered successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message, result)
    }
}