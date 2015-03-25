var express = require('express');
var db = require('./db');

var router = express.Router();

router.get('/', function (req, res) {
    db.Post
        .find({})
        .exec(function (err, posts) {
            if (err) {
                res.status(400).json({
                    result: 'error',
                    message: err.message
                });
            } else {
                res.json(posts);
            }
        });
});

module.exports = function (app) {
    app.get('/',
        function (req, res) {
            res.render('index.jade');
        }
    );
    app.use('/data', router);
};
