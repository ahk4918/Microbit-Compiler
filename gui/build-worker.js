const { parentPort, workerData } = require("worker_threads");
const path = require("path");
const { compile } = require("../compiler.js");

// Only pipe what the compiler actually says
console.log = (msg) => parentPort.postMessage(msg);
console.error = (msg) => parentPort.postMessage(msg);

async function execute() {
    try {
        // No extra "Initializing" logs here
        compile(workerData.filePath); 
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}
execute();
