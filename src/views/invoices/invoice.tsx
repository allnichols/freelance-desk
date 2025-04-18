import React from "react";
import { useParams } from "@tanstack/react-router";
import Database from "@tauri-apps/plugin-sql";

let db: any;

async function initializeDatabase() {
  db = await Database.load("sqlite:mydatabase.db");
}

async function getInvoice(id: string) {
  if (!db) {
    console.error("Database not initialized");
    return null;
  }

  const clientInvoice = await db.select(
    `
        SELECT
            invoices.id as invoice_id,
            invoices.invoice_number as invoice_number,
            invoices.status as status,
            clients.name as client_name,
            clients.email as client_email,
            clients.phone as client_phone,
            clients.address as client_address
        FROM invoices 
        JOIN clients ON invoices.client_id = clients.id
        WHERE invoices.id = ?
    `,
    [id]
  );

  const invoiceItems = await db.select(
    `
        SELECT
            invoice_items.id as item_id,
            invoice_items.description as item_description,
            invoice_items.quantity as item_quantity,
            invoice_items.unit_price as item_price
        FROM invoice_items
        WHERE invoice_items.invoice_id = ?
    `,
    [id]
  );

  return {
    invoice_number: clientInvoice[0].invoice_number,
    invoice_id: clientInvoice[0].invoice_id,
    client: {
      clientInvoice: clientInvoice[0].client_name,
      email: clientInvoice[0].client_email,
      phone: clientInvoice[0].client_phone,
      address: clientInvoice[0].client_address,
    },
    items: invoiceItems.map((item: any) => ({
      id: item.item_id,
      description: item.item_description,
      quantity: item.item_quantity,
      price: item.item_price,
    })),
    total: invoiceItems.reduce((acc: number, item: any) => {
      return acc + item.item_quantity * item.item_price;
    }, 0),
    status: clientInvoice[0].status,
  };
}

function Invoice() {
  const { id } = useParams({ from: "/invoices/$id" });
  const [invoice, setInvoice] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await initializeDatabase();
      const data = await getInvoice(id);
      console.log("Fetched invoice:", data);
      setInvoice(data);
      setLoading(false);
    };

    fetchData().catch((error) => {
      console.error("Error fetching invoice:", error);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="invoice-view">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="invoice-details">
          <h1>Invoice #{invoice.invoice_number}</h1>
          <p>Status: {invoice.status}</p>
          <h2>Client Information</h2>
          <p>Name: {invoice.client.clientInvoice}</p>
          <p>Email: {invoice.client.email}</p>
          <p>Phone: {invoice.client.phone}</p>
          <p>Address: {invoice.client.address}</p>
          <h2>Items</h2>
          <ul>
            {invoice.items.map((item: any) => (
              <li key={item.id}>
                {item.description} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
          <h2>Total: ${invoice.total}</h2>
        </div>
      )}
    </div>
  );
}

export default Invoice;
