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

.run(function($ionicPlatform, $rootScope) {
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