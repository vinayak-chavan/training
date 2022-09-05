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
  name: "vinayak",
  id:1,
  branch: 'IT'
};
function objectCheck(data, myData){
for(i=0;i<data.length;i++){
   var res = (data[i].id == myData.id && data[i].name == myData.name && data[i].branch == myData.branch) ? true : false;
   return res;
} 
} 
console.log(objectCheck(data, myData));
