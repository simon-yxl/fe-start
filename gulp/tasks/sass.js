/**
 * -------------------------------
 * @file        sass.js
 * @description sass编译
 * @date        2017-03-01
 * -------------------------------
 */
const gulp         = require('gulp');
const sass         = require('gulp-ruby-sass'); // sass编译
const autoprefixer = require('gulp-autoprefixer'); // 自动不起css3前缀
const size         = require('gulp-size'); // 计算文件大小
const sourcemaps   = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const header       = require('gulp-header'); //添加文件头信息
const gutil        = require('gulp-util'); //打印日志，获取参数变量等
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const notify       = require('gulp-notify'); //通知
const prompt       = require('prompt'); // 输入提示进行下一步
const path         = require('path'); //获取路径相关
const del          = require('del'); //删除文件

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = function (PATHS, CONFIG, browserSync, watchTask) {
	// 获取package.json对象
	const PKG = require(PATHS.ROOT + 'package.json');

	// sass编译
	var compile = (file) => {
		return sass(file, {
				sourcemap: CONFIG.debug,
				precision: 6,           // sass中计算精度
				// stopOnError: true,   // 错误是否忽略继续编译
				style: "compressed",    // 压缩css
				emitCompileError: true, // 编译出错时，允许一个gulp报错
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
			.pipe(header(PKG.banner, { pkg: PKG }))
			.pipe(size({ title: 'styles', gzip: true }))
			.pipe(sourcemaps.write('maps',{
				includeContent:false,
				sourceRoot:PATHS.AFTER.CSS
			}))
			.pipe(gulp.dest(PATHS.AFTER.CSS))
			.pipe(browserSync.stream())
			.pipe(notify({ // 编译完成
				title: 'SASS',
				subtitle: 'success!',
				message: 'Sass task complete！'
			}));
	}
  
	if (watchTask) { // 任务处于监控中
		// 文件被修改 or 新增
		if(watchTask.type == 'changed' || watchTask.type == 'added'){
			return compile(watchTask.path);
		} else if(watchTask.type == 'deleted') { //文件被删除
			var basename = path.basename(watchTask.path, path.extname(watchTask.path));
			var files = [
				PATHS.AFTER.CSS+basename+'.css',
				PATHS.AFTER.CSS+'maps/'+basename+'.css.map'
			]; 
			del(files).then(paths => {
					gutil.log(gutil.colors.red('Files and folders that would be deleted:\n' + paths.join('\n')));
			});
		}
	} else { // 单独使用sass编译命令时
		prompt.start();
		var sassStream = null;
		prompt.get([{
			name: 'filename',
			description: 'Enter sass filename, please.Deault all files, if it\'s empty'
		}], function (err, result) {
			if (result.filename) {
				sassStream = compile(PATHS.BEFORE.CSS + '**/**/' + result.filename);
			} else {
				sassStream = compile(PATHS.BEFORE.CSS + '**/**/*.scss');
			}
		});
		return sassStream;
	}

};
