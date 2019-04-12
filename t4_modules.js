// pull in module file
// need full relative path, cause core modules don't use 'em.
// DON'T use the .js extension
//var movies = require("./movies");
// now calling the export named function
//movies.Avatar();

// slightly different module file
var movies = require("./movies2");
movies.printAvatar();
console.log(movies.favMovie);