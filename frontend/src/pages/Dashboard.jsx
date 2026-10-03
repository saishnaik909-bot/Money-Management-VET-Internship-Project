// The home page: banner + summary cards + transactions + pop-up add/edit form.
// WEEK 12 hooks used here: useState, useEffect, useCallback, useMemo
// WEEK 14 Redux used here: useSelector (read) and useDispatch (change)
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request, sendJson } from "../api";
import { formatMoney } from "../utils";
import {
  setTransactions, addTransaction, updateTransaction, deleteTransaction,
} from "../store/transactionSlice";
import SummaryCard from "../components/SummaryCard";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import Modal from "../components/Modal";
import { HeroArt } from "../components/Illustrations";
import { IncomeIcon, ExpenseIcon, CalendarIcon, TrendIcon, PlusIcon } from "../components/Icons";

function Dashboard() {
  const dispatch = useDispatch();                               // sends actions to Redux
  const transactions = useSelector((s) => s.transactions.list); // reads from Redux store

  const [summary, setSummary] = useState(null);
  const [category, setCategory] = useState("");   // selected filter
  const [showForm, setShowForm] = useState(false); // is the pop-up open?
  const [editing, setEditing] = useState(null);   // transaction being edited
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // useCallback: remembers the function until "category" changes
  const loadTransactions = useCallback(async () => {
    try {
      // Category filtering is done by the backend (WHERE ... via Sequelize)
      const query = category ? "?category=" + category : "";
      const data = await request("/transactions" + query);
      dispatch(setTransactions(data));
      setError("");
    } catch (err) {
      setError("Failed to load transactions.");
    }
  }, [category, dispatch]);

  async function loadSummary() {
    try {
      setSummary(await request("/summary"));
    } catch (err) {
      setSummary(null);
    }
  }

  // useEffect: runs when the page opens, and again when the filter changes
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    loadSummary();
  }, []);

  // Hide the success message after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // useMemo: recalculates only when "transactions" changes
  const shown = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expenses += t.amount;
    });
    return { income, expenses };
  }, [transactions]);

  const matchesFilter = (t) => category === "" || t.category === category;

  // Called by the form (add OR edit)
  async function handleSave(data) {
    if (editing) {
      const saved = await request("/transactions/" + editing.id, sendJson("PUT", data));
      // dispatch(action) -> reducer changes the Redux state
      dispatch(matchesFilter(saved) ? updateTransaction(saved) : deleteTransaction(saved.id));
      setMessage("Transaction updated successfully.");
    } else {
      const saved = await request("/transactions", sendJson("POST", data));
      if (matchesFilter(saved)) dispatch(addTransaction(saved));
      setMessage("Transaction added successfully.");
    }
    closeForm();
    loadSummary();
  }

  function openAddForm() {
    setEditing(null);
    setShowForm(true);
    setMessage("");
  }

  function handleEdit(t) {
    setEditing(t);
    setShowForm(true);
    setMessage("");
  }

  async function handleDelete(t) {
    if (!window.confirm(`Delete "${t.title}"?`)) return;
    try {
      await request("/transactions/" + t.id, { method: "DELETE" });
      dispatch(deleteTransaction(t.id));
      setMessage("Transaction deleted.");
      setError("");
      loadSummary();
    } catch (err) {
      setError("Unable to delete transaction.");
    }
  }

  // useCallback so the Modal's Esc-key listener is not re-created on every render
  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditing(null);
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Solo Money Management</h1>
          <p>Track your money. Understand your spending.</p>
          <button className="btn btn-white" onClick={openAddForm}><PlusIcon size={18} /> Add Transaction</button>
        </div>
        <HeroArt />
      </section>

      <div className="cards">
        <SummaryCard title="Total Income" tone="green" icon={<IncomeIcon />} amount={summary ? formatMoney(summary.totalIncome) : "-"} />
        <SummaryCard title="Total Expenses" tone="red" icon={<ExpenseIcon />} amount={summary ? formatMoney(summary.totalExpenses) : "-"} />
        <SummaryCard title="Monthly Expenses" tone="blue" icon={<CalendarIcon />} amount={summary ? formatMoney(summary.monthlyExpenses) : "-"} />
        <SummaryCard title="Yearly Expenses" tone="indigo" icon={<TrendIcon />} amount={summary ? formatMoney(summary.yearlyExpenses) : "-"} />
      </div>

      <div className="section-head">
        <h2>Transactions</h2>
        <FilterBar value={category} onChange={setCategory} />
      </div>

      {message && <div className="toast success">{message}</div>}
      {error && <div className="toast error-toast">{error}</div>}

      <p className="muted">
        Showing {transactions.length} transaction(s) — income {formatMoney(shown.income)}, expenses {formatMoney(shown.expenses)}
      </p>

      <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />

      {/* The form pops out in a Modal. "key" builds a fresh form for add vs edit. */}
      {showForm && (
        <Modal title={editing ? "Edit Transaction" : "Add Transaction"} onClose={closeForm}>
          <TransactionForm key={editing ? editing.id : "new"} initial={editing} onSave={handleSave} onCancel={closeForm} />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
