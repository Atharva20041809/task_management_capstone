import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  KanbanSquare,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Inbox,
  Search,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NewTaskDialog } from "./NewTaskDialog";
import { useAuth } from "@/lib/auth-context";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Board", to: "/board", icon: KanbanSquare },
  { label: "Today", to: "/today", icon: Calendar },
  { label: "Upcoming", to: "/upcoming", icon: CalendarClock },
  { label: "Done", to: "/done", icon: CheckCircle2 },
  { label: "Inbox", to: "/inbox", icon: Inbox },
];

const bottomNav: NavItem[] = [
  { label: "Search", to: "/search", icon: Search },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "About", to: "/about", icon: Info },
];

interface DashboardShellProps {
  children: React.ReactNode;
  eyebrow?: string;
}

export function DashboardShell({ children, eyebrow }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) navigate({ to: "/login", replace: true });
  }, [token, navigate]);

  if (!token) return null;

  const sidebarWidth = collapsed ? 68 : 260;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col border-r border-border bg-sidebar shrink-0 overflow-hidden"
        style={{ width: sidebarWidth }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-semibold text-sidebar-foreground tracking-tight"
              >
                Kairos
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {mainNav.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}

          {!collapsed && (
            <div className="pt-4">
              <button
                onClick={() => setWorkspaceOpen((o) => !o)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    !workspaceOpen && "-rotate-90"
                  )}
                />
                Workspaces
              </button>
              <AnimatePresence>
                {workspaceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {["Kairos", "Personal", "Side projects"].map((ws) => {
                      const active =
                        location.pathname === "/board" &&
                        location.searchStr.includes(`list=${encodeURIComponent(ws)}`);
                      return (
                        <Link
                          key={ws}
                          to="/board"
                          search={{ list: ws }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            active
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <span className="w-4 h-4 rounded bg-slate-200 flex items-center justify-center text-xs font-medium shrink-0 text-slate-600">
                            {ws[0]}
                          </span>
                          <span className="truncate">{ws}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="border-t border-sidebar-border py-3 px-2 space-y-0.5">
          {bottomNav.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </motion.aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-10 h-14 border-b border-border bg-background/80 backdrop-blur flex items-center px-6 gap-3">
          {eyebrow && (
            <span className="text-sm font-medium text-foreground">{eyebrow}</span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <NewTaskDialog />
            <button
              onClick={logout}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
