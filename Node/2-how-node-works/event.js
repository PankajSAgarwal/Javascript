const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {

  constructor() {
    super();
  }
}
//const myEmitter = new EventEmitter();
const myEmitter = new Sales();

// Observer pattern . Event Listener class
myEmitter.on('newSale', () => {
  console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
  console.log('Customer Name: Pankaj');
});

myEmitter.on('newSale', stock => {
  console.log(`There are only ${stock} items left in stock`);
})

//Event class emits an event called as newSale with an argument of 9 which can be listened for
myEmitter.emit('newSale', 9);

////////////////////////////////////////////////////////////////

// Building an http server and listening to events

const server = http.createServer();
server.on('request', (req, res) => {
  console.log(req.url);
  console.log("Request received");
  res.end("Request received");
});

server.on('request', (req, res) => {
  console.log("Another Request received");
});

server.on('close', () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});