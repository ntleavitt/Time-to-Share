'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:DiscussionCtrl
 * @description
 * # DiscussionCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('DiscussionCtrl', ['$scope','DisService', '$localStorage', function ($scope, DisService, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.userlogin = {};
    $scope.inMain = false;
    $scope.topPanel = 'Post';
    $scope.rightPanel = 'Main';
    $scope.leftPanel = 'Bank';
    $scope.bottomPanel = 'Services';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'main';
    $scope.bottomURL = 'services';
    //Pull localstorage variables
    $scope.userId = $localStorage.login;
    $scope.userInfo = $localStorage.userInfo;
    $scope.check = $localStorage.messageCh;
      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }

    
    /*Get all discussion posts related to 'User's' group*/
    $scope.topics = DisService.query({filter: {where: {groupId: $scope.userInfo.groupId}}},
                function(response) {
                    $scope.topics = response;
                },
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
    //When button clicked
    $scope.toDisPost = function () {
      
      console.log('clicked');
      //push user to 'dis' post page
      window.location.assign('http://localhost:9000/#/discussion/post');
    };
    //set 'dis' 'id' for comment page
    $scope.setDis = function (x) {
      console.log(x.id);
      //store locally for later use
      $localStorage.disID = x.id;
    };    
    
  }]);