var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var less = require('gulp-less');
var path = require('path');
var shell = require('gulp-shell');
var livereload = require('gulp-livereload');

gulp.task('scripts', function() {
  return gulp.src('src/javascripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('styles', function() {
	return gulp.src('src/stylesheets/**/*.less')
	  .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('server', shell.task([
  'echo starting',
  'npm start'
]));

// Watch Files For Changes
gulp.task('watch', function() {
	livereload.listen();
  gulp.watch('src/javascripts/**/*.js', ['scripts']);
  gulp.watch('src/stylesheets/**/*.less', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'server', 'watch']);