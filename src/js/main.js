/*global angular */

angular.module('nam')
    .controller(
    'MainController',
    [
        '$scope',
        'apiService',
        function ($scope, apiService) {
            apiService.apiPath = "http://localhost:4444/data/";
            $scope.message = 'hello :D';
            $scope.posts = [];
            $scope.currentPage = 1;
            $scope.pageSize = 3;
            apiService.getPosts({}, function (err, posts) {
                if (err) {
                    console.error(err);
                } else {
                    $scope.posts = posts;
                }
            });

            $scope.pageChangeHandler = function(num) {
                console.log('meals page changed to ' + num);
            };
        }
    ]
)
    .directive('post', function() {
        return {
            template: 'Title: {{post.title}} | Views: {{post.views}}'
        };
    });
