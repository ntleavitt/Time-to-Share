'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:PostServiceCtrl
 * @description
 * # PostServiceCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('PostServiceCtrl', function ($scope, $localStorage, ServService) {
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
    $scope.topURL = 'categories';
    $scope.leftURL = 'bank';
    $scope.rightURL = 'discussion';
    $scope.bottomURL = 'main';
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


      
    //Post service to REST API
    $scope.submitComment = function () {
      
      $scope.postServ = ServService.save({title: $scope.feedback.topic, description: $scope.feedback.content, category: $scope.catFilter, type: $scope.servType, comments: [{comment: 'Please add a comment.', author: 'Anon'}], groupId: $scope.userInfo.groupId, publisherId: $scope.userInfo.id},
              //success
              function(response) {
                    $scope.postServ = response;
                    console.log('user created');
                    $localStorage.messageCh = false;
                    window.location.assign('http://localhost:9000/#/services');
                },
                //error
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', please try again.';

                    $localStorage.messageEr = response.status;
                    $localStorage.messageCh = true;
                });

    };
    /*Clear all localstorage and send user to 'home' page*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      window.location.assign('http://localhost:9000/#/');

    };
    
  });