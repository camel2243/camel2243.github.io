// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var scssSource = './scss/*.scss';

gulp.task('sass', function() {
    gulp.src(scssSource)
        .pipe(sass({sourceComments: true}))
        .pipe(gulp.dest(function(f) {
            return "./dist/css";
        }));
});

gulp.task('compileSCSS', ['sass'], function() {
    gulp.watch(scssSource, ['sass']);
})