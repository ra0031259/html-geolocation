app.controller('mapController', function ($scope, $http) {


	$scope.init_location = function() {
        navigator.geolocation.getCurrentPosition($scope.handle_location, $scope.handle_errors);
    }
 
    $scope.handle_errors = function(error) {

    	$scope.init_map(41.149805, -8.61007);

        switch(error.code) {
            case error.PERMISSION_DENIED: console.log("user did not share geolocation data");
            break;
            case error.POSITION_UNAVAILABLE: console.log("could not detect current position");
            break;
            case error.TIMEOUT: console.log("retrieving position timed out");
            break;
            default: console.log("unknown error");
            break;
        }
    }

    $scope.handle_location = function(position) {

    	$scope.init_map(position.coords.latitude, position.coords.longitude);

    }

    $scope.init_map = function(lat, long) {

        coords = {
            lat: lat,
            long: long
        };

        locationLoaded = true;

        if(locationLoaded && mapLoaded) {
            initMap(coords);
        }

    }

    if (navigator.geolocation) {
    	$scope.init_location();
    } else {
        $scope.init_map(41.149805, -8.61007);
    	//alert("no support");
    }

});