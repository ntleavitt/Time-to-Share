'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.test = 'hello';
    $scope.rightPanel = 'Home';
    $scope.leftPanel = 'Login';
    $scope.bottomPanel = 'SignUp';
    $scope.leftURL = 'login';
    $scope.rightURL = '';
    $scope.bottomURL = 'signUp';
  });
