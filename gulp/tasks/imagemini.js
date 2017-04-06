/**
 * -------------------------------
 * @file        imagemin.js
 * @description js压缩
 * @date        2017-03-06
 * -------------------------------
 */
const gulp = require('gulp');
const path = require('path');
const Q = require('q'); // promise功能
const tinypng = require('gulp-tinypng-compress'); // tinypng方式压缩图片，压缩倍率更高，需要API_KEY，免费注册的每月限制500张图片
const imagemin = require('gulp-imagemin'); // 普通的压缩图片插件，压缩倍率不如tinypng
const size = require('gulp-size'); // 计算文件大小
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = require(path.join(process.env.INIT_CWD, process.env.GULP_CONFIG || 'development')); // 获取全局配置文件

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @return {object} gulp流
 */
module.exports = (browserSync, watchTask, filename) => {
  const tiny = function (file) {
    let gulpQ = Q(gulp.src(file)
                .pipe(cached('imagemini'))
                .pipe(size({
                  title: 'imagemini before',
                  gzip: true
                })));

    gulpQ = gulpQ.then((s) => {
      if(CONFIG.imagemin.tiny_api_key) {
        return s.pipe(tinypng({
          key: CONFIG.imagemin.tiny_api_key,
          sigFile: CONFIG.imagemin.assets + '/.tinypng-sigs',
          log: true,
          summarize: true
        }))
      } else {
        return s.pipe(imagemin());
      }
    })

    let gulpStream = null;
    gulpQ.then((s) => {
      gulpStream = s.on('error', utils.handleError)
                    .pipe(gulp.dest(CONFIG.imagemin.src))
                    .pipe(utils.through())
    })
    .done();
    return gulpStream;
  }
  return utils.exeTask(tiny, 'images', watchTask, filename);
};
