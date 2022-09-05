/*  Write a function which takes an array containing fullNames of trainees and a string 
representing fullName as arguments. The function checks if the fullName is valid as well 
as unique means should not be present in the array. If so it adds the fullName to the array,
else will skip adding it and returns relevant error messages. */


let traineeArr = ["Aayush Adeshara", "Akshit Modi", "Apexa Patel", "Bhargav Dobariya", "Vinayak Chavan", "Vinayak Varsani"];
const addName = (arr, txt) => {
    if(arr.includes(txt)){
        console.log("Error: Name already stored in array.")
        return;
    }
    let num = txt.match(/\d+/g);
    let newStr = txt.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
    let pat = new RegExp("^[a-zA-Z ]*[']{0,1}[a-zA-Z ]*$");
    
    //checking same name exist or not
    if(num != null){
        console.log("Error: Name should not contains any number");
        return;
    }

    //checking there is only one whitespace or not
    else if(newStr != txt){
        console.log("Error: Name should not contains more than one whitespace");
        return;
    }

    //checking is multiple apostrophes are exist there
    else if(!pat.test(txt)){
        console.log("Error: Apostrophes should not occur multiple times");
        return;
    }
    else{
        arr.push(txt);
    }
    console.log(arr);
}
addName(traineeArr, "Vinayak Chavan");