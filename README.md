# GulpDup

GulpDup is a blank template for making statics webapps propulsed by [Gulp.js](https://gulpjs.com/).
It work with [Sass](http://sass-lang.com/),  [Slim-template](http://slim-lang.com/) and [CoffeeScript](http://coffeescript.org/).
The project use [BrowserSync](https://www.browsersync.io/) to run a multi-device auto-reload server.
It come with a bunch of libraries, required with [Browserify](http://browserify.org/) : Bootstrap v4, Jquery, Slick-carousel, Waypoints and Turbolinks.
GulpDup project structure is based on the [Atomic Design Methodology](http://bradfrost.com/blog/post/atomic-web-design/) (Atoms | Molecules | Organisms).


## Install

**You must have [node.js](https://nodejs.org/en/) installed to run GulpDup.**

**First, you’ll have to [fork](https://help.github.com/articles/fork-a-repo/) or [clone](https://help.github.com/articles/cloning-a-repository/) the GulpDup repository**

### Then in your Terminal :
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
