/**
 * -------------------------------
 * @file        through.js
 * @description 流控制
 * @date        2017-03-07
 * -------------------------------
 */
const through = require('through2');
const gutil = require('gulp-util'); // 打印日志，获取参数变量等

/**
 * @function
 * @param {function} callback 回调函数
 */
module.exports = function (callback) {
  return through.obj(function (file, enc, cb) {
    // gutil.log('I am: ' + file);
    // console.log(file, enc);
    cb();
  }, function (cb) {
    gutil.log(gutil.colors.green('It is last end'));
    if (callback) callback();
    cb();
  });
}
