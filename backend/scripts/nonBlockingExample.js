// WEEK 6 - NON-BLOCKING code: Node starts the work and continues.
const fs = require("fs");
fs.writeFileSync("big.txt", "hello\n");

console.log("1) Start");
fs.readFile("big.txt", "utf8", (err, data) => {
  console.log("3) File read (callback):", data.trim());
});
console.log("2) End  (printed BEFORE the file content)");
