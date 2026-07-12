import Product from "@/pages/storesPages/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/stores/product/$id")({
  component: Product,
});
