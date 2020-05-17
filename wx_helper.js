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

var wx_helper =[];


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
		var wxPointsURL = config.base_url + "/points/" + config.lat + "," + config.lon;
		//var pointsEndpoint = "points/" + config.lat + "," + config.lon;
        console.log(`[${wx_helper.name}]:getWxGrid() calling = ${wxPointsURL}`);
		(async () => {
			try {
				// take the body object 'guts'
				const {body} = await got(wxPointsURL, {
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

	getWxForeHours: function(config) {
//					wxData.hourly.properties = resp.properties;
	},

	socketNotificationReceived: function(notification, payload){
        console.log(`[${wx_helper.name}]:socketNoteRcvd()`);
		switch(notification) {
		  case "WX_FORECAST_GET":
            // payload should have .msg and .config{}
			console.log(`[${wx_helper.name}] received WX_FORECAST_GET: payload msg = ${payload.msg}`);
			console.log(`[${wx_helper.name}] ... wxForecastGridURL = ${wx_helper.wxForecastGridURL}`);
			if (wx_helper.wxForecastGridURL === "") {
				this.getWxGrid(payload.config)
			}
			
            //if data exists, return data
            //else ask for data
			// ? make 2 requests: 1 for regular (daily?) and 2 for hourly?  filterable reqst?
			// separate function for building out the data into 1 structure?
			// sent 1st time all module objects have been rendered

			// try notifying my helper
			//bjsLab.sendSocketNotification("BJSLAB_NOTIFICATION", {msg : "BJS main start"});

			break;

		  case "WX_FORECAST_TEST":
			// wx api needs a nice user-agent
			const options = {
				url: wx_helper.wxForecastHourlyURL,
				headers: {
					"User-Agent": "MM-wx-gov / v0.1 suowwisq@gmail.com"
				},
				method: "GET"
			};
			console.log(`[${wx_helper.name}] Requesting forecast hourly ${options.url}`);
			request(options, function( error, response, body) {
				// error is null with a 200 so ..
				//if(!error && response.statusCode == 200) {
				if(response.statusCode == 200) {
					//Good response
					var resp = JSON.parse(body);
					//resp.instanceId = payload.instanceId;
					wxData.hourly.properties = resp.properties;
					// test: send consumable data
					bjsHelper.sendSocketNotification("BJSLAB_NOTIFICATION",
						`The next hour is:\n${wxData.hourly.properties.periods[0].shortForecast}`);
				} else {
					console.log(`[${bjsHelper.name}] ERROR: response status = ${response.statusCode}`);
				}
			});
			break;
		}

	}
}