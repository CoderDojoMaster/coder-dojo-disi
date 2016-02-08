// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Check for --production flag
var isProduction = !!(argv.production);

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

gulp.task('clean:test', function () {
    return del([
        testDir + "/**/*",
        "!" + testDir
    ])
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy:fonts', function () {
    return gulp.src(paths.fonts, {base: 'node_modules/materialize-css/dist'})
        .pipe(gulp.dest(buildDir + "/assets"))
});

gulp.task('copy', ['copy:fonts'], function () {
    return gulp.src(paths.assets, {
            base: './client/'
        })
        .pipe(gulp.dest(buildDir));
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function () {
    return gulp.src('./client/templates/**/*.html')
        .pipe(gulp.dest(buildDir + '/templates'))
        .pipe(browserSync.stream())
        ;
});

// Compiles Sass
gulp.task('sass', function () {
    return gulp.src('client/assets/scss/app.scss')
        .pipe($.sass({
            includePaths: paths.sass,
            outputStyle: (isProduction ? 'compressed' : 'nested'),
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
gulp.task('uglify', ['uglify:angular', 'uglify:app']);

gulp.task('uglify:angular', function (cb) {
    var uglify = $.if(isProduction, $.uglify()
        .on('error', function (e) {
            console.log(e);
        }));

    return gulp.src(paths.angularJS)
        //.pipe(uglify)
        .pipe($.concat('angular.js'))
        .pipe(gulp.dest(buildDir + '/assets/js/'))
        ;
});

gulp.task('uglify:app', function () {
    var uglify = $.if(isProduction, $.uglify()
        .on('error', function (e) {
            console.log(e);
        }));

    return gulp.src(paths.appJS)
        //.pipe(uglify)
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(buildDir + '/assets/js/'))
        .pipe(browserSync.stream())
        ;
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function () {
    gulp.src(buildDir)
        .pipe($.webserver({
            port: 8079,
            host: 'localhost',
            fallback: 'index.html',
            livereload: true
        }))
    ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function (cb) {
    sequence('clean:build', ['copy', 'sass', 'uglify'], 'copy:templates', cb);
});

gulp.task('appTest', function (cb) {
    gulp.src(paths.appTest)
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(testDir))
    ;
    gulp.src('./spec/*.js')
        .pipe($.concat('spec.js'))
        .pipe(gulp.dest(testDir))
    ;
    gulp.src('./spec/SpecRunner.html')
        .pipe(gulp.dest(testDir))
    ;
    cb();
});

gulp.task('angularTest', function (cb) {
    gulp.src(paths.angularTest, {})
        .pipe($.concat('angular.js'))
        .pipe(gulp.dest(testDir));
    gulp.src('./node_modules/jasmine-core/lib/jasmine-core/jasmine.css')
        .pipe(gulp.dest(testDir))
    ;
    cb();
});

gulp.task('buildTest', function () {
    sequence('clean:test', ['angularTest', 'appTest'])
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function () {
    //Watch Sass
    //Watch the quick brown fox
    gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

    // Watch JavaScript
    gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app']);

    // Watch static files
    gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

    // Watch app templates
    gulp.watch(['./client/templates/**/*.html'], ['copy:templates']);

    browserSync.init({
        proxy: "coderdojodisi_nginx_1:8000"
    });
});
