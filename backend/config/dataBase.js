import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
       const connection = await mongoose.connect(process.env.MONGOU_URI)
        console.log("mongoDB connected!", connection.connection.host)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}