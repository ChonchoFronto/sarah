// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  /* Initial route */
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  /* Sarah routes */
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html'
      }
    }
  })

  .state('app.analytics', {
    url: '/analytics',
    views: {
      'menuContent': {
        templateUrl: 'templates/analytics.html'
      }
    }
  })

  .state('app.io', {
    url: '/io',
    views: {
      'menuContent': {
        templateUrl: 'templates/io.html'
      }
    }
  })

  .state('app.io-help', {
    url: '/io/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/io-help.html'
      }
    }
  })

  .state('app.io-donations', {
    url: '/io/donations',
    views: {
      'menuContent': {
        templateUrl: 'templates/io-donations.html'
      }
    }
  })

  .state('app.io-recurring', {
    url: '/io/recurring',
    views: {
      'menuContent': {
        templateUrl: 'templates/io-recurring.html'
      }
    }
  })

  .state('app.io-events', {
    url: '/io/events',
    views: {
      'menuContent': {
        templateUrl: 'templates/io-events.html'
      }
    }
  })

  .state('app.io-languages', {
    url: '/io/languages',
    views: {
      'menuContent': {
        templateUrl: 'templates/io-languages.html'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
