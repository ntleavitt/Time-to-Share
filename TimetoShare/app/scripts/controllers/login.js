'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')

  .controller('LoginCtrl', function ($scope, loginService, $localStorage, UserService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.user = {};
    $scope.inMain = false;
    $scope.rightPanel = 'Abount';
    $scope.leftPanel = 'Home';
    $scope.bottomPanel = 'SignUp';
    $scope.leftURL = '';
    $scope.rightURL = 'about';
    $scope.bottomURL = 'signUp';
    $localStorage.messageCh = false;


    $scope.submitLogin = function () {
      /*Send Login POST call to server*/
      $scope.login = loginService.save({username: $scope.user.username, password: $scope.user.password},
                function(response) {
                    $scope.loginResponse = response;
                    $localStorage.login = $scope.loginResponse;
                    window.location.assign('http://localhost:9000/#/main');
                    $localStorage.messageCh = false;
                    //Store login information
                    $scope.userId = $localStorage.login;
                    /*Retrieve logged in Users information only if User is successfully logged in*/
                    if ($localStorage.messageCh === false){
                        $scope.creditInfo = UserService.get({id: $scope.userId.userId},
                                function(response) {
                                      $scope.userInfo = response;
                                      $localStorage.userInfo = $scope.userInfo;
                                      
                                  },
                                  function(response) {
                                      $scope.message = 'Error: ' + response.statusText + ', please try again.';

                                      $localStorage.messageCh = true;

                                  });
                      }

                },
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', please try again.';

                    $localStorage.messageEr = response.status;
                    $localStorage.messageCh = true;
                });

                //Store login information
                $scope.userId = $localStorage.login;

                
      

      };
      
    	
    
  });