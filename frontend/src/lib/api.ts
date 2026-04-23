const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

export interface ApiTask {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  tags: string[];
  project: string;
  createdAt?: string;
}

export type CreateTaskInput = {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: string;
  tags?: string[];
  project?: string;
};

export interface AuthResponse {
  token: string;
  user: { id: string; email: string };
}

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  register: (email: string, password: string) =>
    request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),

  getTasks: () => request<ApiTask[]>("/tasks"),

  createTask: (data: CreateTaskInput) =>
    request<ApiTask>("/tasks", { method: "POST", body: JSON.stringify(data) }),

  updateTask: (id: string, updates: Partial<ApiTask>) =>
    request<ApiTask>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(updates) }),

  deleteTask: (id: string) =>
    request<{ success: boolean }>(`/tasks/${id}`, { method: "DELETE" }),
};
