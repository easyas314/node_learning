// example "module" file
function printAvatar(){
    console.log("Avatar PG-13");
};

function printBadMovie(){
    console.log("BadMovie G");
};

// define what I want to make available for import
module.exports.Avatar = printAvatar;
