import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/DashboardShell";
import { useTasks } from "@/lib/tasks-context";
import { CheckCircle2, Clock, ListTodo, Flame } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const weeklyData = [
  { day: "Mon", completed: 2 },
  { day: "Tue", completed: 4 },
  { day: "Wed", completed: 1 },
  { day: "Thu", completed: 3 },
  { day: "Fri", completed: 5 },
  { day: "Sat", completed: 0 },
  { day: "Sun", completed: 2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
    >
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

function HomePage() {
  const { tasks, loading } = useTasks();

  const todo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const completed = tasks.filter((t) => t.status === "COMPLETED");
  const dueSoon = tasks.filter((t) => {
    if (!t.dueDate || t.status === "COMPLETED") return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 3);
    return new Date(t.dueDate) <= cutoff;
  });

  return (
    <DashboardShell eyebrow="Dashboard">
      <div className="mx-auto max-w-5xl px-6 md:px-10 pt-10 pb-24 space-y-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard label="To do" value={todo.length} icon={ListTodo} color="bg-blue-50 text-blue-600" />
          <StatCard label="In progress" value={inProgress.length} icon={Clock} color="bg-amber-50 text-amber-600" />
          <StatCard label="Completed" value={completed.length} icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
          <StatCard label="Due soon" value={dueSoon.length} icon={Flame} color="bg-red-50 text-red-600" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              In Progress
            </h2>
            {loading ? (
              <div className="space-y-2">
                {[1, 2].map((n) => <div key={n} className="h-10 rounded-lg bg-muted animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {inProgress.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nothing in progress.</p>
                )}
                {inProgress.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground mt-0.5">Due {task.dueDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Weekly completions
            </h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "hsl(var(--accent))" }}
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 border border-border rounded-xl p-8"
        >
          <blockquote className="text-lg font-light italic text-foreground leading-relaxed">
            "The key is not to prioritize what's on your schedule, but to schedule your priorities."
          </blockquote>
          <p className="mt-3 text-sm text-muted-foreground">— Stephen Covey</p>
        </motion.div>

        {dueSoon.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6"
          >
            <h2 className="text-sm font-medium text-red-700 uppercase tracking-wider mb-3">Due soon</h2>
            <div className="space-y-2">
              {dueSoon.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <Flame className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-800">{task.title}</span>
                  <span className="ml-auto text-xs text-red-500">{task.dueDate}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  );
}
