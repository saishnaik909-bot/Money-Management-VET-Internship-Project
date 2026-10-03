import { formatDate, formatMoney } from "../utils";
import { EditIcon, TrashIcon } from "./Icons";

// One table row. Expense is shown with "-", income with "+".
function TransactionItem({ transaction, onEdit, onDelete, showActions }) {
  const t = transaction;
  const sign = t.type === "income" ? "+" : "-";

  return (
    <tr>
      <td>{formatDate(t.date)}</td>
      <td><strong>{t.title}</strong></td>
      <td><span className="pill">{t.category}</span></td>
      <td><span className={`badge ${t.type}`}>{t.type}</span></td>
      <td>{t.paymentMode}</td>
      <td className={`amount ${t.type === "income" ? "green" : "red"}`}>
        {sign} {formatMoney(t.amount)}
      </td>
      {showActions && (
        <td className="actions">
          <button className="btn btn-sm btn-ghost" onClick={() => onEdit(t)}><EditIcon size={14} /> Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(t)}><TrashIcon size={14} /> Delete</button>
        </td>
      )}
    </tr>
  );
}

export default TransactionItem;
