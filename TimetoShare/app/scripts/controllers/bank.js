'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:BankCtrl
 * @description
 * # BankCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  .controller('BankCtrl', function ($rootScope, $scope, $localStorage, UserService) {
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
    $scope.leftPanel = 'Main';
    $scope.bottomPanel = 'Services';
    $scope.leftURL = 'main';
    $scope.rightURL = 'discussion';
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

    
    //When button is clicked
    $scope.sendCredit = function () {
      //Find 'to' user
      $scope.getByName = UserService.query({filter: {where: {username: $scope.userTo}}},
                //success
                function(response) {
                    $scope.userByName = response;
                    $scope.userByName = $scope.userByName[0];

                    //exchange credits
                    $scope.creditToChange = Number($scope.userByName.credits) + Number($scope.creditsTo);
                                  console.log($scope.creditToChange);
                    $scope.userInfo.credits = Number($scope.userInfo.credits) - Number($scope.creditsTo);
                                  console.log($scope.userInfoCredits);

                    //update other user's credits on server
                    console.log('run update on ToUser');
                    $scope.updateToUser = UserService.update({id: $scope.userByName.id}, {credits: $scope.creditToChange},
                                        //success
                                        function(response) {
                                              $scope.updateUserToInfo = response;
                                              //console.log($scope.creditToChange);
                                              console.log($scope.userInfoCredits);

                                              
                                          },
                                          //error
                                          function(response) {
                                              $scope.message = 'Error: ' + response.statusText + ', Credit have not received by other user.';

                                              $localStorage.messageCh = true;

                                          });
                    //update USER's credits on server
                    console.log('run update on USER');
                    $scope.updateUser = UserService.update({id: $scope.userId.userId}, {credits: $scope.userInfo.credits},
                                        //success
                                        function(response) {
                                              $scope.updateUserInfo = response;  
                                              
                                          },
                                          //error
                                          function(response) {
                                              $scope.message = 'Error: ' + response.statusText + ', Your credits have not been saved on server.';

                                              $localStorage.messageCh = true;

                                          });
                    //clear out responses
                    $scope.userTo = '';
                    $scope.creditsTo = '';

                },
                //error
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', ToUser cannont be found on the server. Please try again.';

                    $localStorage.messageCh = true;

                });  

    };

    /*log out user and clear localstorage*/
    $scope.logOut = function () {
      
      $localStorage.login = '';
      $localStorage.userInfo = '';
      $localStorage.messageCh = true;
      //send user to 'Home' page
      window.location.assign('http://localhost:9000/#/');

    };

    
    
  });