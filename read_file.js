/*
    Do i know what I'm doing?  No.
	read_file.js

NOT WORKING  via:$ npm install moment-json-parser
	... trying to pull json date values directly to moment objects

-- previous moment code tests
//var moment = require('moment');
//var now = moment(); // this will get the current date & time.

//var day = moment("Jul 18, 2013", "MMM DD YYYY"); // accepting string date.
//console.log('It was: ' + day.format('LLLL'));
//console.log('It is now: ' + now.format('LLLL'));
//console.log('... now.hours = ' + now.hours());

*/

var moment = require('moment');
var now = moment(); // this will get the current date & time.

const got = require('got');
const fs = require('fs');

// borrowed code to 'browse' structures
var utl = require('./utl_json.js');
//console.log(typeof utl.getObjects);
//console.log(typeof utl.getValues);
//console.log(typeof utl.getKeys);

// maybe I want to get a file via a URL ...

// testURL
const testURL = 'https://www.downtownpres.org/events-1/?view=list&format=json'
// save as local test file
const testFile = '/Volumes/DATA_MAC/brad/Projects/dpc_events.json';

console.log('test file name is: ' + testFile);
console.log('... now to download via a URL.');

// example model for got promise; no or little error checking
 
var extArray = [];

 (async () => {
     try {
        const response = await got(testURL, {json: true});
		//console.log(response.body);
		//console.log(response.body.upcoming[5].title);
		urlUpcoming = response.body.upcoming;
		events = utl.getObjects(urlUpcoming, "recordTypeLabel", "event");
		if (Array.isArray(events)) {
			console.log('.. events is an array!');
			//console.log(events);
			extArray = events;
		}
		console.log('events[5] title is : ' + events[5].title);
		outData = JSON.stringify(events, null, 2);
		fs.writeFile('dpc-pretty.json', outData, (err) => {  
    		if (err) throw err;
    		console.log('Data pretty writen to file');
		})
         //=> '<!doctype html> ...'
     } catch (error) {
         console.log(error.response.body);
         //=> 'Internal server error ...'
     }
 })();

/********
 
// blocking call to read the file
//let rawdata = fs.readFileSync(testFile);   // relative path to file


response.then(getResults, function(err) {
	console.log(err.response.body);
})
console.log('... and onwards ...');

// *******

//console.log('File now read as var jsonData...');
//console.log(utl.getObjects(jsonData, "recordTypeLabel", "event"));
//console.log(typeof jsonData);
//var events = utl.getObjects(jsonData, "recordTypeLabel", "event")

//if (Array.isArray(events)) {
//	console.log('.. it is an array.');
//}



let jsonData = JSON.parse(rawData);  
console.log('... past the JSON parse ...');

var events = utl.getObjects(jsonData, "recordTypeLabel", "event")
console.log('... now to write to a local file ...');

// and push it back out as a pretty file ...
let data = JSON.stringify(jsonData, null, 2);
fs.writeFile('dpc-pretty.json', data, (err) => {  
    if (err) throw err;
    console.log('Data pretty writen to file');
});

//    or
//
// // non-blocking read call
// fs.readFile(testFile, (err, data) => {
// 	if (err) throw err;
// 	let jsonData = JSON.parse(data);  
// 	// data now available
// });


// /**************** example for non-blocking write of a file
// const fs = require('fs');

// let student = {  
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };

// // stringify further options for easier reading of file
// let data = JSON.stringify(student, null, 2);

// fs.writeFile('student-3.json', data, (err) => {  
//     if (err) throw err;
//     console.log('Data written to file');
// });

***/

/*********
 * 

// console.log('This is after the write call');  



console.log('... so print a random element?');
var randElement = events[4];
console.log("randElement type = " + typeof randElement);
console.log("randElement.title type = " + typeof randElement.title);
console.log("randElement.startDate type = " + typeof randElement.startDate);
//console.log(randElement);
console.log('---- ------- -- ---- - - - - - - - ------ - - - - - -- --- ---- -');
console.log(randElement.title);
console.log('      --- ---- --- --- --- --- --- --- ---');
//console.log(randElement.structuredContent);
console.log('      --- ---- --- --- --- --- --- --- ---');
console.log(randElement.startDate);
//var dt = new Date(randElement.startDate);
//console.log(dt);
// ... looked at these values ...
//   addedOn: 1549999552198,
//  updatedOn: 1549999552341,
//console.log('Added on: '+ Date(randElement.addedOn));
//console.log('Updtd on: '+ Date(randElement.updatedOn));
//console.log('... ok, now what?');

// look at fullUrl property. Combined with www.downtownpres.org  it worked in a browser...
	// ... still need a google link
	// ... does the object.id change?

// create moment objects for the date text
events.forEach(element => {
	element.newStart = moment(new Date(element.startDate));
//	console.log("moment start is " + element.newStart.format("MMM Do YY"));
});

// sort the array by newStart
eventsSorted  = events.sort((a,b) => a.newStart.format('YYYYMMDDHHMMSS') - b.newStart.format('YYYYMMDDHHMMSS'))

// future
eventsSorted.forEach(element => {
	console.log(element.newStart.format("ddd, MMM Do YYYY, h:mm:ss a") + " " + element.title);
});

/****/

if (Array.isArray(extArray)) {
	console.log('.. it is an array.');
}
