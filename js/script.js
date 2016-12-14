
var toggle =1;

var ip;
var showerror = 1;
var timeoutId;



// weather wgt
$(document).ready(function() {

StartProcess();

	$( ".notification" ).hide();
	
	$( "#temp" ).bind( "click", togglet);
	

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
		localStorage.clear();
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
	if (localStorage.getItem("w") === null) {

	$.simpleWeather({
		location: myApp.template7Data.index.lat+','+myApp.template7Data.index.lon,
		woeid: '',
		unit: unit,
		success: function(weather) {
			console.log("apicall succ");
			myApp.template7Data.index.w = weather;
			$('#temp').html('<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>');
			$('.currently').html(weather.city);
			$('.max').html(weather.high);
			$('.min').html(weather.low);
			var lis= $( ".next div" );
			for(var i=0; i<4;i++){

				var string ="<strong>"+weather.forecast[i].day+"</strong><br> MAX "+weather.forecast[i].high+"<br> MIN "+weather.forecast[i].low;
				lis.eq(i).html(string);

			}
           myApp.hideIndicator();
		localStorage.setItem('w', JSON.stringify(weather));
		if(weather.code == 28){
			$('body').css('background-color','#333');
			$('body').addClass('snow');

		}
		},
		error: function(error) {


			console.log("apicall error: "+error);
			StartProcess();
		}
	});
}else{
	console.log("localstorage");
	myApp.template7Data.index.w = JSON.parse(localStorage.getItem("w"));
           myApp.hideIndicator();
	if(toggle==1){
	$('#temp').html('<h2 id="temp"><i class="icon-'+myApp.template7Data.index.w.code+'"></i> '+myApp.template7Data.index.w.temp+'&deg;'+myApp.template7Data.index.w.units.temp+'</h2>');
			$('.currently').html(myApp.template7Data.index.w.city);
			$('.max').html(myApp.template7Data.index.w.high);
			$('.min').html(myApp.template7Data.index.w.low);
			var lis= $( ".next div" );
			for(var i=0; i<4;i++){

				var string ="<strong>"+myApp.template7Data.index.w.forecast[i].day+"</strong><br> MAX "+myApp.template7Data.index.w.forecast[i].high+"<br> MIN "+myApp.template7Data.index.w.forecast[i].low;
				lis.eq(i).html(string);

			}
	}else{
		$('#temp').html('<h2 id="temp"><i class="icon-'+myApp.template7Data.index.w.code+'"></i> '+myApp.template7Data.index.w.alt.temp+'&deg;'+myApp.template7Data.index.w.units.temp+'</h2>');
			$('.currently').html(myApp.template7Data.index.w.city);
			$('.max').html(myApp.template7Data.index.w.alt.high);
			$('.min').html(myApp.template7Data.index.w.alt.low);
			var lis= $( ".next div" );
			for(var i=0; i<4;i++){

				var string ="<strong>"+myApp.template7Data.index.w.forecast[i].day+"</strong><br> MAX "+myApp.template7Data.index.w.forecast[i].alt.high+"<br> MIN "+myApp.template7Data.index.w.forecast[i].alt.low;
				lis.eq(i).html(string);

			}	
	}

		if(myApp.template7Data.index.w.code == 28){
			$('body').css('background-color','#333');
			$('body').addClass('snow');
		}

}

}


// toggle units
function togglet(){

	if(toggle == 0){
		toggle =1;
		$( "#temp" ).html('<h2 id="temp"><i class="icon-'+myApp.template7Data.index.w.code+'"></i> '+myApp.template7Data.index.w.temp+'&deg;C</h2>');
		getData();
	}else{
		toggle =0;
		$( "#temp" ).html('<h2 id="temp"><i class="icon-'+myApp.template7Data.index.w.code+'"></i> '+myApp.template7Data.index.w.alt.temp+'&deg;F</h2>');
		getData();
	}
}

function showPosition(position) {

	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
	+position+"&zoom=14&size=400x300&sensor=false";
	document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}


function StartProcess(){
myApp.showIndicator();
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