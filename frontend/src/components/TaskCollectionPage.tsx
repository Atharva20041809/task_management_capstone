import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { Task } from "@/lib/tasks-context";
import { TaskCard } from "./TaskCard";

interface TaskCollectionPageProps {
  title: string;
  tasks: Task[];
  loading?: boolean;
  emptyMessage?: string;
}

export function TaskCollectionPage({
  title,
  tasks,
  loading = false,
  emptyMessage = "No tasks here.",
}: TaskCollectionPageProps) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const dueSoon = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 3);
    return new Date(t.dueDate) <= cutoff && t.status !== "COMPLETED";
  }).length;

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 pt-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-4">{title}</h1>
          {total > 0 && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {total} total
              </span>
              {inProgress > 0 && (
                <span className="flex items-center gap-1.5 text-amber-600">
                  <Clock className="w-4 h-4" />
                  {inProgress} in progress
                </span>
              )}
              {dueSoon > 0 && (
                <span className="flex items-center gap-1.5 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {dueSoon} due soon
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex items-center justify-center py-20 rounded-xl border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
