import MyOrders from "@/pages/myOrders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/orders/")({
  component: MyOrders,
});
