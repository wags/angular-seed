var gulp = require('gulp'),
	serve = require('../serve');

gulp.task('serve-build', ['inject'], function() {
    serve(true /*isDev*/);
});
