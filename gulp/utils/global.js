/**
 * -------------------------------
 * @file        global.js
 * @public      公共
 * @description 全局配置文件指向
 * @date        2017-03-15
 * -------------------------------
 */

/**
 * @function
 * @return {object}
 */
module.exports = {
  'config': () => {
    var CONFIG = global.CONFIG;
    if(!CONFIG) {
      global.CONFIG = CONFIG = require('../config/config');
    }
    return CONFIG;
  }
}