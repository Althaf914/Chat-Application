import mongoose from "mongoose";

export const connectDB= async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
    }
}