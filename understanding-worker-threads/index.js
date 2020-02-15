// https://nodesource.com/blog/worker-threads-nodejs/
const { Worker } = require('worker_threads')

// example #1
const worker = new Worker(`
const { parentPort } = require('worker_threads')
parentPort.once('message',
  message => parentPort.postMessage({ pong: message }))
`, { eval: true })
worker.on('message', message => console.log(message))
worker.postMessage('ping')
