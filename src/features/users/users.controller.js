import { sendResponse } from "../../../utlis/response.js"
import { getAllUsersService, profileDetailsService, registerUserService, updateProfileService, updateUserRoleService, userLoginService } from "./users.service.js"

export const userRegisterController = async (req, res) => {
    try {
        let data = {
            avatar: req?.file?.path,
            ...req.body
        }
        if (data?.name == "" || data?.email == "" || data?.password == "" || data?.role == "") {
            throw new Error("All fields are required")
        }
        if (!["attendee", "admin", "organizer"].includes(data?.role)) {
            throw new Error("Invalid Role")
        }
        let result = await registerUserService(data)
        sendResponse(res, true, 144, "User registered successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const userLoginController = async (req, res, next) => {
    try {
        let data = req.body
        if (data.email == "" || data.password == "") {
            throw new Error("All fields are required")
        }
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
        if (data.id == "") {
            throw new Error("Id is required")
        }
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
        let data = { role: req.query.role, ...req.params }
        if (data.role == "" || data.id == "") {
            throw new Error("Role and Id is Required")
        }
        if (!["attendee", "admin", "organizer"].includes(data?.role)) {
            throw new Error("Invalid Role")
        }
        let result = await updateUserRoleService(data)
        sendResponse(res, true, 200, "User Role Updated Succesfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}