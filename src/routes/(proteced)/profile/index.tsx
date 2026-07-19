import Profile from "@/pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/profile/")({
  component: Profile,
});
