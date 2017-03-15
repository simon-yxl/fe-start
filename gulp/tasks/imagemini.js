/**
 * -------------------------------
 * @file        imagemin.js
 * @description js压缩
 * @date        2017-03-06
 * -------------------------------
 */
const gulp = require('gulp');
const imagemin = require('gulp-tinypng-compress'); // tinypng方式压缩图片，压缩倍率更高，需要API_KEY，免费注册的每月限制500张图片
// const imagemin = require('gulp-imagemin'); // 普通的压缩图片插件，压缩倍率不如tinypng
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = utils.global.config(); // 获取全局配置文件

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @return {object} gulp流
 */
module.exports = (browserSync, watchTask, filename) => {
  var tiny = function (file) {
    return gulp.src(file)
      .pipe(cached('imagemini'))
      .pipe(imagemin({
        key: CONFIG.images.tiny_api_key,
        sigFile: CONFIG.images.assets + '/.tinypng-sigs',
        log: true,
        summarize: true
      }))
      .on('error', utils.handleError)
      .pipe(gulp.dest(CONFIG.images.src))
      .pipe(utils.through())
  }
  return utils.exeTask(tiny, 'images', watchTask, filename);
};