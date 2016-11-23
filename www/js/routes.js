angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.placeOrder', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/placeOrder.html',
        controller: 'placeOrderCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.login', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('menu.previousOrders', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/previousOrders.html',
        controller: 'previousOrdersCtrl'
      }
    }
  })

  .state('menu.milkBrands', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/milkBrands.html',
        controller: 'milkBrandsCtrl'
      }
    }
  })

  .state('menu.signup2', {
    url: '/signupMap',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup2.html',
        controller: 'signup2Ctrl'
      }
    }
  })

  .state('menu.bowlandMilk', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bowlandMilk.html',
        controller: 'bowlandMilkCtrl'
      }
    }
  })

  .state('menu.cart', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })

  .state('menu.payment', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl'
      }
    }
  })

  .state('menu.page', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page.html',
        controller: 'pageCtrl'
      }
    }
  })

  .state('menu.trackDelivery', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trackDelivery.html',
        controller: 'trackDeliveryCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page4')

  

});