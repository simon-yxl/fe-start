/**
 * -------------------------------
 * @file        getEntry.js
 * @description 生成webpack需要入口文件
 * @date        2017-03-14
 * -------------------------------
 */
const path = require('path');
const fs = require('fs');
const requireDir = require('require-dir');
const CONFIG = requireDir('../global').config(); // 获取全局配置文件

/**
 * @function
 * @param {array} pathArr 路径集合
 */
module.exports = (pathArr) => {
  var files = {};
  if (pathArr instanceof Array) {
    pathArr.forEach(function (item) {
      let jsPath = path.normalize(item);
      let dirs = fs.readdirSync(jsPath);
      let matchs = [];
      dirs.forEach(function (file) {
        matchs = file.match(/(.+)\.js$/);
        if (matchs) {
          files[matchs[1]] = path.resolve(jsPath, file);
        }
      });
    });
  } else {
    var s = pathArr.split(/[\/\\]/gi);
    var filename = s[s.length - 1].match(/.+(?=\.)/);
    files[filename] = pathArr;
  }
  return files;
}