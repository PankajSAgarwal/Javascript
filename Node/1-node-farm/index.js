const fs = require('fs');

// Blocking , Syncronous way

// Read File synchronously
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// Write File synchronously
// const textOut = `This is what we know about avocado:${textIn}.\n Created ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written .');

// Non - Blocking , asynchronous way

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  // In case file name is wrong
  if (err) {
    return console.log('Error 😓');
  }

  console.log(data1);
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('Your file has been written successfully.');
      });
    });
  });
});

console.log('Will read File !');