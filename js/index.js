var w;
var toggle =1;
var lat;
var lon;
var ip;


// weather wgt
$(document).ready(function() {
	setInterval(function(){StartProcess()},3000);
	$( "#temp" ).bind( "click", togglet);
	
	$('#getgeo').click(function(){
				/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
			lon=position.coords.longitude;
getData(lat,lon);
},errorPosition);
} else {
  errorPosition();
}

	

});
});

// use ip if position is not granted
function errorPosition(){
	$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
  lat = data.latitude;
	lon = data.longitude;
	getData(lat,lon);
});
	
	
}

function getData(lat,lon){
	if(toggle==1)var unit = 'c';
	else var unit = 'f';
			  $.simpleWeather({
    location: lat+','+lon,
    woeid: '',
    unit: unit,
    success: function(weather) {
			w = weather;
			$('#temp').html('<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>');
			$('.currently').html(weather.city);
			var lis= $( ".next li" );
			for(var i=0; i<4;i++){
			
					var string ="<strong>"+w.forecast[i].day+"</strong><br> MAX "+w.forecast[i].high+"<br> MIN "+w.forecast[i].low;
					lis.eq(i).html(string);

			}
				var pos = lat+","+lon;
				showPosition(pos);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
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
getData(lat,lon);
},errorPosition);
} else {
  errorPosition();
}

}