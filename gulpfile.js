// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var sourcemaps = require('gulp-sourcemaps');

// 2. FILE PATHS
// - - - - - - - - - - - - - - -
var buildDir = "./build";

var testDir = "./test";

var paths = {
    assets: [
        './client/**/*.*',
        '!./client/templates/**/*.*',
        '!./client/assets/{scss,js}/**/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass: [
        'client/assets/scss',
    ],
    css: [
        'node_modules/angular-material/angular-material.css'
    ],
    // These files include Foundation for Apps and its dependencies
    angularJS: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-messages/angular-messages.js',
    ],
    // These files are for your app's JavaScript
    appJS: [
        'client/assets/js/**/*.js'
    ],
    appTest: [
        'client/assets/js/**/*.js',
        '!client/assets/js/app.js'
    ],
    angularTest: [
        'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
        'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
        'node_modules/jasmine-core/lib/jasmine-core/boot.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/angular-resource/angular-resource.js',
        'spec/mocks/*.js'
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

// Copies everything in the client folder except templates, Sass, and JS
// gulp.task('copy:fonts', function () {
//     return gulp.src(paths.fonts, {base: 'node_modules/materialize-css/dist'})
//         .pipe(gulp.dest(buildDir + "/assets"))
// });

gulp.task('copy', ['copy:css'], function () {
    return gulp.src(paths.assets, {
        base: './client/'
    })
    .pipe(gulp.dest(buildDir))
    .pipe(browserSync.stream());
});

// Copies app's HTML templates
gulp.task('copy:templates', function () {
    return gulp.src('./client/templates/**/*.html')
    .pipe(gulp.dest(buildDir + '/templates'))
    .pipe(browserSync.stream())
    ;
});


gulp.task('copy:css', function (cb) {

    return gulp.src(paths.css)
    .pipe(gulp.dest(buildDir + '/assets/css/'))
    .pipe(browserSync.stream())
    ;
});


// Compiles Sass
gulp.task('sass', function () {
    return gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
        includePaths: paths.sass,
        errLogToConsole: true
    }))
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie 10']
    }))
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
    sequence('clean:build', ['copy', 'sass', 'js'], 'copy:templates', cb);
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
    //Watch the quick brown fox
    gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

    // Watch JavaScript
    gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['js:app']);

    // Watch static files
    gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

    // Watch app templates
    gulp.watch(['./client/templates/**/*.html'], ['copy:templates']);

    browserSync.init({
        proxy: "coderdojodisi_nginx_1:8000"
    });
});
