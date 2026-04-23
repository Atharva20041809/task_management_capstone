import { Request, Response } from "express";
import { TaskManager } from "../services/TaskManager";

const manager = TaskManager.getInstance();

export const addTask = async (req: Request, res: Response) => {
  const { title, description, priority, dueDate, tags, project } = req.body;
  const task = await manager.addTask({ title, description, priority, dueDate, tags, project });
  res.status(201).json(task);
};

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await manager.getTasks();
  res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const task = await manager.updateTask(id, req.body);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await manager.deleteTask(id);
  res.json({ success: true });
};
