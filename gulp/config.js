const common = {
  src: 'assets',
  dest: 'dist'
};

const gulpConfiguration = {
  tasks: {
    scripts: {
      src: `${common.src}/js/startup.js`,
      dest: `${common.dest}/scripts`,
      watch: `${common.src}/js/**/**.js`,
      bundle: 'bundle.js'
    },
    styles: {
      src: `${common.src}/css/*.css`,
      dest: `${common.dest}/styles`,
      watch: `${common.src}/css/*.css`
    },
    sass: {
      src: `${common.src}/sass/styles.scss`,
      dest: `${common.dest}/styles`,
      watch: `${common.src}/sass/*.scss`
    },
    connect: {
      root: './',
      port: '8888'
    }
  }
};

export default gulpConfiguration;