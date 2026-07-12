import About from "@/pages/about";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/about/")({
  component: About,
});
