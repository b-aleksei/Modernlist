const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const html = () => {
  return gulp.src('source/html/*.html')
    .pipe(gulp.dest('build'))
};

const css = () => {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
      })]))
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
};

const js = () => {
  return gulp.src(['source/js/main.js'])
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest('build/js'))
};

const syncserver = () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/html/**/*.html', gulp.series(html, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', {usePolling: true}, gulp.series(css));
  gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const clean = () => {
  return del('build');
};

const copy = () => {
  return gulp.src([
    'source/img/**',
  ], {
    base: 'source',
  })
    .pipe(gulp.dest('build'));
};

const build = gulp.series(clean, copy, html, css, js);

const start = gulp.series(build, syncserver);

exports.build = build;
exports.start = start;

