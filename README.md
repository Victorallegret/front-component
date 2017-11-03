# GulpDup

GulpDup is a blank template for making statics webapps propulsed by [Gulp.js](https://gulpjs.com/).
<br/>
It work with [Sass](http://sass-lang.com/),  [Slim-template](http://slim-lang.com/) and [CoffeeScript](http://coffeescript.org/).
<br/>
The project use [BrowserSync](https://www.browsersync.io/) to run a multi-device auto-reload server.
<br/>
It come with a bunch of libraries, required with [Browserify](http://browserify.org/) : Bootstrap v4, Jquery, Slick-carousel, Waypoints and Turbolinks.
<br/>
GulpDup project structure is based on the [Atomic Design Methodology](http://bradfrost.com/blog/post/atomic-web-design/) (Atoms | Molecules | Organisms).


## Install

> **WARNING** You must have [node.js](https://nodejs.org/en/) installed to run GulpDup.

**First, you’ll have to [fork](https://help.github.com/articles/fork-a-repo/) or [clone](https://help.github.com/articles/cloning-a-repository/) the GulpDup repository**

**Then in your Terminal :**
```
$ npm install
```
**That’s it ! You now can use all the features of GulpDup.**


## Commands

You can run independently every commands of the gulpfile.js. But the 3 commands you need are the following:

* **Create your development environment :**
  ```
  $ gulp
  ```
  This command will run every command you need to launch a local server and compile all your assets / templates.
  <br/>
  This command will also start a `gulp.watch` task. The server will watch every `.sass`, `.slim` and `.coffee` files. If you update one of these files, the server will reload.

* **Create your production environment:**
  ```
  $ gulp build
  ```
  This command will create a `build` folder with all the assets / template optimized and ready to deploy.

* **Clean the production environment:**
  ```
  $ gulp clean
  ```
  This command will destroy the build folder, previously created with `$ gulp` or `$ gulp build`.


## Plugins

GulpDup use a bunch of npm plugins:

* [browserSync](https://www.browsersync.io/) : Run a multi-device auto-reload local server.
* [browserify](http://browserify.org/) : Enable require modules in the browser.
* [gulp-sass](http://sass-lang.com/) : Compile sass files into CSS.
* [gulp-uncss](https://www.npmjs.com/package/gulp-uncss) : Remove unused css properties.
* [gulp-slim](http://slim-lang.com/) : Compile slim template files into HTML
* [gulp-coffee](http://coffeescript.org/) : Compile coffeeScript files into Javascripts.
* [gulp-contact](https://www.npmjs.com/package/gulp-concat) : Concat files.
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) : Minification for js files.
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) : Optimize images.
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) : Auto rename files (.css to .min.css etc ..).
* [gulp-rimraf](https://github.com/robrich/gulp-rimraf) : Delete files / folders.
* [gulp-notify](https://www.npmjs.com/package/gulp-notify) : Add notifications when running tasks.

> **INFOS** Feel free to add some in the gulfile !


## Vendors

GulpDup use a bunch of vendors:

* [Turbolinks](https://github.com/turbolinks/turbolinks) : Make navigation application faster.
* [Bootstrap v4](http://getbootstrap.com/) : Css framework.
* [Jquery](https://jquery.com/) : Javascript library.
* [Waypoints](http://imakewebthings.com/waypoints/) : Javascript library to trigger events on scroll.
* [Slick-carousel](http://kenwheeler.github.io/slick/) : A library to create sliders.

> **INFOS** You can use `require` to call new vendors in the `./dev/assets/javascripts/vendors.js`.


## Project structure

> **INFOS** You can update the default structure project, but you may need to update the gulfile.js too.

The project is based on the [Atomic Design Methodology](http://bradfrost.com/blog/post/atomic-web-design/).
<br/>

The development structure is divided into 2 folders :

  * **assets** : Stylesheets (sass / css vendors) | Javascripts (coffeeScript / js vendors) | Fonts | Images.
  * **views** : Slim templates of the project (HTML)

### Views structure

There is 2 types of slim files:

  * **basic files** : `index.slim`, `contact.slim` etc ...
  * **partials files** : `_index.slim`, `_contact.slim` etc ...

> **WARNING** All the partials must be in `./dev/views/layout/` and `./dev/views/partials/` folders.

Basics files you should need are the `./dev/views/layout/` partials : `_head.slim`, `_footer.slim` `_header.slim`.
<br/>

Then you just need to call them in your basic slim files.

> **INFOS** Feel free to create other folders in `./dev/views/`

### Assets structure

  * **fonts**
    * Use `.eot`, `.svg`, `.ttf`, `.woff`, `.woff2` extensions.
    * Put all fonts you need in this folder.
    * If you add a new font, `$ gulp fonts` and refresh the page.
    * You can create folders to organize your fonts.
    * Defaults text fonts are : `brandon`, `gotham` and `Unna`.
    * The project use the [Material Design Icons](https://material.io/icons/) : `i.material-icons face`

  * **images**
    * Use `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico` extensions.
    * Put all images you need in this folder.
    * If you add a new image, `$ gulp img` and refresh the page.
    * You can create folders to organize your images.

  * **javascript**
    * Remember to call every files in the `main.coffee` file.
    * Use classes.
    * Feel free to update the default javascripts folders.
    * Call with `require` the vendors you need in the `vendors.js` file.

  * **stylesheets**
    * If you add new folders, remember to call them into the `main.sass` file.
    * The project use bootstrap, so there is some basic styles.
    * The project come with a bunch of variables | mixins | helpers, free to update !
    * I recommand to design every components of the project into the `./dev/assets/stylesheets/components/` folder.