import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, type ApiTask, type CreateTaskInput } from "./api";
import { useAuth } from "./auth-context";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  tags: string[];
  project: string;
}

function toTask(t: ApiTask): Task {
  const statusMap: Record<string, TaskStatus> = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    pending: "TODO",
  };
  const priorityMap: Record<string, TaskPriority> = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
  };
  return {
    id: t._id,
    title: t.title,
    description: t.description ?? "",
    status: statusMap[t.status] ?? "TODO",
    priority: priorityMap[t.priority] ?? "MEDIUM",
    dueDate: t.dueDate ?? null,
    tags: t.tags ?? [],
    project: t.project ?? "",
  };
}

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refetch: () => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks();
      setTasks(data.map(toTask));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      load();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [token, load]);

  const createTask = useCallback(async (input: CreateTaskInput) => {
    const created = await api.createTask(input);
    setTasks((prev) => [toTask(created), ...prev]);
  }, []);

  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    try {
      await api.updateTask(id, { status });
    } catch {
      load();
    }
  }, [load]);

  const deleteTask = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.deleteTask(id);
    } catch {
      load();
    }
  }, [load]);

  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, createTask, updateTaskStatus, deleteTask, refetch: load }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}
