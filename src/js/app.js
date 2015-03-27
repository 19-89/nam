require('angular/angular');
require('./lib/paginate-anything-tpls.min');

angular.module('nam', ['bgf.paginateAnything']);
require('./api-service');
require('./main');
