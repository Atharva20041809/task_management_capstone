import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { TaskCollectionPage } from "@/components/TaskCollectionPage";
import { useTasks } from "@/lib/tasks-context";

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
});

function InboxPage() {
  const { tasks, loading } = useTasks();
  const filtered = tasks.filter((t) => !t.dueDate);

  return (
    <DashboardShell eyebrow="Inbox">
      <TaskCollectionPage title="Inbox" tasks={filtered} loading={loading} emptyMessage="Inbox is empty." />
    </DashboardShell>
  );
}
