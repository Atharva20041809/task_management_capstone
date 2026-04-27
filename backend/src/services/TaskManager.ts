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

  async addTask(data: {
    title: string;
    description?: string;
    priority?: string;
    dueDate?: string;
    tags?: string[];
    project?: string;
  }) {
    return await Task.create(data);
  }

  async getTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async updateTask(id: string, updates: Record<string, unknown>) {
    return await Task.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteTask(id: string) {
    return await Task.findByIdAndDelete(id);
  }
}
