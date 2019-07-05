// ------------------------------------------------------------ //
// Development Setting
// ------------------------------------------------------------ //
const localhost = "vccw.local/";

// ------------------------------------------------------------ //
// Package Setting
// ------------------------------------------------------------ //
var gulp = require('gulp');
var connect = require('gulp-connect-php');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');

// ------------------------------------------------------------ //
// Tasks
// ------------------------------------------------------------ //

// -- uglify -------------------------------------------------- //
const js = (done) => {
  gulp.src('./_themes/**/!(_)*js')
  .pipe(uglify())
  .pipe(gulp.dest('./wordpress/wp-content/themes'))
  done();
}


// -- sass -------------------------------------------------- //
const styles = () => {
  return gulp.src('./_themes/**/!(_)*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./wordpress/wp-content/themes'))
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('./wordpress/wp-content/themes'))
}


// -- PHP -------------------------------------------------- //
const php = () => {
  return gulp.src('./_themes/**/*.php')
  .pipe(plumber())
  .pipe(gulp.dest('./wordpress/wp-content/themes'))
}

// -- Theme CSS -------------------------------------------------- //
function css(done) {
  gulp.src('_themes/**/*.css')
  .pipe(plumber())
  .pipe(gulp.dest('./wordpress/wp-content/themes'))
  done();
};

// -- Pug -------------------------------------------------- //
const markup = () => {
  const option = {
    pretty: true,
  };

  return gulp.src(['./_themes/**/*.pug'])
  .pipe(plumber())
  .pipe(pug(option))
  .pipe(rename({
    extname: '.php'
  }))
  .pipe(gulp.dest('./wordpress/wp-content/themes'));
}

const serve = () => {
  browserSync({
    open: false,
    startPath: '/',
		proxy: localhost,
    reloadDelay: 1000,
    once: true,
    notify: false,
    ghostMode: false,
  });
}

const reload = (done) => {
  browserSync.reload();
  done();
}


// -- Watch -------------------------------------------------- //
const fileWatch = (done) => {
  gulp.watch(['./_themes/**/*.scss'], gulp.series(styles, reload));
  gulp.watch(['./_themes/**/*.pug'], gulp.series(markup, reload));
  gulp.watch(['./_themes/**/*.php'], gulp.series(php, reload));
  gulp.watch(['./_themes/**/*.js'], gulp.series(js, reload));
  done();
}

gulp.task('default', gulp.series(
  gulp.parallel(markup, php, js, styles, css, fileWatch),
  serve
));