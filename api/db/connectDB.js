import mongoose from "mongoose"
export const connectDB = async (MONGO_URL) =>{
    try {
        await mongoose.connect(process.env.MONGO_URI + process.env.MONGO_NAME)
        console.log('conneccted to db');
    } catch (error) {
        console.log(error.message);
    }
}