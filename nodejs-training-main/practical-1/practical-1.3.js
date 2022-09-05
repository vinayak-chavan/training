const array1= ['hello','world'];
const array2= ['world','is','beautiful'];
const computeArr = (arr1, arr2) => {
    let arr = [];
    arr1.forEach(function(element){
        const e = arr2.findIndex(ind => {
            return ind === element;
    });
    if(e === -1){
        arr.push(element);
    }
    });
    arr2.forEach(function(element){
        const e = arr1.findIndex(ind => {
            return ind === element;
    });
    if(e === -1){
        arr.push(element);
    }
    });
    return arr;
}
const newArr = computeArr(array1, array2);
console.log(newArr);