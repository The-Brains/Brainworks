/**
 * New node file
 */
var brainworks = angular.module('brainworks', ['ngAnimate', 'ngRoute']);

brainworks.config(function($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: 'html/home.html' })
  .when('/signin', { template: 'Login-Frame' })
  .when('/about', { templateUrl: 'html/about.html' })
  .otherwise({ redirectTo: '/' });
});