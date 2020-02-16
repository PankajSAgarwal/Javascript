//console.log(arguments);
//console.log(require('module').wrapper);

// module.exports

const C = require('./test-module-1');

const calc1 = new C();

console.log(calc1.add(2, 5));

//exports

//const calc2 = require('./test-module-2');
// ES6 destructuring
// We can only import properties that we require
const {
  add,
  multiply,
  divide
} = require('./test-module-2');
//console.log(calc2.add(2, 5));
//console.log(calc2.multiply(2, 5))

console.log(multiply(2, 5));

// Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();