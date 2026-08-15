import MyCart from "@/pages/mycart";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/mycart/")({
  component: MyCart,
});
