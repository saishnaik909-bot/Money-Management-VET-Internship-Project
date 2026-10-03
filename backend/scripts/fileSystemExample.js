// WEEK 4 - File system, Promises, promise chaining, command-line arguments.
// Run: node scripts/fileSystemExample.js myNote.txt
const fs = require("fs");

// Command-line arguments: process.argv[0]=node, [1]=script, [2]=first argument
const fileName = process.argv[2] || "note.txt";

// 1) Callback style
fs.writeFile(fileName, "SMM note: track every rupee.\n", (err) => {
  if (err) return console.log("Write failed:", err.message);
  console.log("File written:", fileName);

  // 2) Promise chaining with .then()
  fs.promises
    .readFile(fileName, "utf8")
    .then((text) => {
      console.log("File content:", text.trim());
      return text.length;
    })
    .then((length) => console.log("Length:", length))
    .catch((error) => console.log("Read failed:", error.message))
    .finally(() => run());
});

// 3) The same thing with async/await
async function run() {
  await fs.promises.appendFile(fileName, "Second line added.\n");
  const text = await fs.promises.readFile(fileName, "utf8");
  console.log("After append:\n" + text);
}
