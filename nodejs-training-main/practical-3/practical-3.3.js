/* Write a function that takes an array containing duplicate numbers as an argument and returns 
the array containing only unique nos. (use ES6 concepts like Set and spread operator.) */

const number = [10, 20, 10, 60, 20, 10, 50, 40];
const distinctvalues = (number) => {
    return newArray = [...new Set (number)]
}
console.log(distinctvalues(number));
