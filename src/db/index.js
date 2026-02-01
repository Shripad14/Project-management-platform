import mongoose from "mongoose";

import 'dotenv/config';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Mongo DB connected.");
    } catch (error) {
        console.error("❌ Mongo DB connection error ",error);
        process.exit(1);
    }
}

export default connectDB;