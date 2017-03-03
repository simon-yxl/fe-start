/**
 * -------------------------------
 * @file        compress.js
 * @description js压缩
 * @date        2017-03-02
 * -------------------------------
 */
const gulp         = require('gulp');
const size         = require('gulp-size'); // 计算文件大小
const uglify       = require('gulp-uglify'); // js压缩
const header       = require('gulp-header'); //添加文件头信息
const plumber      = require('gulp-plumber'); //添加文件头信息
const gutil        = require('gulp-util'); //打印日志，获取参数变量等
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const notify       = require('gulp-notify'); //通知
const prompt       = require('prompt'); // 输入提示进行下一步

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 */
module.exports = function (PATHS, CONFIG, browserSync) {
    // 错误通知
    var onError = (err) => {
        notify.onError({
            title:'Uglify error!',
            message: "Error: <%= error.message %>",
            sound:"Beep"
        })(err);
        this.emit('end');
    }
	// js压缩流
	var mini = (file) => {
		return gulp.src(path)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(size({title: filename+'开始压缩，压缩前：', gzip: true}))
        .pipe(cached('compress'))
        .pipe(uglify({
            output: {ascii_only: true},               // 将中文转为unicode编码
            compress: {drop_console: true}            // 扔掉console调试语句
        }))
        
        .pipe(header(_header.banner,{header: _header}))         // 添加头部版权
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths['JS']))
        .pipe(size({title: filename+'压缩完成，压缩后', gzip: true}))
	}

};
