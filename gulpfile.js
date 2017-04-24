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

  gulp.watch(['./views/**/*.pug', './es6/**/*.js', './sass/**/*.scss']).on('change', function(e){
    var o = gulp.src(e.path);
    if(e.path.endsWith(".pug")){
      o = o
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'));
    }
    else if(e.path.endsWith(".js")){
      o = o
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'))
    }
    else if(e.path.endsWith(".scss")){
      o = o
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
    }

    o = o.pipe(connect.reload());

  });
});

gulp.task('views', function() {
  return gulp.src('views/**/*.pug')
  .pipe(pug({pretty: true}))
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





