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
        _id: 4,
        fullName: 'Apexa Patel',
        profileImage: 'users/3.png',
        highestQualification_PassoutYear: 'B.E(IT) - 2022',    
        emailID: 'apexa.patel@bacancy.com',
        technologyAssigned: 'NodeJS',
        os: 'Windows 10'
    }
];

const sortFunction = (ascending) => {
    if(ascending){
        data.sort((first, second) => first.fullName.localeCompare(second.fullName));
    }
    else{
        data.reverse((first, second) => first.fullName.localeCompare(second.fullName));
    }
}

let ascendingSort = true;
sortFunction(ascendingSort); 
console.log(data);