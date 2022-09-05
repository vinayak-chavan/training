const path = require('path');
const dataCallback = require('./operations/callback.js');
const dataPromise = require('./operations/promises.js');
const dataAsync = require('./operations/dataAsync.js')


const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const me = argv.method;

    if(me === "callback"){
        dataCallback();
    }
    else if(me === "promises"){
        dataPromise();
    }
    else if(me === "asyncawait"){
        dataAsync();
    }
    else{
        console.log("Invalid Opeation");
    }

