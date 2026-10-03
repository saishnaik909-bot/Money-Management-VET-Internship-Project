// WEEK 3 - EventEmitter: the controller "emits" an event, a listener reacts.
const EventEmitter = require("events");

const transactionEvents = new EventEmitter();

transactionEvents.on("transactionAdded", (t) => {
  console.log(`[event] New ${t.type}: ${t.title} (Rs ${t.amount})`);
});

module.exports = transactionEvents;
