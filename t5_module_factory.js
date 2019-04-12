// an object that builds another object; aka object factory!
// ... which means the properties (and functions?) are NOT shared
// ... when used by multiple modules
module.exports = function () {
    return {
        favMovie: "",
        badMovie: "Black Hole"
    }
};