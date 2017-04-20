var gulp = require("gulp");
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task("watch", function(){
  gulp.watch(['./views/**/*.pug'],['views']);
  gulp.watch(['./es6/**/*.js'],['es6']);
  gulp.watch(['./sass/**/*.scss'],['sass']);
});

gulp.task('views', function() {
  return gulp.src('views/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .pipe(connect.reload());
});

gulp.task('es6', function(){
  return gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('dist', ['views', 'es6', 'sass']);

gulp.task('serve', ['connect', 'watch'])





