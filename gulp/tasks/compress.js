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
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const sourcemaps   = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const rename       = require('gulp-rename'); // 文件重命名
const utils        = require('require-dir')('../utils');

/**
 * @function
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = function (CONFIG, browserSync, watchTask) {
    // 获取package.json对象
	const PKG = require(CONFIG.root + 'package.json');
	// js压缩流
	var mini = (file) => {
		return gulp.src(file)
        .pipe(cached('compress'))
        .pipe(sourcemaps.init({loadMaps: CONFIG.debug}))
        .pipe(plumber({
            errorHandler: utils.handleError
        }))
        .pipe(uglify({
            output: {ascii_only: true},               // 将中文转为unicode编码
            compress: {drop_console: true}            // 扔掉console调试语句
        }))
        .pipe(header(PKG.banner, {
            pkg: PKG
        }))// 添加头部版权
        .pipe(rename({suffix: CONFIG.js.suffix}))
        .pipe(size({title: 'js文件压缩后：', gzip: true}))
        .pipe(sourcemaps.write('maps', {
            addComment:CONFIG.debug,
            includeContent: false,
            sourceRoot: CONFIG.js.assets
        }))
        .pipe(gulp.dest(CONFIG.js.assets))
        .pipe(utils.through(function(){
            browserSync.reload();
        }))
	}

    return utils.exeTask(mini, CONFIG.js, watchTask);

};
