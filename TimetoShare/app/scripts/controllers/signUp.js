'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')
  //filter the group options
  .filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
})

  .controller('SignUpCtrl', ['$scope', 'GroupsService', 'UserService', '$localStorage', 'loginService', function ($scope, GroupsService, UserService, $localStorage, loginService) {
    /*this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/
    //Get group list
    $scope.timeGroups = GroupsService.query(
                function(response) {
                    $scope.timeGroups = response;
                },
                function(response) {
                    $scope.message = 'Error: '+response.status + '' + response.statusText;
                });
    //load vars for button text
    $scope.rightPanel = 'Abount';
    $scope.leftPanel = 'Login';
    $scope.bottomPanel = 'Home';
    $scope.leftURL = 'login';
    $scope.rightURL = 'about';
    $scope.bottomURL = '';
    $scope.topPanel = 'New Group';
    $scope.userAdd = {};
    $scope.countrys = {};
    $scope.inMain = false;
    //Pull localstorage variables
    $localStorage.messageCh = true;
    $scope.check = $localStorage.messageCh;
    
    

    $scope.addUser = function() {
            //Create User
            $scope.createU = UserService.save({username: $scope.userSignUp.name, password: $scope.userSignUp.password, email: $scope.userSignUp.email, groupId: $scope.myGroup.id, credits: 10},
              function(response) {
                    $scope.createResponse = response;
                    $localStorage.create = $scope.createResponse;
                    console.log('user created');
                    $localStorage.messageCh = false;

                    //Login User if no Error
                    if ($localStorage.messageCh === false){
                      console.log('Send put call');
                      $scope.login = loginService.save({username: $scope.userSignUp.name, password: $scope.userSignUp.password},
                              function(response) {
                                  $scope.loginResponse = response;
                                  $localStorage.login = $scope.loginResponse;
                                  $localStorage.messageCh = false;
                                  console.log('logger in');

                                  //Store login information
                                  $scope.userId = $localStorage.login;
                                  console.log('saved login info');
                                  /*Retrieve logged in Users information only if User is successfully logged in*/
                                  if ($localStorage.messageCh === false){
                                      $scope.creditInfo = UserService.get({id: $scope.userId.userId},
                                              function(response) {
                                                    $scope.userInfo = response;
                                                    $localStorage.userInfo = $scope.userInfo;
                                                    console.log('get user infor');
                                                    window.location.assign('http://localhost:9000/#/main');
                                                },
                                                function(response) {
                                                    $scope.message = 'Error: ' + response.statusText + ', User Info not Retrieved.';
                                                    console.log('error on get info');
                                                    $localStorage.messageCh = true;

                                                });
                                    }
                              },
                              function(response) {
                                  $scope.message = 'Error: ' + response.statusText + ', could not login. Please try agin.';
                                  console.log('login issue');
                                  $localStorage.messageEr = response.status;
                                  $localStorage.messageCh = true;
                              });
                        }
                    
                },
                function(response) {
                    $scope.message = 'Error: ' + response.statusText + ', Username already in use. Please use another.';
                    console.log('Username in use.');
                    $localStorage.messageEr = response.status;
                    $localStorage.messageCh = true;
                });
            
    };

    
    
  }]);