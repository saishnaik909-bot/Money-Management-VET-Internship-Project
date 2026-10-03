// WEEK 3/4/8/9 - async/await + try/catch + Sequelize finders.
const { Readable } = require("stream");
const { Op } = require("sequelize");
const { Transaction, Category } = require("../models");
const formatTransaction = require("../utils/formatTransaction");
const dateRange = require("../utils/dateRange");
const handleError = require("../utils/handleError");
const transactionEvents = require("../events");

// Find the id of a category from its name (e.g. "Food" -> 1)
async function findCategoryId(name) {
  const category = await Category.findOne({ where: { name: name || "Other" } });
  return category ? category.id : null;
}

// Reads one transaction again together with its Category
function findWithCategory(id) {
  return Transaction.findByPk(id, { include: Category });
}

// GET /api/transactions?category=Food&type=expense&year=2026&month=10
async function getTransactions(req, res) {
  try {
    const { category, type, year, month } = req.query;

    const where = {};
    if (type) where.type = type;
    if (year) {
      const { start, end } = dateRange(year, month);
      where.date = { [Op.gte]: start, [Op.lt]: end };
    }

    // Filtering by category uses the Category association (an INNER JOIN)
    const include = [{ model: Category, ...(category ? { where: { name: category } } : {}) }];

    const rows = await Transaction.findAll({
      where,
      include,
      order: [["date", "DESC"], ["id", "DESC"]],
    });
    res.json(rows.map(formatTransaction));
  } catch (error) {
    handleError(res, error, "Failed to load transactions");
  }
}

// GET /api/transactions/category/:category  (same as ?category=...)
function getByCategory(req, res) {
  req.query.category = req.params.category;
  return getTransactions(req, res);
}

// GET /api/transactions/:id
async function getTransactionById(req, res) {
  try {
    const row = await findWithCategory(req.params.id);
    if (!row) return res.status(404).json({ message: "Transaction not found" });
    res.json(formatTransaction(row));
  } catch (error) {
    handleError(res, error, "Failed to load transaction");
  }
}

// POST /api/transactions
async function createTransaction(req, res) {
  try {
    const { type, title, amount, category, paymentMode, date, description } = req.body;
    const categoryId = await findCategoryId(category);
    if (!categoryId) return res.status(400).json({ message: "Invalid category" });

    const created = await Transaction.create({
      type,
      title: title ? String(title).trim() : title,
      amount,
      categoryId,
      paymentMode,
      date: date || new Date(),
      description,
    });

    const row = await findWithCategory(created.id);
    const result = formatTransaction(row);
    transactionEvents.emit("transactionAdded", result); // WEEK 3 event
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error, "Failed to add transaction");
  }
}

// PUT /api/transactions/:id
async function updateTransaction(req, res) {
  try {
    const row = await Transaction.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Transaction not found" });

    const { type, title, amount, category, paymentMode, date, description } = req.body;
    const changes = { type, title, amount, paymentMode, date, description };
    if (title !== undefined) changes.title = String(title).trim();
    if (category) {
      changes.categoryId = await findCategoryId(category);
      if (!changes.categoryId) return res.status(400).json({ message: "Invalid category" });
    }

    await row.update(changes); // update() runs the validation again
    const updated = await findWithCategory(row.id);
    res.json(formatTransaction(updated));
  } catch (error) {
    handleError(res, error, "Failed to update transaction");
  }
}

// DELETE /api/transactions/:id
async function deleteTransaction(req, res) {
  try {
    const row = await Transaction.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Transaction not found" });
    await row.destroy();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    handleError(res, error, "Unable to delete transaction");
  }
}

// WEEK 5 - CSV export using a stream.
// Readable.from(lines) is a READABLE stream, "res" is a WRITABLE stream.
// pipe() connects them: every line flows from the first to the second.
function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`; // wrap in quotes, escape quotes
}

// GET /api/transactions/export/:year/:month
async function exportCsv(req, res) {
  try {
    const { year, month } = req.params;
    const { start, end } = dateRange(year, month);
    const rows = await Transaction.findAll({
      where: { date: { [Op.gte]: start, [Op.lt]: end } },
      include: Category,
      order: [["date", "ASC"]],
    });

    const lines = ["Date,Title,Type,Category,Payment Mode,Amount,Description\n"];
    for (const t of rows.map(formatTransaction)) {
      const day = new Date(t.date).toISOString().slice(0, 10);
      lines.push(
        [day, csvCell(t.title), t.type, t.category, t.paymentMode, t.amount, csvCell(t.description)].join(",") + "\n"
      );
    }

    const fileMonth = String(month).padStart(2, "0");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="transactions-${year}-${fileMonth}.csv"`);
    Readable.from(lines).pipe(res);
  } catch (error) {
    handleError(res, error, "Failed to export CSV");
  }
}

module.exports = {
  getTransactions,
  getByCategory,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  exportCsv,
};
