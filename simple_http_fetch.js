//
// npm install node-fetch
//
const fetch = require('node-fetch');

// my play stuff
bjsLab = {
    config : {
		base_url: "https://api.weather.gov",
		lat: 34.844740, //REQUIRED
		lon: -82.394430, //REQUIRED
        updateInterval: 900000, // 15 min
    }
};

function examineJSON(framus) {
    console.log(` returned type = ${typeof(framus)}`);
    //farkle = JSON.parse(framus)
    console.log(`json-ified ... gridURL = ${framus.properties.forecastGridData}`);
    bjsLab.config.forecastGridData = framus.properties.forecastGridData;
    
}

var url = bjsLab.config.base_url + "/points/" + bjsLab.config.lat + "," + bjsLab.config.lon;
fetch(url)
	.then(res => res.json())
    //.then(json => console.log(json));
    .then(json => examineJSON(json))
    .catch(error => {
      if (error.name === 'AbortError') {
        console.error('request was aborted');
      }
    });

console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
console.log(`Outside the calls, fGD = ${bjsLab.config.forecastGridData}`)