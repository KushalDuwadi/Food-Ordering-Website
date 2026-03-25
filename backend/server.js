import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js'; // ✅ Added
import orderRouter from './routes/orderRoute.js'; // ✅ Added

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Fixed typo

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter); // ✅ Fixed
app.use("/api/order", orderRouter); // ✅ Added orderRouter

// Test Route
app.get("/", (req, res) => {
    res.send("Hello from the server");
});

// Server Start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
