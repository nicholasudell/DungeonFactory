﻿var
    { src, dest, watch, parallel } = require('gulp'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps')
    ;

function build() {
    return src('Scripts/Index.js')
        .pipe(webpack({
            devtool: 'eval-cheap-module-source-map',
            output: {
                filename: '[name].js',
            },
        }))
        .pipe(dest('wwwroot/'));
}

function copyProseMirrorCSS() {
    return copyCSS(
        'node_modules/prosemirror*/style/*.css',
        'prosemirror.css',
        'wwwroot/css/prosemirror/'
    );
}

function copyCSS(input, filename, output) {
    return src(input)
        .pipe(sourcemaps.init())
        .pipe(concat(filename))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest(output));
}

function copyLeafletCSS() {
    return copyCSS(
        'node_modules/leaflet/dist/leaflet.css',
        'leaflet.css',
        'wwwroot/css/leaflet/'
    );
}

exports.watch = (cb) => {
    watch('Scripts/**/*.js', build);
    cb();
};

exports.default = parallel(build, copyProseMirrorCSS, copyLeafletCSS);