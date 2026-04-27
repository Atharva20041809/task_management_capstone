import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DashboardShell } from "@/components/DashboardShell";
import { KanbanBoard } from "@/components/KanbanBoard";

const searchSchema = z.object({
  list: z.string().optional(),
});

export const Route = createFileRoute("/board")({
  validateSearch: searchSchema,
  component: BoardPage,
});

function BoardPage() {
  const { list } = Route.useSearch();
  return (
    <DashboardShell eyebrow={list ? `Board — ${list}` : "Board"}>
      <div className="px-6 md:px-10 pt-8 pb-24">
        <KanbanBoard project={list} />
      </div>
    </DashboardShell>
  );
}
