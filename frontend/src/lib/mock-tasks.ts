export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags?: string[];
  project?: string;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design system audit",
    description: "Review all existing UI components for consistency and accessibility.",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-04-28",
    tags: ["design", "accessibility"],
    project: "Kairos",
  },
  {
    id: "2",
    title: "Implement authentication flow",
    description: "Build login, logout, and session management with JWT tokens.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-04-25",
    tags: ["backend", "security"],
    project: "Kairos",
  },
  {
    id: "3",
    title: "Write onboarding documentation",
    description: "Create developer onboarding guide covering setup and architecture.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-05-01",
    tags: ["docs"],
    project: "Kairos",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment.",
    status: "COMPLETED",
    priority: "HIGH",
    dueDate: "2026-04-20",
    tags: ["devops"],
    project: "Kairos",
  },
  {
    id: "5",
    title: "Migrate database schema",
    description: "Run migration scripts and update ORM models for v2 schema.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-04-24",
    tags: ["backend", "database"],
    project: "Kairos",
  },
  {
    id: "6",
    title: "Create email notification templates",
    description: "Design and code HTML email templates for task reminders.",
    status: "TODO",
    priority: "LOW",
    dueDate: "2026-05-10",
    tags: ["email", "design"],
    project: "Kairos",
  },
  {
    id: "7",
    title: "Performance profiling",
    description: "Profile render times and identify bottlenecks in the dashboard.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-05-05",
    tags: ["performance"],
    project: "Kairos",
  },
  {
    id: "8",
    title: "Mobile responsive polish",
    description: "Fix layout issues on small screens and test on real devices.",
    status: "COMPLETED",
    priority: "MEDIUM",
    dueDate: "2026-04-19",
    tags: ["frontend", "mobile"],
    project: "Kairos",
  },
];

export const getTasksByStatus = (status: TaskStatus) =>
  mockTasks.filter((t) => t.status === status);

export const getTasksDueSoon = (days = 3) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + days);
  return mockTasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    return due <= cutoff && t.status !== "COMPLETED";
  });
};
