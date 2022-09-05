
// The Events Module

let events = require('events');

let listenerCallback = (data) => {
    console.log(`Celebrate ${data}`);
}
let myEmitter = new events.EventEmitter();
myEmitter.on('celebration', listenerCallback);
myEmitter.emit('celebration', 'good times, come on!');


// User Input/Output

let {testNumber} = require('./game.js');
process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n(Write \"quit\" to give up.)\n\nIs the number ... ");
let playGame = (userInput) => {
  let input = userInput.toString().trim();
	testNumber(input);
};

process.stdin.on('data', playGame);


// The Error Module

const api = require('./api.js');
let callbackFunc = (data) => {
   console.log(`Something went right. Data: ${data}\n`);
}; 
try {
  api.naiveErrorProneAsyncFunction('problematic input', callbackFunc);
} catch(err) {
  console.log(`Something went wrong. ${err}\n`);
}



// The Buffer Module

const bufferAlloc = Buffer.alloc(15, 'b');
const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from('world');
const bufferArray = [buffer1, buffer2];
const bufferConcat = Buffer.concat(bufferArray);

const bufferString = bufferConcat.toString();

console.log(bufferAlloc);
console.log('Buffer 1:', buffer1, 'Buffer 2:', buffer2)
console.log(bufferConcat);
console.log(bufferString);


// The FS Module

const fs = require('fs');
let secretWord = null;
let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};
fs.readFile('./finalFile.txt', 'utf-8', readDataCallback);
secretWord = "cheeseburgerpizzabagels"


// Readable Streams

const readline = require('readline');
const fs = require('fs');
let settings = {
  input: fs.createReadStream('shoppingList.txt')
};
const myInterface = readline.createInterface(settings);

const printData = (data) => {
  console.log(`Item: ${data}`);
};
myInterface.on('line', printData);


// Writeable Streams

const readline = require('readline');
const fs = require('fs');
const myInterface = readline.createInterface({
  input: fs.createReadStream('shoppingList.txt')
});
const fileStream = fs.createWriteStream('shoppingResults.txt');

let transformData = (line) => {
 fileStream.write(`They were out of: ${line}\n`); 
};
myInterface.on('line', transformData);


//The Timers Module

setImmediate(() => {
  console.log('I got called right away!');
})