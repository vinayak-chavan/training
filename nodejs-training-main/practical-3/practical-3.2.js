/* Write a function that takes an object created in problem no.2 as an argument and 
creates  an array dynamically by using the keys of the object created in problem no.2. 
Here, the  arrays will be created dynamically and arrayNames must be the same as the 
keys of the objects and the array must contain trainees of particular technology. */


const traineeObj = {
    ROR: [
            {
                _id: 1,
                fullName: 'Aayush Adeshara',
                college: 'Government Engineering College, Gandhinagar',
                technologyAssigned: 'ROR'
            },
            {
                _id: 11,
                fullName: 'Kalpin Gajjar',
                college: 'GEC, Gandhinagar',
                technologyAssigned: 'ROR'
            },
            {
                _id: 12,
                fullName: 'Khushbu Rajgor',
                college: 'LJ institute of Computer Applications',      
                technologyAssigned: 'ROR'
            },
            {
                _id: 18,
                fullName: 'Pranav Dodiya',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'ROR'
            },
            {
                _id: 19,
                fullName: 'Priyanka Manna',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'ROR'
            },
            {
                _id: 21,
                fullName: 'Raj Panchal',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'ROR'
            },
            {
                _id: 24,
                fullName: 'Smit Akhani',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'ROR'
            },
            {
                _id: 26,
                fullName: 'Vaisvik Chaudhary',
                college: 'Nirma Uniersity',
                technologyAssigned: 'ROR'
            },
            {
                _id: 28,
                fullName: 'Vinayak Varsani',
                college: 'BHGCET Rajkot',
                technologyAssigned: 'ROR'
            }
        ],
        DevOps: [
            {
                _id: 2,
                fullName: 'Akshit Modi',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'DevOps'
            }
        ],
        NodeJS: [
            {
                _id: 3,
                fullName: 'Apexa Patel',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'NodeJS'
            },
            {
                _id: 9,
                fullName: 'Jaykumar Bhatt',
                college: 'Marwadi University, Rajkot',
                technologyAssigned: 'NodeJS'
            },
            {
                _id: 13,
                fullName: 'Krushit Dudhat',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'NodeJS'
            },
            {
                _id: 14,
                fullName: 'Lav Panchal',
                college: 'K S School of business management',
                technologyAssigned: 'NodeJS'
            },
            {
                _id: 15,
                fullName: 'Manish Rathod',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'NodeJS'
            },
            {
                _id: 27,
                fullName: 'Vinayak Chavan',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'NodeJS'
            }
        ],
        Flutter: [
            {
                _id: 4,
                fullName: 'Bhargav Dobariya',
                college: 'VVPEC, Rajkot',
                technologyAssigned: 'Flutter'
            }
        ],
        VueJS: [
            {
                _id: 5,
                fullName: 'Chetan Punani',
                college: 'LDCE, Navrangpura',
                technologyAssigned: 'VueJS'
            },
            {
                _id: 8,
                fullName: 'Ishita Shah',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'VueJS'
            },
            {
                _id: 10,
                fullName: 'Jemis Maru',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'VueJS'
            },
            {
                _id: 17,
                fullName: 'Mohit Shah',
                college: 'LJIET, Sarkhej',
                technologyAssigned: 'VueJS'
            },
            {
                _id: 23,
                fullName: 'Rutvik Patel',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'VueJS'
            }
        ],
        'UI_UX': [
            {
                _id: 6,
                fullName: 'Dhruval Mayavanshi',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'UI/UX'
            },
            {
                _id: 20,
                fullName: 'Rahul Shah',
                college: 'K S School Of Business Management',
                technologyAssigned: 'UI/UX'
            }
        ],
        ReactNative: [
            {
                _id: 7,
                fullName: 'Divyansh Bhatnagar',
                college: 'ADIT, Anand',
                technologyAssigned: 'ReactNative'
            }
        ],
        ReactJS: [
            {
                _id: 16,
                fullName: 'Meet Acharya',
                college: 'TIMSCDR',
                technologyAssigned: 'ReactJS'
            },
            {
                _id: 22,
                fullName: 'Rohan Deshpande',
                college: 'VGEC, Chandkheda',
                technologyAssigned: 'ReactJS'
            },
            {
                _id: 25,
                fullName: 'Sumit Kadiya',
                college: 'Government Engineering college',
                technologyAssigned: 'ReactJS'
            }
        ]
}

const createArrFun = (obj) => {
    for(key in obj){
        eval(key + ' = ' + JSON.stringify(obj[key]) + ';');
    }
}

createArrFun(traineeObj);
console.log("\nROR trainee");
console.log(ROR);
console.log("\nDevOps trainee");
console.log(DevOps);
console.log("\nNodeJs trainee");
console.log(NodeJS);
console.log("\nFlutter trainee");
console.log(Flutter);
console.log("\nVueJS trainee");
console.log(VueJS);
console.log("\nUI_UX trainee");
console.log(UI_UX);
console.log("\nReactNative trainee");
console.log(ReactNative);
console.log("\nReactJS trainee");
console.log(ReactJS);