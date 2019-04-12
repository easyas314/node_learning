// "everything is a reference"
var programmer = {
    name: "Brad",
    favLang: "basic"
};

var decepticon = programmer;
decepticon.favLang = "fortran";

console.log(programmer);
// hahahaha, decepticon is POINTING to programmer; now you like fortran

// "this"
var Brad = {
    printFirstName: function() {
        console.log("Printing the firstname");
        console.log(this === Brad);  // is the caller here really Brad?
    }
};
Brad.printFirstName();

// the default calling context is global
function doWorthless(){
    console.log("This is worthless");
    console.log(this === global);  // is the caller here really global?

};
doWorthless();
