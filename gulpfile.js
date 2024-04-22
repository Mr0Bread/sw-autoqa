const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./server/public/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./server/public/assets/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./server/public/assets/scss/*.scss', gulp.series(['sass']));
});