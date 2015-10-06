'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir'),
    $          = require('gulp-load-plugins')();

// Load application tasks
(function () {
  var dir = requireDir('./tasks');

  Object.keys(dir).forEach(function (key) {
    dir[key] = dir[key](gulp, $);
  });
}());

$.karma = require('karma');

gulp.task('build', ['clean'], function () {
  return gulp.start('styles', 'jscs', 'jshint', 'uglify', 'styles', 'test');
});

gulp.task('deploy', ['clean:deploy', 'docs:generate'], function () {
  return gulp.start('website');
});

gulp.task('serve', ['docs:generate'], function () {
  return gulp.start('connect', 'watch', 'open');
});

gulp.task('test', function () {
  return gulp.start('karma');
});

gulp.task('test:e2e', function () {
  return gulp.start('protractor');
});
