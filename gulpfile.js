
var gulp = require('gulp');
var connect = require('gulp-connect'); // Run a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles js
var reactify = require('reactify'); //Transfrom React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text stream with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var config= {
    port: 3000,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js:  './src/js/**/*.js',
        images: './src/images/**/*.*',
        css: 'src/css/*.*',
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local development server

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open('', {url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());

});

gulp.task('compress', function() {
  gulp.src('./src/js/Vendors/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.dist + '/compress'))
});

gulp.task('css', function() {
   gulp.src(config.paths.css)
   .pipe(concat('bundle.css'))
   .pipe(gulp.dest(config.paths.dist + '/css'))
   .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint())
        .pipe(lint.format());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html'])
    gulp.watch(config.paths.css, ['css'])
    gulp.watch(config.paths.images, ['images'])
    gulp.watch(config.paths.js, ['js', 'lint' ])
})
gulp.task('default', [ 'html' ,'compress', 'css' ,'js', 'images' ,'lint', 'open', 'watch' ]);
