var debug = require('debug')('index');
var http = require('http');
var express = require('express');

var server = require('./server');

var app = express();
var httpServer = http.Server(app);
server(app);

var port = process.env.PORT || 4444;
httpServer.listen(port);
console.log('Server listening on port', port);
