// WEEK 1/2/5 - The Express server. It is the "gateway" between
// the React frontend and the MySQL database.
require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const logbookRoutes = require("./routes/logbookRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

// Middleware = functions that run between the request and the response
app.use(cors());          // lets React (port 5173) call this server (port 5000)
app.use(express.json());  // reads JSON bodies sent by React

app.get("/", (req, res) => res.json({ message: "SMM API is running" }));

// WEEK 5 - Request headers demo: shows what the browser sent us
app.get("/api/headers", (req, res) => {
  res.json({
    userAgent: req.headers["user-agent"],
    contentType: req.headers["content-type"] || null,
    host: req.headers.host,
  });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/logbook", logbookRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Unknown route
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;

async function start() {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  try {
    await sequelize.authenticate(); // WEEK 7 - test the connection
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed. Check your .env file and MySQL.");
    console.log(error.message);
  }
}

start();
