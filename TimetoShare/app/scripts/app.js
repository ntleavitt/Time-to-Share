'use strict';

/**
 * @ngdoc overview
 * @name timetoShareApp
 * @description
 * # timetoShareApp
 *
 * Main module of the application.
 */
angular
  .module('TimetoShareApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngStorage'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      /*Home page of site*/
      .when('/', {
        templateUrl: 'views/front.html',
        controller: 'FrontCtrl', 
        controllerAs: 'front'
      })
      /*sign up as a user*/
      .when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signUp'
      })
      /*login as user*/
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      /*route to about page*/
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      /*main page once logged in*/
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
        
      })
      /*users time share bank*/
      .when('/bank', {
        templateUrl: 'views/bank.html',
        controller: 'BankCtrl',
        controllerAs: 'bank'
      })
      /*services type page*/
      .when('/services', {
        templateUrl: 'views/serviceList.html',
        controller: 'ServiceListCtrl',
        controllerAs: 'serviceList'
      })
      /*list of discussions posted by of members of same group*/
      .when('/discussion', {
        templateUrl: 'views/discussion.html',
        controller: 'DiscussionCtrl',
        controllerAs: 'discussion'
      })
      /*Post a new discussion*/
      .when('/discussion/post', {
        templateUrl: 'views/disPage.html',
        controller: 'DisPageCtrl',
        controllerAs: 'disPage'
      })
      /*Comment page of selected discution*/
      .when('/discussion/sellect', {
        templateUrl: 'views/disSellected.html',
        controller: 'DisSellectCtrl',
        controllerAs: 'DisSellect'
      })
      /*Select a service to view from the give type*/
      .when('/services/give', {
        templateUrl: 'views/giveCat.html',
        controller: 'GiveCatCtrl',
        controllerAs: 'giveCat'
      })
      /*Select a service to view from the receive type*/
      .when('/services/receive', {
        templateUrl: 'views/recCat.html',
        controller: 'RecCatCtrl',
        controllerAs: 'RecCat'
      })
      /*Comment page of selected service*/
      .when('/services/sellect', {
        templateUrl: 'views/servPage.html',
        controller: 'ServPageCtrl',
        controllerAs: 'ServPage'
      })
      /*Post a new service*/
      .when('/services/post', {
        templateUrl: 'views/postService.html',
        controller: 'PostServiceCtrl',
        controllerAs: 'PostService'
      })
      /*Create a new 'Time to Share' group*/
      .when('/newGroup', {
        templateUrl: 'views/newgroup.html',
        controller: 'CreateGroupCtrl',
        controllerAs: 'CreateGroup'
      })
      /*Other page handler*/
      .otherwise({
        redirectTo: '/'
      });

  });


  

  