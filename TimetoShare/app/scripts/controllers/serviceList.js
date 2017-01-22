'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:ServiceListCtrl
 * @description
 * # ServiceListCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('ServiceListCtrl', function ($scope, $localStorage) {
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
    $scope.bottomPanel = 'Main';
    $scope.giveURL = 'give';
    $scope.recURL = 'receive';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'discussion';
    $scope.bottomURL = 'main';

    //Pull localstorage variables
    $scope.userId = $localStorage.login;
    $scope.check = $localStorage.messageCh;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }

    
    /*Clear all localstorage and send user to 'home' page*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      window.location.assign('http://localhost:9000/#/');

    };
    
  });