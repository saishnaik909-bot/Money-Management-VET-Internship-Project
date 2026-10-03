// WEEK 6 - BLOCKING code: nothing else can run until it finishes.
const fs = require("fs");
fs.writeFileSync("big.txt", "hello\n");

console.log("1) Start");
const data = fs.readFileSync("big.txt", "utf8"); // program WAITS here
console.log("2) File read:", data.trim());
console.log("3) End  (printed last because the read blocked everything)");
