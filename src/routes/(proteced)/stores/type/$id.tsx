import ShowType from "@/pages/shop/showType";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/type/$id")({
  component: ShowType,
});
