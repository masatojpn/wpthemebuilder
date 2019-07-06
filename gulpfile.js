// ------------------------------------------------------------ //
// Development Setting
// ------------------------------------------------------------ //
const conf = require('./conf')

// ------------------------------------------------------------ //
// Package Setting
// ------------------------------------------------------------ //
const gulp = require('gulp');
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
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

// ------------------------------------------------------------ //
// Tasks
// ------------------------------------------------------------ //
// -- Enable WordPress Theme -------------------------------------------------- //
const enableWpTheme = (done) => {
  gulp.src([
    `${conf.path.src}**/*.css`,
    `${conf.path.src}**/screenshot.png`
  ])
  .pipe(plumber())
  .pipe(gulp.dest(`${conf.path.dist}`))
  done();
};

// -- Markup(Pug) -------------------------------------------------- //
const markup = (done) => {
  const option = {
    pretty: true,
  };

  return gulp.src([`${conf.path.src}**/*.pug`])
  .pipe(plumber())
  .pipe(pug(option))
  .pipe(rename({
    extname: '.php'
  }))
  .pipe(gulp.dest(`${conf.path.dist}`));
  done();
}

// -- PHP -------------------------------------------------- //
const php = (done) => {
  return gulp.src(`${conf.path.src}**/*.php`)
  .pipe(plumber())
  .pipe(gulp.dest(`${conf.path.dist}`))
  done();
}

// -- Script -------------------------------------------------- //
const js = (done) => {
  gulp.src(`${conf.path.src}**/!(_)*js`)
  .pipe(uglify())
  .pipe(gulp.dest(`${conf.path.dist}`))
  done();
}

// -- Sass -------------------------------------------------- //
const styles = (done) => {
  return gulp.src(`${conf.path.src}**/!(_)*.scss`)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(`${conf.path.dist}`))
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(`${conf.path.dist}`))
  done();
}

// -- ImageminTask -------------------------------------------------- //
const imageminTask = (done) => {
  return gulp.src(`${conf.path.src}**/*.{jpg,jpeg,png,gif}`)
  .pipe(imagemin())
  .pipe(gulp.dest(`${conf.path.dist}`))
  done();
}

// -- Run Serve -------------------------------------------------- //
const serve = (done) => {
  browserSync({
    open: false,
    startPath: '/',
		proxy: `${conf.localhost}`,
    reloadDelay: 1000,
    once: true,
    notify: false,
    ghostMode: false,
  });
  done();
}

// -- Browser Reload -------------------------------------------------- //
const reload = (done) => {
  browserSync.reload();
  done();
}

// -- File Watch -------------------------------------------------- //
const fileWatch = (done) => {
  gulp.watch([`${conf.path.src}**/*.scss`], gulp.series(styles, reload));
  gulp.watch([`${conf.path.src}**/*.pug`], gulp.series(markup, reload));
  gulp.watch([`${conf.path.src}**/*.php`], gulp.series(php, reload));
  gulp.watch([`${conf.path.src}**/*.js`], gulp.series(js, reload));
  gulp.watch([`${conf.path.src}**/*.{jpg,jpeg,png,gif}`], gulp.series(imageminTask, reload));
  done();
}

// ------------------------------------------------------------ //
// Build command "npx gulp"
// ------------------------------------------------------------ //
gulp.task('default', gulp.series(
  gulp.parallel(enableWpTheme, markup, php, js, imageminTask, styles, fileWatch),
  serve
));