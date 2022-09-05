const data = require('./Practical1.9.json');
function jsonToArrayFunction(){
  const newArray = data.map(arrayData => ({
    _id: arrayData._id,
    fullName: arrayData.firstName + ' ' + arrayData.lastName,
    profileImage: arrayData.profileImage,
    highestQualification_passoutYear: arrayData.academicDetails.highestQualification + ' - ' + arrayData.academicDetails.passoutYear,
    emailId: arrayData.contactDetails.primaryEmailID || arrayData.contactDetails.alternateEmailID,
    technologyAssigned: arrayData.technologyAssigned,
    os: (function(){
      if(arrayData.systemConfiguration[0].isDualBoot){
        return arrayData.systemConfiguration[0].os + ' + ' + arrayData.systemConfiguration[0].secondaryOS;
      }
      else{
        return arrayData.systemConfiguration[0].os;
      }
    }())
    }));
    return newArray;
}
console.log(jsonToArrayFunction());