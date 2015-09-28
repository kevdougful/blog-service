'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
	nodemon({
		script: 'bin/www',
		ext: 'js',
		env: {
			PORT: 3000
		},
		ignore: ['./node_modules/**']
	}).on('restart', function() {
		console.log('restarting');
	});
});

gulp.task('test', function() {
	gulp.src('tests/*.js', { read: false })
		.pipe(mocha({ reporter: 'nyan' }));
})