/* Write a function to arrange the objects of the JSON array given in the file based on 
the key technologyAssigned. The function should return one object where keys of the 
resultant object are the different technologies and the value will be an array containing 
trainees who were assigned into specific technologies. */

const traineeArray = require('./Practical - 3.1.json');
const techWithTrainee = arrObj => {
    let result= {};
    arrObj.forEach(obj => { 
        let tech = obj.technologyAssigned;
        if(result[tech]) {
            result[tech].push(obj.fullName);
        }
        else{
            let arr=[];
            arr.push(obj.fullName);
            result[tech] =arr;
        }        
    })
    return result;
}
console.log(techWithTrainee(traineeArray));