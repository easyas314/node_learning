var fs = require('fs');
var path = require('path');

var aFile = '\home\local\\too\many\count.txt';
var bFile = '/regua//latext/path/stuff.html';
console.log(path.normalize(aFile));
console.log(path.basename(bFile));
console.log(path.extname(bFile));
