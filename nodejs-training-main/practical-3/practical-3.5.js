/* 
- Write a function to sort the given array in ascending order based on the timeToReachFinishLine.
- Write another function which finds values of winner, firstRunnerUp, secondRunnerUp and puts the  remaining 
  elements into an array called justParticipants. (you are supposed to declare and initialize all of these 
  variables together in a single line. you cannot create more variables other than these 4 variables.) */

const sprinters = [{
    "name": "James",
    "timeToReachFinishLine": 9.10
    },
    {
    "name": "George",
    "timeToReachFinishLine": 9.11
    },
    {
    "name": "Robert",
    "timeToReachFinishLine": 9.25
    },
    {
    "name": "Mary",
    "timeToReachFinishLine": 9.13
    },
    {
    "name": "Patricia",
    "timeToReachFinishLine": 9.14
    },
    {
    "name": "Christopher",
    "timeToReachFinishLine": 10.0
    },
    {
    "name": "Thomas",
    "timeToReachFinishLine": 11.0
    },
    {
    "name": "Anthony",
    "timeToReachFinishLine": 9.0
    },
    {
    "name": "Timothy",
    "timeToReachFinishLine": 19.0
    },
    {
    "name": "Samuel",
    "timeToReachFinishLine": 10.10
    }
];

/* Sorting array of object */
sprinters.sort(function(a,b) {
    return a.timeToReachFinishLine - b.timeToReachFinishLine;
});
console.log(sprinters);

/* Position function */
const findResult = (sprinters) => {
let winner, firstRunnerUp, secondRunnerUp, justParticipants;
[winner, firstRunnerUp, secondRunnerUp, ...justParticipants] = sprinters;
console.log("Winner : ");
console.log(winner);
console.log("First Runner Up : ");
console.log(firstRunnerUp);
console.log("second Runner Up : ");
console.log(secondRunnerUp);
console.log("Just Participants : ");
console.log(justParticipants);
}
findResult(sprinters);
