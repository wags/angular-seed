var gulp = require('gulp'),
	bowswerSync = require('browser-sync'),
	config = require('../../gulp.config'),
	protractor = require("gulp-protractor").protractor;

gulp.task('start-localhost', ['inject'], function() {
	
});

gulp.task('test:e2e', ['start-localhost'], function() {
	gulp.src('./src/**/*.test.js')
        .pipe(protractor({
            configFile: config.root + '/protractor.conf.js',
        }))
        .on('error', function (e) {
            throw e;
        });
});
