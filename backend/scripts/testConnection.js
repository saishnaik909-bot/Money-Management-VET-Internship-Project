// WEEK 7 - Test the DB connection, then close it.   Run: npm run test-db
const sequelize = require("../config/database");

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection OK");
  } catch (error) {
    console.log("Connection failed:", error.message);
  } finally {
    await sequelize.close(); // close the connection
    console.log("Connection closed");
  }
}

test();
