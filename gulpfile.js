const { series, src, dest, watch, parallel } = require('gulp');
const liquid = require("gulp-liquid");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const source = 'src/';
const dist = 'dist/'

function copyAssets(cb) {
  return src([`${source}**/*.js`, `${source}**/*.css`, `${source}**/*.svg`, `${source}**/*.png`, `${source}**/*.jpg`]).pipe(dest(dist));
}

function compileScss(cb) {
  return src([`${source}scss/*.scss`]).pipe(sass().on('error', sass.logError)).pipe(dest(dist + 'css'));
}

function compileLiquid(cb) {
  return src(`${source}*.html`)
    .pipe(liquid({
      locals: {}
    }))
    .pipe(dest(dist));
}

exports.default = series(
  copyAssets,
  compileLiquid,
  compileScss
);

exports.watch = function () {
  watch([`${source}*.html`], compileLiquid);
  watch([`${source}*.scss`], compileScss);
  watch([`${source}**/*.js`, `${source}**/*.css`, `${source}**/*.svg`, `${source}**/*.png`, `${source}**/*.jpg`], copyAssets);
}