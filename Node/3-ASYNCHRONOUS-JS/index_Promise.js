const fs = require('fs');
const superagent = require('superagent');

// Building Promises

// Building a promise to read a file
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I cannot find the specified file.');
      resolve(data);
    });
  });
}

// Building a promise to write to a file

const writeFilePro = (file, data) => {

  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Cannot write to file .");
      resolve('success writing to file');
    });
  });
}

readFilePro(`${__dirname}/dog.txt`).then(data => {
  console.log(`Breed : ${data}`);

  // Promises - Pending , Result .Result can be resolved or rejected .
  return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => {
  console.log(res.body.message);
  return writeFilePro('dog-img.txt', res.body.message);
})
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch(err => console.log(err));

