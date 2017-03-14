/**
 * -------------------------------
 * @file        streamBase64.js
 * @description base64公共流
 * @date        2017-03-14
 * -------------------------------
 */

const base64 = require('gulp-base64'); // 图片转base64
const requireDir = require('require-dir');
const CONFIG = requireDir('../global').config(); // 获取全局配置文件

/**
 * @function
 * @param {object} stream gulp流
 */
module.exports = (stream) => {
  // 需要转base64的图片格式
	const reg = new RegExp("\.("+CONFIG.base64.options.ext.join("|")+")#"+CONFIG.base64.options.suffix, "i"); 
	return stream.pipe(base64({
        // baseDir: 'assets',
        extensions: [reg],
        exclude:CONFIG.base64.options.exclude,
        maxImageSize: CONFIG.base64.options.maxImageSize*1024, // bytes 
        debug: CONFIG.debug
      }))
}