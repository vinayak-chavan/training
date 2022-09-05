var data=[
    {
      id:1,
      name: "vinayak",
      branch: 'IT'
    },
    {
      id:2,
      name:'pradip',
      branch: 'IT'
    },
    {
      id:3,
      name:'darshan',
      branch: 'IT'
    }
  ];
var myData =
{
  id: 1,
  name:'vinayak',
  branch: 'IT'
};
function compareObj(myData, obj) {
  let pro1 = Object.getOwnPropertyNames(myData);
  let pro2 = Object.getOwnPropertyNames(obj);
  if (pro1.length != pro2.length) {
      return false;
  }
  for (let i = 0; i < pro1.length; i++) {
      let prop = pro1[i];
      let isBothObj = typeof(myData[prop]) === 'object' && typeof(obj[prop]) === 'object';
      if ((!isBothObj && (myData[prop] !== obj[prop])) || (isBothObj && !compareObj(myData[prop], obj[prop]))) {
          return false;
      }
  }
  return true;
}
const containsObj = (obj, arr) => {
  let flag = 0;
  arr.forEach(function(element){
      if(compareObj(obj, element)){
          flag = 1;
      }
  });
  if(flag === 1){
      return true;
  }
  else{
      return false;
  }
}
const pushObjToArr = (obj, arr) => {
  if(!containsObj(obj, arr)){
      arr.push(obj);
      return arr;
  }
  else{
      console.log('object data already exist');
      return arr;
  }
}
data = pushObjToArr(myData, data);
console.log(data);
 
