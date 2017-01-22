'use strict';

/**
 * @ngdoc function
 * @name timetoShareApp.controller:CreateGroupCtrl
 * @description
 * # CreateGroupCtrl
 * Controller of the timetoShareApp
 */
angular.module('TimetoShareApp')    
.controller('CreateGroupCtrl', function ($scope, $localStorage, GroupsService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //load vars for button text
    $scope.rightPanel = 'Abount';
    $scope.leftPanel = 'Login';
    $scope.bottomPanel = 'Home';
    $scope.leftURL = 'login';
    $scope.rightURL = 'about';
    $scope.bottomURL = '';

    //Add new group to REST API
    $scope.addGroup = function () {
          
          $scope.newGroup = GroupsService.save({name: $scope.newGroup.Group, country: $scope.newGroup.Country, state: $scope.newGroup.State, city: $scope.newGroup.City, motto: $scope.newGroup.Motto},
                  //success
                  function(response) {
                        $scope.newGroup = response;
                        console.log('group created');
                        $localStorage.messageCh = false;
                        //send user to 'signup' page is success full
                        window.location.assign('http://localhost:9000/#/signUp');
                    },
                    //error
                    function(response) {
                        $scope.message = 'Error: ' + response.statusText + ', please try again.';

                        $localStorage.messageEr = response.status;
                        $localStorage.messageCh = true;
                    });

        };
});