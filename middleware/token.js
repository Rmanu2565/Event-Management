import jwt from "jsonwebtoken"
import { sendResponse } from "../utlis/response.js"

export const generateToken = async (req, res) => {
    try {
        let data = req.body[0]
        let accesstoken = process.env.ACCESS_TOKEN_KEY
        let id = data._id
        let name = data.name
        let email = data.email
        let role = data.role
        let token = await jwt.sign({ name, role, email, id }, accesstoken, { expiresIn: "1day" })
        let result = {
            token: token,
            name: name,
            role: role,
            email: email,
            id: id
        }
        sendResponse(res, true, 200, "User Login Succesful", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const validateAny = async (req, res, next) => {
    try {
        const authHeader = await req.headers['authorization'];
        const token = await authHeader && authHeader.split(' ')[1];
        let validateToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (validateToken) {
            next()
        }
        else {
            sendResponse(res, false, 401, "Unauthorized Access")
        }
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const validateAdmin = async (req, res, next) => {
    try {
        const authHeader = await req.headers['authorization'];
        const token = await authHeader && authHeader.split(' ')[1];
        let validateToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (validateToken.role == "admin") {
            next()
        }
        else {
            sendResponse(res, false, 401, "Unauthorized Access")
        }
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const validateOrganizer = async (req, res, next) => {
    try {
        let authHeader = await req.headers['authorization']
        const token = await authHeader && authHeader.split(" ")[1];
        let validateToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (validateToken.role == "organizer") {
            req.body = { ...req.body, organizerId: validateToken.id }
            next()
        }
        else {
            sendResponse(res, false, 500, "Unauthorized Access")
        }
    } catch (error) {
        sendResponse(res, false, 500, "Unauthorized Access")
    }
}

export const validateAdminOrganizer = async (req, res, next) => {
    try {
        let authHeader = await req.headers['authorization']
        let token = await authHeader && authHeader.split(" ")[1]
        let validateToken =await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (validateToken.role == 'admin' || validateToken.role == 'organizer') {
            next()
        }
        else {
            sendResponse(res, 500, false, "Unauthorized Access")
        }
    } catch (error) {

    }
}