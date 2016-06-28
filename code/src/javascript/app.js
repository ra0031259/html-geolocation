var app = angular.module('APP', [])
	.config(['$logProvider' ,function($logProvider) {
        // SHOW ERRORS ALERT
        $logProvider.debugEnabled(true);
    }]);


// var mainSlider = new TPSlider($(document.querySelector('.tp-slider-wrapper')));
    

function initMap(coords) {

	var mapOptions = {
	    // How zoomed in you want the map to start at (always required)
	    zoom: 14,

	    // The latitude and longitude to center the map (always required)
	    center: new google.maps.LatLng(coords.lat, coords.long),
	    disableDefaultUI: true,

	    // How you would like to style the map. 
	    // This is where you would paste any style found on Snazzy Maps.
	    styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#262c33"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20},{"color":"#949aa6"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":"0.00"},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30},{"color":"#353c44"},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":"0"},{"lightness":"0"},{"gamma":"0.30"},{"weight":"0.01"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":"100"},{"saturation":-20},{"visibility":"simplified"},{"color":"#31383f"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30},{"color":"#2a3037"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":"-20"},{"lightness":"-20"},{"gamma":"0.00"},{"color":"#2a3037"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#575e6b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#4c5561"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20},{"color":"#171b1c"}]}]
	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('pois-map-container');

	// Create the Google Map using our element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Let's also add a marker while we're at it
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(coords.lat, coords.long),
	    map: map,
	    animation: google.maps.Animation.DROP,
	    title: 'Museu CR7',
	    /*icon: {
	        url: 'images/marker.png',
	        size: new google.maps.Size(24.5, 39),
	        scaledSize: new google.maps.Size(24.5, 39)
	    }*/
	});

	google.maps.event.addListener(marker, 'mouseover', function() {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	});

	google.maps.event.addListener(marker, 'mouseout', function() {
	    marker.setAnimation(null);
	});

	function toggleBounce() {
	    if (marker.getAnimation() !== null) {
	        marker.setAnimation(null);
	    } else {
	        marker.setAnimation(google.maps.Animation.BOUNCE);
	    }
	}


}
                