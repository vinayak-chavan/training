const number = [10, 20, -10, 40, 50];
function average(number){
const sum= number.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);
const len= number.length;
console.log(sum/len);
}
average(number);