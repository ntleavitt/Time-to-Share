'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:DisPageCtrl
 * @description
 * # DisPageCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('DisPageCtrl', function ($scope, $localStorage, DisService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.userlogin = {};
    $scope.inMain = false;
    $scope.topPanel = 'Log Out';
    $scope.rightPanel = 'Main';
    $scope.leftPanel = 'Bank';
    $scope.bottomPanel = 'Services';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'main';
    $scope.bottomURL = 'services';
    //Pull localstorage variables
    $scope.userId = $localStorage.login;
    $scope.servType = $localStorage.serviceType;
    $scope.userInfo = $localStorage.userInfo;
    $scope.check = $localStorage.messageCh;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }
    //When button clicked
    $scope.submitDiscussion = function () {
      //Post discussion to 'dis' REST API
      $scope.postDis = DisService.save({topic: $scope.feedback.topic, category: $scope.catFilter, message: $scope.feedback.content, comments: [{comment: 'Please add a comment.', author: 'Anon'}], groupId: $scope.userInfo.groupId, publisherId: $scope.userInfo.id},
              function(response) {
                    $scope.postDis = response;
                    console.log('dis created');
                    $localStorage.messageCh = false;
                    window.location.assign('http://localhost:9000/#/discussion');
                },
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', please try again.';

                    $localStorage.messageEr = response.status;
                    $localStorage.messageCh = true;
                });

    };
    /*Log out user and clear localstorage*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      //send user to 'Home' page
      window.location.assign('http://localhost:9000/#/');

    };
    
  });