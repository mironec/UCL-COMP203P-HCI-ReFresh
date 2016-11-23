import os

f = open('www/index.html', 'r+')
f.seek(0)
content = f.read()

seeker = '<script src="lib/ionic/js/ionic.bundle.js"></script>'
pos = content.find(seeker)
content = content[:(pos+len(seeker))] + '\n\t<script src="lib/ngCordova/dist/ng-cordova.js"></script>' + content[(pos+len(seeker)):]

seeker = '<script src="js/app.js"></script>'
pos = content.find(seeker)
content = content[:(pos+len(seeker))] + '\n\t<script src="http://maps.google.com/maps/api/js?key=AIzaSyBPCcao3tscVkZaOfcozPZi-Aqydpxb4tc"></script>' + content[(pos+len(seeker)):]

seeker = '<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">'
pos = content.find(seeker)
content = content[:(pos+len(seeker))] + '\n\t<meta http-equiv="Content-Security-Policy" content="script-src \'self\' http://maps.google.com http://maps.googleapis.com">' + content[(pos+len(seeker)):]

f.seek(0)
f.write(content)
f.close()

#####################################################################################################################
f = open('www/js/app.js', 'r+')
f.seek(0)
content = f.read()

seeker = "angular.module('app',"
pos = content.find(seeker)
pos2 = content.find(']', pos)
content = content[:pos2] + " 'ngCordova'," + content[pos2:]

f.seek(0)
f.write(content)
f.close()

#####################################################################################################################
f = open('www/js/controllers.js', 'r+')
f.seek(0)
content = f.read()

seeker = ".controller('signup2Ctrl'"
pos = content.find(seeker)
pos2 = content.find('}])', pos)
content = content[:(pos+len(seeker))] + ''', ['$scope', '$state', '$cordovaGeolocation', '$http', function($scope, $state, $cordovaGeolocation, $http) {
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
}])''' + content[(pos2+3):]

f.seek(0)
f.write(content)
f.close()
#######################################################################################################################

f = open('www/templates/signup2.html', 'r+')
f.seek(0)
content = f.read()

seeker = '<div id="signup2-container2"'
pos = content.find(seeker)
content = content[:(pos+len(seeker))] + ' data-tap-disabled="true"' + content[(pos+len(seeker)):]

seeker = '<input type="text" placeholder=""'
pos = content.find(seeker)
content = content[:(pos+len(seeker))] + ' ng-model="address"' + content[(pos+len(seeker)):]

f.seek(0)
f.write(content)
f.close()
#######################################################################################################################

os.system("bower install ngCordova")
os.system("cordova plugin add cordova-plugin-geolocation")
os.system("ionic setup sass")