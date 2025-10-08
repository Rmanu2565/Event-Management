import { sendResponse } from "../../../utlis/response.js"
import { createEventService, deleteEventService, getEventService, getSingleEventService, updateEventService, updateStatusService } from "./event.service.js"

export const createEventController = async (req, res) => {
    try {
        let data = { ...req.body, banner: req?.file?.path }
        if (data.title == "" || data.description == "" || data.location == "") {
            sendResponse(res, false, 500, "All Fields are Required")
        }
        let result = await createEventService(data)
        sendResponse(res, true, 200, "Event Created Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const getEventController = async (req, res) => {
    try {
        let data = req.query
        let result = await getEventService(data)
        sendResponse(res, true, 200, "Data Fetched Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const getSingleEventController = async (req, res) => {
    try {
        let data = req.params
        let result = await getSingleEventService(data)
        sendResponse(res, true, 200, "Details Fetched Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const updateEventController = async (req, res) => {
    try {
        let data = { ...req.body, id: req.params.id }
        let result = await updateEventService(data)
        sendResponse(res, true, 200, "Event Updated Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const deleteEventController = async (req, res) => {
    try {
        let data = req.params
        let result = await deleteEventService(data)
        sendResponse(res, true, 200, "Data Deleted Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}

export const updateStatusController = async (req, res) => {
    try {
        let data = req.params
        let result = await updateStatusService(data)
        sendResponse(res, true, 200, "Status Updated Successfully", result)
    } catch (error) {
        sendResponse(res, false, 500, error.message)
    }
}