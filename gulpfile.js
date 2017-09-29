// Require
// ----------------------------------------------------------------------------
var autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    critical      = require('critical'),
    gulp          = require('gulp'),
    imagemin      = require('gulp-imagemin'),
    slim          = require('gulp-slim'),
    coffee        = require('gulp-coffee'),
    minifyCss     = require('gulp-minify-css'),
    minifyHtml    = require('gulp-minify-html')
    notify        = require('gulp-notify'),
    path          = require('path'),
    reload        = browserSync.reload,
    rename        = require('gulp-rename'),
    rimraf        = require('gulp-rimraf'),
    sass          = require('gulp-sass'),
    uglify        = require('gulp-uglify'),
    uncss         = require('gulp-uncss');
    include       = require("gulp-include"); // allow 'require' word on files

// Paths
// ----------------------------------------------------------------------------

// Paths for source
var bower_source   = './source/bower_components',
    sass_source    = './source/assets/stylesheets/',
    img_source     = './source/assets/images/',
    coffee_source  = './source/assets/javascripts',
    source         = './source';

// Paths for build
var bower_build    = './build/bower_components',
    sass_build     = './build/assets/stylesheets/',
    img_build      = './build/assets/images/',
    coffee_build   = './build/assets/javascripts/',
    build          = './build';


// Tasks
// ----------------------------------------------------------------------------


// Compile slim files to minified html
// ------------------------------------
gulp.task('slim', function () {
  return gulp.src(source + '/**/*.slim')
    .pipe(slim({
      pretty: false,
      include: true
    }))
    .pipe(minifyHtml())
    .pipe(gulp.dest(build)) // mettre ici le chemin de placement des html
    .pipe(reload({stream:true}))
    .pipe(notify('Slim compilation completed !'));
});


// Compile SASS + autoprefixer
// ------------------------------------
gulp.task('sass', function () {
  return gulp.src(sass_source + '/main.sass')
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest(sass_build))
    .pipe(reload({stream:true}))
    .pipe(notify('Sass compilation completed !'));
});


// Remove unused css
// ------------------------------------
gulp.task('uncss', function () {
  return gulp.src(sass_build + '/app.css')
   .pipe(uncss({
      html: [build + '/**/*.html']
   }))
   .pipe(minifyCss())
   .pipe(gulp.dest(sass_build))
   .pipe(notify('Unused CSS removed !'));
});


// Concatenate and minify coffee
// ------------------------------------
gulp.task('coffee', function() {
  gulp.src(coffee_source + '/*.coffee')

    .pipe(coffee())
    .pipe(gulp.dest(coffee_build))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('coffee_build'));

    // .pipe(include({ extensions: "coffee" }))
    // .pipe(coffee({bare: true}))
    // .pipe(include({ extensions: "js" }))
    // .pipe(gulp.dest(coffee_build))
    // .pipe(concat('all.js'))
    // .pipe(gulp.dest(coffee_build))
    // .pipe(rename('all.min.js'))
    // .pipe(uglify())
    // .pipe(gulp.dest(coffee_build))
    // .pipe(reload({stream:true}))
    // .pipe(notify('Coffee compilation completed !'));
});


// Optimize images
// ------------------------------------
gulp.task('img', function () {
  return gulp.src(img_source + '/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(img_build))
    .pipe(notify('Images are optimized!'));
});

// Clean build folder
// ------------------------------------
gulp.task('clean', function () {
  return gulp.src(build, { read: false})
    .pipe(rimraf())
    .pipe(notify('Prod folder deleted !'));
});

// Build for dev and prod
// ----------------------------------------------------------------------------
gulp.task('prod', ['slim', 'sass', 'uncss', 'coffee', 'img']);


// Watch
// ----------------------------------------------------------------------------
gulp.task('watch', ['dev'], function () {
  browserSync.init({
    server: build,
    scrollProportionally: true
  })
  gulp.watch(source + '/**/*.slim', ['slim']);
  gulp.watch(source + '/**/*.sass', ['sass']);
  gulp.watch(source + '/**/*.coffee', ['coffee']);
  gulp.watch(build  + '/**/*.html').on('change', reload);
});

// Default
// ----------------------------------------------------------------------------
gulp.task('default', ['watch'])