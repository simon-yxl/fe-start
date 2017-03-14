/**
 * -------------------------------
 * @file        sourcemaps.js
 * @description sourcemaps功能配置
 * @date        2017-03-14
 * -------------------------------
 */
const sourcemaps = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const requireDir = require('require-dir');
const CONFIG = requireDir('../global').config(); // 获取全局配置文件

/**
 * @function
 * @param {object} stream gulp流
 * @param {string} sourceRoot 生成sourcemap文件的目录
 */
module.exports = (stream, sourceRoot) => {
	return stream.pipe(sourcemaps.write('maps', {
					addComment: CONFIG.debug,
					includeContent: false,
					sourceRoot: sourceRoot
				}))
}