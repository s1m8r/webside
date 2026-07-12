import ShopShow from "@/pages/shop/shopShow";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/$id")({
  component: ShopShow,
});
