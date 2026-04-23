import { useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { useTasks } from "@/lib/tasks-context";
import { toast } from "sonner";

const WORKSPACES = ["Kairos", "Personal", "Side projects"];

export function NewTaskDialog() {
  const { createTask } = useTasks();
  const location = useLocation();

  // Pre-fill project when coming from a workspace board view
  const searchParams = new URLSearchParams(location.searchStr);
  const defaultProject = searchParams.get("list") ?? "";

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [project, setProject] = useState(defaultProject);
  const [saving, setSaving] = useState(false);

  const handleOpen = () => {
    // Refresh default project each time the dialog opens
    const p = new URLSearchParams(location.searchStr).get("list") ?? "";
    setProject(p);
    setOpen(true);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate("");
    setProject(new URLSearchParams(location.searchStr).get("list") ?? "");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || undefined,
        project: project || undefined,
      });
      toast.success("Task created");
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to create task");
    } finally {
      setSaving(false);
    }
  };

  const modal = open
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-md bg-background rounded-2xl border border-border shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-foreground">New task</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  autoFocus
                  required
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional details…"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Project
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">No project</option>
                  {WORKSPACES.map((ws) => (
                    <option key={ws} value={ws}>
                      {ws}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Due date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 px-4 rounded-lg border border-border text-sm text-muted-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !title.trim()}
                  className="flex-1 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Plus className="w-3.5 h-3.5" />
        New task
      </button>
      {modal}
    </>
  );
}
