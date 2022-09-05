const number = [10, 20, 10, 10, 50];
const distinctvalues = (number)=>(
    number.reduce((acc, currentValues) =>(
            acc.includes(currentValues) ? acc : [...acc, currentValues]
        ),[])
);
console.log(distinctvalues(number));