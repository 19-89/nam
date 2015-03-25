/*global angular */

angular.module('nam')
.controller(
    'MainController',
    [
        '$scope',
        function ($scope) {
            $scope.message = 'hello :D'
        }
    ]
);
