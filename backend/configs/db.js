import mongoose from "mongoose";

const connectDB = async () => {
     try {
        mongoose.connection.once("connected",()=> {
             console.log("MongoDB connected successfully")
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/freshlygo2`)
     } catch (error) {
         console.error(error.message);
     }
    }

export default connectDB;