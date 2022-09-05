const yargs = require("yargs");
const {v4 : uuidv4} = require("uuid");
const commands = require("./operations");

let command = yargs.argv.operation;
let fullname = yargs.argv.fullname;
let emailID = yargs.argv.emailID;
let projectAssigned = yargs.argv.projectAssigned;
let traineeID = yargs.argv.traineeID;

if (command === "add") {
  let id = uuidv4();
  if (fullname && emailID && projectAssigned) {
    commands.add(id, fullname, emailID, projectAssigned);
  }
  else{
    console.log("something is missing");
  }
}
else if(command === 'delete'){
  if (traineeID) {
    commands.remove(traineeID);
  }
}
else if(command === 'update'){
  if (traineeID) {
    commands.update(traineeID, fullname, emailID, projectAssigned);
  }
}
else if(command === 'fetchone'){
  if (traineeID) {
    commands.fetchone(traineeID);
  }
}
else if(command === 'fetchall'){
    commands.fetchall();
}
else{
    console.log('invalid operation name');
}
