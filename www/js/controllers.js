angular.module('app.controllers', [])
  
.controller('placeOrderCtrl', ['$scope', '$stateParams', '$rootScope', '$cordovaBarcodeScanner', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $cordovaBarcodeScanner) {
	if($stateParams.productName !== undefined){
		$rootScope.cart.push({product: $stateParams.productName, brand: $stateParams.brandName, shop: $stateParams.shopName});
	}
	
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window) {
	/*$scope.rend = function(){gapi.signin2.render('g-signin2', {'longtitle': true, 'width': $window.innerWidth - 20});};
	$scope.checkRend = function(){
		if(window.gapi !== undefined) $scope.rend();
		else setTimeout($scope.checkRend, 500);
	};
	
	$scope.checkRend();*/
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('previousOrdersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('recurringOrdersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.hideStuff = false;
	$scope.hideFunc = function(){$scope.hideStuff = !$scope.hideStuff;};
	$scope.removeAll = function(){$scope.hideStuff = true; $scope.hideAllStuff = true;}
}])
   
.controller('brandSelectionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.product = $stateParams.productName;

}])
   
.controller('signup2Ctrl', ['$scope', '$state', '$cordovaGeolocation', '$http', function($scope, $state, $cordovaGeolocation, $http) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  var setupMap = function(latLng){
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("signup2-container2"), mapOptions);
    $scope.placeMarker = function placeMarker(location) {
      if($scope.marker !== undefined && $scope.marker !== null){
        $scope.marker.setMap(null);
      }
      var marker = new google.maps.Marker({
          position: location, 
          map: $scope.map
      });
      $scope.marker = marker;
      
      $scope.map.setCenter(location);
      $http({method: 'GET', url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBPCcao3tscVkZaOfcozPZi-Aqydpxb4tc&latlng='+location.lat()+','+location.lng()}).then(
        function success(response){
            $scope.address = response.data.results[0].formatted_address;
        }
      );
    }
    google.maps.event.addListener($scope.map, 'click', function(event) {
        $scope.placeMarker(event.latLng);
    });
  };
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    setupMap(latLng);
  }, function(error){
    console.log("Could not get location");
    setupMap();
  });
}])
   
.controller('shopSelectionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.product = $stateParams.productName;
	$scope.brand = $stateParams.brandName;
}])
   
.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('paymentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	//$scope.deliveryDate = Date.now();
	$scope.range = function(min, max, step) {
		step = step || 1;
		var input = [];
		for (var i = min; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};
	$scope.data = {};
	$scope.data.frequencyValue = 1;
	$scope.data.oneoff = false;
	$scope.frequencyNames = ["Monthly", "Every 3 weeks", "Every 2 weeks", "Every week", "Every 5 days", "Every 4 days", "Every 3 days", "Every 2 days", "Every day"];
	$scope.getFrequencyName = function(){return $scope.frequencyNames[$scope.data.frequencyValue-1]};
}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('trackDeliveryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.semidate = Date.now();

}])
 