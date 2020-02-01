const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1 : Without streams
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // solution 2 : With streams

  // const readable = fs.createReadStream('testtt-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // });

  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File Not Found');
  // });

  // Solution 3 : Handling back pressure: situtation to avoid overwhelming writeable stream when readstream is faster than write : Using pipe

  const readable = fs.createReadStream('test-file.txt');

  // readableSource.pipe(writeableDestination)
  readable.pipe(res);
});



server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});