// Rule-based chatbot. NO AI: each option runs a database query
// and the answer is built from a fixed sentence.
const { Transaction, Category } = require("../models");
const formatTransaction = require("../utils/formatTransaction");
const handleError = require("../utils/handleError");
const { sumAmount } = require("./summaryController");
const dateRange = require("../utils/dateRange");

const money = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// GET /api/chatbot/:option
async function answer(req, res) {
  try {
    const now = new Date();
    let reply;

    switch (req.params.option) {
      case "total-income":
        reply = `Your total income is ${money(await sumAmount("income"))}.`;
        break;

      case "total-expenses":
        reply = `Your total expenses are ${money(await sumAmount("expense"))}.`;
        break;

      case "month-expenses": {
        const range = dateRange(now.getFullYear(), now.getMonth() + 1);
        reply = `You spent ${money(await sumAmount("expense", range))} this month.`;
        break;
      }

      case "year-expenses": {
        const range = dateRange(now.getFullYear());
        reply = `You spent ${money(await sumAmount("expense", range))} this year.`;
        break;
      }

      case "count": {
        const count = await Transaction.count();
        reply = `You have ${count} transaction(s) in total.`;
        break;
      }

      case "top-category": {
        const expenses = await Transaction.findAll({ where: { type: "expense" }, include: Category });
        if (expenses.length === 0) {
          reply = "You have no expenses yet.";
          break;
        }
        const totals = {};
        for (const t of expenses) {
          const name = t.Category ? t.Category.name : "Other";
          totals[name] = (totals[name] || 0) + Number(t.amount);
        }
        const top = Object.keys(totals).sort((a, b) => totals[b] - totals[a])[0];
        reply = `Your highest expense category is ${top} (${money(totals[top])}).`;
        break;
      }

      case "recent": {
        const last = await Transaction.findOne({ include: Category, order: [["date", "DESC"], ["id", "DESC"]] });
        if (!last) {
          reply = "You have no transactions yet.";
          break;
        }
        const t = formatTransaction(last);
        reply = `Your latest transaction is ${t.title} (${t.type}) of ${money(t.amount)}.`;
        break;
      }

      default:
        return res.status(404).json({ message: "Unknown option" });
    }

    res.json({ reply });
  } catch (error) {
    handleError(res, error, "The chatbot could not answer right now");
  }
}

module.exports = { answer };
