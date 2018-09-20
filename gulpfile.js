const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const data = require('gulp-data');
const plumber = require('gulp-plumber');

gulp.task('views', () => 
    gulp.src('index.pug')
        .pipe(plumber())
        .pipe(data(() => require('./data.json')))
        .pipe(pug())
        .pipe(gulp.dest('./dist'))
);

gulp.task('styles', () =>
    gulp.src('index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
);

gulp.task('assets', () =>
    gulp.src('assets/*')
        .pipe(gulp.dest('./dist/assets'))
);

gulp.task('watch', ['build'], () => {
    gulp.watch(['index.pug', 'data.json'], ['views']);
    gulp.watch('index.scss', ['styles']);
})

gulp.task('build', ['views', 'styles', 'assets']);
gulp.task('default', ['build']);
