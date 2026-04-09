import express from "express";
import { addTask, getTasks } from "../controllers/taskController";

const router = express.Router();

router.post("/tasks", addTask);
router.get("/tasks", getTasks);

export default router;