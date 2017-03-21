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
 * @param {string} filename 指定文件名
 */
module.exports = (cSign, filename) => {
  const PATH_SRC = CONFIG[cSign].src.js;
  var fileList = {};
  // 输入文件名为空时，获取文件夹下所有文件列表
  var getFileList = (pathdir) => {
    var newPaths = [];
    if(pathdir instanceof Array) {
      pathdir.forEach((v) => {
        newPaths.push(path.normalize(v));
      })
    } else if(typeof pathdir == 'string') {
      newPaths.push(path.normalize(pathdir));
    } else {
      gutil.log(gutil.colors.red('路径只能为字符串或数组'));
      return;
    }

    if(newPaths.length > 0) {
      var levelName = '';
      var getList = (dir, level) => {
        const files = fs.readdirSync(dir);
        if(files.length > 0) {
          files.forEach((f) => {
            const fdir = path.join(dir, f);
            const stats = fs.statSync(fdir);
            if(stats.isFile()) {
              const ext = path.extname(fdir);
              if(CONFIG[cSign].ext.js.indexOf(ext) >= 0){
                fileList[(level || (path.resolve(PATH_SRC) != dir ? filename+'/' : '')) + path.basename(fdir, ext)] = path.resolve(dir, f);
              }
            } else if(stats.isDirectory()){
              const fdirs = fdir.split(path.sep);
              levelName += fdirs[fdirs.length - 1] + '/';
              getList(fdir, levelName);
            }
          })
        }
      };

      newPaths.forEach((p) => {
        getList(p);
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
  const isDirectory = fs.statSync(path.resolve(PATH_SRC, filename));
  if(!filename || isDirectory){
    return getFileList(isDirectory ? path.resolve(PATH_SRC, filename) : PATH_SRC);
  } else {
    var needExt = CONFIG[cSign].ext.js;
    var ext = path.extname(path.resolve(PATH_SRC, filename));
    if(needExt.indexOf(ext) >= 0) {
      var fileList = {};
      fileList[path.basename(path.resolve(PATH_SRC, filename), ext)] = path.resolve(CONFIG.root, PATH_SRC, filename);
      return fileList;
    } else {
      // if(ext) {
        var len = needExt.length;
        for(var i = 0; i < len; i++){
          if(!needExt[i]) needExt.splice(i, 1);
        }
        gutil.log(gutil.colors.red('Error: 该次打包支持文件格式：'), gutil.colors.green(needExt.join(',')));
        return;
      // }
    }
  }
}