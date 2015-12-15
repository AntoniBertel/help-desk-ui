import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import svgmin from 'gulp-svgmin';
import spritesmith from 'gulp.spritesmith';
import configuration from '../config';

gulp.task('images', () => {
  gulp.src(configuration.tasks.images.src)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(configuration.tasks.images.dest));
});

gulp.task('svg', () => {
  gulp.src(configuration.tasks.svg.src)
    .pipe(svgmin())
    .pipe(gulp.dest(configuration.tasks.svg.dest));
});

gulp.task('sprites', () => {
  let sprites = gulp.src(configuration.tasks.sprites.src)
    .pipe(spritesmith({
      imgName: configuration.tasks.sprites.bundleImage,
      cssName: configuration.tasks.sprites.bundleStyle
    }));
  return sprites.pipe(gulp.dest(configuration.tasks.sprites.dest));
});