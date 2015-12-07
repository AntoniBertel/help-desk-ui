import gulp from 'gulp';
import sass from 'gulp-sass';
import importcss from 'gulp-import-css';
import cssmin from 'gulp-cssmin';
import configuration from '../config';

gulp.task('styles', () => {
  return gulp.src(configuration.tasks.styles.src)
    .pipe(importcss())
    .pipe(cssmin())
    .pipe(gulp.dest(configuration.tasks.styles.dest));
});

gulp.task('sass', () => {
  return gulp.src(configuration.tasks.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest(configuration.tasks.sass.dest));
});