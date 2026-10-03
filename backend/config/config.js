// Used ONLY by sequelize-cli (the migration tool).
require("dotenv").config({ quiet: true });

const settings = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
};

module.exports = { development: settings, production: settings };
