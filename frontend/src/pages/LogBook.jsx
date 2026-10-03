// Log Book: Year -> Month -> Transactions (all years come from the database).
import { useEffect, useState } from "react";
import { API_URL, request } from "../api";
import { formatMoney } from "../utils";
import YearCard from "../components/YearCard";
import MonthCard from "../components/MonthCard";
import TransactionList from "../components/TransactionList";
import { BackIcon, BookIcon, DownloadIcon } from "../components/Icons";

function LogBook() {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);       // selected year
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState(null);     // selected month number
  const [details, setDetails] = useState(null); // totals + transactions of the month
  const [error, setError] = useState("");

  useEffect(() => {
    request("/logbook/years")
      .then((data) => setYears(data))
      .catch(() => setError("Failed to load the Log Book."));
  }, []);

  useEffect(() => {
    if (year === null) return;
    request("/logbook/" + year)
      .then((data) => setMonths(data))
      .catch(() => setError("Failed to load months."));
  }, [year]);

  useEffect(() => {
    if (month === null) return;
    request(`/logbook/${year}/${month}`)
      .then((data) => setDetails(data))
      .catch(() => setError("Failed to load transactions."));
  }, [year, month]);

  function goBack() {
    setError("");
    if (month !== null) { setMonth(null); setDetails(null); }
    else setYear(null);
  }

  let content;
  if (year === null) {
    content = years.length === 0 ? (
      <p className="muted">No transactions yet.</p>
    ) : (
      <div className="cards">
        {years.map((y) => <YearCard key={y} year={y} onClick={setYear} />)}
      </div>
    );
  } else if (month === null) {
    content = (
      <div>
        <h2>{year}</h2>
        <div className="month-grid">
          {months.map((m) => <MonthCard key={m.month} month={m} onClick={setMonth} />)}
        </div>
      </div>
    );
  } else if (details) {
    content = (
      <div>
        <h2>{details.monthName} {details.year}</h2>
        <div className="cards">
          <div className="stat-card green"><div><div className="card-title">Total Income</div><div className="card-amount">{formatMoney(details.income)}</div></div></div>
          <div className="stat-card red"><div><div className="card-title">Total Expenses</div><div className="card-amount">{formatMoney(details.expenses)}</div></div></div>
          <div className="stat-card blue"><div><div className="card-title">Balance</div><div className="card-amount">{formatMoney(details.balance)}</div></div></div>
        </div>

        {/* A normal link: the browser downloads the CSV streamed by the backend */}
        <a className="btn btn-primary export-btn" href={`${API_URL}/transactions/export/${year}/${month}`}>
          <DownloadIcon size={16} /> Export CSV
        </a>

        <TransactionList transactions={details.transactions} showActions={false} />
      </div>
    );
  }

  return (
    <div>
      <section className="page-banner">
        <BookIcon size={32} />
        <div>
          <h1>Log Book</h1>
          <p>Browse your history by year and month.</p>
        </div>
      </section>

      {year !== null && (
        <button className="btn btn-ghost back-btn" onClick={goBack}><BackIcon size={16} /> Back</button>
      )}
      {error && <div className="toast error-toast">{error}</div>}
      {content}
    </div>
  );
}

export default LogBook;
