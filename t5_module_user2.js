var movies = require('./t5_module_factory');

var user2Movies = movies();
console.log("User2 bad movie: " + user2Movies.badMovie);
