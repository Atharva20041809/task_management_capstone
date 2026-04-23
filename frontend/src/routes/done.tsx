import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { TaskCollectionPage } from "@/components/TaskCollectionPage";
import { useTasks } from "@/lib/tasks-context";

export const Route = createFileRoute("/done")({
  component: DonePage,
});

function DonePage() {
  const { tasks, loading } = useTasks();
  const filtered = tasks.filter((t) => t.status === "COMPLETED");

  return (
    <DashboardShell eyebrow="Done">
      <TaskCollectionPage title="Completed" tasks={filtered} loading={loading} emptyMessage="No completed tasks yet." />
    </DashboardShell>
  );
}
