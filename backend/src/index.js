import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messegeRoutes from "./routes/messege.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config()

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    },
))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messege", messegeRoutes)
app.listen(5000, () => {
    console.log("server is running on port 5000");
    connectDB();
})