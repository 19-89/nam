var express = require('express');
var db = require('./db');
var path = require('path');

var router = express.Router();

router.get('/tpl', function (req, res) {
    // res.sendfile('../build/js/dist/paginate-anithing.html', { root: __dirname });
    res.sendFile(path.join(process.cwd(), '/src/pc.html'));
});
router.get('/post', function (req, res) {
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

router.get('/post/:id', function (req, res) {
    db.Post
        .find({ _id: req.params.id })
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
