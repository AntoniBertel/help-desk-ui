import gulp from 'gulp';
import sass from 'gulp-sass';
import importcss from 'gulp-import-css';
import cssmin from 'gulp-cssmin';
import cssnano from 'gulp-cssnano';
import configuration from '../config';
import promise from 'es6-promise';

gulp.task('styles', () => {
  return gulp.src(configuration.tasks.styles.src)
    .pipe(importcss())
    .pipe(cssmin())
    .pipe(cssnano())
    .pipe(gulp.dest(configuration.tasks.styles.dest));
});

gulp.task('sass', () => {
  return gulp.src(configuration.tasks.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(cssnano())
    .pipe(gulp.dest(configuration.tasks.sass.dest));
});