/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
(() => {
  // Directory
  const dir = {
    src: 'src/',
    build: 'dist/',
  };

  // Load Modules
  const { src, dest, series, parallel, watch } = require('gulp');
  const del = require('del');
  const imagemin = require('gulp-imagemin');
  const cssmin = require('gulp-csso');
  const postCSS = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const uglify = require('gulp-uglify');
  const concat = require('gulp-concat');
  const rename = require('gulp-rename');

  // Clean task
  function clean() {
    return del(dir.build);
  }

  // Files task
  function includeFILES() {
    return src(`${dir.src}**/*`).pipe(dest(dir.build));
  }

  // Images task
  const imgConfig = {
    src: `${dir.src}static/images/**.+(png|jpg|svg)`,
    build: `${dir.build}static/images/`,
    option: {
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
          removeViewBox: true,
        },
      ],
    },
  };

  function imagesMIN() {
    return src(imgConfig.src)
      .pipe(imagemin(imgConfig.option))
      .pipe(dest(imgConfig.build));
  }

  // Icons task
  const iconsConfig = {
    src: `${dir.src}static/icons/*.png`,
    build: `${dir.build}static/icons/`,
    option: {
      optimizationLevel: 5,
    },
  };

  function iconsMIN() {
    return src(iconsConfig.src)
      .pipe(imagemin(iconsConfig.option))
      .pipe(dest(iconsConfig.build));
  }

  // Rename Config
  const renameConfig = {
    suffix: '.min',
  };

  // CSS task
  const cssConfig = {
    src: `${dir.src}static/css/*.css`,
    watch: `${dir.src}static/css/*.css`,
    build: `${dir.build}static/css/`,
  };

  function miniCSS() {
    const prefix = [autoprefixer()];
    return src(cssConfig.src)
      .pipe(postCSS(prefix))
      .pipe(cssmin())
      .pipe(concat('main.css'))
      .pipe(rename(renameConfig))
      .pipe(dest(cssConfig.build));
  }

  // JS task
  const jsConfig = {
    src: `${dir.src}static/js/*.js`,
    build: `${dir.build}static/js/`,
  };

  function miniJS() {
    return src(jsConfig.src)
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(rename(renameConfig))
      .pipe(dest(jsConfig.build));
  }

  function watchTask() {
    watch(cssConfig.watch, miniCSS);
  }

  // Exports modules
  module.exports = {
    default: series(clean, parallel(includeFILES, imagesMIN, iconsMIN), miniCSS, miniJS),
    watch: watchTask,
  };
})();
