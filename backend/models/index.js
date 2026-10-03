// WEEK 10 - Associations: one Category has many Transactions.
const sequelize = require("../config/database");
const Category = require("./Category");
const Transaction = require("./Transaction");

Category.hasMany(Transaction, { foreignKey: "categoryId" });
Transaction.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = { sequelize, Category, Transaction };
