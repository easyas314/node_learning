/*******
    Do i know what I'm doing?  No.
	read_file_got.js

*******/
const got = require('got');
const fs = require('fs');
// borrowed code to 'browse' structures
const utl = require('./utl_json.js');

// testURL
const testURL = 'https://www.downtownpres.org/events-1/?view=list&format=json'
// save as local test file
const testFile = '/Volumes/DATA_MAC/brad/Projects/node_learning/dpc_events.json';

console.log('test file name is: ' + testFile);
console.log('... now to download via a URL.');

// example model for got promise; no or little error checking
 
var extArray = [];

const gotData = async url => {
     try {
        const response = await got(testURL, {json: true});
        outData = JSON.stringify(response.body, null, 2);
        fs.writeFile(testFile, outData, (err) => {
            if (err) throw err;
            console.log("Created " + testFile);
        })

     } catch (error) {
         console.log(error);
         //=> 'Internal server error ...'
     }
};

gotData(testURL);



