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
  gulp.watch(configuration.tasks.images.watch, () => {
    gulp.run('images');
  });
  gulp.watch(configuration.tasks.svg.watch, () => {
    gulp.run('svg');
  });
  gulp.watch(configuration.tasks.sprites.watch, () => {
    gulp.run('sprites');
  });
});
