var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var size = require('gulp-size');

var nodeEnv;
if (process.env.REAL_ENV) {
    nodeEnv = process.env.REAL_ENV;
} else {
    nodeEnv = process.env.NODE_ENV;
}

gulp.task('scripts', function () {
    gulp.src('src/js/app.js')
        .pipe(webpack())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(size({ showFiles: true }));
});

var jsSorces = [
    '*.js',
    'lib/*.js',
    'src/js'
];

gulp.task('jscs', function () {
    return gulp.src(jsSorces)
        .pipe(jscs());
});

gulp.task('jshint', function () {
    gulp.src(jsSorces)
        .pipe(jshint());
});

gulp.task('build',
    [
        'jscs',
        'jshint',
        'scripts'
    ]
);
