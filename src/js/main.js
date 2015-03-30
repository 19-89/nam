/*global angular */

angular.module('nam')
    .controller(
    'MainController',
    [
        '$scope',
        'apiService',
        '$location',
        'Paginator',
        function ($scope, apiService, $location, Paginator) {
            apiService.apiPath = "http://localhost:4444/data/";
            $scope.rowsPerPage = 3;
            var getPosts = function () {
                apiService.getPosts({}, function (err, posts) {
                    if (err) {
                        console.error(err);
                    } else {
                        $scope.posts = posts;
                        Paginator.fsetPage($location.search().page - 1);
                    }
                });
            };

            getPosts();

            $scope.$watch(function () {
                return $location.search().page
            }, function (newVal, oldVal) {
                $scope.page = newVal;
                Paginator.fsetPage($scope.page  - 1);
            });
        }
    ]
);
