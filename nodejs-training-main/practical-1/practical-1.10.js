const arr=["hii","how","are","you"];
function capitalStringFirstLetter(newArr){
    for(var i=0;i<newArr.length;i++){
        newArr[i] = newArr[i].charAt(0).toUpperCase()+newArr[i].substr(1);
    }
    return(newArr);
}
const result= capitalStringFirstLetter(arr);
console.log(result);