import TransactionItem from "./TransactionItem";
import { EmptyArt } from "./Illustrations";

function TransactionList({ transactions, onEdit, onDelete, showActions = true }) {
  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="empty">
        <EmptyArt />
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Payment</th>
            <th>Amount</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} showActions={showActions} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
