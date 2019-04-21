/*
	ssEvents.js

	Module for working with squarespace events found via ./events/?view=list&format=json

	test file:  dpc_events.json
	- entire body of response
	- - already determined response.body.upcoming is an array of events
	- - so the test file has the body

*/

// previous moment code tests
//var moment = require('moment');
//var now = moment(); // this will get the current date & time.

//var day = moment("Jul 18, 2013", "MMM DD YYYY"); // accepting string date.
//console.log('It was: ' + day.format('LLLL'));
//console.log('It is now: ' + now.format('LLLL'));
//console.log('... now.hours = ' + now.hours());

/**************************************************/
//const testFile = "/Volumes/DATA_MAC/brad/Projects/node_learning/dpc_events.json";
const testFile = "dpc_events.json";

var moment = require('moment');
var now = moment(); // this will get the current date & time.
const fs = require('fs');
var config = {
	maxEntries: 10, // total maximum entries to capture
	maxNumOfDays: 365,
	maxTitleLength: 25,
}

// borrowed code to 'browse' structures
var utl = require('./utl_json.js');
//console.log(typeof utl.getObjects);
//console.log(typeof utl.getValues);
//console.log(typeof utl.getKeys);


// read file for processing
// blocking call to read the file
let rawdata = fs.readFileSync(testFile);
ssDom = JSON.parse(rawdata);

/* 
// check the data?
if (Array.isArray(ssDom.upcoming)) {
	console.log('... the squarespace DOM has an array. Test sample element 5:');
	//console.log(ssDom.upcoming[5].title);
	console.log(ssDom.upcoming[5]);
}
 */

var eventRecs = utl.getObjects(ssDom.upcoming, "recordTypeLabel", "event");

// sort the array on startDate
eventList = eventRecs.sort((a,b) => a.startDate - b.startDate);

// create moment date objects for the startdate text
eventList.forEach(element => {
	element.mStart = moment(new Date(element.startDate));
//	console.log("moment start is " + element.mStart.format("MMM Do YY"));
});

testList = eventList.slice(0,config.maxEntries);
testList.forEach(element => {
	console.log(element.mStart.format("ddd, MMM Do YYYY, h:mm:ss a") + " " + element.title);
})




/*********
 * https://www.downtownpres.org/events-1?format=ical
 * 
 * fullUrl: '/events-1/2019/3/22/west-greenville-yard-sale'
 * 
 * Combined URL format=ical does return an ics file (but not as much detail)
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


// future
eventsSorted.forEach(element => {
	console.log(element.newStart.format("ddd, MMM Do YYYY, h:mm:ss a") + " " + element.title);
});


if (Array.isArray(extArray)) {
	console.log('.. it is an array.');
}

/****/
