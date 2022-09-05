const add = (a, b) => {
    return (a + b);
};

const promiseTest = (a, b) => {
    return new Promise((resolve, reject) => {
        if(a-b > 0){
            resolve('positive')
        }
        else{
            reject('negative')
        }
    })
};

const arr = () => {
    return ['bat']
}

module.exports = {add, promiseTest, arr};