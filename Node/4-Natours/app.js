const fs = require('fs');
const express = require('express');
const app = express();

// GET
// app.get('/', (req, res) => {

//   //res.status(200).send('Hello from server side!');
//   res.status(200)
//     .json(
//       {
//         message: 'Hello from server side!',
//         app: 'natours'
//       }
//     );
// });
// //POST
// app.post('/', (req, res) => {

//   res.send('You can post to this end point ...');

// });

// one time read of tours data , so can be at top level code and sync version can be used and it will not block eventloop

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// GET

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours   // tours:tours,in ES6 when key value are same,obejct can be represented 
      //with a single key 
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
})