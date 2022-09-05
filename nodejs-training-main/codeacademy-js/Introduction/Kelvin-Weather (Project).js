const kelvin = 293;
/* kevin varibale defined as const */

const celsius = kelvin - 273;
/* celsius variable defined as const */

var fahrenheit = celsius * (9/5) + 32
/* fahrenheit defined with var */

fahrenheit = Math.floor(fahrenheit);
/* converting floating value in decimal */

console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
let newton = celsius * (33/100)
newton = Math.floor(newton);
console.log(`The temperature is ${newton} degrees Newton.`);