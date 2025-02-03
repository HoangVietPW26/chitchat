import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config()

const app = express();


app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    console.log("server is running on port 5000");
    connectDB();
})