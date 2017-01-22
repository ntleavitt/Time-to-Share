'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:DisSellectCtrl
 * @description
 * # DisSellectCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('DisSellectCtrl', function ($scope, $localStorage, DisService, DisComment) {
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
    $scope.userInfo = $localStorage.userInfo;
    $scope.check = $localStorage.messageCh;
    $scope.disID = $localStorage.disID;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }
    //Get discussion by "disID"
    $scope.service = DisService.get({id: $scope.disID},
                //success
                function(response) {
                    $scope.sellected = response;
                    $scope.comments = $scope.sellected.comments;

                },
                //error
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
    //push comment button is pressed
    $scope.submitComment = function () {
      //push new comment to exsiting list
      $scope.sellected.comments.push({
                      comment: $scope.disComment,
                      author: $scope.userInfo.username
                    });
      //Post new list of comments
    	$scope.service = DisComment.save({id: $scope.disID},{
                topic: $scope.sellected.topic, 
                message: $scope.sellected.message, 
                date: $scope.sellected.date, 
                category: $scope.sellected.category, 
                type: $scope.sellected.type, 
                comments: $scope.sellected.comments, 
                id: $scope.sellected.id, 
                groupId: $scope.sellected.groupId, 
                publisherId: $scope.sellected.publisherId},
                //success
                function(response) {
                    $scope.addComment = response;
                    $scope.disComment = '';
                },
                //error
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
      console.log('submitted');
    	console.log($scope.userlogin);
    };
    /*Log out user and clear localstorage*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      $localStorage.serviceID = '';
      //send user to 'Home' page
      window.location.assign('http://localhost:9000/#/');

    };
    
  });