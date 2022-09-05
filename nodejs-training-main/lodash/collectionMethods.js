const _ = require('lodash');

// countBy method
console.log(_.countBy([6.1, 4.2, 6.3], Math.floor));

// forEach method
_.forEach([1, 2], function(value) {
    console.log(value);
});

// filter method
let users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
  ];
console.log(_.filter(users, function(o) { return !o.active; }));

// sortBy method
console.log(_.sortBy(users, [function(o) { return o.user; }]));

// reject method
console.log(_.reject(users, function(o) { return !o.active; }));

// find method
console.log(_.find(users, function(o) { return o.age < 40; }));

// groupBy method
console.log(_.groupBy([6.1, 4.2, 6.3], Math.floor));

// includes method
console.log(_.includes([1, 2, 3], 1));

// some method
console.log(_.some([null, 0, 'yes', false], Boolean));
