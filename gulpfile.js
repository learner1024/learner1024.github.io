var gulp = require("gulp");
var pug = require('gulp-pug');
var babel = require('gulp-babel');

gulp.task("watch", function(){
  var watcher = gulp.watch(['views/*.pug', 'es6/*.js'], ['dist']);
});

gulp.task('es6', function(){
  return gulp.src('es6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('js'))
});
 
gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
});

gulp.task('dist', ['views', 'es6']);

//gulp.task("default", ['views']);
