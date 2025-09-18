import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const dbUrl= process.env.DB_URL
export const connectDB=async()=> {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}
