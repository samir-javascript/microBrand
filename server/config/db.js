import mongoose from "mongoose";

export const connectToDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongo db has been connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}