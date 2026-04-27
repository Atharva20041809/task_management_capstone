import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/tasks-context";

const priorityColors: Record<Task["priority"], string> = {
  LOW: "bg-slate-300",
  MEDIUM: "bg-amber-400",
  HIGH: "bg-red-500",
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      className="bg-card border border-border rounded-xl p-4 cursor-pointer select-none"
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "mt-1.5 w-2 h-2 rounded-full flex-shrink-0",
            priorityColors[task.priority]
          )}
          title={`${task.priority} priority`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">{task.title}</p>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          {(task.dueDate || task.tags?.length) && (
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              {task.dueDate && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {task.dueDate}
                </span>
              )}
              {task.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-1.5 py-0.5 rounded-md bg-accent text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
