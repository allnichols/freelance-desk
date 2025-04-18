import React from "react";
import { useState } from "react";
import InvoiceItem from "./component/InvoiceItem/InvoiceItem";

function CreateInvoice() {
  const [invoiceItems, setInvoiceItems] = useState<
    Record<string, string | number>[]
  >([]);

  const handleRemoveItem = React.useCallback((index: number) => {
    setInvoiceItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpdateItem = React.useCallback(
    (index: number, field: string, value: string | number) => {
      setInvoiceItems((prev) => {
        return prev.map((item, i) => {
          if (i === index) {
            return { ...item, [field]: value };
          }
          return item;
        });
      });
    },
    []
  );

  return (
    <div className="container">
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-2xl">Create Invoice</h1>
        <div className="flex gap-2">
          <button className="btn btn-success text-white">Save Draft</button>
          <button className="btn btn-outline btn-success">Send Invoice</button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">Client Name</label>
            <input type="text" className="input input-bordered w-full" />
          </div>
          <div className="w-1/2">
            <label className="label">Invoice Number</label>
            <input type="text" className="input input-bordered w-full" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">Client Email</label>
            <input type="email" className="input input-bordered w-full" />
          </div>
          <div className="w-1/2">
            <label className="label">Invoice Date</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="label">Client Phone</label>
            <input type="tel" className="input input-bordered w-full" />
          </div>
          <div className="w-1/2">
            <label className="label">Due Date</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
        </div>
      </div>
      <div className="flex self-end-safe gap-2 p-4">
        <button
          className="btn text-white btn-primary"
          onClick={() =>
            setInvoiceItems((prev) => [
              ...prev,
              { description: "", quantity: 0, price: 0 },
            ])
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add Item
        </button>
      </div>
      <div className="flex flex-col items-end gap-4 p-4">
        {invoiceItems.length > 0 &&
          invoiceItems.map((item, index) => {
            console.log(item, index);
            return (
              <InvoiceItem
                key={index}
                index={index}
                item={item}
                handleRemoveItem={handleRemoveItem}
                handleUpdateItem={handleUpdateItem}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CreateInvoice;
