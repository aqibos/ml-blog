const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

// Live reload on save
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['build'], browserSync.reload); // TODO: Check if this necessary, given line below?
  gulp.watch('app/js/**/**/*.js', ['build'], browserSync.reload);
});

// Preprocess Sass to CSS
gulp.task('sass', function() {
  return gulp.src('app/scss/index.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({ stream: true }))
  .on('error', gutil.log);
});

// Transpile es2016+ syntax to es2015 syntax and bundle
gulp.task('build', function() {
  return browserify({ entries: './app/js/index.js' })
  .transform(babelify.configure({
    presets: ['es2015'],
    ignore: /node_modules/,
    plugins: ['transform-regenerator', 'transform-async-to-generator']
  }))
  .bundle()
  .on('error', onError)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: '' }});
});

function onError(err) {
  console.log(err);
  this.emit('end');
}
