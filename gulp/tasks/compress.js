// javascript 压缩
var gulp        = require('gulp');
var fs          = require('fs');
var size        = require('gulp-size');
var header      = require('gulp-header');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var cached       = require('gulp-cached');
var pkg         = require('../package.json');

module.exports = function(paths, browserSync){

    // 读取所有js文件并筛选未压缩的js文件 (不包含.min)
    var fileList = [];
    var path = paths.dest.js;
    var files = fs.readdirSync(path);
    files.forEach(function(item, index, array) {
        if( /\.js$/.test(item) && item.indexOf('.min') === -1){
            fileList.push(path + item);
        }
    });

    return gulp.src(fileList)
        .pipe(cached('compress'))
        .pipe(uglify({
            output: {ascii_only: true},               // 将中文转为unicode编码
            compress: {drop_console: true}            // 扔掉console调试语句
        }))
        .pipe(header(pkg.banner, {pkg: pkg}))         // 添加头部版权
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dest.js))
        .pipe(size({title: 'scripts', gzip: true}))
        .on('end', function(){
            gutil.log(gutil.colors.magenta('javascript 压缩完成'));
        });
};
