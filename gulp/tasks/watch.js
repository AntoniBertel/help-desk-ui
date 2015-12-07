import gulp from 'gulp';
import configuration from '../config';

gulp.task('watch', ['connect'], () => {
  gulp.watch(configuration.tasks.scripts.watch, () => {
    gulp.run('scripts');
  });
  gulp.watch(configuration.tasks.styles.watch, () => {
    gulp.run('styles');
  });
  gulp.watch(configuration.tasks.sass.watch, () => {
    gulp.run('sass');
  });
});
