import { formatMoney } from "../utils";

function MonthCard({ month, onClick }) {
  const hasData = month.count > 0;
  return (
    <div className={`month-card clickable ${hasData ? "" : "empty-month"}`} onClick={() => onClick(month.month)}>
      <div className="month-name">{month.name}</div>
      {hasData ? (
        <div>
          <div className="muted">{month.count} transaction(s)</div>
          <div className="green">+ {formatMoney(month.income)}</div>
          <div className="red">- {formatMoney(month.expenses)}</div>
        </div>
      ) : (
        <div className="muted">No transactions</div>
      )}
    </div>
  );
}

export default MonthCard;
