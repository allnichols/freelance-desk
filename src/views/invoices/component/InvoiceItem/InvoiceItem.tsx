export interface InvoiceItemProps {
  item: any;
  handleRemoveItem: (index: number) => void;
  handleUpdateItem: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  index: number;
}

function InvoiceItem({
  item,
  handleRemoveItem,
  handleUpdateItem,
  index,
}: InvoiceItemProps) {
  return (
    <div className="flex gap-4">
      <div>
        <label className="label">Item Description</label>
        <input type="text" className="input input-bordered w-full" />
      </div>
      <div>
        <label className="label">Quantity</label>
        <input type="number" className="input input-bordered w-full" />
      </div>
      <div>
        <label className="label">Price</label>
        <input type="number" className="input input-bordered w-full" />
      </div>
      <button
        className="btn btn-soft btn-error"
        onClick={() => handleRemoveItem(index)}
      >
        remove
      </button>
    </div>
  );
}

export default InvoiceItem;
