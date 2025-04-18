import { createFileRoute } from "@tanstack/react-router";
import CreateInvoice from "../views/invoices/createInvoice";

export const Route = createFileRoute("/invoices_/create")({
  component: CreateInvoice,
});
