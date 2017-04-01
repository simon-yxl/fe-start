/**
 * -------------------------------
 * @file        FilesClass.js
 * @description 文件操作类
 * @date        2017-03-24
 * -------------------------------
 */
const fs = require('fs');
const path = require('path'); //获取路径相关
const gutil = require('gulp-util'); // 打印日志，获取参数变量等

/**
 * @function readfilelist
 * @description 读取文件列表
 * @param {string} pathdir 路径
 */
module.exports = {
  readFileList (pathdir) {
    pathdir = path.normalize(pathdir);
    let dirList = [];
    const folderExists = fs.existsSync(pathdir);
    if (!folderExists) {
      gutil.log(gutil.colors.yellow('Warn:路径不存在，请仔细检查！'));
      return;
    }
    const files = fs.readdirSync(pathdir);
    files.forEach(function(item, index, array) {
      const childPath = path.join(pathdir, item);
      const stat = fs.statSync(childPath);
      // if (stat.isFile()) {
        // 数组中存储 文件夹的路径 和 创建时间
        dirList.push({path: childPath, btime: new Date(stat.birthtime).getTime()});
      // }
    });
    // 按照创建时间排序
    dirList.sort(function(n1, n2) {
      return n2.btime - n1.btime;
    });
    let choicesPath = [];       // 生成 prompt 需要的数据
    for (let i = 0; i < dirList.length; i++) {
      choicesPath.push(dirList[i].path.replace(pathdir, ''));
    }
    if (dirList.length === 0) {
      gutil.log(gutil.colors.magenta('该目录下没有文件'));
      return;
    }
    return choicesPath;
  }
};
