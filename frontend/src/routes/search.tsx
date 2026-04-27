import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { DashboardShell } from "@/components/DashboardShell";
import { TaskCollectionPage } from "@/components/TaskCollectionPage";
import { useTasks } from "@/lib/tasks-context";
import { Search } from "lucide-react";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ = "" } = Route.useSearch();
  const [query, setQuery] = useState(initialQ);
  const { tasks } = useTasks();

  const results = query.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <DashboardShell eyebrow="Search">
      <div className="mx-auto max-w-3xl px-6 md:px-10 pt-8 pb-24">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            autoFocus
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        {query.trim() ? (
          <TaskCollectionPage title={`Results for "${query}"`} tasks={results} emptyMessage="No tasks match your search." />
        ) : (
          <p className="text-sm text-muted-foreground text-center mt-16">
            Start typing to search your tasks.
          </p>
        )}
      </div>
    </DashboardShell>
  );
}
