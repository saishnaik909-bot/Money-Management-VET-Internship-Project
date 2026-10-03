// WEEK 7 - Sequelize connection to MySQL.
// Credentials come from the .env file (never hard-code passwords).
require("dotenv").config({ quiet: true });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // set to console.log to see the SQL Sequelize generates
  }
);

module.exports = sequelize;
