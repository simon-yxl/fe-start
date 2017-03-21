/**
 * -------------------------------
 * @file        readFileList.js
 * @description 读取文件列表
 * @date        2017-03-21
 * -------------------------------
 */
const fs = require('fs');
const path = require('path'); //获取路径相关

/**
 * @function
 * @param {string} pathdir 路径
 */
module.exports = (pathdir) => {
  pathdir = path.normalize(pathdir);
  var dirList = [];
  var folderExists = fs.existsSync(pathdir);
  if (!folderExists) {
    gutil.log(gutil.colors.yellow('Warn:路径不存在，请仔细检查！'));
    return;
  }
  var files = fs.readdirSync(pathdir);
  files.forEach(function(item, index, array) {
    var childPath = path.join(pathdir, item);
    var stat = fs.statSync(childPath);
    // if (stat.isFile()) {
      // 数组中存储 文件夹的路径 和 创建时间
      dirList.push({path: childPath, btime: new Date(stat.birthtime).getTime()});
    // }
  });
  // 按照创建时间排序
  dirList.sort(function(n1, n2) {
    return n2.btime - n1.btime;
  });
  var choicesPath = [];       // 生成 prompt 需要的数据
  for (var i = 0; i < dirList.length; i++) {
    choicesPath.push(dirList[i].path.replace(pathdir, ''));
  }
  if (dirList.length === 0) {
    gutil.log(gutil.colors.magenta('该目录下没有文件'));
    return;
  }
  return choicesPath;
}