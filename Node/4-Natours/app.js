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

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours   // tours:tours,in ES6 when key value are same,obejct can be represented 
      //with a single key 
    }
  });
}

const getTour = (req, res) => {

  console.log(req.params);
  // id returned would be string so convert it to number so that array.find can use number to comapre the id in next step
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  //if (id > tours.length) 
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

const updateTour = (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: '<tour updated here>>'
  });
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  // Status code 204 : no content for delete
  res.status(204).json({
    status: 'success',
    data: null
  });
}

const createTour = (req, res) => {
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
}
// GET
//app.get('/api/v1/tours', getAllTours);
// Get a tour with specific id
//app.get('/api/v1/tours/:id', getTour);
// PATCH
// Just for demo purposes , nothing updated 
//app.patch('/api/v1/tours/:id', updateTour);
// DELETE
//app.delete('/api/v1/tours/:id', deleteTour);
// POST
// Express by default doesnt add data to the body of request so we need to use a middleware e.g app.use(express.json())

//app.post('/api/v1/tours', createTour);

// Better way of handling routes

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
})