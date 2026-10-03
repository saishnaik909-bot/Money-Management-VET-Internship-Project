// Dashboard numbers. Amounts are stored positive, so a plain SUM works.
const { Op } = require("sequelize");
const { Transaction } = require("../models");
const dateRange = require("../utils/dateRange");
const handleError = require("../utils/handleError");
const { getTotalExpensesRaw } = require("../services/rawQueryService");

// Sum of amounts for one type, optionally inside a date range
async function sumAmount(type, range) {
  const where = { type };
  if (range) where.date = { [Op.gte]: range.start, [Op.lt]: range.end };
  const total = await Transaction.sum("amount", { where });
  return Number(total) || 0; // sum() gives null/NaN when there are no rows
}

function currentMonthRange() {
  const now = new Date();
  return dateRange(now.getFullYear(), now.getMonth() + 1);
}

function currentYearRange() {
  return dateRange(new Date().getFullYear());
}

// GET /api/summary
async function getSummary(req, res) {
  try {
    res.json({
      totalIncome: await sumAmount("income"),
      totalExpenses: await sumAmount("expense"),
      monthlyExpenses: await sumAmount("expense", currentMonthRange()),
      yearlyExpenses: await sumAmount("expense", currentYearRange()),
    });
  } catch (error) {
    handleError(res, error, "Failed to load summary");
  }
}

// GET /api/summary/monthly
async function getMonthly(req, res) {
  try {
    res.json({ monthlyExpenses: await sumAmount("expense", currentMonthRange()) });
  } catch (error) {
    handleError(res, error, "Failed to load monthly summary");
  }
}

// GET /api/summary/yearly
async function getYearly(req, res) {
  try {
    res.json({ yearlyExpenses: await sumAmount("expense", currentYearRange()) });
  } catch (error) {
    handleError(res, error, "Failed to load yearly summary");
  }
}

// GET /api/summary/raw  (WEEK 9 - same total as above, but with raw SQL)
async function getRawTotal(req, res) {
  try {
    res.json({ totalExpenses: await getTotalExpensesRaw() });
  } catch (error) {
    handleError(res, error, "Failed to load summary");
  }
}

module.exports = { sumAmount, getSummary, getMonthly, getYearly, getRawTotal };
