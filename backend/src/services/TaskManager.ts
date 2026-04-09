import { Task } from "../models/Task";

export class TaskManager {
  private static instance: TaskManager;

  private constructor() {}

  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  async addTask(title: string, description: string) {
    return await Task.create({ title, description });
  }

  async getTasks() {
    return await Task.find();
  }
}