const _ = require('lodash');

// camelCase method
console.log(_.camelCase('Foo Bar'));

// capitalize method
console.log(_.capitalize('FRED'));

// escape method
console.log(_.escape('fred, barney, & pebbles'));

// lowerCase method
console.log(_.lowerCase('fooBar'));

// replace method
console.log(_.replace('Hi Fred', 'Fred', 'Barney'));

// split method
console.log(_.split('a-b-c', '-', 2));

// repeat method
console.log(_.repeat('*', 3));

// trim method
console.log(_.trim('  abc  '));