require('angular/angular');
require('angular-route/angular-route');

angular.module('nam', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/search', {
                controller: 'MainController',
                template: '{{ "page: " + page }}',
                reloadOnSearch: false
            })
            .when('/home', {
                template: 'home page'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });

require('./api-service');
require('./main');
