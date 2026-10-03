const express = require("express");
const c = require("../controllers/summaryController");

const router = express.Router();
router.get("/", c.getSummary);
router.get("/monthly", c.getMonthly);
router.get("/yearly", c.getYearly);
router.get("/raw", c.getRawTotal);

module.exports = router;
