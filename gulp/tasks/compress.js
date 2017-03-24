/**
 * -------------------------------
 * @file        compress.js
 * @description js压缩
 * @date        2017-03-02
 * -------------------------------
 */
const gulp = require('gulp');
const Q = require('q'); // promise功能
const size = require('gulp-size'); // 计算文件大小
const header = require('gulp-header'); //添加文件头信息
const plumber = require('gulp-plumber'); //添加文件头信息
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
// const sourcemaps = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const rename = require('gulp-rename'); // 文件重命名
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = utils.global.config(); // 获取全局配置文件
const PKG = require(CONFIG.root + 'package.json'); // 获取package.json对象

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @return {object} gulp流
 */
module.exports = (browserSync, watchTask, filename) => {

	// js压缩流
	const compress = (file) => {
		let gulpQ = Q(gulp.src([file, '!' + CONFIG.compress.assets + '**/**/*.min.js'])
			.pipe(cached('compress')));

		// 如果开发模式
		// if (CONFIG.debug) {
		// 	gulpQ = gulpQ.then((s) => {
		// 		return s.pipe(sourcemaps.init({
		// 			loadMaps: CONFIG.debug
		// 		}))
		// 	})
		// }

		gulpQ = gulpQ.then((s) => {
			return s.pipe(plumber({
					errorHandler: utils.handleError
				}))
		}).then((s) => {
			return utils.stream.uglify(s);
		}).then((s) => {
			return s.pipe(header(PKG.banner, {
					pkg: PKG
				})) // 添加头部版权
				.pipe(rename({
					suffix: CONFIG.compress.suffix
				}))
				.pipe(size({
					title: 'js文件压缩后：',
					gzip: true
				}))
		})

		// 如果开发模式
		// if (CONFIG.debug) {
		// 	gulpQ = gulpQ.then((s) => {
		// 		return stream.sourcemaps(s, CONFIG.compress.src);
		// 	})
		// }

		let gulpStream = null;
		gulpQ.then((s) => {
				gulpStream = s.pipe(gulp.dest(CONFIG.compress.assets))
					.pipe(utils.through(function () {
						browserSync.reload();
					}))
			})
			.done();
		return gulpStream;
	}
	return utils.exeTask(compress, 'compress', watchTask, filename);
};
