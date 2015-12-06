import gulp from 'gulp';
import importcss from 'gulp-import-css';
import cssmin from 'gulp-cssmin';
import configuration from '../config';

gulp.task('styles', () => {
  return gulp.src(configuration.tasks.styles.src)
    .pipe(importcss())
    .pipe(cssmin())
    .pipe(gulp.dest(configuration.tasks.styles.dest));
});