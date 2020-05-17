//
// NOAA wx development
const util = require('util');

console.log("-> You have reached the wx_helper code!")
var moment = require('moment');
var now = moment(); // this will get the current date & time.

const got = require('got');
// const customGot = got.extend({
// 	//prefixUrl: "https://api.weather.gov",
// 	responseType: "json",
// 	headers: {"User-Agent": "MagicMirror/0.2 https://github.com/easyas314/MMM-EventsFeed"},
// 	retry: {retries: 0}
// });

var wx_helper = {};


// module needs to pass these via socket notification?
// var bjsLab;
// bjsLab.config = {
// 		base_url: "https://api.weather.gov",
// 		lat: 34.844740, //REQUIRED
// 		lon: -82.394430, //REQUIRED
// 		updateInterval: 900000, // 15 min
// };

// would need to rewrite methods for node_helper
// module.exports = NodeHelper.create({
//      start: {},
//      another: {}, 
//    ...

module.exports = {
	// notice the name/value pair model ...
    start: function() {
        wx_helper.name = "WX-HELPER";
        wx_helper.wxForecastGridURL = "";
        wx_helper.wxData = [];
        console.log(`[${wx_helper.name}]:start() completed.`);
    },

	getWxGrid: function(config) {
        console.log(`[${wx_helper.name}]:getWxGrid()`);
		//	You can retrieve the metadata for a given latitude/longitude coordinate with the /points endpoint (https://api.weather.gov/points/{lat},{lon}).
		// 		base_url: "https://api.weather.gov",
		var wxURL = config.base_url + "/points/" + config.lat + "," + config.lon;
		//var pointsEndpoint = "points/" + config.lat + "," + config.lon;
        console.log(`[${wx_helper.name}]:getWxGrid() calling = ${wxURL}`);
		(async () => {
			try {
				// take the body object 'guts'
				const {body} = await got(wxURL, {
					headers: {"User-Agent": "MM-wx-gov/0.1 suowwisq@gmail.com"}
					,responseType: 'json'
					//, resolveBodyOnly: true
				});
				//console.log(`[${wx_helper.name}]:getWxGrid() returned type = ${typeof(body)}`);
				// body contains text, so make it a json object

				// when the body OBJECT version is examined, it has PassThrough, etc ???
				//console.log(`[${wx_helper.name}]:getWxGrid() ---- body --------------------`);
				//console.log(util.inspect(body, false, 1, true /* enable colors */))

				farkle = JSON.parse(body)
				// NOW it looks to follow the json output from the url in a browser...
        		//console.log(`[${wx_helper.name}]:getWxGrid() ---- farkle.properties --------------------`);
				//console.log(util.inspect(farkle.properties, false, 2, true /* enable colors */))
				//  The forecastGridData property will provide a link to the correct gridpoint for that location.
				wx_helper.wxForecastGridURL = farkle.properties.forecastGridData;
				console.log(`[${wx_helper.name}] wx-grid-url is ${wx_helper.wxForecastGridURL}`);
				//=> '<!doctype html> ...'
			} catch (error) {
				//console.log(error.response.body);
				console.log(error);
				//=> 'Internal server error ...'
			}
		})();
	},
	getWxGridData: function() {
        console.log(`[${wx_helper.name}]:getWxGridData()`);
		//var wxURL = `${wx_helper.wxForecastGridURL}/forecast`;
		var wxURL = wx_helper.wxForecastGridURL;
        console.log(`[${wx_helper.name}]:getWxGridData() calling = ${wxURL}`);
		now = moment(); // this will get the current date & time.
		(async () => {
			try {
				// take the body object 'guts'
				const {body} = await got(wxURL, {
					headers: {"User-Agent": "MM-wx-gov/0.1 suowwisq@gmail.com"}
					,responseType: 'json'
					//, resolveBodyOnly: true
				});
				//console.log(`[${wx_helper.name}]:getWxGrid() returned type = ${typeof(body)}`);
				// body contains text, so make it a json object

				// when the body OBJECT version is examined, it has PassThrough, etc ???
				//console.log(`[${wx_helper.name}]:getWxGrid() ---- body --------------------`);
				//console.log(util.inspect(body, false, 1, true /* enable colors */))

				farkle = JSON.parse(body)
				// NOW it looks to follow the json output from the url in a browser...
        		//console.log(`[${wx_helper.name}]:getWxGrid() ---- farkle.properties --------------------`);
				//console.log(util.inspect(farkle.properties, false, 2, true /* enable colors */))
				wx_helper.wxData.grid.updateTime = moment(new Date(farkle.properties.updateTime));
				console.log(`[${wx_helper.name}] updateTime = ${wx_helper.grid.updateTime}`);

				// [0..172] hours
				wx_helper.wxData.grid.temp = farkle.properties.temperature;
				// max/min for [0..8] days
				wx_helper.wxData.grid.maxTemp = farkle.properties.maxTemperature;
				wx_helper.wxData.grid.minTemp = farkle.properties.minTemperature;
				// [0..103] hours
				wx_helper.wxData.grid.probPrecip = farkle.properties.probablityOfPrecipitation;

				//=> '<!doctype html> ...'
			} catch (error) {
				//console.log(error.response.body);
				console.log(error);
				//=> 'Internal server error ...'
			}
		})();
	},

	getWxForecast: function() {
		var wxURL = wx_helper.wxForecastGridURL + "/forecast";
        console.log(`[${wx_helper.name}]:getWxForecast() calling = ${wxURL}`);
		now = moment(); // this will get the current date & time.
		(async () => {
			try {
				// take the body object 'guts'
				const {body} = await got(wxURL, {
					headers: {"User-Agent": "MM-wx-gov/0.1 suowwisq@gmail.com"}
					,responseType: 'json'
					//, resolveBodyOnly: true
				});
				//console.log(`[${wx_helper.name}]:getWxGrid() returned type = ${typeof(body)}`);
				// body contains text, so make it a json object

				// when the body OBJECT version is examined, it has PassThrough, etc ???
				//console.log(`[${wx_helper.name}]:getWxGrid() ---- body --------------------`);
				//console.log(util.inspect(body, false, 1, true /* enable colors */))

				farkle = JSON.parse(body)
				// NOW it looks to follow the json output from the url in a browser...
        		//console.log(`[${wx_helper.name}]:getWxGrid() ---- farkle.properties --------------------`);
				//console.log(util.inspect(farkle.properties, false, 2, true /* enable colors */))
				wx_helper.wxData.forecast.updateTime = moment(new Date(farkle.properties.updateTime));
				console.log(`[${wx_helper.name}] updateTime = ${wx_helper.wxData.forecast.updateTime}`);

				// [0..13] periods
				wx_helper.wxData.forecast.periods = farkle.properties.periods;
				console.log(`[${wx_helper.name}] period zero = ${wx_helper.wxData.forecast.periods[0]}`);

			} catch (error) {
				//console.log(error.response.body);
				console.log(error);
				//=> 'Internal server error ...'
			}
		})();
	},

	getWxForeHours: function() {
//					wx_helper.wxData.hourly.properties = resp.properties;
	},

	socketNotificationReceived: function(notification, payload){
        console.log(`[${wx_helper.name}]:socketNoteRcvd()`);
		switch(notification) {
		  case "WX_FORECAST_GET":
            // payload should have .msg and .config{}
			console.log(`[${wx_helper.name}] received WX_FORECAST_GET: payload msg = ${payload.msg}`);
			if (wx_helper.wxForecastGridURL === "") {
				this.getWxGrid(payload.config)
			}
			this.getWxGridData();
			
            //if data exists, return data
            //else ask for data
			// ? make 2 requests: 1 for regular (daily?) and 2 for hourly?  filterable reqst?
			// separate function for building out the data into 1 structure?
			// sent 1st time all module objects have been rendered

			// try notifying my helper
			//bjsLab.sendSocketNotification("BJSLAB_NOTIFICATION", {msg : "BJS main start"});

			break;

		  case "WX_FORECAST_TEST":
            // payload should have .msg and .config{}
			console.log(`[${wx_helper.name}] received WX_FORECAST_TEST: payload msg = ${payload.msg}`);
			if (wx_helper.wxForecastGridURL === "") {
				this.getWxGrid(payload.config)
			}
			this.getWxForecast();

			// test: send consumable data
			//wx_helper.sendSocketNotification("BJSLAB_NOTIFICATION",
			//	`The next hour is:\n${wx_helper.wxData.forecast.periods[0].shortForecast}`);
			console.log(`The next hour is:\n${wx_helper.wxData.forecast.periods[0].shortForecast}`);
			break;
		}

	}
}