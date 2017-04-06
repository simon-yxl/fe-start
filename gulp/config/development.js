/**
 * -------------------------------
 * @file        development.js
 * @description 开发环境配置文件
 * @date        2017-04-06
 * -------------------------------
 */
const CONFIG = require('./defaults');

module.exports = Object.assign(CONFIG, {
  // 如果 debug 为true，则开启本地调试模式，默认为false
  "debug": true
})
