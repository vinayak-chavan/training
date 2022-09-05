
/* <--- Repeating Tasks Manually ---> */
const vacationSpots = ['Maldives','Paris','Newyork'];
console.log(vacationSpots[0]);
console.log(vacationSpots[1]);
console.log(vacationSpots[2]);


/* <--- The For Loop ---> */
for (let counter = 5; counter <= 10; counter++) {
  console.log(counter);
}


/* <--- Looping in Reverse ---> */
// The loop below loops from 0 to 3. Edit it to loop backwards from 3 to 0
for (let counter = 3; counter >= 0; counter--){
  console.log(counter);
}


/* <--- Looping through Arrays ---> */
const vacationSpots = ['Bali', 'Paris', 'Tulum'];
for (let i = 0; i < vacationSpots.length; i++){
  console.log('I would love to visit ' + vacationSpots[i]);
}


/* <--- Nested Loops ---> */
var bobsFollowers = ['vinayak','pradip','darshan','vishal'];
var tinasFollowers = ['vinayak','pradip','jay'];
var mutualFollowers = []
for (let i = 0; i < bobsFollowers.length; i++) {
for (let j = 0; j < tinasFollowers.length; j++) {
if (bobsFollowers[i] === tinasFollowers[j]) {
mutualFollowers.push(tinasFollowers[j])
console.log(tinasFollowers[j])
}
}
};


/* <--- The While Loop ---> */
const cards = ['diamond', 'spade', 'heart', 'club'];
let currentCard;
while ( currentCard != 'spade') {  
  currentCard = cards[Math.floor(Math.random() * 4)];  
  console.log(currentCard);
}


/* <--- Do...While Statements ---> */
var cupsOfSugarNeeded = 5;
var cupsAdded = 0;
do {
  cupsAdded++
 console.log(cupsAdded + ' cup was added')
} while (cupsAdded < cupsOfSugarNeeded);
 

/* <--- The break Keyword ---> */
const rapperArray = ["Lil' Kim", "Jay-Z", "Notorious B.I.G.", "Tupac"];
for (let i = 0; i < rapperArray.length; i++){
  console.log(rapperArray[i]);
  if (rapperArray[i] === 'Notorious B.I.G.'){
    break;
  }
}
console.log("And if you don't know, now you know.");
