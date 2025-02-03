import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { getUsersForSidebar, getMesseges, sendMessage } from "../controllers/messege.controller";

router.get("/user", protectRoute, getUsersForSidebar)
router.get("/user/:id", protectRoute, getMesseges)
router.post("send/:id", protectRoute, sendMessage)

const router = express.Router();

export default router;