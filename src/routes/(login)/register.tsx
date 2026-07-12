import Register from "@/pages/login/register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(login)/register")({
  component: Register,
});
