// prototype

function User(){
    this.name = "";
    this.life = 100;
    this.giveLife = function giveLife(targetPlayer){
        targetPlayer.life += 1;
        console.log(this.name + " gave 1 life to " + targetPlayer.name);
    };
};

var Brad = new User();
var Beth = new User();
Brad.name = "Brad";
Beth.name = "Beth";

Brad.giveLife(Beth);
console.log("Brad: " + Brad.life);
console.log("Beth: " + Beth.life);

// good idea fairy strikes; "How 'bout hitting each other?"
// use prototype to add functions or properties to an existing class
User.prototype.uppercut = function uppercut(targetPlayer){
    targetPlayer.life -= 3;
    console.log(this.name + " uppercuttied " + targetPlayer.name);

};

Beth.uppercut(Brad);
console.log("Brad life: " + Brad.life);
console.log("Beth life: " + Beth.life);

// another example of prototype use
User.prototype.magic = 60;
console.log("Brad magic: " + Brad.magic);
console.log("Beth magic: " + Beth.magic);
