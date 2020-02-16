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

// ES8 async await

const getDocPic = async () => {

  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:Ready';
};

// Using IIFE with async await to handle return values from async function

(
  async () => {
    try {
      console.log('1. Will get Doc Pic');
      const x = await getDocPic();
      console.log('2. Ready');
      console.log('3. Done Getting Dog Pic');
    } catch (err) {
      console.log("Error : " + err);
    }
  }
)();

//call the async func here
// using then catch to return values from async function
/*
console.log('1. Getting doc Pic');
getDocPic().then(x => {
  console.log(x);
  console.log('3. Done getting dog pic!!!');
})
  .catch(err => {

    console.log("Error : " + err);
  });*/

// ES 6 promises and promise chahining
/*readFilePro(`${__dirname}/dog.txt`).then(data => {
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
*/
