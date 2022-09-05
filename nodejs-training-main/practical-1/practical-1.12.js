const arr= [10,-2.20,-4,30,6];
function additionOfPositive(newArr){
    const positive = newArr.filter(item => item > 0)
    console.log(positive);
    const sum = positive.reduce(function(result,item){
        return result + item;
    },0);
    return sum;
}
const result= additionOfPositive(arr);
console.log(result);