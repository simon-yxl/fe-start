/**
 * -------------------------------
 * @file        exeTask.js
 * @description 执行任务方式
 * @date        2017-03-07
 * -------------------------------
 */
const through = require('through2');
const gutil = require('gulp-util'); // 打印日志，获取参数变量等
const path = require('path');
const del = require('del'); //删除文件
const CONFIG = require('../config'); // 获取全局配置文件

/**
 * @function
 * @param {object} task 当前任务
 * @param {string} taskName 当前任务相关配置键值
 * @param {object} watchTask watch任务
 * @param {string} filename 文件名
 */
module.exports = (task, taskName, watchTask, filename) => {
  const config = CONFIG[taskName];
  if (watchTask) { // 任务处于监控中
    // 文件被修改 or 新增
    if (watchTask.type == 'changed' || watchTask.type == 'added') {
      return task(watchTask.path);
    } else if (watchTask.type == 'deleted') { //文件被删除
      let extname = path.extname(watchTask.path);
      let basename = path.basename(watchTask.path, extname);
      let files = [
        path.resolve(config.assets, basename + config.suffix + extname),
        path.resolve(config.assets, 'maps', basename + config.suffix + extname + '.map'),
        path.resolve(config.assets, basename + config.suffix + extname + '.map')
      ];
      del(files).then(paths => {
        gutil.log(gutil.colors.red('Files and folders that would be deleted:\n' + paths.join('\n')));
      });
    }
  } else {
    let path = config.src + '**/**/';
    if(filename) {
      path += filename;
    } else {
      const extnames = config.ext.length > 1 ? '{' + config.ext.join(',').toLowerCase() + '}' : config.ext[0];
      path += '*.' + extnames;
    }
    return task(path);
  }
}
