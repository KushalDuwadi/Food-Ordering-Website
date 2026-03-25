import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB not connected");
      console.log(err);
    });
};
