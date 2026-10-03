// WEEK 3 - EventEmitter + callbacks + exception handling.   Run: node scripts/eventExample.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("transactionAdded", (title, amount) => {
  console.log(`Transaction added: ${title} - Rs ${amount}`);
});

emitter.emit("transactionAdded", "Lunch", 150);

// Callback: a function passed to another function, called later
setTimeout(() => console.log("3) Callback after 1 second"), 1000);

// Exception handling
try {
  JSON.parse("not json");
} catch (error) {
  console.log("Caught error:", error.message);
}
console.log("2) This prints BEFORE the callback (event loop)");
