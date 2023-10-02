import mongoose from "mongoose";

const connectToDB = async() => {
    try{
        mongoose.set("strictQuery", true);
        if(!process.env.MONGODB_URI){
            console.log("MONGODB_URI not found");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ai_saas_helper",
        });
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("mongodb connection failed with error: ", error);
    }
};

export default connectToDB;