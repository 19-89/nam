/*global angular */

angular.module('nam')
    .controller(
    'MainController',
    [
        '$scope',
        'apiService',
        '$location',
        function ($scope, apiService, $location) {
            apiService.apiPath = "http://localhost:4444/data/";

            var getPosts = function () {
                apiService.getPosts({}, function (err, posts) {
                    if (err) {
                        console.error(err);
                    } else {
                        $scope.posts = posts;
                    }
                });
            };

            getPosts();

            $scope.$watch(function () {
                return $location.search().page
            }, function (newVal, oldVal) {
                $scope.page = newVal;
            });
        }
    ]
);
