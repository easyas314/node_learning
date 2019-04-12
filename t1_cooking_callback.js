//
// youtube thenewboston Node.js Tutorial for Beginners
//

function placeAnOrder(orderNumber){
    console.log("Customer order:", orderNumber);

    cookAndDeliverFood(function(){
        // this is the callback function!
        console.log("Job's done:", orderNumber);
    });

}

// simulate a time consuming operation
function cookAndDeliverFood(callback){
    console.log("...i'm cooking...");
    setTimeout(callback,5000);

}

// simulate users ordering something
placeAnOrder(1);
placeAnOrder(2);
placeAnOrder(3);
placeAnOrder(4);
placeAnOrder(5);
