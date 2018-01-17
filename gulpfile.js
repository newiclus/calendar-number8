// Gulp
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    gutil      = require('gulp-util'),
    jshint     = require('gulp-jshint'),
    jshint_styles = require('jshint-stylish'),
    less       = require('gulp-less'),
    plumber    = require('gulp-plumber'),
    pug        = require('gulp-pug'),
    uglify     = require('gulp-uglify');


/* Sources files */
var source = {
    pug:     "dev-assets/pug/*.pug",
    js:      "dev-assets/js/main.js",
    plugins: "dev-assets/js/plugins/*.js",
    less:    "dev-assets/less/main.less",
    images:  "dev-assets/images"
};

/* folders ouput */
var outputDir = {
    templates: "./",
    js:        "./javascripts",
    css:       "./stylesheets",
    images:    "./images"
};


/* Emit errors on console */
function onError(error) {
    gutil.log(error);
    this.emit('end');
}


/* Convert from Pug to HTML */
gulp.task('templates', function () {
    return gulp.src( source.pug )
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe( gulp.dest(outputDir.templates) )
        .pipe( connect.reload() );
});


/* Concat and minify the plugins js */
gulp.task('vendor', function() {
    return gulp.src( source.plugins )
        .pipe( concat('vendor_all.js') )
        .pipe( uglify() )
        .pipe( gulp.dest(outputDir.js) )
        .pipe( connect.reload() );
});


/* check main.js */
gulp.task('javascript', function () {
    return gulp.src( source.js )
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe( jshint() )
        .pipe( jshint.reporter( jshint_styles ))
        .pipe( gulp.dest(outputDir.js) )
        .pipe( connect.reload() );
});


/* Convert from Less to CSS */
gulp.task('less', function () {
    return gulp.src( source.less )
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            sourceMap: {sourceMapFileInline: true},
            compress: true
        }))
        .pipe( gulp.dest(outputDir.css) )
        .pipe( connect.reload() );
});


/* Watchers */
gulp.task('watch', function () {
    gulp.watch('dev-assets/pug/**/*.pug', ['templates']);
    gulp.watch('dev-assets/js/plugins/*.js', ['vendor']);
    gulp.watch('dev-assets/js/**/*.js', ['javascript']);
    gulp.watch('dev-assets/less/**/*.less', ['less']);
});


/* Local server: localhost:7070 */
gulp.task('connect-server', function () {
    connect.server({
        name: 'Calendar',
        host: '0.0.0.0',
        root: outputDir.templates,
        port: 7070,
        livereload: true
    });
});


var taskDeploy = [
    'templates',
    'vendor',
    'javascript',
    'less'
];

var taskDefault = [
    'templates',
    'vendor',
    'javascript',
    'less',
    'watch',
    'connect-server'
];


gulp.task('deploy', taskDeploy);

gulp.task('default', taskDefault);