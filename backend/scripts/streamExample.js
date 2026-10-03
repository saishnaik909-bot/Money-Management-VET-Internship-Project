// WEEK 5 - Readable, writable and standard streams.   Run: node scripts/streamExample.js
const fs = require("fs");
const { Readable } = require("stream");

// Standard streams: stdout is a writable stream (console.log uses it)
process.stdout.write("Writing with stdout\n");

// Writable stream: writes a file piece by piece
const out = fs.createWriteStream("streamDemo.csv");
out.write("Date,Title,Amount\n");
out.write("2026-10-01,Lunch,150\n");
out.end();

// Readable stream + pipe: lines flow into stdout
out.on("finish", () => {
  fs.createReadStream("streamDemo.csv").pipe(process.stdout);
  // The real SMM CSV export does: Readable.from(lines).pipe(res)
  Readable.from(["(example of Readable.from)\n"]).pipe(process.stdout);
});
