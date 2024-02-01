import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`\n MONGODB CONNECTED TO ${connection.connection.host} \n`);
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR !",error);
        process.exit(1);
    }

}

export default connectDB;