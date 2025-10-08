import mongoose from "mongoose";
import Event from "./event.schema.js"
const events = mongoose.model("Event", Event)

export const createEventService = async (data) => {
    try {
        let result = await events.create(data)
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getEventService = async (data) => {
    try {
        const query = {};
        if (data?.title?.trim()) {
            query.title = { $regex: data.title.trim(), $options: 'i' };
        }

        if (data?.location?.trim()) {
            query.location = { $regex: data.location.trim(), $options: 'i' };
        }
        let pagination = {
            limit: 5 * (data.pagination || 10),
            skip: 5 * (data.pagination > 0 ? data.pagination - 1 : 0),
            sort: { createdAt: -1 }
        }
        let result = await events.find(query, null, pagination);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const getSingleEventService = async (data) => {
    try {
        let result = await events.findOne({ _id: data.id })
        return result
    } catch (error) {
        throw new Error(error);
    }
}

export const updateEventService = async (data) => {
    try {
        let result = await events.find({ _id: data.id })
        if (!result) {
            throw new Error("No event found");
        }
        let result1 = await events.updateOne({ _id: data.id }, {
            title: data?.title || result.title,
            description: data?.description || result?.description,
            location: data?.location || result?.location,
            price: data?.price || result?.price,
            capacity: data?.capacity || result?.capacity
        })
        return result1
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteEventService = async (data) => {
    try {
        let result = await events.deleteOne({ _id: data.id })
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateStatusService = async (data) => {
    try {
        let result = await events.updateOne({ _id: data.id }, { status: data.status })
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}