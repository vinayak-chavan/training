let data = [
    {
        _id: 1,
        fullName: 'Aayush Adeshara',
        profileImage: 'users/1.png',
        highestQualification_PassoutYear: 'B.E/B.Tech. - 2022',
        emailID: 'aayush.adeshara@bacancy.com',
        technologyAssigned: 'ROR',
        os: 'ubuntu 21.10 + Windows 11'
    },
    {
        _id: 2,
        fullName: 'Vinayak Chavan',
        profileImage: 'users/4.png',
        highestQualification_PassoutYear: 'B.E/B.Tech. - 2022',
        emailID: 'vinayak.chavan@bacancy.com',
        technologyAssigned: 'NodeJS',
        os: 'Windows 10'
    },
    {
        _id: 3,
        fullName: 'Akshit Modi',
        profileImage: 'users/2.png',
        highestQualification_PassoutYear: 'B.E IT - 2022',     
        emailID: 'akshit.modi@bacancy.com',
        technologyAssigned: 'DevOps',
        os: 'Ubuntu 20.04'
    },
    {
        _id: 2,
        fullName: 'Vinayak Chavan',
        profileImage: 'users/4.png',
        highestQualification_PassoutYear: 'B.E/B.Tech. - 2022',
        emailID: 'vinayak.chavan@bacancy.com',
        technologyAssigned: 'NodeJS',
        os: 'Windows 10'
    },
    {
        _id: 4,
        fullName: 'Apexa Patel',
        profileImage: 'users/3.png',
        highestQualification_PassoutYear: 'B.E(IT) - 2022',    
        emailID: 'apexa.patel@bacancy.com',
        technologyAssigned: 'NodeJS',
        os: 'Windows 10'
    }
];
const occuranceCount = (arr) => {
    let count = {};
    arr.forEach(function(i){
        let key = i._id;
        count[key] = (count[key] || 0) + 1;
    });
    return count;
}
const deleteDuplicate = (arr, obj) => {
    let repeatedArr = [];
    for(ele in obj){
        if(obj[ele] > 1){
            repeatedArr.push(ele);
        }
    }
    for(i in repeatedArr){
        let index = arr.findIndex(trainee => {
            return trainee._id == repeatedArr[i];
        });
        if(index != -1){
            arr.splice(index, 1);
        }
    }
    return arr;
}
let countOccurence = occuranceCount(data);
console.log('Count of occurence:');
console.log(countOccurence);
data = deleteDuplicate(data, countOccurence);
console.log(data);