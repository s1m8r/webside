import Stores from "@/pages/storesPages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/")({
  component: Stores,
});
