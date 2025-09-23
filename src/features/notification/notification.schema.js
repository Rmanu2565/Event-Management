import mongoose from "mongoose";

const notification = mongoose.Schema({
    type: {
        type: String,
        enum: ["email", "sms"],
        required: true
    },
    to: {
        type: String,
        enum: ["email","phone"],
        required: true
    },
    message:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["sent", "failed"],
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date
    }
})

export default notification;