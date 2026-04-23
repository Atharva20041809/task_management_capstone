import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { TaskCollectionPage } from "@/components/TaskCollectionPage";
import { useTasks } from "@/lib/tasks-context";

export const Route = createFileRoute("/today")({
  component: TodayPage,
});

function TodayPage() {
  const { tasks, loading } = useTasks();
  const today = new Date().toISOString().split("T")[0];
  const filtered = tasks.filter((t) => t.dueDate === today);

  return (
    <DashboardShell eyebrow="Today">
      <TaskCollectionPage title="Today" tasks={filtered} loading={loading} emptyMessage="Nothing due today." />
    </DashboardShell>
  );
}
