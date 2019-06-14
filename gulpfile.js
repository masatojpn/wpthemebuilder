// ------------------------------------------------------------ //
// Development Setting
// ------------------------------------------------------------ //
const localhost = "vccw.local/";

// ------------------------------------------------------------ //
// Package Setting
// ------------------------------------------------------------ //
const gulp = require('gulp');
const connect = require('gulp-connect-php');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');

// ------------------------------------------------------------ //
// Tasks
// ------------------------------------------------------------ //

// -- uglify -------------------------------------------------- //
function script(done) {
  gulp.src('_themes/**/!(_)*js')
  .pipe(uglify())
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  done();
};

// -- sass -------------------------------------------------- //
function styles(done){
  gulp.src('_themes/**/!(_)*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  done();
};

// -- PHP -------------------------------------------------- //
function php(done) {
  gulp.src('_themes/**/*.php')
  .pipe(plumber())
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  done();
};

// -- Theme CSS -------------------------------------------------- //
function css(done) {
  gulp.src('_themes/**/*.css')
  .pipe(plumber())
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  done();
};

// -- Pug -------------------------------------------------- //
function jade(done) {
  var option = {
    pretty: true,
  };
  gulp.src('_themes/**/!(_)*.pug',)
  .pipe(plumber())
  .pipe(pug(option))
  .pipe(rename({
    extname: '.php'
  }))
  .pipe(gulp.dest('wordpress/wp-content/themes'))
  done();
};

// ブラウザ更新&ウォッチタスク
const browserSyncOption = {
  proxy: localhost,
  post: '',
  open: false,
  reloadOnRestart: true,
  files: [
    "wordpress/wp-content/themes/**/*.css",
    "wordpress/wp-content/themes/**/*.js",
    "wordpress/wp-content/themes/**/*.php",
  ],
};

function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}

// -- Watch -------------------------------------------------- //
function Watch(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch('_themes/**/*.scss').on('change', gulp.series(styles, browserReload));
  gulp.watch('_themes/**/*.js').on('change', gulp.series(script, browserReload));
  gulp.watch('_themes/**/*.pug').on('change', gulp.series(jade, browserReload));
  gulp.watch('_themes/**/*.php').on('change', gulp.series(php, browserReload));
};

gulp.task('default', gulp.series(gulp.parallel(browsersync,script, styles, jade, php, css), gulp.series(Watch)));