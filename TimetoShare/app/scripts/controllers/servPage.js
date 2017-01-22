'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:ServPageCtrl
 * @description
 * # ServPageCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('ServPageCtrl', function ($scope, $localStorage, ServService, ServComment) {
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
    $scope.serviceID = $localStorage.serviceID;

      //Check if authenticated
      if ($localStorage.messageEr === 200){
        $scope.message = 'Authenticated';
      }else {
        $scope.message = 'Error: Not Authenticated';
      }
    //Get selected service
    $scope.service = ServService.get({id: $scope.serviceID},
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
      //push new comment to old list
      $scope.sellected.comments.push({
                      comment: $scope.serviceComment,
                      author: $scope.userInfo.username
                    });
      //Post new comment
    	$scope.service = ServComment.save({id: $scope.serviceID},{
        title: $scope.sellected.title, 
        description: $scope.sellected.description, 
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
                    $scope.serviceComment = '';
                },
                //error
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
      console.log('submitted');
    	console.log($scope.userlogin);
    };
    /*Clear all localstorage and send user to 'home' page*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      $localStorage.serviceID = '';
      window.location.assign('http://localhost:9000/#/');

    };
    
  });