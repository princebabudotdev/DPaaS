import mongoose from "mongoose";
import config from "./config.js";

const connectDB = () => {
    mongoose.connect(config.MONGO_URI , {
        // useNewUrlParser: true,
        
    })
    .then(() =>{
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    })
    
}

export default connectDB;