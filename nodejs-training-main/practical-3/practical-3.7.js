/* create a copy of this object into another object. Modify the firstName to
Krushit and lastName to Dudhat and also change the emailID to that of
Krushit of the newly created clone. */

const trainee = {
    "_id": 1,
    "firstName": "Lav",
    "lastName": "Panchal",
    "aboutMe": "I code",
    "profileImage": "users/1.png",
    "academicDetails": {
    "highestQualification": "B.E/B.Tech.",
    "college": "Government Engineering College, Gandhinagar",
    "university": "GTU",
    "passoutYear": 2022
    },
    "contactDetails": {
        "primaryEmailID": "aayush.adeshara@bacancy.com",
        "alternateEmailID": "",
        "primaryContactNo": 123,
        "alternateContactNo": 456
    },
    "technologyAssigned": "ROR"
};

// JSON.stringify() and JSON.parse() methods are used to copy clone object which is type of deep copy

const cloneTrainee = JSON.parse(JSON.stringify(trainee));
cloneTrainee.firstName = 'Krushit';
cloneTrainee.lastName = 'Dudhat';
cloneTrainee.contactDetails.primaryEmailID = "krushit.dudhat@bacancy.com";
console.log('Original Object');
console.log(trainee);
console.log('Cloned Object');
console.log(cloneTrainee);