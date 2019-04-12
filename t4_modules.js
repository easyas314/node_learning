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

// remember: default behavior for modules is to share "pointer to everything",
//  so changing something in the module (function, attribute), effects everyone using the same module.
// ... this is good, sometimes, when multiple sessions need to share the same stuff - saves memory,etc.
