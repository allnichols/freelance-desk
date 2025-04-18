import React from "react";
import Database from "@tauri-apps/plugin-sql";
import { useNavigate } from "@tanstack/react-router";
import StatusBadge from "./component/StatusBadge";

let db: any;

async function initializeDatabase() {
  db = await Database.load("sqlite:mydatabase.db");
}

async function getInvoices() {
  if (!db) {
    console.error("Database not initialized");
    return [];
  }
  const result = await db.select(`
    SELECT 
      invoices.id,
      invoice_number,
      invoices.total_amount,
      invoices.due_date,
      invoices.status, 
      clients.name AS clients_name
    FROM
	    invoices
    JOIN
	    clients
    ON 
      invoices.client_id = clients.id
    `);
  return result;
}

const Invoices = () => {
  const [invoices, setInvoices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      await initializeDatabase();
      const data = await getInvoices();
      console.log("Fetched invoices:", data);
      setInvoices(data);
      setLoading(false);
    };

    fetchData().catch((error) => {
      console.error("Error fetching invoices:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Invoices</h1>
        <button
          className="btn btn-primary btn-sm mb-4"
          onClick={() => navigate({ to: "/invoices/create" })}
        >
          Create Invoice
        </button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.total_amount}</td>
                <td>{invoice.due_date}</td>
                <td>
                  <StatusBadge status={invoice.status} />
                </td>
                <td
                  className="link link-info"
                  onClick={() => navigate({ to: `/invoices/${invoice.id}` })}
                >
                  View More
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
