// Props: title, amount, icon (a React element), tone (css colour class)
function SummaryCard({ title, amount, icon, tone = "blue" }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="card-title">{title}</div>
        <div className="card-amount">{amount}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
