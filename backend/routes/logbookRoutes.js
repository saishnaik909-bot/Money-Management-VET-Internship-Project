const express = require("express");
const c = require("../controllers/logbookController");

const router = express.Router();
router.get("/years", c.getYears);
router.get("/:year", c.getMonths);
router.get("/:year/:month", c.getMonthDetails);

module.exports = router;
