var connect = require('connect');
var http = require('http');

//connect dispatcher; takes rqst & resp arguments
// convention to call it 'app'
var app = connect();

function doFirst( request, response, next ) {
     console.log("squirel");
     // optional "next" for specific directing to another call; else this function just returns to the caller
     next();
}

function doSecond( request, response, next ) {
     console.log("ball");
     next();
}

function profile( request, response, next) {
     console.log("profile page code");
     // next() here would return and then move to the 'app.use(doFirst)'    
}

// use the given "middleware" handle (function) for the given route (url-path, default '/')
app.use("/profile", profile);
app.use(doFirst);
app.use(doSecond);

http.createServer(app).listen(8888);
console.log("Server is running");

app