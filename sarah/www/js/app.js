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
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCrtl'
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

  .state('app.reply-manager', {
    url: '/reply/manager',
    views: {
      'menuContent': {
        templateUrl: 'templates/reply-manager.html',
        controller: 'ReplyManagerCtrl'
      }
    }
  })

  .state('app.reply-summary', {
    url: '/reply/summary',
    views: {
      'menuContent': {
        templateUrl: 'templates/reply-summary.html'
      }
    }
  })

  .state('app.history', {
    url: '/reply/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/reply-history.html',
        controller: 'ReplyHistoryCtrl'
      }
    }
  })

  .state('app.donation-manager', {
    url: '/donation/manager',
    views: {
      'menuContent': {
        templateUrl: 'templates/donation-manager.html',
        controller: 'DonationManagerCtrl'
      }
    }
  })

  .state('app.donation-summary', {
    url: '/donation/summary',
    views: {
      'menuContent': {
        templateUrl: 'templates/donation-summary.html',
        controller: 'DonationSummaryCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
