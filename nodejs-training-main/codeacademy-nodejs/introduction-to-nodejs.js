
// Running a Program with Node

let noun1 = 'cake';
let adjective = 'very';
let noun2 = 'sweet';
let verb = 'all';
let noun3 = 'cake';

console.log(`The world's first ${noun1} was a very ${adjective} ${noun2} who loved to ${verb} while eating ${noun3} for every meal.`);


// The Console Module

const petsArray = ['dog', 'cat', 'bird', 'monkey'];

console.log(petsArray);
console.table(petsArray);
console.assert(petsArray.length > 5);


// The Process Module

let initialMemory = process.memoryUsage().heapUsed;
let word = process.argv[2];

console.log(`Your word is ${word}`)
let wordArray = [];
for (let i = 0; i < 1000; i++){
  wordArray.push(`${word} count: ${i}`)
}
console.log(`Starting memory usage: ${initialMemory}. \nCurrent memory usage: ${process.memoryUsage().heapUsed}. \nAfter using the loop to add elements to the array, the process is using ${process.memoryUsage().heapUsed - initialMemory} more bytes of memory.`)


// The OS Module

const os = require('os');
const server = {
  type: os.type(),
  architecture: os.arch(),
  uptime: os.uptime()
}
console.log(server);


// The Util Module

const trails = require('./trails.js');
const util = require('util');
const getTrailDistance = (trail, callback) => {
  return setTimeout(() => {
    if (trails.hasOwnProperty(trail)) {    
      const foundTrail = trails[trail];    
      callback(null, foundTrail)
    } else {
      callback(new Error('Trail not found!'))
    }
  }, 1000);
}
function callback (error, trailData) {
  if (error) {
    console.error(error.message)
    process.exit(1)
  } else {
    const mi = trailData.miles;   
    const nickname = trailData.nickname;
    console.log(`The ${nickname} is ${mi} miles long!`)
  }
}
getTrailDistance('North Country', callback)
const getTrailDistancePromise = util.promisify(getTrailDistance);
getTrailDistancePromise('North Country')
  .then((foundTrail) => {      
    const nickname = foundTrail.nickname;
    const mi = foundTrail.miles; 
    console.log(`The ${nickname} is ${mi} miles long!`);
  })
  .catch((error) => {
    console.log('Trail not found!', error);
  })

