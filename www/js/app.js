// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngCordova',])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform, $rootScope, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $rootScope.products = ["Milk", "Bread", "Butter", "Salt", "Prawns", "Chicken", "Tomatoes"];
  $rootScope.brands = ["Bowland", "Dale Farm Organic", "Watson's", "Daylesford Organic"];
  $rootScope.shopClass = function(shopName, shopImage){this.shopName = shopName; this.shopImage = shopImage;};
  $rootScope.shopClass.prototype.getPrice = function getPrice(productName, brandName){
	var price = 0.8;
	Math.seedrandom( (productName||"") + (brandName||"") + this.shopName);
	price += Math.random()*1.3;
	return price;
  };
  $rootScope.shopClass.prototype.getPriceFormatted = function getPriceFormatted(productName, brandName){
	return "£"+this.getPrice(productName, brandName).toFixed(2);
  };
  var sc = $rootScope.shopClass;
  $rootScope.getShopByName = function(shopName){
	  for(var i=0;i<$rootScope.shops.length;i++){
		  var shop = $rootScope.shops[i];
		  if(shop.shopName == shopName) return shop;
	  }
	  return null;
  };
  $rootScope.calculateCartFormatted = function(){
	  var sum = 0;
	  for(var i=0;i<$rootScope.cart.length;i++){
		  var pr = $rootScope.cart[i];
		  sum += $rootScope.getShopByName(pr.shop).getPrice(pr.product, pr.brand);
	  }
	  return "£"+sum.toFixed(2);
  };
  $rootScope.shops = [new sc('tesco', 'img/gEpeitf1RVas5wfrAnVK_Tesco_Logo.jpg'), new sc('sainsbury', 'img/fLUcdVDvSuSPGzSUsYbU_downloadcopy.jpeg'), new sc('waitrose', 'img/laOqBLeQRvaTRDCggEFj_download.jpeg'), new sc('planetorganic', 'img/me2apVHgQMunmYhAxqwG_PlanetOrganicLarge.jpg')];
  $rootScope.cart = [];
  
  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    console.log("fbAsyncInit is launching FB.init...");
    FB.init({ 
      //  The app id of the web app; To register a new app visit Facebook App Dashboard ( https://developers.facebook.com/apps/ )
      appId: '245676302512647', 
      // Adding a Channel File improves the performance  of the javascript SDK, by addressing issues  with cross-domain communication in certain browsers.
      //channelUrl: 'templates/channel.html', 
      //  Set if you want to check the authentication status at the start up of the app 
      //status: true, 
      //        Enable cookies to allow the server to access the session  
      cookie: true,
      // Parse XFBML
      xfbml: true 
    });

  };
  
  (function(d){
    // load the Facebook javascript SDK
    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));
  
  
})

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])