var gulp  = require('gulp'),
    gm    = require('gulp-gm'),
    clean = require('gulp-clean'),
    util  = require('gulp-util');

gulp.task('default', ['optimize'], function () {
    return gulp
        .src('images_src/fixed/*.{gif,jpg,png}')
        .pipe(gulp.dest('images/fixed'));
});

gulp.task('optimize', ['clean-images'], function () {
    //You need to install ImageMagick
    var options = {imageMagick: true};

    return gulp
        .src('images_src/*.{gif,jpg,png}')
        .pipe(gm(function (gmfile) {
            log('Processing: ' + gmfile.source);
            //you can play with all of these parameters
            //follow some advices
            //http://stackoverflow.com/a/7262050/1283124

            //you can find documentation of these API here
            //http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace

            gmfile.resize(1000);
            //gmfile.quality(85);
            //gmfile.interlace('Line');
            //gmfile.blur(0.05);

            return gmfile
        }, options))
        .pipe(gulp.dest('images/'));
});

gulp.task('clean-images', function () {
    return gulp
        .src('images/*', {read: false})
        .pipe(clean());
});


function log(message) {
    util.log(util.colors.blue.bold(message));
}