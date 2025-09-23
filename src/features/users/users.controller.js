import { sendResponse } from "../../../utlis/response.js"
import { getAllUsersService, profileDetailsService, registerUserService, updateProfileService, updateUserRoleService, userLoginService } from "./users.service.js"

export const userRegisterController = async (req, res) => {
    try {
        let data = {
            avatar: req.file.path,
            ...req.body
        }
        let result = await registerUserService(data)
        sendResponse(res, true, 200, "User registered successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const userLoginController = async (req, res, next) => {
    try {
        let data = req.body
        let result = await userLoginService(data)
        req.body = result
        next()
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const profileDetailsController = async (req, res) => {
    try {
        let data = req.params
        let result = await profileDetailsService(data)
        sendResponse(res, true, 200, "Profile Details Fetched Succesfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const updateProfileController = async (req, res) => {
    try {
        let data = {
            avatar: req.file.path,
            ...req.body
        }
        let result = await updateProfileService(data)
        sendResponse(res, true, 200, "Profile Updated Succesfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        let result = await getAllUsersService()
        sendResponse(res, true, 200, "Users Fetched Succesfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const updateUserRoleController = async (req, res) => {
    try {
        let data = { role: req.query.role,...req.params }
        let result = await updateUserRoleService(data)
        sendResponse(res, true, 200, "User Role Updated Succesfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}