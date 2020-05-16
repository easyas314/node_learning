/*******
	read_file_got2.js

*******/
const got = require('got');
// borrowed code to 'browse' structures
const utl = require('./utl_json.js');

// testURL
const testURL = 'https://www.downtownpres.org/events-1/?view=list&format=json'

// example model for got promise; no or little error checking
console.log('... now to download via a URL.');

 
var extArray = [];

const gotData = async url => {
    try {
        const response = await got(testURL, {json: true});
        data = response.body;
        console.log(Object.keys(data));
        // What kind of data am I really dealing with?
        console.log("SS-SS-SS data.website is: " + typeof data.website);
        if (data.website !== "undefined") {
            if (data.website.siteTitle !== "undefined") {
                console.log("SS-SS-SS", data.website.siteTitle);
            }

            if (data.upcoming !== "undefined") {
                console.log("SS-SS-SS upcoming type is ", typeof data.upcoming);
                if (Array.isArray(data.upcoming)) {
                    console.log("SS-SS-SS: looks like upcoming exists!");
                    extArray = data.upcoming;
			        console.log("SS-SS-SS: upcoming size: " + extArray.length);
                }
            }
        }
    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
     }
};

gotData(testURL);



