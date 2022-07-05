var
    { src, dest, watch, parallel } = require('gulp'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps')
    ;

function build() {
    return src('Scripts/Index.js')
        .pipe(webpack({
            devtool: 'source-map',
            output: {
                filename: '[name].js',
            },
        }))
        .pipe(dest('wwwroot/'));
}

function copyProseMirrorCSS() {
    return src('node_modules/prosemirror*/style/*.css')
        .pipe(sourcemaps.init())
            .pipe(concat('prosemirror.css'))
            .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('wwwroot/css/prosemirror/'));
}

exports.default = parallel(build, copyProseMirrorCSS);
exports.watch = watch('Scripts/*.js', build());