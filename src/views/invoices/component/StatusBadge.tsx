function StatusBadge({ status }: { status: string }) {
  let badgeClass = "badge badge-default";
  let statusText = "Unknown";

  switch (status) {
    case "paid":
      badgeClass = "badge badge-soft badge-success";
      statusText = "Paid";
      break;
    case "unpaid":
      badgeClass = "badge badge-soft badge-warning";
      statusText = "Pending";
      break;
    case "overdue":
      badgeClass = "badge badge-soft badge-error";
      statusText = "Overdue";
      break;
    default:
      break;
  }

  return <span className={badgeClass}>{statusText}</span>;
}

export default StatusBadge;
