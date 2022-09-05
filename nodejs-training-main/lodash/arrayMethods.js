const _ = require('lodash');

// chunk method
console.log(_.chunk(['a', 'b', 'c', 'd'], 2));

// compact method
console.log(_.compact([0, 1, false, 2, '', 3]));

// concat method
let array = [1];
let other = _.concat(array, 2, [3], [[4]]);
console.log(other);

// fill method
let arr = [1, 2, 3];
_.fill(arr, 'a');
console.log(arr);
console.log(_.fill(Array(3), 2));
console.log(_.fill([4, 6, 8, 10], '*', 1, 3));

// head method
console.log(_.head([1, 2, 3]));

// indexOf method
console.log(_.indexOf([1, 2, 1, 2], 2));

// join method
console.log(_.join(['a', 'b', 'c'], '~'));

// pull method
let array1 = ['a', 'b', 'c', 'a', 'b', 'c'];
_.pull(array1, 'a', 'c');
console.log(array1);

// reverse method
console.log(_.reverse(array1));
