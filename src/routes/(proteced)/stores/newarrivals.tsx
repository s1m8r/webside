import NewArrivals from "@/pages/shop/newarrivals";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/newarrivals")({
  component: NewArrivals,
});
