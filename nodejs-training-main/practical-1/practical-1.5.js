var intro = "Hello. I am Vinayak Chavan. I am learning javascript.";
function wordCount(introStr){
    return(introStr.match(/(\w+)/g).length);
}
var count = wordCount(intro);
console.log(count);