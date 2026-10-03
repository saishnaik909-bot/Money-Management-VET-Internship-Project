// WEEK 11/12 - A form controlled with useState.
// Used for BOTH adding and editing: if "initial" is given, we are editing.
// It is shown inside the <Modal> pop-up by the Dashboard.
import { useState } from "react";
import { CATEGORIES, PAYMENT_MODES, toInputValue } from "../utils";
import { IncomeIcon, ExpenseIcon } from "./Icons";

function TransactionForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    type: initial ? initial.type : "expense",
    title: initial ? initial.title : "",
    amount: initial ? String(initial.amount) : "",
    category: initial ? initial.category : "Food",
    paymentMode: initial ? initial.paymentMode : "UPI",
    date: toInputValue(initial ? initial.date : new Date()),
    description: initial ? initial.description : "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.title.trim() === "") return setError("Please enter a title.");
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return setError("Please enter a valid amount.");

    try {
      setError("");
      await onSave({ ...form, amount, date: new Date(form.date).toISOString() });
    } catch (err) {
      setError(err.message);
    }
  }

  const isIncome = form.type === "income";

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Two big buttons to choose Expense or Income */}
      <div className="type-toggle">
        <button type="button" className={!isIncome ? "active expense" : ""} onClick={() => setForm({ ...form, type: "expense" })}>
          <ExpenseIcon size={16} /> Expense
        </button>
        <button type="button" className={isIncome ? "active income" : ""} onClick={() => setForm({ ...form, type: "income" })}>
          <IncomeIcon size={16} /> Income
        </button>
      </div>

      <label>
        {isIncome ? "Source" : "Title"}
        <input name="title" value={form.title} onChange={handleChange} autoFocus
          placeholder={isIncome ? "Salary, Dad, Freelance..." : "Food, Travel, Shopping..."} />
      </label>

      <div className="row">
        <label>
          Amount (₹)
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" />
        </label>
        <label>
          Payment Mode
          <select name="paymentMode" value={form.paymentMode} onChange={handleChange}>
            {PAYMENT_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>

      <div className="row">
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Date and Time
          <input name="date" type="datetime-local" value={form.date} onChange={handleChange} />
        </label>
      </div>

      <label>
        Description (optional)
        <textarea name="description" value={form.description} onChange={handleChange} rows="2" />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-buttons">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{initial ? "Update" : "Add Transaction"}</button>
      </div>
    </form>
  );
}

export default TransactionForm;
