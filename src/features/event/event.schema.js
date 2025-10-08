import mongoose from "mongoose";

const Event = mongoose.Schema({
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        reqired: true
    },
    description: {
        type: String,
        reqired: true
    },
    date: {
        type: Date,
        default: new Date
    },
    location: {
        type: String,
        reqired: true
    },
    price: {
        type: Number
    },
    capacity: {
        type: Number,
    },
    banner: {
        type: String,
    },
    brocher: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

}, {
    timeStamps: true
})

export default Event;