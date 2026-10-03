// WEEK 9 - Raw SQL query.
// Sometimes you write the SQL yourself instead of using finders like findAll().
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

async function getTotalExpensesRaw() {
  const sql = "SELECT SUM(amount) AS total FROM transactions WHERE type = :type";

  // ":type" is a named replacement. Sequelize inserts it safely
  // (this protects against SQL injection).
  const result = await sequelize.query(sql, {
    replacements: { type: "expense" },
    type: QueryTypes.SELECT,
  });

  return Number(result[0].total) || 0;
}

module.exports = { getTotalExpensesRaw };
