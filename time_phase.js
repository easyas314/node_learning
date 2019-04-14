/*
    Do i know what I'm doing?
*/

var hoursPhase = [
    // phase-id for each of the hours in the day
    // phase-id for Hrs [0,1,2,3,4,5]
    'p1','p1','p1','p1','p1','p1', // "Before Dawn"
    // phase-id for Hrs Hrs [6,7,8,9,10,11]
    'p2','p2','p2','p2','p2','p2', // "Morning"
    // phase-id for Hrs Hrs [12,13,14,15,16]
    'p3','p3','p3','p3','p3', // "Afternoon"
    // phase-id for Hrs Hrs p4: [17,18,19,20]
    'p4','p4','p4','p4',     // "Evening"
    // phase-id for Hrs Hrs p5: [21,22,23]
    'p5','p5','p5'      // "Night"
]

var phaseText = {
    // phase-id and display text
    'p1': 'Before Dawn',
    'p2': 'Morning',
    'p3': 'Afternoon',
    'p4': 'really late in the afternon',
    'p5': 'Night'
}

function getPhaseText(m) {
    var phaseID;
    phaseID = hoursPhase[m.hours()];
    if (phaseID == undefined) {
        // NO PHASE FOR THIS HOUR
        return "*"
    }
/* else if (phaseID.indexOf('p') != 0) {
        // BAD PHASE ID; needs to begin with a 'p'
        return "*"
    }
*/
    var displayText;
    displayText = phaseText[phaseID];
    if (displayText == undefined) {
        // NO TEXT DEFINED FOR THE PHASE-ID
        return "?"
    }
    return displayText;
}

var moment = require('moment');
var now = moment(); // this will get the current date & time.

console.log('It is now: ' + now.format('LLLL'));
//console.log('... now.hours = ' + now.hours());
//console.log('... hoursPhase.length = ' + hoursPhase.length);
console.log('It is ' + getPhaseText(now) + ' phase');
var day = moment("Jul 18, 2013", "MMM DD YYYY"); // accepting string date.
console.log('It was: ' + day.format('LLLL'));
