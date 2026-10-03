// WEEK 6 - Cron job: runs a task on a schedule.   Run: node scripts/cronExample.js
const cron = require("node-cron");

// "*/10 * * * * *" = every 10 seconds.   "0 9 * * *" = every day at 9:00 AM
cron.schedule("*/10 * * * * *", () => {
  console.log("[cron]", new Date().toLocaleTimeString(), "- Reminder: add today's expenses!");
});

console.log("Cron job started. Press Ctrl+C to stop.");
