import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardShell eyebrow="Settings">
      <div className="mx-auto max-w-2xl px-6 md:px-10 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Profile
            </h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </section>

<button className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Save changes
          </button>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
