import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import ngAnnotate from 'gulp-ng-annotate';
import source from 'vinyl-source-stream';
import sourceMaps from 'gulp-sourcemaps';
import configuration from '../config';

gulp.task('scripts', () => {
  return browserify({
    entries: configuration.tasks.scripts.src,
    extensions: ['.js'],
    debug: true
  })
  .transform('babelify', {
    presets: ['es2015']
  })
  .bundle()
  .pipe(source(configuration.tasks.scripts.bundle))
  .pipe(gulp.dest(configuration.tasks.scripts.dest));
});