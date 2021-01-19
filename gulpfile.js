var gulp = require('gulp')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync')
var autoprefixer = require('gulp-autoprefixer')
var pug = require('gulp-pug')
// var ejs = require("gulp-ejs");
var notify	= require('gulp-notify');
var htmlhint = require('gulp-htmlhint');
var headerfooter = require('gulp-headerfooter')


// js
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
gulp.task('js', function(done) {
  gulp.src('src/js/**/*.js')
  // .pipe(plumber())
  // .pipe(uglify())
  // .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest('./dst/js'))
  .pipe(browserSync.reload({stream: true}))
  done();
})

// sass
gulp.task('sass', function (done) {
  gulp.src(['src/sass/**/*.scss'])
    .pipe(plumber())
    .pipe(sass({
            outputStyle: 'expanded'
        }))
    .pipe(autoprefixer({grid: true}))
    .pipe(postcss([mqpacker()]))
    .pipe(gulp.dest('./dst/css'))
    .pipe(browserSync.reload({stream: true}))
    done();
})

// image
gulp.task('image', function (done) {
  gulp.src(['src/img/**/*.{png,jpg,svg,gif}'])
    .pipe(gulp.dest('./dst/img'))
    .pipe(browserSync.reload({stream: true}))
    done();
})

// pug
gulp.task('pug', function (done) {
 gulp.src(['src/pug/**/*.pug'])
   .pipe(plumber())
   .pipe(pug({
     pretty: true
   }))
   .pipe(gulp.dest('./dst'))
   .pipe(browserSync.reload({stream: true}))
   done();
})

//EJS
// gulp.task('ejs', function(done) {
//   gulp.src(['src/ejs/*.ejs'])
//     .pipe(plumber({
//     	errorHandler: notify.onError("Error: <%= error.message %>") //<-
//     }))
//     .pipe(ejs())
//     .pipe(rename({extname: '.html'}))
//     .pipe(htmlhint())
//     .pipe(htmlhint.reporter())
//     .pipe(htmlhint.failOnError())
//     .pipe(gulp.dest('./dst/content-asset'))
//     .pipe(gulp.dest('../../preview/'))
//     .pipe(browserSync.reload({stream: true}))
//     done();
// });

// build
gulp.task('build', gulp.series(gulp.parallel('js','sass', 'pug', 'image')))

// browserSync
gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: ['dst']
    },
    startPath: 'index.html'
  })
  done();
})

// watch
gulp.task('watch', function (done) {
  gulp.watch('src/js/*.js', gulp.task('js'))
  gulp.watch('src/img/**/*.{png,jpg,svg,gif}', gulp.task('image'))
  gulp.watch('src/sass/**/*.scss', gulp.task('sass'))
  gulp.watch('src/pug/**/*.pug', gulp.task('pug'))
  done();
})

// default
gulp.task('default', gulp.series(gulp.parallel('watch', 'browserSync', 'build')))
