/**
 * -------------------------------
 * @file        sass.js
 * @description sass编译
 * @date        2017-03-01
 * -------------------------------
 */
const gulp         = require('gulp'); //gulp
const sass         = require('gulp-ruby-sass'); // sass编译
const base64 = require('gulp-base64'); // 图片转base64
const autoprefixer = require('gulp-autoprefixer'); // 自动不起css3前缀
const size         = require('gulp-size'); // 计算文件大小
const sourcemaps   = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const header       = require('gulp-header'); //添加文件头信息
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const path         = require('path'); //获取路径相关
const utils        = require('require-dir')('../utils');

/**
 * @function
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = function (CONFIG, browserSync, watchTask, filename) {
	// 获取package.json对象
	const PKG = require(CONFIG.root + 'package.json');
	// 需要转base64的图片格式
	const reg = new RegExp("\.("+CONFIG.base64.ext.join("|")+")#"+CONFIG.base64.suffix, "i");
	// sass编译
	var compile = (file) => {
		const cssRoot = path.resolve(CONFIG.css.src, '../');
		return sass(file, {
				sourcemap: CONFIG.debug,
				trace: true,
				precision: 6, // sass中计算精度
				// stopOnError: true,   // 错误是否忽略继续编译
				style: "compressed", // 压缩css
				emitCompileError: true, // 编译出错时，允许一个gulp报错
				loadPath: [cssRoot + '/core', cssRoot + '/module'] //查找文件根目录
			})
			.pipe(base64({
        // baseDir: 'assets',
        extensions: [reg],
        exclude:    CONFIG.base64.exclude,
        maxImageSize: CONFIG.base64.maxImageSize*1024, // bytes 
        debug: CONFIG.debug
      }))
			.pipe(cached('sass'))
			.pipe(autoprefixer({
				browsers: CONFIG.css.autoprefixer.browsers
			}))
			.pipe(header(PKG.banner, {
				pkg: PKG
			}))
			.pipe(size({
				title: 'styles',
				gzip: true
			}))
			.pipe(sourcemaps.write('maps', {
				addComment: CONFIG.debug,
				includeContent: false,
				sourceRoot: CONFIG.css.assets
			}))
			.on('error', utils.handleError)
			.pipe(gulp.dest(CONFIG.css.assets))
			.pipe(browserSync.stream())
			.pipe(utils.through());
	}

	return utils.exeTask(compile, CONFIG.css, watchTask, filename);

};