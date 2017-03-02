/**
 * -------------------------------
 * @file        sass.js
 * @description sass编译
 * @date        2017-03-01
 * -------------------------------
 */
const gulp = require('gulp');
const sass = require('gulp-ruby-sass'); // sass编译
const autoprefixer = require('gulp-autoprefixer'); // 自动不起css3前缀
const size = require('gulp-size'); // 计算文件大小
const sourcemaps = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const header = require('gulp-header'); //添加文件头信息
const gutil = require('gulp-util'); //打印日志，获取参数变量等
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const notify = require('gulp-notify'); //通知
const prompt = require('prompt'); // 输入提示进行下一步

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 */
module.exports = function (PATHS, CONFIG, browserSync) {
	// 获取package.json对象
	const PKG = require(PATHS.ROOT + 'package.json');

	// sass编译
	var compile = (file) => {
		return sass(file, {
			sourcemap: false,
			precision: 6,           // sass中计算精度
			// stopOnError: true,   // 错误是否忽略继续编译
			style: "compressed",    // 压缩css
			emitCompileError: true,
			loadPath: ['./' + PATHS.BEFORE.CSS + 'core', './' + PATHS.BEFORE.CSS + 'module'] //查找文件根目录
		})
			.on('error', function (err) { // 打印日志
				notify.onError({
					title: 'Error!',
					message: '<%= error.message %>',
					sound: 'Beep'
				})(err);
				this.emit('end');
			})
			.pipe(cached('sass'))
			.pipe(autoprefixer({
				browsers: ['ios >= 6', 'android >= 4.0']
			}))
			.pipe(sourcemaps.write())
			.pipe(header(PKG.banner, { pkg: PKG }))
			.pipe(size({ title: 'styles', gzip: true }))
			.pipe(gulp.dest(PATHS.AFTER.CSS))
			.pipe(browserSync.stream())
			.pipe(notify({ // 编译完成
				title: 'SASS',
				subtitle: 'success!',
				message: 'Sass task complete！'
			}));
	}
	var _watch = 'no';

	if (_watch == 'watch') {
		return compile(PATHS.BEFORE.CSS + '**/**/*.scss');
	} else {
		prompt.start();
		var sassStream = null;
		prompt.get([{
			name: 'filename',
			description: '输入需要编译的 sass 文件名，为空时编译全部'
		}], function (err, result) {
			if (result.filename) {
				sassStream = compile(PATHS.BEFORE.CSS + '**/**/' + result.filename);
			} else {
				sassStream = compile(PATHS.BEFORE.CSS + '**/**/*.scss');
			}
		});
		// if(sassStream){
		return sassStream;
		// }
	}

};
