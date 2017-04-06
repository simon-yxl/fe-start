/**
 * -------------------------------
 * @file        base64.js
 * @description 图片转base64
 * @date        2017-03-10
 * -------------------------------
 */
const gulp = require('gulp'); //gulp
const Q = require('q'); // promise功能
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const size = require('gulp-size'); // 计算文件大小
const path = require('path'); //获取路径相关
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const stream = utils.stream;

require('dotenv').config();
const CONFIG = require(path.join(process.env.INIT_CWD, process.env.GULP_CONFIG || process.env.GULP_DEV)) // 获取全局配置文件

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @return {object} gulp流
 */
module.exports = (browserSync, watchTask, filename) => {

  // base64转换
  const toBae64 = (file) => {
    let gulpQ = Q(gulp.src(file)
      .pipe(cached('base64')));
    // 任务流
    gulpQ = gulpQ.then((s) => {
      return stream.base64(s);
    })

    let gulpStream = null;
    gulpQ.then((s) => {
        gulpStream = s.on('error', utils.handleError)
          .pipe(size({
            title: 'styles',
            gzip: true
          }))
          .pipe(gulp.dest(CONFIG.base64.assets))
          .pipe(utils.through());
      })
      .done();
    return gulpStream;
  }

  return utils.exeTask(toBae64, 'base64', watchTask, filename);
};
