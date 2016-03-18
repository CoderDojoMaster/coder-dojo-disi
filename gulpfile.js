// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var changed = require('gulp-changed');
var del = require('del');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var sourcemaps = require('gulp-sourcemaps');

// 2. FILE PATHS
// - - - - - - - - - - - - - - -
var buildDir = "./build";

var paths = {
    assets: [
        './client/**/*.*',
        '!./client/assets/{scss,js}/**/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass: [
        'client/assets/scss',
        'node_modules/materialize-css/sass/'
    ],
    // These files include Foundation for Apps and its dependencies
    angularJS: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/materialize-css/dist/js/materialize.js'
    ],
    fonts: [
        'node_modules/materialize-css/dist/font/material-design-icons/*',
        'node_modules/materialize-css/dist/font/roboto/*'
    ],
    // These files are for your app's JavaScript
    appJS: [
        'client/assets/js/**/*.js'
    ]
};

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean:build', function () {
    return del([
        buildDir + "/**/*",
        "!" + buildDir
    ])
});

gulp.task('copy:fonts', function () {
    return gulp.src(paths.fonts, {
            base: 'node_modules/materialize-css/dist'
        })
        .pipe(changed(buildDir + "/assets"))
        .pipe(gulp.dest(buildDir + "/assets"))
});

gulp.task('copy', function () {
    return gulp.src(paths.assets, {
            base: './client/'
        })
        .pipe(changed(buildDir))
        .pipe(gulp.dest(buildDir))
        .pipe(browserSync.stream());
});

// Compiles Sass
gulp.task('sass', function () {
    return gulp.src('client/assets/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe($.sass({
            includePaths: paths.sass
        }).on('error', $.sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir + '/assets/css/'))
        .pipe(browserSync.stream())
        ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('js', ['js:angular', 'js:app']);

gulp.task('js:angular', function (cb) {

    return gulp.src(paths.angularJS)
        .pipe($.concat('angular.js'))
        .pipe(gulp.dest(buildDir + '/assets/js/'))
        ;
});

gulp.task('js:app', function () {

    return gulp.src(paths.appJS)
        .pipe(sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir + '/assets/js/'))
        .pipe(browserSync.stream())
        ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function (cb) {
    sequence('clean:build', ['copy', 'sass', 'js', 'copy:fonts'], cb);
});

// Execute the script to import sample data in MongoDB
gulp.task('sample-data', function () {
    process.chdir('./sample-data');
    exec('node import-samples.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (err) {
            console.error("> Error during import sample in databse: " + err.message);
        }
    });
});


// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function () {
    //Watch Sass
    gulp.watch(['./client/assets/scss/**/*'], ['sass']);

    // Watch JavaScript
    gulp.watch(paths.appJS, ['js:app']);

    // Watch static files
    gulp.watch(paths.assets, ['copy']);

    browserSync.init({
        proxy: "nginx:8000"
    });
});
