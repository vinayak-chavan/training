const number = [10, 20, 100, 40, 50];
function maximum(number){
const max= number.reduce((accumulator, currentValue) => {
    accumulator= (currentValue > accumulator) ? currentValue:accumulator;
    return accumulator;
}, 0);
console.log(max);
}
maximum(number);