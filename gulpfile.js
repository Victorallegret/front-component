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

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: '*'
    }),
    reload  = plugins.browserSync.reload


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
    .pipe(plugins.plumber({ errorHandler: function(err) {
      plugins.notify.onError({
          title: "Gulp error in " + err.plugin
      })(err);
    }}))
    // compile slim to html
    .pipe(plugins.slim({
      pretty: false,
      include: true
    }))
    // minify html
    .pipe(plugins.minifyHtml())
    // copy result to build folder
    .pipe(gulp.dest(slim_build))
    // reload server on slim save
    .pipe(reload({stream:true}))
    // notify when task completed
    .pipe(plugins.notify('Slim compilation completed !'));
});


// COMPILE SASS TO CSS
// ---------------------------------------------------------
gulp.task('sass', function () {
  return gulp.src(sass_dev + '/**/*.{sass,css,scss}')
    // prevent server from crashing
    .pipe(plugins.plumber({ errorHandler: function(err) {
      plugins.notify.onError({
          title: "Gulp error in " + err.plugin,
      })(err);
    }}))
    // compile sass to css
    .pipe(plugins.sass())
    // add auto-prefixes
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // concat all files
    .pipe(plugins.concat('main.css'))
    // rename to .min
    .pipe(plugins.rename('main.min.css'))
    // minify css
    .pipe(plugins.minifyCss())
    // copy result to build folder
    .pipe(gulp.dest(sass_build))
    // reload on sass save
    .pipe(reload({stream:true}))
    // notify when task completed
    .pipe(plugins.notify('Sass compilation completed !'));
});


// COMPILE COFFEE TO JS
// ---------------------------------------------------------
gulp.task('coffee', function() {
  return gulp.src(coffee_dev + '/**/*.coffee')
    // compile coffee to js
    .pipe(plugins.coffee())
    // concat all files
    .pipe(plugins.concat('all.js'))
    // rename to .min
    .pipe(plugins.rename('all.min.js'))
    // minify js
    .pipe(plugins.uglify())
    // copy result to build folder
    .pipe(gulp.dest(coffee_build))
    // notify when task completed
    .pipe(plugins.notify('Coffee compilation completed !'));
});


// FONTS
// ---------------------------------------------------------
gulp.task('fonts', function() {
  return gulp.src(fonts_dev + '/**/*.{eot,svg,ttf,woff}')
    // copy result to build folder
    .pipe(gulp.dest(fonts_build))
});


// REMOVE UNUSED CSS
// ---------------------------------------------------------
gulp.task('uncss', function () {
  return gulp.src(sass_build + '/app.css')
  // remove unused css
   .pipe(plugins.uncss({
      html: [build + '/**/*.html']
   }))
   // minify css
   .pipe(plugins.minifyCss())
   // copy result to build folder
   .pipe(gulp.dest(sass_build))
   // notify when task completed
   .pipe(plugins.notify('Unused CSS removed !'));
});


// MINIFY IMAGES
// ---------------------------------------------------------
gulp.task('img', function () {
  return gulp.src(img_dev + '/**/*.{png,jpg,jpeg,gif,svg}')
    // minify images
    .pipe(plugins.imagemin())
    // copy result to build folder
    .pipe(gulp.dest(img_build))
    // notify when task completed
    .pipe(plugins.notify('Images are optimized!'));
});


// REMOVE BUILD FOLDER
// ---------------------------------------------------------
gulp.task('removeBuild', function () {
  return gulp.src(build, { read: false})
    .pipe(plugins.rimraf())
    .pipe(plugins.notify('Prod folder deleted !'));
});





////////////////////
// COMMANDS
////////////////////////////////////////////////////////////////////////////////


// RUN SLIM | SASS | COFFEE ($ gulp dev)
// ---------------------------------------------------------
gulp.task('dev', ['slim', 'sass', 'coffee', 'fonts']);


// RUN SLIM | SASS | COFFEE | UNCSS | IMG ($ gulp build)
// ---------------------------------------------------------
gulp.task('build', ['slim', 'sass', 'coffee', 'fonts', 'uncss', 'img']);


// RUN CLEAN ($ gulp clean)
// ---------------------------------------------------------
gulp.task('clean', ['removeBuild']);


// RUN SERVER ($ gulp)
// ---------------------------------------------------------

///// WATCH
gulp.task('watch', ['dev'], function () {
  plugins.browserSync.init({
    server: build,
    scrollProportionally: true,
    notify: false
  })
  gulp.watch(dev + '/**/*.slim', ['slim']);
  gulp.watch(dev + '/**/*.sass', ['sass']);
  gulp.watch(dev + '/**/*.coffee', ['coffee']);
  gulp.watch(build  + '/**/*.html').on('change', reload);
});

////// COMMAND
gulp.task('default', ['watch'])