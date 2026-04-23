import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TasksProvider } from "@/lib/tasks-context";
import { AuthProvider } from "@/lib/auth-context";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Outlet />
        <Toaster />
      </TasksProvider>
    </AuthProvider>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-light text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-8">Page not found.</p>
        <a href="/" className="text-primary underline underline-offset-4">
          Go home
        </a>
      </div>
    </div>
  );
}
