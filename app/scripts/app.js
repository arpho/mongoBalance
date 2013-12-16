'use strict';

angular.module('mongoBalanceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
