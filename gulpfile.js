var gulp = require("gulp");
var pug = require('gulp-pug');

var watcher = gulp.watch('views/*.pug', ['views']);
 
gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
});

gulp.task("default", ['views']);
