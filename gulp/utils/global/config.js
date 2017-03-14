/**
 * -------------------------------
 * @file        config.js
 * @public      公共
 * @description 全局配置控制
 * @date        2017-03-14
 * -------------------------------
 */

/**
 * @function
 */
module.exports = function(){
	var CONFIG = global.CONFIG;
  if(!CONFIG) {
    global.CONFIG = CONFIG = require('../../config/config');
  }
  return CONFIG;
}