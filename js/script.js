
var toggle =1;

var ip;
var showerror = 1;
var timeoutId;



// weather wgt
$(document).ready(function() {


	$( ".notification" ).hide();
	
	$( "#temp" ).bind( "click", togglet);
	
	timeoutId = window.setTimeout(StartProcess(), myApp.template7Data.index.timeout);
	
	
	$('#getgeo').click(function(){

		if ("geolocation" in navigator) {

			navigator.geolocation.getCurrentPosition(function(position) {

				lat = position.coords.latitude;
				lon=position.coords.longitude;

			},function(){
				showerror =1;
				errorPosition();
			});
		} else {
			showerror =1;
			errorPosition();
		}
	}); 
	
});


// use ip if position is not granted
function errorPosition(){
	
	if(showerror == 1){
		showNotificationError('GPS position not used, data probably incorrect');
		showerror =0;
	}
	$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
		var lat = data.latitude;
		var lon = data.longitude;
		myApp.template7Data.index.lat = lat;
		myApp.template7Data.index.lon = lon;

	});
	
} 

function getData(){
	if(toggle==1)var unit = 'c';
	else var unit = 'f';
	$.simpleWeather({
		location: myApp.template7Data.index.lat+','+myApp.template7Data.index.lon,
		woeid: '',
		unit: unit,
		success: function(weather) {

			myApp.template7Data.index.w = weather;
			clearTimeout(timeoutId) ;
			myApp.template7Data.index.timeout = 6000000;

			console.log(myApp.template7Data.index.timeout);

			$('#temp').html('<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>');
			$('.currently').html(weather.city);
			$('.max').html(weather.high);
			$('.min').html(weather.low);
			var lis= $( ".next li" );
			for(var i=0; i<4;i++){

				var string ="<strong>"+weather.forecast[i].day+"</strong><br> MAX "+weather.forecast[i].high+"<br> MIN "+weather.forecast[i].low;
				lis.eq(i).html(string);

			}
			timeoutId = window.setTimeout(StartProcess(), myApp.template7Data.index.timeout);


		},
		error: function(error) {
		console.log("error: "+myApp.template7Data.index.timeout);

			myApp.template7Data.index.timeout = 60000;
			clearTimeout(timeoutId) ;
			timeoutId = window.setTimeout(StartProcess(), myApp.template7Data.index.timeout);


		}
	});
}


// toggle units
function togglet(){

	if(toggle == 0){
		toggle =1;
		$( "#temp" ).html('<h2 id="temp"><i class="icon-'+w.code+'"></i> '+w.temp+'&deg;C</h2>');
		getData(lat,lon);
	}else{
		toggle =0;
		$( "#temp" ).html('<h2 id="temp"><i class="icon-'+w.code+'"></i> '+w.alt.temp+'&deg;F</h2>');
		getData(lat,lon);
	}
}

function showPosition(position) {

	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
	+position+"&zoom=14&size=400x300&sensor=false";
	document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}


function StartProcess(){

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {

			lat = position.coords.latitude;
			lon=position.coords.longitude;
			myApp.template7Data.index.lat = lat;
			myApp.template7Data.index.lon = lon;

		},errorPosition);

		getData();

	} else {
		errorPosition();

		getData();

	}

}

function showNotificationError(text){
	$( ".notification" ).slideDown(1000,"swing");
	$( ".notification" ).text(text);  
	$( ".notification" ).delay(5000).slideUp(1000,"swing");
}