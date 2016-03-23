// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var changed = require('gulp-changed');
var del = require('del');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

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

gulp.task('js', ['js:app']);

var b = browserify({
    entries: ['./client/assets/js/app.js'],
    debug: true,
    cache: {},
    packageCache: {}
});

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', function (err) {
            gutil.log("browserify: " + err.message);
            browserSync.notify(err.message, 3000);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write()) // writes .map file
        .pipe(gulp.dest(buildDir + "/assets/js"))
        .pipe(browserSync.stream())
        ;
}

gulp.task('js:app', bundle);


// Builds your entire app once, without starting a server
gulp.task('build', function (cb) {
    sequence(['copy', 'sass', 'js', 'copy:fonts'], cb);
});


// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function () {
    //Watch Sass
    var watcher = gulp.watch(['./client/assets/scss/**/*'], ['sass']);

    //Start watchify
    b.plugin(watchify, {
        ignoreWatch: true
    });
    bundle();
    b.on('update', bundle);

    // Watch static files
    var watcher2 = gulp.watch(paths.assets, ['copy']);

    browserSync.init({
        proxy: "nginx:8000"
    });

    process.on('SIGTERM', function () {
        watcher.end();
        watcher2.end();
        b.close();
        browserSync.exit();
        process.exit();
    });
});
