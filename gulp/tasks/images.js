// 图片压缩
var gulp        = require('gulp');
var tinypng     = require('gulp-tinypng');
var size        = require('gulp-size');
var header      = require('gulp-header');
var del         = require('del');
var cached       = require('gulp-cached');
var pkg         = require('../package.json');

// 配置压缩图片服务API
var tinypngAPI = '1Juah_GVpJhmhHQDBHnc-8Sz4W4f2Nv6';
// '9UZ5Ft49BVtY6ilBqdplbp5_-P_dC910'
// 'HUf0oMi1kITV1EStUI5-aGFzeH91IINB'
// '1Juah_GVpJhmhHQDBHnc-8Sz4W4f2Nv6'

module.exports = function(paths, browserSync){
    del.sync(paths.dest.img + '*');
    return gulp.src(paths.src.img + '**/*.{jpg,png,gif}')
        .pipe(cached('images'))
        .pipe(size({title: 'images 压缩前'}))
        .pipe(tinypng(tinypngAPI))
        .pipe(gulp.dest(paths.dest.img))
        .pipe(size({title: 'images 压缩后'}));
};
