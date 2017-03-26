'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngStorage','dcbImgFallback','ui-notification','ngQueue'])

.config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider,NotificationProvider) {
    $urlRouterProvider.otherwise('/login');
    // $locationProvider
    //     .hashPrefix('!');

    NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        })


    $stateProvider
    .state('login', {
        url: "/login",
        views: {
          "content": {
            controller: 'LoginController',
            controllerAs: 'loginController',
            templateUrl: 'templates/login/login.html'
          }
        },
        resolve: {
          loadController: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('js/angularjs/controllers/login/login.js');
          }]
            ,loadService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('js/angularjs/services/login/login.service.js');
          }]
        }
      })

      .state('admin', {
          url: "/admin",
          views: {
            "content": {
              controller: 'AdminController',
              controllerAs: 'adminController',
              templateUrl: 'templates/admin/index.html'
            }
          },
          resolve: {
            loadController: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load('js/angularjs/controllers/admin/admin.js');
            }]
              ,loadService: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load('js/angularjs/services/admin/admin.service.js');
            }]
          }
        })
        .state('logout', {
            url: "/logout",
            views: {
              "content": {
                controller: 'LogoutController',
                controllerAs: 'logOutController',
                templateUrl: 'templates/logout/index.html'
              }
            },
            resolve: {
              loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/angularjs/controllers/logout/logout.js');
              }]
                ,loadService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/angularjs/services/logout/logout.service.js');
              }]
            }
          })

});

//
// app.controller("header",['$scope','$state','$http','$localStorage','Notification','dataService',function($scope,$state,$http,$localStorage,Notification,dataService) {
// //    console.log($localStorage);
// //    $scope.title = $localStorage.title;
//     $scope.title = dataService.getData();
//
// }]);
//
// app.factory('dataService', function() {
//     var title = {message: ''};
//
//     return {
//         getData: function() {
//             return title;
//         }
//     }
// });
