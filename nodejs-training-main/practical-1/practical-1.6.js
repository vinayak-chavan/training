var str = "11,22,33";
function sumOfString(str){
    var sum = 0;
    var number = str.split(",").map(Number);
    for(let i=0; i<number.length; i++){
        sum += number[i];
    }
    return(sum);
}
const additon = sumOfString(str);
console.log(additon);
