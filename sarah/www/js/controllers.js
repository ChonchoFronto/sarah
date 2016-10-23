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
    $scope.totalDonations = "$28, 3473";
    $scope.totalWomenServed = "687";

    $scope.actions = [
      {
        action: 'Housing',
        invocationCount: 10
      },
      {
        action: 'Shelter',
        invocationCount: 9
      },
      {
        action: 'Employment',
        invocationCount: 8
      },
      {
        action: 'Counselling',
        invocationCount: 9
      },
      {
        action: 'Women\'s Health',
        invocationCount: 8
      }
    ];

    $scope.keywords = ['Alcohol', 'Domestic Violence', 'Divorce Law',
    'Hospital', 'Stress'];

    $scope.items = [
      { title: 'Job',
        description: 'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.'},
      { title: 'Safe Houses',
        description: 'Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.'},
      { title: 'Legal',
        description: 'Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.'}
    ]

    $scope.getUserInfo = function() {
    // Build Params
    var params = {
      FunctionName: "getSarahAnalytics"
    };

    console.log(params);

    // Call to lambda
    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        data = JSON.parse(data.Payload);

        // Apply it to our model

        /*$scope.$apply(function() {
          $scope.buttonId = data.ButtonId;
          $scope.totalQuickSaved = data.TotalQuickSaved;
          $scope.checkingFunds = data.CheckingFunds;
          $scope.savingsFunds = data.SavingsFunds;
          $scope.monthlyGoal = data.MonthlyGoal;
          $scope.singleClickAmount = data.SingleClickAmount;
          $scope.doubleClickAmount = data.DoubleClickAmount;

          $scope.percentOfMonthlyGoal =  Math.round(($scope.totalQuickSaved/$scope.monthlyGoal) * 100);
          $scope.setGoalMessage($scope.percentOfMonthlyGoal);
        });*/
      }
    });
  };
})

.controller('ReplyManagerCtrl', function($scope) {
  var lambda = new AWS.Lambda();

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



.controller('ReplyHistoryCtrl', function($scope) {

  var lambda = new AWS.Lambda();

  $scope.getActions = function() {
    var params = {
      FunctionName: "getMessageLog"
    };

    lambda.invoke(params, function(err, data) {
      if (err) console.log(err);
      else {
        data = JSON.parse(data.Payload);

        $scope.$apply(function() {
          $scope.records = data.Messages;
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
    title: "General",
    number: "$9,453.41",
    description: "Lorem consequat fugiat quis qui mollit pariatur ea ullamco exercitation ullamco consequat id laborum quis adipisicing tempor elit do velit ad commodo anim elit reprehenderit sunt quis exercitation do Lorem ipsum in sunt consequat eu dolore tempor eiusmod voluptate ex sint ea anim dolore aliquip"
  },
  {
    title: "#25Days4Her",
    number: "$12,251.55",
    description: "commodo qui eu veniam nulla ullamco pariatur pariatur excepteur eiusmod duis reprehenderit ipsum mollit fugiat officia voluptate in ut consequat aute velit minim cupidatat est in reprehenderit ut sunt sunt commodo culpa tempor sit eiusmod occaecat ex magna non id velit laborum veniam occaecat nulla"
  },
  {
    title: "Tea for Teens",
    number: "$9,118.59",
    description: "et deserunt anim exercitation cillum ut aute esse labore consequat deserunt laboris mollit reprehenderit anim labore exercitation exercitation dolore ullamco ex officia amet dolor eu commodo officia officia commodo minim enim amet consectetur nisi esse dolor occaecat reprehenderit consequat irure dolor minim elit eu consectetur"
  },
  {
    title: "Capital Campaign Gala",
    number: "$9,807.75",
    description: "quis tempor do mollit culpa proident ex cillum culpa ad id exercitation ex Lorem laborum aute laboris in eu aliquip cillum exercitation proident labore occaecat laborum eu ea deserunt deserunt velit ex non non amet laboris consectetur deserunt nulla excepteur ut sunt cupidatat laborum nostrud"
  },
  {
    title: "Shoppers Drug Mart",
    number: "$12,156.42",
    description: "veniam id cupidatat irure sit anim est nostrud sunt nisi ipsum proident laborum magna culpa officia in et qui aute veniam sint eiusmod velit nisi cupidatat deserunt adipisicing qui et eu qui consectetur adipisicing sint ullamco velit duis in laboris cupidatat minim et labore ut"
  },
  {
    title: "#GiftTheCode",
    number: "$12,935.67",
    description: "est elit pariatur dolor est dolor aliqua exercitation deserunt ad velit ad tempor ex incididunt sunt mollit id duis laboris irure proident ullamco cillum eiusmod veniam occaecat reprehenderit excepteur velit do dolore eiusmod exercitation eiusmod laboris laborum quis labore id ex ipsum exercitation incididunt voluptate"
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
  { date: "2015-05-26", amount: "$68.90" },
  { date: "2014-10-04", amount: "$82.98" },
  { date: "2015-01-28", amount: "$65.34" },
  { date: "2015-09-28", amount: "$51.98" },
  { date: "2014-12-28", amount: "$64.85" },
  { date: "2015-10-07", amount: "$73.01" },
  { date: "2015-12-25", amount: "$44.02" },
  { date: "2014-11-13", amount: "$71.15" },
  { date: "2014-08-01", amount: "$45.46" },
  { date: "2016-09-14", amount: "$71.69" },
  { date: "2016-04-15", amount: "$43.60" },
  { date: "2014-12-11", amount: "$69.08" },
  { date: "2014-12-27", amount: "$52.66" },
  { date: "2014-07-16", amount: "$64.02" },
  { date: "2015-09-16", amount: "$37.77" },
]
});
