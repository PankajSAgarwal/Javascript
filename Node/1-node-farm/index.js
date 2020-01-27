const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");
////////////////////////////////////////////////////////////////////////////////////////////
////////*************************** FILES ********************************/////////////////////
// Blocking , Syncronous way

// Read File synchronously
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// Write File synchronously
// const textOut = `This is what we know about avocado:${textIn}.\n Created ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written .');

// Non - Blocking , asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   // In case file name is wrong
//   if (err) {
//     return console.log('Error 😓');
//   }

//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written successfully.');
//       });
//     });
//   });
// });

// console.log('Will read File !');

///////////////////////////////////////////////////////////////////////////////////////////////
////////*************************** SERVER ********************************////////////////////

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //console.log(req);
  //res.end('Hello from Server !');
  //console.log(url.parse(req.url, true));
  // ES6 destructuring to assign variables query and pathname direcly the value from url.parse

  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    //console.log(cardsHtml);

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }
  // PRODUCT Page
  else if (pathname === "/product") {
    //console.log(query);
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // API PAGE
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(data);
  }
  // NOT FOUND Page
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world"
    });
    res.end("<h1> Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000 .");
});
