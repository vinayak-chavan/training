/* create a copy of this object into another object. Modify the firstName to
Krushit and lastName to Dudhat and also change the emailID to that of
Krushit of the newly created clone. */

const employee = {
    employeeID: 1,
    fullName: "Lav Panchal",
    emailID: "lav.panchal@bacancy.com",
    department: "NodeJS",
    designation: "Software Engineer"
};

// Object.assign() method is used to copy clone object which is type of shallow copy

const cloneEmployee = Object.assign({}, employee);
let firstName = 'Krushit';
let lastName = 'Dudhat';
cloneEmployee.fullName = firstName + ' ' +  lastName;
cloneEmployee.emailID = "krushit.dudhat@bacancy.com";
console.log('Original Object');
console.log(employee);
console.log('Cloned Object');
console.log(cloneEmployee);