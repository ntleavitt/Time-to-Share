'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:GiveCatCtrl
 * @description
 * # GiveCatCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('GiveCatCtrl', function ($scope, ServService, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.userlogin = {};
    $scope.inMain = false;
    $scope.topPanel = 'Post';
    $scope.rightPanel = 'Discussion';
    $scope.leftPanel = 'Bank';
    $scope.bottomPanel = 'Main';
    $scope.topURL = 'post';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'discussion';
    $scope.bottomURL = 'main';
    //Pull localstorage variables
    $scope.userId = $localStorage.login;
    $scope.check = $localStorage.messageCh;
    $scope.userInfo = $localStorage.userInfo;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }

    /*Get services where 'type' is 'give' and 'groupID' is same as User*/
    $scope.service = ServService.query({filter: {where: {type: 'give', groupId: $scope.userInfo.groupId}}},
                //success
                function(response) {
                    $scope.timeGroups = response;
                },
                //error
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
    /*set service type for post and send user to 'post' page*/
    $scope.giveServ = function () {
      $localStorage.serviceType = 'give';
      console.log('clicked');
      window.location.assign('http://localhost:9000/#/services/post');
    };
    //set selected service id
    $scope.setService = function (x) {
      console.log(x.id);
      $localStorage.serviceID = x.id;
    };
    
  });