/*
1) Append all the elements of the array given below to patients array:
(can't use loops or iterator)
2) Delete the patient having the name "George" from the new array. (you
can't use loops.)
3) Add one patient at the beginning of the array.
4) Update the ailments of a patient having name Christopher.
5) Delete one patient from the end of the array.
6) Delete one patient from the beginning of the array.
7) Insert one patient somewhere within the array at index 4.
8) Using the find method, find the patients having Diabetes.
9) Reverse the order of all the array objects. */

const patients = [
    {
        "name": "James",
        "ailments": ["Cough", "Cold", "Fever"]
    },
    {
        "name": "George",
        "ailments": ["Blood Pressure"]
    },
    {
        "name": "Robert",
        "ailments": ["Cough", "Cold", "Fever"]
    },
    {
        "name": "Mary",
        "ailments": ["Diabetes"]
    },
    {
        "name": "Patricia",
        "ailments": ["Blood Pressure"]
    }
];

const newArray = [
    {
        "name": "Christopher",
        "ailments": ["Dengue"]
    },
    {
        "name": "Thomas",
        "ailments": ["Diabetes"]
    },
    {
        "name": "Anthony",
        "ailments": ["Fatigue", "Cold", "Fever"]
    }
];

// Appending newArray array in to patients array.
patients.push(...newArray);
console.log(patients)

// Deleting the patient having the name "George" from the new array.
const index = patients.findIndex( ele => {
    return ele.name === "George";
})
patients.splice(index, 1);
console.log(patients)
 
// Update the ailments of a patient having name Christopher.
const update = patients.findIndex( ele => {
    if (ele.name === "Christopher"){
        ele.ailments = "Diabetes";
    }
})
console.log(patients)

// Adding one patients at the beginning of the array.
const pat1 = {
    "name": "Sana",
    "ailments": ["Fever", "Cold", "Cough"]
}
patients.unshift(pat1);
console.log(patients);

// Deleting one patients from the end of array.
patients.pop();
console.log(patients)

// Deleting one patients from the beginning of the array.
patients.shift();
console.log(patients)

// Inserting one patient somewhere within the array at index 4.
const pat2 = {
    "name": "Miley",
    "ailments": ["Fever", "Blood Pressure"]
}
patients.splice(4, 0, pat2)
console.log(patients)

// Using the find method, find the patients having Diabetes.
let diabetesPatients = []
let patientsHavingDiabetes = patients.find( (value) => {
    if((value.ailments).includes("Diabetes")){
        diabetesPatients.push(value.name)
    }
})
console.log("Diabetes Patients : ", ...diabetesPatients)

// Reversing the order of all the array objects.
console.log(patients.reverse())