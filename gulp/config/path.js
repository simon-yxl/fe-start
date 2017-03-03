/**
 * -------------------------------
 * @file        path.js
 * @description 编译前后路径配置
 * @date        2017-02-21
 * -------------------------------
 */

// 获取项目跟目录
const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

module.exports = {
  // 根目录
  "ROOT": ROOT+'/',
  // 编译前路径
  "BEFORE":{
    CSS:'src/sass/app/',
    JS:'src/scripts/js/',
    IMAGE:'src/images/',
    SPRITE:'src/sprites/',
    VIEW:'src/views/app/'
  },
  // 编译后路径
  "AFTER":{
    CSS:'assets/css/',
    JS:'assets/js/',
    IMAGE:'assets/images/',
    SPRITE:'assets/images/',
    VIEW:''
  }
}
