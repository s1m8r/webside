import Header from "@/components/layout/header/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, createRootRoute } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <div className="mb-18">
        <Header />
      </div>
      <Outlet />
    </TooltipProvider>
  ),
});
