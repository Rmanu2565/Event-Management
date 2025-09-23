import mongoose from "mongoose";

const ticket=mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    qrcode:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    transactionId:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date
    }
})

export default ticket;