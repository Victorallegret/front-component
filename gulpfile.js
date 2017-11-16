// GULP TEMPLATE - Gulfile.js - Victor Allegret
//
//   - $ gulp
//   - $ gulp build
//   - $ gulp clean
//
// --------------------------------------------------------

////////////////////
// VARIABLES
////////////////////////////////////////////////////////////////////////////////



// REQUIRE
// ---------------------------------------------------------
var gulp           = require('gulp'),
$                  = require('gulp-load-plugins')({pattern: '*'})
var gulpSequence   = require('gulp-sequence');



// PATH
// ---------------------------------------------------------

///// PATHS FOR DEV
var slim_dev    = './dev/views/',
    sass_dev    = './dev/assets/stylesheets/',
    coffee_dev  = './dev/assets/javascripts/',
    fonts_dev   = './dev/assets/fonts/',
    img_dev     = './dev/assets/images/',
    dev         = './dev';

///// PATH FOR PROD
var slim_build     = './build/views/',
    sass_build     = './build/assets/stylesheets/',
    coffee_build   = './build/assets/javascripts/',
    fonts_build    = './build/assets/fonts/',
    img_build      = './build/assets/images/',
    build          = './build';





////////////////////
// TASKS
////////////////////////////////////////////////////////////////////////////////



// COMPILE SLIM TO HTML
// ---------------------------------------------------------
gulp.task('slim', function () {
  return gulp.src(slim_dev + '/**/*.slim')
    // prevent server from crashing
    .pipe($.plumber({ errorHandler: function(err) {
      $.notify.onError({
          title: "Gulp error in " + err.plugin
      })(err);
    }}))
    // Keep non-updated files infos in cache
    .pipe($.cached(slim_dev + '/**/*.slim'))
    // Ignore partials
    .pipe($.filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    // compile slim to html
    .pipe($.slim({
      pretty: false,
      include: true
    }))
    // remove all folder
    .pipe($.rename({dirname: ''}))
    // copy result to build folder
    .pipe(gulp.dest(build))
    // notify when task completed
    .pipe($.notify({message: 'Slim compilation completed !', onLast: true}));
});



// COMPILE SASS TO CSS
// ---------------------------------------------------------
gulp.task('sass', function () {
  return gulp.src(sass_dev + 'main.sass')
    // prevent server from crashing
    .pipe($.plumber({ errorHandler: function(err) {
      $.notify.onError({
          title: "Gulp error in " + err.plugin,
      })(err);
    }}))
    // init sourcemaps
    .pipe($.sourcemaps.init())
    // add sass glob import
    .pipe($.sassGlob())
    // compile sass to css
    .pipe($.sass())
    // add auto-prefixes
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // concat all files
    .pipe($.concat('main.css'))
    // rename to .min
    .pipe($.rename('main.min.css'))
    // write sourcemaps
    .pipe($.sourcemaps.write())
    // copy result to build folder
    .pipe(gulp.dest(sass_build))
    // notify when task completed
    .pipe($.notify({message: 'Sass compilation completed !', onLast: true}));
});



// REMOVE UNUSED CSS
// ---------------------------------------------------------
gulp.task('optimizeCss', function () {
  return gulp.src(sass_build + '/*.min.css')
  // remove unused css
   .pipe($.uncss({
      html: [build + '/**/*.html']
   }))
   // minify css
   .pipe($.cleanCss())
   // copy result to build folder
   .pipe(gulp.dest(sass_build))
   // notify when task completed
   .pipe($.notify({message: 'Css are optimized !', onLast: true}));
});



// CONCAT CSS VENDORS
// ---------------------------------------------------------
gulp.task('cssVendors', function () {
  return gulp.src(sass_dev + '/vendors/**/*.{css,scss,sass}')
    // compile sass to css
    .pipe($.sass())
    // concat all files
    .pipe($.concat('vendors.css'))
    // rename to .min
    .pipe($.rename('vendors.min.css'))
    // copy result to build folder
    .pipe(gulp.dest(sass_build))
    // notify when task completed
    .pipe($.notify({message: 'Css vendors compilation completed !', onLast: true}));
});



// COMPILE COFFEE TO JS
// ---------------------------------------------------------
gulp.task('coffee', function() {
  return gulp.src(coffee_dev + '/main.coffee')
    // prevent server from crashing
    .pipe($.plumber({ errorHandler: function(err) {
      $.notify.onError({
          title: "Gulp error in " + err.plugin,
      })(err);
    }}))
    // add include for coffee
    .pipe($.include({ extensions: "coffee" }))
    // compile coffee to js
    .pipe($.coffee())
    // concat all files
    .pipe($.concat('main.js'))
    // rename to .min
    .pipe($.rename('main.min.js'))
    // minify js
    .pipe($.uglify())
    // // copy result to build folder
    .pipe(gulp.dest(coffee_build))
    // notify when task completed
    .pipe($.notify({message: 'Coffee compilation completed !', onLast: true}));
});



// INSTALL VENDORS WITH BROWSERIFY
// ---------------------------------------------------------
gulp.task('jsVendors', function() {
  return gulp.src(coffee_dev + '/vendors.js')
    // require node packages
    .pipe($.browserify({
      insertGlobals: true
    }))
    // minify js
    .pipe($.uglify())
    // concat all files
    .pipe($.concat('vendors.js'))
    // rename to .min
    .pipe($.rename('vendors.min.js'))
    // copy result to build folder
    .pipe(gulp.dest(coffee_build))
    // notify when task completed
    .pipe($.notify({message: 'Js vendors compilation completed !', onLast: true}));
});



// FONTS
// ---------------------------------------------------------
gulp.task('fonts', function() {
  return gulp.src(fonts_dev + '/**/*.{eot,svg,ttf,woff,woff2}')
    // remove under-folder
    .pipe($.rename({dirname: ''}))
    // copy result to build folder
    .pipe(gulp.dest(fonts_build))
    // notify when task completed
    .pipe($.notify({message: 'Fonts compilation completed !', onLast: true}));
});



// MINIFY IMAGES
// ---------------------------------------------------------
gulp.task('img', function () {
  return gulp.src(img_dev + '/**/*.{png,jpg,jpeg,gif,svg,ico}')
    // run task only for new images
    .pipe($.cached(img_dev + '/**/*.{png,jpg,jpeg,gif,svg,ico}'))
    // minify images
    .pipe($.imagemin())
    // copy result to build folder
    .pipe(gulp.dest(img_build))
    // notify when task completed
    .pipe($.notify({message: 'Image are optimized !', onLast: true}));
});



// RELOAD
// ---------------------------------------------------------

///// RELOAD SLIM
gulp.task('reload-slim', ['slim'], function(){
  $.browserSync.reload();
});


///// RELOAD SASS
gulp.task('reload-sass', ['sass'], function(){
  $.browserSync.reload();
});


///// RELOAD COFFEE
gulp.task('reload-coffee', ['coffee'], function(){
  $.browserSync.reload();
});





////////////////////
// COMMANDS
////////////////////////////////////////////////////////////////////////////////

// TASK CLEAN ($ gulp clean)
// ---------------------------------------------------------
gulp.task('clean', function () {
  return gulp.src(build, {read: false})
    // remove folder build
    .pipe($.rimraf())
    // notify when task completed
    .pipe($.notify('Prod folder deleted !'));
});



// TASK DEV ($ gulp dev)
// ---------------------------------------------------------
gulp.task('dev', gulpSequence('clean', 'slim', 'sass', 'cssVendors', 'coffee', 'jsVendors', 'fonts', 'img'));



// TASK BUILD ($ gulp build)
// ---------------------------------------------------------
gulp.task('build', gulpSequence('dev', 'optimizeCss'));



// RUN SERVER ($ gulp)
// ---------------------------------------------------------

///// WATCH
gulp.task('watch', ['dev'], function () {
  $.browserSync.init({
    port: 3000,
    server: {
      baseDir: build,
      index: "index.html"
    },
    online: true,
    scrollProportionally: true,
    notify: false,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        }
      }
    }
  })
  gulp.watch(dev + '/**/*.slim', ['reload-slim']);
  gulp.watch(dev + '/**/*.sass', ['reload-sass']);
  gulp.watch(dev + '/**/*.coffee', ['reload-coffee']);
});

////// COMMAND
gulp.task('default', ['watch'])