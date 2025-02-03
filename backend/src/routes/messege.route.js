import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsersForSidebar, getMesseges, sendMessage } from "../controllers/messege.controller.js";


const router = express.Router();

router.get("/user", protectRoute, getUsersForSidebar)
router.get("/user/:id", protectRoute, getMesseges)
router.post("send/:id", protectRoute, sendMessage)


export default router;