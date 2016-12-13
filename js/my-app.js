

// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function(context) {
	return JSON.stringify(context);
});

var myName = "Travis Wagner";
// Initialize your app
var myApp = new Framework7({
	animateNavBackIcon: true,
	precompileTemplates: true,
	template7Pages: true,

	template7Data: {

		index: {
			w: "",
			lat:0,
			lon: 0,
			timeout: 6000000
		}
	}
});



myApp.onPageBeforeInit('index', function (page) {

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {

			lat = position.coords.latitude;
			lon=position.coords.longitude;
			myApp.template7Data.index.lat = lat;
			myApp.template7Data.index.lon = lon;

		});


	} else {
		errorPosition();


	}


}).trigger(); 


// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
  // Enable dynamic Navbar
  dynamicNavbar: true,
});
