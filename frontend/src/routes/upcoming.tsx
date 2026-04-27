import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { TaskCollectionPage } from "@/components/TaskCollectionPage";
import { useTasks } from "@/lib/tasks-context";

export const Route = createFileRoute("/upcoming")({
  component: UpcomingPage,
});

function UpcomingPage() {
  const { tasks, loading } = useTasks();
  const today = new Date();
  const filtered = tasks.filter((t) => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate) > today && t.status !== "COMPLETED";
  });

  return (
    <DashboardShell eyebrow="Upcoming">
      <TaskCollectionPage title="Upcoming" tasks={filtered} loading={loading} emptyMessage="No upcoming tasks." />
    </DashboardShell>
  );
}
