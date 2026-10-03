const express = require("express");
const c = require("../controllers/chatbotController");

const router = express.Router();
router.get("/:option", c.answer);

module.exports = router;
