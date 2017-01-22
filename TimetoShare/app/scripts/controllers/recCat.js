'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:RecCatCtrl
 * @description
 * # RecCatCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('RecCatCtrl', function ($scope, $localStorage, ServService) {
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

    

    /*Get all services with a 'type' of 'receive' and a 'groupId' that is the same as the current user*/
    $scope.service = ServService.query({filter: {where: {type: 'receive', groupId: $scope.userInfo.groupId}}},
                //success
                function(response) {
                    $scope.timeGroups = response;
                },
                //error
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
    //Set post service type
    $scope.recServ = function () {
      $localStorage.serviceType = 'receive';
      console.log('clicked');
      window.location.assign('http://localhost:9000/#/services/post');
    };
    //Set selected service ID
    $scope.setService = function (x) {
      console.log(x.id);
      $localStorage.serviceID = x.id;
    };
    
  });