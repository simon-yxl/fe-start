/**
 * -------------------------------
 * @file        stream.js
 * @description gulp公共流操作
 * @date        2017-03-15
 * -------------------------------
 */

const base64 = require('gulp-base64'); // 图片转base64
const path = require('path');
const sourcemaps = require('gulp-sourcemaps'); // sourcemaps功能
const uglify = require('gulp-uglify'); // js压缩
const CONFIG = require(path.join(process.env.INIT_CWD, process.env.GULP_CONFIG || 'development')); // 获取全局配置文件
/**
 * @function
 * @param {object} stream gulp流
 * @return {object}
 */
module.exports = {
  /**
   * @function base64
   * @param {object} stream gulp流
   */
  base64(stream) {
    // 需要转base64的图片格式
    const reg = new RegExp("\.("+CONFIG.base64.options.ext.join("|")+")#"+CONFIG.base64.options.suffix, "i");
    return stream.pipe(base64({
          // baseDir: 'assets',
          extensions: [reg],
          exclude:CONFIG.base64.options.exclude,
          maxImageSize: CONFIG.base64.options.maxImageSize*1024, // bytes
          debug: CONFIG.debug
        }))
  },
  /**
   * @function sourcemaps
   * @param {object} stream gulp流
   * @param {string} sourceRoot 生成sourcemap文件的目录
   */
  sourcemaps(stream, sourceRoot, init){
    if(init) {
      return stream.pipe(sourcemaps.init());
    } else {
      return stream.pipe(sourcemaps.write('maps', {
					addComment: CONFIG.debug,
					includeContent: false,
					sourceRoot: sourceRoot
				}))
    }
  },
  /**
   * @function uglify
   * @param {object} stream gulp流
   */
  uglify(stream){
    return stream.pipe(uglify({
					output: {
						ascii_only: true
					}, // 将中文转为unicode编码
					compress: {
						drop_console: true
					} // 扔掉console调试语句
				}));
  }
}
