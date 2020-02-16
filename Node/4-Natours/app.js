const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // express.json() is middleware, express by default doesnt add data to request,so need to use a middleware

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

// POST
// Express by default doesnt add data to the body of request so we need to use a middleware e.g app.use(express.json())

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  )
});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
})