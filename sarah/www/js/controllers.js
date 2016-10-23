angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.logout = function() {
    $scope.modal.show();
  }

  $scope.doLogout = function() {
    console.log('Doing logout');

    // Redirect to home page
    $state.go('app.login');
    $scope.closeLogout();
  }

  $scope.closeLogout = function() {
    $scope.modal.hide();
  }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $state.go('app.dashboard');
    }, 1000);
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

})


.controller('DashboardCrtl', function($scope) {
    $scope.settings = [
        { icon: 'ion-ios-search', title: "Search"},
        { icon: 'ion-gear-b', title: "Settings"},
        { icon: 'ion-power', title: "Log Out"}
    ]
})

.controller('ReplyManagerCtrl', function($scope) {
  var lambda = new AWS.Lambda();

  $scope.commands = [
    {title: 'Employment', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'},
    {title: 'Foodbank', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 25, 2016'},
    {title: 'Housing', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'February 14, 2016'},
    {title: 'Legal', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2006'},
    {title: 'Safety', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'},
    {title: 'Volunteer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'}];

  $scope.selectedCommand = {
    Action: '',
    Response: '',
    notes: '',
    updated: '',
    visible: false
  }

  $scope.edit = function(command) {
    $scope.selectedCommand = command;
    $scope.selectedCommand.visible = true;
  }

  $scope.getActions = function() {
    var params = {
      FunctionName: "getActions"
    };

    lambda.invoke(params, function(err, data) {
      if (err) console.log(err);
      else {
        data = JSON.parse(data.Payload);

        $scope.$apply(function() {
          $scope.actions = data.Actions;
        });
      };
    });
  };

  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.getActions();
  });
})

.controller('DonationManagerCtrl', function($scope) {
  $scope.commands = [
    {title: 'General', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'},

    {title: '#25Days4Her', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 25, 2016'},

    {title: 'Tea for Teens', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'February 14, 2016'},

    {title: 'Capital Campaign Gala', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2006'},

    {title: 'Shoppers Drug Mart', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'},

    {title: '#GiftTheCode', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', notes: 'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', updated: 'March 24, 2016'}];

  $scope.selectedCommand = {
    title: '',
    description: '',
    notes: '',
    updated: '',
    visible: false
  }

  $scope.edit = function(command) {
    $scope.selectedCommand = command;
    $scope.selectedCommand.visible = true;
  }
})

.controller('DonationSummaryCtrl', function($scope) {
  $scope.totalAmount = '14,664';

  $scope.campaigns = [
    {
      title: 'General',
      number: '2344',
      description: 'desk'
    },
    {
      title: '#25Days4Her',
      number: '5455',
      description: 'table'
    },
    {
      title: 'Tea for Teens',
      number: '101',
      description: 'chair'
    },
    {
      title: 'Capital Campaign Gala',
      number: '5433',
      description: 'sofa'
    },
    {
      title: 'Shoppers Drug Mart',
      number: '101000',
      description: 'couch'
    },
    {
      title: 'GiftTheCode',
      number: '5433',
      description: 'banana'
    }
  ];

  $scope.selectedCampaign = {
    title: '',
    number: '',
    description: '',
    visible: false
  };

  $scope.edit = function(campaign) {
    $scope.selectedCampaign = campaign;
    $scope.selectedCampaign.visible = true;
  };

  $scope.donations = [
    {
      date: 'March 20 2016',
      amount: 50
    },
    {
      date: 'March 17 2016',
      amount: 40
    },
    {
      date: 'March 16 2016',
      amount: 70
    }
  ]
})

.controller('ReplyHistoryCtrl', function($scope) {
  $scope.records = [
    {
      phoneNumber: '613-267-3704',
      timestamp: 'October 22 2016',
      received: 'received message',
      sent: 'sent message'
    },{
      phoneNumber: '613-267-8858',
      timestamp: 'October 21 2016',
      received: 'lorem message',
      sent: 'sent ipsum'
    }
  ]
});
