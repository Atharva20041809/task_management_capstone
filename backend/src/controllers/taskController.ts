import { Request, Response } from "express";
import { TaskManager } from "../services/TaskManager";

const manager = TaskManager.getInstance();

export const addTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = await manager.addTask(title, description);
  res.json(task);
};

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await manager.getTasks();
  res.json(tasks);
};