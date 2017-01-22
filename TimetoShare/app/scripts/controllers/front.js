'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('FrontCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.userlogin = {};
    $scope.inMain = false;
    $scope.rightPanel = 'Abount';
    $scope.leftPanel = 'Login';
    $scope.bottomPanel = 'SignUp';
    $scope.leftURL = 'login';
    $scope.rightURL = 'about';
    $scope.bottomURL = 'signUp';
    
  });