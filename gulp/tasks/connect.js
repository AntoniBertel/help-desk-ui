import gulp from 'gulp';
import connect from 'gulp-connect';
import configuration from '../config';

gulp.task('connect', () => {
  return connect.server({
    root: configuration.tasks.connect.root,
    port: configuration.tasks.connect.port
  });
});