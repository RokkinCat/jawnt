var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss'],
  www: ['./www/**/*', './www/**', './www/*']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('distribute-ios', function(done) {
  gulp.src('./www/**/*', {base: './'})
    .pipe(gulp.dest('platforms/ios/'))
    .on('end', done);
})

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.www, ['distribute-ios'])
});

gulp.task('default', ['watch']);
