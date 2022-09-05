/* Write a function which takes 2 objects as an argument and swaps each other without taking 
the temporary third object. Also return the array containing swapped objects and to hold those
returned objects use the same objects you have passed to the function. (use ES6 concepts.) */

let obj1 = {
    empId : 11,
    empName : 'vinayak chavan',
    techassigned : "NodeJS",
    college : "vgec"
};
let obj2 = {
    empId : 22,
    empName : 'darshan atnk',
    techassigned : "asp .net",
    college : "vgec"
};
console.log("Before Swapping \n")
console.log(obj1);
console.log(obj2);
const swapping = (obj1, obj2) => {
    [obj1, obj2] = [obj2, obj1];
    return [obj1, obj2];
}
console.log("\n After Swapping \n");
console.log(swapping(obj1,obj2));
