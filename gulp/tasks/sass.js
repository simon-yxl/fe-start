/**
 * -------------------------------
 * @file        sass.js
 * @description sass编译
 * @date        2017-03-01
 * -------------------------------
 */
const gulp = require('gulp'); //gulp
const sass = require('gulp-sass'); // sass编译
const plumber = require('gulp-plumber'); //添加文件头信息
const autoprefixer = require('gulp-autoprefixer'); // 自动不起css3前缀
const size = require('gulp-size'); // 计算文件大小
const header = require('gulp-header'); //添加文件头信息
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const path = require('path'); //获取路径相关
const Q = require('q'); // promise功能
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const stream = utils.stream;

require('dotenv').config();
const CONFIG = require(path.join(process.env.INIT_CWD, process.env.GULP_CONFIG || process.env.GULP_DEV)); // 获取全局配置文件
const PKG = require(path.join(CONFIG.root, 'package.json')); // 获取package.json对象

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = (browserSync, watchTask, filename) => {

	// sass编译
	const compile = (file) => {
		const cssRoot = path.resolve(CONFIG.sass.src, '../');

		let gulpQ = Q(gulp.src(file)
				.pipe(cached('sass'))
				.pipe(plumber({
          errorHandler: utils.handleError
        }))
			);
			// sass(file, {
			// 		sourcemap: CONFIG.debug,
			// 		trace: true,
			// 		precision: 6, // sass中计算精度
			// 		// stopOnError: true,   // 错误是否忽略继续编译
			// 		style: "compressed", // 压缩css
			// 		emitCompileError: true, // 编译出错时，允许一个gulp报错
			// 		loadPath: [cssRoot + '/core', cssRoot + '/module'] //查找文件根目录
			// 	})


		// 如果开发模式
		if (CONFIG.debug){
			gulpQ = gulpQ.then((s) => {
				return stream.sourcemaps(s, '', true);
			})
		}

		gulpQ = gulpQ.then((s) => {
			return s.pipe(sass(
					{
						sourceMap: CONFIG.debug,
						precision: 6, // sass中计算精度
						outputStyle: 'compressed',
						includePaths: [cssRoot + '/core', cssRoot + '/module'] //查找文件根目录
					}
				).on('error', sass.logError))
				.pipe(autoprefixer({
					browsers: CONFIG.sass.autoprefixer.browsers
				}))
				.pipe(header(PKG.banner, {
					pkg: PKG
				}));
		})

		// 添加依赖的任务处理，例如 base64
		const dependent = CONFIG.sass.dependent;
		if (dependent && dependent.length > 0) {
			dependent.forEach((task) => {
				gulpQ = gulpQ.then((s) => {
					return stream[task](s);
				})
			})
		}

		// 如果开发模式
		if (CONFIG.debug){
			gulpQ = gulpQ.then((s) => {
				return stream.sourcemaps(s, CONFIG.sass.assets);
			})
		}

		var gulpStream = null;
		gulpQ.then((s) => {
			gulpStream = s.pipe(size({
						title: 'styles',
						gzip: true
					}))
					.on('error', utils.handleError)
					.pipe(gulp.dest(CONFIG.sass.assets))
					.pipe(browserSync.stream())
					.pipe(utils.through());
			})
			.done();

		return gulpStream;
	}
	return utils.exeTask(compile, 'sass', watchTask, filename);

};
