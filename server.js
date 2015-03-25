var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');

var routes = require('./lib/routes');
module.exports = function (app) {
    app.use(favicon(path.join(process.cwd(), '/src/images/favicon.ico')));
    app.set('view engine', 'jade');
    app.use(morgan('dev'));
    app.set('json spaces', 2);
    app.use(express.static(path.join(process.cwd(), 'build')));

    routes(app);
};
