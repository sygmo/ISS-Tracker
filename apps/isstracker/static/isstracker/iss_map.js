$(document).ready(function(){
	$.getJSON('http://api.open-notify.org/astros.json', function(data) {
  		$('#num-people').html(data['number']);

  		for (i=0; i<data['number']; i++) {
  			$('#astronauts').append("<li>" + data['people'][i]['name'] + " (" + data['people'][i]['craft'] + ")</li>");
  		}

	});


	// Map
	var mymap = L.map('mapid').setView([51.505, -0.09], 3);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    accessToken: 'pk.eyJ1Ijoic3lkbmV5bSIsImEiOiJjaXd3ZHVkd20wMWZjMnlscW0zZ3dscDBqIn0.XxVyJD7vN-l89-CEn0ijmQ'
	}).addTo(mymap);

	var iss = L.icon({
				iconUrl: "/static/isstracker/iss-icon_light.png",
				iconSize: [50, 50],
	});
	iss = L.marker([51.5, -0.09], {icon: iss}).addTo(mymap);

	var isscirc = L.circle([51.508, -0.11], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.2,
		radius: 2000000
	}).addTo(mymap);

	moveISS();


	// move ISS around map
	function moveISS () {
	    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {

	        var lat = data['iss_position']['latitude'];
	        var lon = data['iss_position']['longitude'];

	        console.log("Lat: " + lat + ", Lon: " + lon);

	        $('#latitude').html("<p>Latitude: " + lat + "</p>");
	        $('#longitude').html("<p>Longitude: " + lon + "</p>");

	        // See leaflet docs for setting up icons and map layers
	        // The update to the map is done here:
	        iss.setLatLng([lat, lon]).update();
	        isscirc.setLatLng([lat, lon]);
	        mymap.panTo([lat, lon], animate=true);
	    });
	    setTimeout(moveISS, 5000); 
	}
});