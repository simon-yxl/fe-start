/**
 * -------------------------------
 * @file        exeTask.js
 * @description 执行任务方式
 * @date        2017-03-07
 * -------------------------------
 */
const through = require('through2');
const gutil = require('gulp-util'); // 打印日志，获取参数变量等
const prompt = require('prompt'); // 输入提示进行下一步
const del = require('del'); //删除文件
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = requireDir('../utils/global').config(); // 获取全局配置文件

/**
 * @function
 * @param {object} task 当前任务
 * @param {string} taskConfig 当前任务相关配置键值
 * @param {object} watchTask watch任务
 * @param {string} filename 文件名
 */
module.exports = function (task, taskConfig, watchTask, filename) {
  const config = CONFIG[taskConfig];
  if (watchTask) { // 任务处于监控中
    // 文件被修改 or 新增
    if (watchTask.type == 'changed' || watchTask.type == 'added') {
      return task(watchTask.path);
    } else if (watchTask.type == 'deleted') { //文件被删除
      var extname = config.assets.extname(watchTask.path);
      var basename = config.assets.basename(watchTask.path, extname);
      var files = [
        config.assets + basename + config.suffix + extname,
        config.assets + 'maps/' + basename + config.suffix + extname + '.map'
      ];
      del(files).then(paths => {
        gutil.log(gutil.colors.red('Files and folders that would be deleted:\n' + paths.join('\n')));
      });
    }
  } else {
    var path = config.src + '**/**/';
    if(filename) {
      path += filename;
    } else {
      const extnames = config.ext.length > 1 ? '{' + config.ext.join(',').toLowerCase() + '}' : config.ext[0];
      path += '*.' + extnames;
    }
    return task(path);
  }
}