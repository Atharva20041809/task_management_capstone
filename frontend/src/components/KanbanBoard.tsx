import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { useTasks, type Task, type TaskStatus } from "@/lib/tasks-context";
import { TaskCard } from "./TaskCard";

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: "TODO", label: "To do", color: "bg-slate-400" },
  { id: "IN_PROGRESS", label: "In progress", color: "bg-amber-400" },
  { id: "COMPLETED", label: "Completed", color: "bg-emerald-500" },
];

const nextStatus: Record<TaskStatus, TaskStatus> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: "TODO",
};

interface KanbanBoardProps {
  project?: string;
}

export function KanbanBoard({ project }: KanbanBoardProps) {
  const { tasks, loading, error, updateTaskStatus, deleteTask } = useTasks();
  const [query, setQuery] = useState("");

  const base = project
    ? tasks.filter((t) => t.project.toLowerCase() === project.toLowerCase())
    : tasks;

  const filtered = query.trim()
    ? base.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase())
      )
    : base;

  const byStatus = (status: TaskStatus): Task[] =>
    filtered.filter((t) => t.status === status);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-destructive">Failed to load tasks: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter tasks…"
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map(({ id }) => (
            <div key={id} className="space-y-2.5">
              <div className="h-5 w-24 rounded bg-muted animate-pulse" />
              {[1, 2].map((n) => (
                <div key={n} className="h-20 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map(({ id, label, color }) => {
            const colTasks = byStatus(id);
            return (
              <div key={id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <h3 className="text-sm font-medium text-foreground">{label}</h3>
                  <span className="ml-auto text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 min-h-[120px]">
                  <AnimatePresence>
                    {colTasks.map((task) => (
                      <div key={task.id} className="group relative">
                        <TaskCard task={task} />
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => updateTaskStatus(task.id, nextStatus[task.status])}
                            className="text-xs px-2 py-0.5 rounded bg-background border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
                            title="Advance status"
                          >
                            →
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded bg-background border border-border shadow-sm text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </AnimatePresence>
                  {colTasks.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 rounded-xl border-2 border-dashed border-border flex items-center justify-center py-10"
                    >
                      <p className="text-xs text-muted-foreground">No tasks</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
