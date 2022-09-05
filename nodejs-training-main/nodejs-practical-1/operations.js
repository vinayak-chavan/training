const fs = require("fs");
const file =  "trainee.json"

const readFile = fileName => {
  try { 
    return JSON.parse(fs.readFileSync(fileName));
  } 
  catch (e) {
    console.log(e);
  }
};

const writeFile = (fileName, content) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(content));
  } catch (e) {
    console.log("data not found");
  }
};

const add = (traineeID, fullname, emailID, projectAssigned) => {
  if(file.exists){
   let traineeList = readFile(file);
   let index = traineeList.findIndex(x => x.emailID === emailID);
   if (index === -1) {
    traineeList.push({traineeID, fullname, emailID, projectAssigned });
    console.log("data added succeessfully")
   } 
   else {
    console.log("data already exist")
   }
    writeFile(file, traineeList);
  }
  else{
  console.log("file does not exist");
  }
};

const remove = traineeID => {
  if(file.exists){
   let traineeList = readFile(file);
   const filteredList = traineeList.filter(x => x.traineeID !== traineeID);
   writeFile(file, filteredList);
   let newList = readFile(file);
   if(newList.length == traineeList.length){
    console.log("invalid trainee id");
   }
   else{
    console.log("data deleted successfully");
   }
  }
  else{
    console.log("file does not exist");
    }
};

const update = (traineeID, fullname, emailID, projectAssigned) => {
  if(file.exists){
  let traineeList = readFile(file);
  let index = traineeList.findIndex(x => x.traineeID === traineeID);
  if (index === -1) {
    console.log("invalid trainee id");
  }
  else{
    if(fullname != null)
    traineeList[index].fullname = fullname;
    if(emailID != null)
    traineeList[index].emailID = emailID;
    if(projectAssigned != null)
    traineeList[index].projectAssigned = projectAssigned;
    writeFile(file, traineeList);
    console.log("data updated successfully");
  }
  }
  else{
    console.log("file does not exist");
  }
};

const fetchone = traineeID => {
  if(file.exists){
  let traineeList = readFile(file);
  const filteredList = traineeList.filter(x => x.traineeID === traineeID);
  if(filteredList.length === 0){
    console.log("invalid trainee id");
  }else{
  console.log(filteredList);
  }
  }
  else{
  console.log("file does not exist");
  } 
};

const fetchall = () => {
  if(file.exists){
  let traineeList = readFile(file);
  console.log(traineeList);
  } 
  else{
  console.log("file does not exist");
} 

};

module.exports = {
  add,
  remove,
  update,
  fetchone,
  fetchall
};
