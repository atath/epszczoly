// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//   `gulp build`
//   `gulp compile:less`
//   `gulp compile:js`
//   `gulp compile:vendor`
//   `gulp compile:vendor-js`
//   `gulp compile:vendor-css`
//   `gulp documentation`
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp                 : The streaming build system
// gulp-concat          : Compile CoffeeScript files
// gulp-uglify          : Lint your CoffeeScript
// gulp-less            : Concatenate files
// gulp-autoprefixer    : Prefix CSS with Autoprefixer
// gulp-jshint          : JavaScript code quality tool
// gulp-notify          : Automatically load Gulp plugins
// gulp-documentation   : Minify CSS
// gulp-sourcemaps      : Prevent pipe breaking from errors
// gulp-rename          : Rename files
// gulp-livereload      : A lightweight gulp plugin for livereload best used with the livereload chrome extension (https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
// main-bower-files     : Read your bower.json, iterate through your dependencies and returns an array of files defined in the main property of the packages bower.json.
// gulp-clean-css       : Gulp plugin to minify CSS, using clean-css
//
// -------------------------------------

var gulp = require('gulp');
var plugins = concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    notify = require('gulp-notify'),
    documentation = require('gulp-documentation'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    mainBowerFiles = require('main-bower-files'),
    minCSS = require('gulp-cssmin'),
    order = require("gulp-order");

// -------------------------------------
//   Options
// -------------------------------------

var options = {
    srcPath: 'src/',
    destPath: 'assets/',
    bower: {
        bowerJson: 'bower.json',
        bowerDirectory: 'bower_components'
    },
    less: {
        src: 'less/app.less',
        fileName: 'style.min.css',
        destination: 'css/',
        autoprefixerOptios: {
            browsers: ['last 8 versions', 'ie 9'],
            cascade: false
        },
        watch: 'less/**/*.less'
    },
    js: {
        src: ['js/**/*.js'],
        fileName: 'scripts.min.js',
        destination: 'js/',
        watch: 'js/**/*.js'
    },
    vendors: {
        js: {
            fileFilter: ['**/jquery.js/', '**/*.js'],
            fileName: 'vendors.min.js',
            destination: 'js/'
        },
        css: {
            fileFilter: '**/*.css',
            fileName: 'vendors.min.css',
            destination: 'css/'
        }
    }
};

// -------------------------------------
//   Task: default
// -------------------------------------

gulp.task('default', function() {
    livereload.listen();
    gulp.watch(options.srcPath + options.less.watch, ['compile:less']);
    gulp.watch(options.srcPath + options.js.watch, ['compile:js']);
});

// -------------------------------------
//   Task: compile:vendor-css
// -------------------------------------

gulp.task('compile:vendor-css', function() {

    return gulp.src(mainBowerFiles(options.vendors.css.fileFilter, { debugging: true }))
        .pipe(sourcemaps.init())
        .pipe(concat(options.vendors.css.fileName))
        .pipe(minCSS({ debug: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.destPath + options.vendors.css.destination))
        .pipe(notify("Vendory CSS zostały zminimalizowane"));
})

// -------------------------------------
//   Task: compile:vendor-js
// -------------------------------------

gulp.task('compile:vendor-js', function() {
    return gulp.src(mainBowerFiles(options.vendors.js.fileFilter, { debugging: true }))
        .pipe(sourcemaps.init())
        .pipe(concat(options.vendors.js.fileName))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.destPath + options.vendors.js.destination))
        .pipe(notify("Vendory JS zostały zminimalizowane"));
});

// -------------------------------------
//   Task: compile:vendor
// -------------------------------------

gulp.task('compile:vendor', ['compile:vendor-js', 'compile:vendor-css']);

// -------------------------------------
//   Task: compile:js
// -------------------------------------

gulp.task('compile:js', function() {
    return gulp.src(options.srcPath + options.js.src)
        .pipe(sourcemaps.init())
        .pipe(order([
            "components/**/*.js",
            "views/**/*.js",
            "project-scripts/**/*.js",
            "scripts.js"
        ]))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat(options.js.fileName))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.destPath + options.js.destination))
        .pipe(livereload())
        .pipe(notify("JSy zostały zminimalizowane"))
});

// -------------------------------------
//   Task: compile:less
// -------------------------------------

gulp.task('compile:less', function() {
    return gulp.src(options.srcPath + options.less.src)
        .pipe(sourcemaps.init())
        .pipe(less({ compress: true }))
        .pipe(autoprefixer(options.less.autoprefixerOptios))
        .pipe(rename(options.less.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.destPath + options.less.destination))
        .pipe(livereload())
        .pipe(notify("CSS zostały zminimalizowane"))
});

// -------------------------------------
//   Task: build
// -------------------------------------

gulp.task('build', ['compile:less', 'compile:js', 'compile:vendor']);

// -------------------------------------
//   Task: documentation
// -------------------------------------

gulp.task('documentation', function() {
    gulp.src([options.srcPath + options.js.src])
        .pipe(documentation({
            format: 'html'
        }))
        .pipe(gulp.dest('documentation'));
});