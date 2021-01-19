let gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  cleanCSS = require('gulp-clean-css');

const paths = {
  scss: {
    src: './scss/*.scss',
    dest: './css',
    watch: './scss/*.scss'
  },
  twig: {
    src: './templates//*.twig',
    watch: './templates/**/*.twig'
  },
  js: {
    src: './js//*.js',
    watch: './js/**/*.js'
  },
  html: {
    src: './',
    watch: '*.html'
  }
}

// Compile sass into CSS & auto-inject into browsers
function styles () {
  return gulp.src([paths.scss.src])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
}

// Static Server + watching scss/html files
function serve () {
  browserSync.init({
    proxy: 'http://githydrogel/',
  });

  watch()
}

function watch () {
  gulp.watch([paths.scss.watch], styles).on('change', browserSync.reload)
  gulp.watch([paths.twig.watch]).on('change', browserSync.reload)
  gulp.watch([paths.html.watch]).on('change', browserSync.reload)
  gulp.watch([paths.js.watch]).on('change', browserSync.reload)
}

const build = gulp.series(styles, gulp.parallel(serve))

exports.styles = styles
exports.serve = serve

exports.watch = gulp.series(styles, gulp.parallel(watch))

exports.default = build
