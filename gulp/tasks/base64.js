/**
 * -------------------------------
 * @file        base64.js
 * @description 图片转base64
 * @date        2017-03-10
 * -------------------------------
 */
const gulp         = require('gulp'); //gulp
const base64 = require('gulp-base64'); // 图片转base64
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const size         = require('gulp-size'); // 计算文件大小
const path         = require('path'); //获取路径相关
const utils        = require('require-dir')('../utils');

/**
 * @function
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = function (CONFIG, browserSync, watchTask, filename) {
	
	// sass编译
  var toBae64 = (file) => {
    // 需要转base64的图片格式
    const reg = new RegExp("\.("+CONFIG.base64.options.ext.join("|")+")#"+CONFIG.base64.options.suffix, "i");
    return gulp.src(file)
      .pipe(cached('base64'))
      .pipe(base64({
        // baseDir: 'assets',
        extensions: [reg],
        exclude:    CONFIG.base64.options.exclude,
        maxImageSize: CONFIG.base64.options.maxImageSize*1024, // bytes 
        debug: CONFIG.debug
      }))
      .on('error', utils.handleError)
      .pipe(size({
        title: 'styles',
        gzip: true
      }))
      .pipe(gulp.dest(CONFIG.base64.assets))
      .pipe(utils.through());
  }

  return utils.exeTask(toBae64, CONFIG.base64, watchTask, filename);
};