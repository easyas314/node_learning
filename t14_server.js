var http = require('http');
var fs = require('fs');

// resonse when there's nothing to see
function send404Response(response){
    response.writeHead(404,{"Context-Type": "text/plain"});
    response.write("Error 404: These aren't the droid pages you're looking for.");
    response.end();
}


function onRequest(request, response) {
    // the request comes in
    // ... AND the browser makes a request for the favicon.ico
    //console.log('user made request ' + request.url);
   // handle the specifics
   if (request.method == 'GET' && request.url == '/' ) {
        console.log('user made request to:' + request.url);

        response.writeHead(200,{"Context-Type": "text/html"});
        // want to send the response file as a readable stream; perf, errs, etc.
        fs.createReadStream("./index.html").pipe(response);

   }else{
        send404Response(response);
   }

   // protocol wants a header
   //response.writeHead(200,{"Context-Type": "text/plain"});
   // the response goes out
   //response.write("Here is your data");
   // ... of course, 
   // and finish the response with ...
   //response.end();

}

http.createServer(onRequest).listen(9999);
console.log('server is running');
