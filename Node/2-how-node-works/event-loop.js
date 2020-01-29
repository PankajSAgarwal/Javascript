const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

// Setting the Thread pool in LIBUV , by default it is 4

process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => console.log("Timer 1 finsihed"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("---------------------");
  setTimeout(() => console.log("Timer 2 finsihed"), 0);
  setTimeout(() => console.log("Timer 3 finsihed"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, "password encrypted");
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, "password encrypted");
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, "password encrypted");
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, "password encrypted");
  });

});

console.log("Hello from top level code");