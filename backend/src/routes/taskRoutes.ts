import express from "express";
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
