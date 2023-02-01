import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI } = process.env;

const connectionDb = async()=>{
    try{
        await mongoose.connect(MONGODB_URI as string);
            console.log('MongoDB Connected');
    }
    catch(error){
        console.error(error);
    }
}

export default connectionDb;