angular.module('nam')
    .service('apiService', function ($http) {
        this.apiPath = "";

        this.getPosts = function (params, callback) {
            $http({
                method: 'GET',
                url: this.apiPath + 'post',
                params: params
            })
                .success(function (data) {
                    return callback(null, data);
                })
                .error(function (err) {
                    return callback(err);
                })
            ;
        }
    });