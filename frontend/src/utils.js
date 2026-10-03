export const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Education", "Salary", "Freelance", "Gift", "Other"];
export const PAYMENT_MODES = ["UPI", "Cash"];

export const formatMoney = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const formatDate = (d) => new Date(d).toLocaleDateString("en-IN");

// <input type="datetime-local"> needs "YYYY-MM-DDTHH:mm" in LOCAL time
export function toInputValue(date) {
  const d = new Date(date);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}
