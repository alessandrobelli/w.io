

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
  onAjaxStart: function (xhr) { myApp.showIndicator(); },
    onAjaxComplete: function (xhr) { myApp.hideIndicator()},
	template7Data: {

		index: {
			w: "",
			lat:0,
			lon: 0,
			timeout: 600,
			timeoutId: 0
		}
	}

});

myApp.onPageBeforeInit('index', function (page) {


}).trigger(); 


// Export selectors engine
var $$ = Dom7;
var ptrContent = $$('.pull-to-refresh-content');

	ptrContent.on('refresh',function(){
		localStorage.clear();
	});

// Add main View
var mainView = myApp.addView('.view-main', {
  // Enable dynamic Navbar
  dynamicNavbar: true,
});
