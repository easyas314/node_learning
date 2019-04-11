/*
    Do i know what I'm doing?  No.
	read_file_download.js

-- previous moment code tests
//var moment = require('moment');
//var now = moment(); // this will get the current date & time.

//var day = moment("Jul 18, 2013", "MMM DD YYYY"); // accepting string date.
//console.log('It was: ' + day.format('LLLL'));
//console.log('It is now: ' + now.format('LLLL'));
//console.log('... now.hours = ' + now.hours());

*/

import gotDownload from 'got-download';

// testURL
const testURL = 'https://www.downtownpres.org/events-1/?view=list&format=json'
// save as local test file
//const testFile = '/Volumes/DATA_MAC/brad/Projects/dpc_events.json';
const testFile = 'dpc_events.json';

console.log('test file name is: ' + testFile);
console.log('... now to download via a URL.');

try {
	await gotDownload(testURL, {
		filename: path.join(__dirname, testFile),
		  // any got options
	});
} catch (e) {
	// what might go here?
}

