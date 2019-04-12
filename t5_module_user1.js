var movies = require('./t5_module_factory');

var user1Movies = movies();
user1Movies.badMovie = "Rotten Tomato";
console.log("User1 bad movie: " + user1Movies.badMovie);
