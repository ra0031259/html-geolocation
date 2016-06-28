app.controller('mapController', function ($scope, $http) {


	$scope.init_location = function() {
        navigator.geolocation.getCurrentPosition($scope.handle_location, $scope.handle_errors);
    }
 
    $scope.handle_errors = function(error) {

    	$scope.init_map(41.149805, -8.61007);

        switch(error.code) {
            case error.PERMISSION_DENIED: alert("user did not share geolocation data");
            break;
            case error.POSITION_UNAVAILABLE: alert("could not detect current position");
            break;
            case error.TIMEOUT: alert("retrieving position timed out");
            break;
            default: alert("unknown error");
            break;
        }
    }

    $scope.handle_location = function(position) {

    	$scope.init_map(position.coords.latitude, position.coords.longitude);

    }

    $scope.init_map = function(lat, long) {

    	var map = L.map('pois-map-container').setView([lat, long], 17);
    	
    	L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{scheme}/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
      		attribution: 'Map &copy; 2016 <a href="http://developer.here.com">HERE</a>',
			subdomains: '1234',
			base: 'base',
			type: 'maptile',
			scheme: 'reduced.night',
			app_id: 'Kw9CZCaGeBCq7pgn0EZs',
			app_code: 'hAURfuHsqeEeyW9to2VB2Q',
			mapID: 'newest',
			maxZoom: 20,
			language: 'eng',
			format: 'png8',
			size: '256',
			detectRetina: true
    	}).addTo(map);

    	var marker = L.marker([lat, long]).addTo(map);
    }

    if (navigator.geolocation) {
    	$scope.init_location();
    } else {
    	alert("no support");
    }

});