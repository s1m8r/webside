import TopSell from "@/pages/shop/topSelling";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/TopSell")({
  component: TopSell,
});
