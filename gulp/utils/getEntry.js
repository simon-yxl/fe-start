/**
 * -------------------------------
 * @file        getEntry.js
 * @description 生成webpack需要入口文件
 * @date        2017-03-14
 * -------------------------------
 */
const path = require('path');
const fs = require('fs');
const gutil = require('gulp-util'); // 打印日志，获取参数变量等
const CONFIG = require('./global').config(); // 获取全局配置文件

/**
 * @function
 * @param {string} cSgin 配置项标识
 */
module.exports = (cSign) => {
  var files = {};
  const PATH_SRC = CONFIG[cSign].src.js;
  var newPaths = [];
  if(PATH_SRC instanceof Array) {
    PATH_SRC.forEach((v) => {
      newPaths.push(path.normalize(v));
    })
  } else if(typeof PATH_SRC == 'string') {
    newPaths.push(path.normalize(PATH_SRC));
  } else {
    gutil.log(gutil.colors.red('路径只能为字符串或数组'));
    return;
  }

  if(newPaths.length > 0) {
    var fileList = {};
    newPaths.forEach((p) => {
      var files = fs.readdirSync(p);
      if(files.length > 0) {
        files.forEach((f) => {
          var filename = f.split('.');
          if(filename && CONFIG[cSign].ext.js.indexOf('.'+filename[1]) >= 0){
            fileList[filename[0]] = path.resolve(CONFIG.root, p, f);
          }
        })
      }
    });
    
    if(Object.keys(fileList).length > 0){
      return fileList;
    } else {
      gutil.log(gutil.colors.red('没有可打包的文件'));
      return;
    }
    
  } else {
    gutil.log(gutil.colors.red('没有可打包的文件'));
    return;
  }
}