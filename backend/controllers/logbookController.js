// Log Book: Year -> Month -> Transactions
const { Op } = require("sequelize");
const { Transaction, Category } = require("../models");
const formatTransaction = require("../utils/formatTransaction");
const dateRange = require("../utils/dateRange");
const handleError = require("../utils/handleError");

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// GET /api/logbook/years  -> [2027, 2026]  (built from real transaction dates)
async function getYears(req, res) {
  try {
    const rows = await Transaction.findAll({ attributes: ["date"] });
    const years = [...new Set(rows.map((r) => new Date(r.date).getFullYear()))];
    years.sort((a, b) => b - a);
    res.json(years);
  } catch (error) {
    handleError(res, error, "Failed to load years");
  }
}

// GET /api/logbook/:year -> all 12 months with their totals
async function getMonths(req, res) {
  try {
    const { start, end } = dateRange(req.params.year);
    const rows = await Transaction.findAll({
      where: { date: { [Op.gte]: start, [Op.lt]: end } },
    });

    const months = MONTH_NAMES.map((name, index) => ({
      month: index + 1, name, count: 0, income: 0, expenses: 0,
    }));
    for (const t of rows) {
      const m = months[new Date(t.date).getMonth()];
      m.count += 1;
      if (t.type === "income") m.income += Number(t.amount);
      else m.expenses += Number(t.amount);
    }
    res.json(months);
  } catch (error) {
    handleError(res, error, "Failed to load months");
  }
}

// GET /api/logbook/:year/:month -> totals + transactions of that month
async function getMonthDetails(req, res) {
  try {
    const { year, month } = req.params;
    const { start, end } = dateRange(year, month);
    const rows = await Transaction.findAll({
      where: { date: { [Op.gte]: start, [Op.lt]: end } },
      include: Category,
      order: [["date", "DESC"], ["id", "DESC"]],
    });

    const transactions = rows.map(formatTransaction);
    let income = 0;
    let expenses = 0;
    for (const t of transactions) {
      if (t.type === "income") income += t.amount;
      else expenses += t.amount;
    }

    res.json({
      year: Number(year),
      month: Number(month),
      monthName: MONTH_NAMES[Number(month) - 1],
      income,
      expenses,
      balance: income - expenses,
      transactions,
    });
  } catch (error) {
    handleError(res, error, "Failed to load month");
  }
}

module.exports = { getYears, getMonths, getMonthDetails };
