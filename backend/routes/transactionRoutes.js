const express = require("express");
const c = require("../controllers/transactionController");

const router = express.Router();

// IMPORTANT: specific routes (export, category) must come BEFORE "/:id",
// otherwise Express would treat the word "export" as an id.
router.get("/export/:year/:month", c.exportCsv);
router.get("/category/:category", c.getByCategory);

router.get("/", c.getTransactions);
router.get("/:id", c.getTransactionById);
router.post("/", c.createTransaction);
router.put("/:id", c.updateTransaction);
router.delete("/:id", c.deleteTransaction);

module.exports = router;
