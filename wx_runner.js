//
// test runner for the wx_helper.js

console.log("IN THE BIG INNING ...")
var wx_helper = require("./wx_helper")
// module needs to pass these via socket notification?
var bjsLab = [];
bjsLab.config = {
		base_url: "https://api.weather.gov",
		lat: 34.844740, //REQUIRED
		lon: -82.394430, //REQUIRED
        updateInterval: 900000, // 15 min
};
bjsLab.msg = "Here's the config";

wx_helper.start();
wx_helper.socketNotificationReceived('WX_FORECAST_GET',bjsLab);
