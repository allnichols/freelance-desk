import { createFileRoute } from "@tanstack/react-router";
import Invoice from "../views/invoices/invoice";

export const Route = createFileRoute("/invoices/$id")({
  component: Invoice,
});
