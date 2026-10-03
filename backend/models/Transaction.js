// WEEK 8/9 - Model with validation.
// Amount is ALWAYS stored positive. "type" decides if it is income or expense.
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define("Transaction", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Type is required" },
      isIn: { args: [["income", "expense"]], msg: "Type must be income or expense" },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Title is required" },
      notEmpty: { msg: "Title is required" },
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: { msg: "Amount is required" },
      isDecimal: { msg: "Amount must be a number" },
      min: { args: [0.01], msg: "Amount must be greater than 0" },
    },
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Payment mode is required" },
      isIn: { args: [["UPI", "Cash"]], msg: "Payment mode must be UPI or Cash" },
    },
  },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  description: { type: DataTypes.TEXT },
  // "categoryId" is added automatically by the association in models/index.js
}, { tableName: "transactions" });

module.exports = Transaction;
