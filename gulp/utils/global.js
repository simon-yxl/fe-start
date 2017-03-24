/**
 * -------------------------------
 * @file        global.js
 * @public      公共
 * @description 全局配置文件指向
 * @date        2017-03-15
 * -------------------------------
 */
const path = require('path');

/**
 * @function
 * @return {object}
 */
module.exports = {
  'config': () => {
    let CONFIG = global.CONFIG;
    if(!CONFIG) {
      CONFIG = require('../config/config');
      // 路径格式化
      var pathNormalize = (obj) => {
        for(var k in obj){
          if(obj[k] instanceof Object){
            pathNormalize(obj);
          } else if(typeof obj[k] == 'string') {
            if(k.indexOf(['src', 'assets']) >= 0) {
              obj[k] = path.normalize(obj[k]);
            }
          }
        }
      }
      global.CONFIG = CONFIG;
    }

    return CONFIG;
  }
}
