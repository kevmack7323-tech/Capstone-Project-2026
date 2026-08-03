import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connectDB.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDB;