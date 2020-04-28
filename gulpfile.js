/* gulpfile.js */

var gulp = require('gulp'); // node_modulesで管理しているgulpを呼び出す
var sass = require('gulp-sass'); 

gulp.task('sass', function() {
  // どういう事を行いたいのかを書く
  return gulp.src(['./src/sass/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});