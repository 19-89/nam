require('angular/angular');
require('angular-route/angular-route');
// require('angular-resource/angular-resource');


angular.module('caco.ClientPaginate', ['ngRoute'])

    .filter('paginate', function(Paginator) {
        return function(input, rowsPerPage) {
            if (!input) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }

            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    })

    .filter('forLoop', function() {
        return function(input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    })

    .service('Paginator', function ($rootScope, $location) {
        this.page = 0;
        this.fpage = 0;
        this.rowsPerPage = 50;
        this.itemCount = 0;
        this.limitPerPage = 5;

        this.setPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            $location.path('/search').search({page: page + 1});
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            $location.path('/search').search({page: this.page + 2});
        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            $location.path('/search').search({page: this.page });
        };

        this.firstPage = function () {

            $location.path('/search').search({page: 1});
        };

        this.lastPage = function () {
            $location.path('/search').search({page: this.pageCount()});
        };

        this.fsetPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () {
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };

        this.lowerLimit = function() {
            var pageCountLimitPerPageDiff = this.pageCount() - this.limitPerPage;

            if (pageCountLimitPerPageDiff < 0) {
                return 0;
            }

            if (this.page > pageCountLimitPerPageDiff + 1) {
                return pageCountLimitPerPageDiff;
            }

            var low = this.page - (Math.ceil(this.limitPerPage/2) - 1);

            return Math.max(low, 0);
        };
    })

    .directive('paginator', function factory() {
        return {
            restrict:'E',
            controller: function ($scope, Paginator) {
                $scope.paginator = Paginator;
            },
            templateUrl: '/data/tpl'
        };
    });


angular.module('nam', ['ngRoute', 'caco.ClientPaginate'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/search', {
                controller: 'MainController',
                template: '{{ "page: " + page }}',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/search?page=0'
            });
    });


require('./api-service');
require('./main');
