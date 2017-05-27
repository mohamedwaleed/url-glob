var urlglob = require("./url-glob");

var u = new urlglob('*w3schools*/*d/**');

console.log(u.match('https://www.w3schools.com/md/sdfsdf/dfgdfg/'));
// console.log(u.checkEqualsWithGlobing("m*f*f","msdfsdfsdf"));