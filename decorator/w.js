const { Worker, isMainThread, parentPort } = require('worker_threads');

// Check if it's the main module
if (isMainThread) {
    console.log('isMainThread:', isMainThread);
  // Create a new child worker
  const worker = new Worker(__filename);

  // Listen for messages from the worker
  worker.on('message', message => console.log('Received:', message));

  // Send a message to the worker
  worker.postMessage('Hello from the main thread!');
} else {
  // Listen for messages from the main thread
  parentPort.on('message', message => {
    console.log('Received in the worker:', message);
    // Send a message back to the main thread
    parentPort.postMessage('Hello from the worker thread!');
  });
}