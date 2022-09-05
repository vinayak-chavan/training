var array=[];
function factorial(num){
    for(i=1;i<=num;i++){
        array.push(i);
    }
    return array.reduce(function(a,b){
        return a*b;
    },1)
};
console.log(factorial(7));