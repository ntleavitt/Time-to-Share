'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('MainCtrl', function ($scope, $localStorage, GroupUser) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.userlogin = {};
    $scope.inMain = false;
    $scope.topPanel = 'Log Out';
    $scope.rightPanel = 'Discussion';
    $scope.leftPanel = 'Bank';
    $scope.bottomPanel = 'Services';
    $scope.topURL = '';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'discussion';
    $scope.bottomURL = 'services';
    //Pull localstorage variables
    $scope.userId = $localStorage.login;
    $scope.check = $localStorage.messageCh;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }

    

    //Get User 'motto' and 'name'
    $scope.groupInfo = GroupUser.get({id: $scope.userId.userId},
              function(response) {
                    $scope.timeGroups = response;
                    
                },
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', please try again.';

                    $localStorage.messageCh = true;

                });
    /*log out user and clear localstorage*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      //send user to 'Home' page
      window.location.assign('http://localhost:9000/#/');

    };

    
  });
