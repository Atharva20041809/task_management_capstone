import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

function AboutPage() {
  return (
    <DashboardShell eyebrow="About">
      <article className="mx-auto max-w-3xl px-6 md:px-10 pt-12 pb-24">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Kairos
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
            On doing the right thing
            <br />
            at the right time.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The ancient Greeks had two words for time. Chronos — the tick of the clock,
            the relentless march of minutes. And Kairos — the opportune moment, the right
            time to act. This app is named for the second one.
          </p>
        </motion.div>

        <div className="space-y-14">
          <motion.section custom={1} initial="hidden" animate="show" variants={fade}>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              01
            </p>
            <h2 className="text-xl font-medium text-foreground mb-3">The idea</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most productivity tools are built around the assumption that more structure
              equals more output. More categories, more tags, more dashboards. Kairos
              believes the opposite: that clarity comes from subtraction, not addition.
              The system shows you what matters, then gets out of the way.
            </p>
          </motion.section>

          <motion.section custom={2} initial="hidden" animate="show" variants={fade}>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              02
            </p>
            <h2 className="text-xl font-medium text-foreground mb-3">The shape</h2>
            <p className="text-muted-foreground leading-relaxed">
              A sidebar that collapses when you don't need it. A board that shows all
              three states at once. A home screen that surfaces what's urgent without
              alarming you. Every interaction is designed to feel like something you'd
              build yourself if you had the time — obvious, unhurried, right.
            </p>
          </motion.section>

          <motion.section custom={3} initial="hidden" animate="show" variants={fade}>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              03
            </p>
            <h2 className="text-xl font-medium text-foreground mb-3">A calm space</h2>
            <p className="text-muted-foreground leading-relaxed">
              Notifications are a choice, not a default. Color is used sparingly — a red
              dot for urgency, a green for done, nothing more. The typography is readable
              at a glance and comfortable for long sessions. The goal is an interface that
              feels like a clean desk, not a busy inbox.
            </p>
          </motion.section>

          <motion.section custom={4} initial="hidden" animate="show" variants={fade}>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              04
            </p>
            <h2 className="text-xl font-medium text-foreground mb-3">
              For one person at a time
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Kairos is built for individual use, not team dashboards or org-wide
              reporting. It's the tool you keep open in a corner of your screen — the one
              you trust with your actual priorities, not the ones you perform for others.
            </p>
          </motion.section>
        </div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-20 p-8 bg-slate-50 border border-border rounded-xl"
        >
          <p className="text-sm text-muted-foreground mb-1">Made by</p>
          <p className="text-foreground font-medium">Ananya Soni</p>
          <p className="text-sm text-muted-foreground mt-1">2026</p>
        </motion.div>
      </article>
    </DashboardShell>
  );
}
