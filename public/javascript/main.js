/**
 * New node file
 */
var brainworks = angular.module('brainworks', ['ngAnimate', 'ngRoute']);

brainworks.config(function($routeProvider) {
  $routeProvider
  .when('/', { templateUrl: 'html/home.html' })
  .when('/signin', { templateUrl: 'html/signin.html' })
  .when('/about', { templateUrl: 'html/about.html' })
  .otherwise({ redirectTo: '/' });
});

// brainworks.controller('menuController', function($scope, $routeProvider){
////  $routeProvider
////  .when('/').then($scope.active = [{'home': "class=\"nav active\""},
////                                   {'signin': "class=\"nav\""},
////                                   {'about': "class=\"nav\""}])
////  .when('/signin').then($scope.active = [{'home': "class=\"nav\""},
////                                         {'signin': "class=\"nav active\""},
////                                         {'about': "class=\"nav\""}])
////  .when('/about').then($scope.active = [{'home': "class=\"nav\""},
////                                        {'signin': "class=\"nav\""},
////                                        {'about': "class=\"nav active\""}]);
//}); 