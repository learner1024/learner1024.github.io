var gulp = require("gulp");
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

gulp.task("watch", function(){
  var watcher = gulp.watch([
    './views/**/*.pug', 
    './es6/**/*.js', 
    './sass/**/*.scss'], 
    ['dist']);
});

gulp.task('views', function() {
  return gulp.src('views/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
});

gulp.task('es6', function(){
  return gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});



 


gulp.task('dist', ['views', 'es6', 'sass']);

//gulp.task("default", ['views']);

'use strict';
 
var gulp = require('gulp');

 

 
