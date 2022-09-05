const randomArray = (limit) => [...new Array(limit)].map(()=>Math.round(Math.random()*limit));
console.log(randomArray(100));
