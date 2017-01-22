'use strict';

angular.module('TimetoShareApp')
	.constant('baseURL','http://localhost:3000/api/')
	/*Group Rest API*/
	.factory('GroupsService', function($resource, baseURL){
		return $resource(baseURL + 'Groups/:id', {id: '@id'});
	})
	/*Login to REST API server*/
	.factory('loginService', function($resource, baseURL){
		return $resource(baseURL + 'members/login', {id: '@id'});
	})
	/*
	.factory('memberService', function($resource, baseURL){
		return $resource(baseURL + 'members/:filter', {filter: '@filter'});
	})*/
	/*Member/user REST API*/
	.factory('UserService', function($resource, baseURL){
		var data = $resource(baseURL + 'members/:id', {id: '@id'}, {
			update:{
				method: 'PUT'
			}
		});
		return data;
	})
	/*Get infor about 'user' based on group*/
	.factory('GroupUser', function($resource, baseURL){
		return $resource(baseURL + 'members/:id/group', {id: '@id'});
	})
	/*Services REST API*/
	.factory('ServService', function($resource, baseURL){
		return $resource(baseURL + 'services/:id', {id: '@id'});
	})
	/*Post new comments to Services REST API*/
	.factory('ServComment', function($resource, baseURL){
		return $resource(baseURL + 'services/:id/replace', {id: '@id'});
	})
	/*Discussion REST API*/
	.factory('DisService', function($resource, baseURL){
		return $resource(baseURL + 'discussions/:id', {id: '@id'});
	})
	/*Post new comments to Discusison REST API*/
	.factory('DisComment', function($resource, baseURL){
		return $resource(baseURL + 'discussions/:id/replace', {id: '@id'});
	});