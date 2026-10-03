import { CalendarIcon } from "./Icons";

function YearCard({ year, onClick }) {
  return (
    <div className="stat-card blue clickable" onClick={() => onClick(year)}>
      <div className="stat-icon"><CalendarIcon /></div>
      <div>
        <div className="card-title">Year</div>
        <div className="card-amount">{year}</div>
      </div>
    </div>
  );
}

export default YearCard;
