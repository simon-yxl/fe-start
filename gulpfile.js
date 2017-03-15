/**
 * -------------------------------
 * @file        gulpfile.js
 * @description gulp配置文件，各种任务开关（共有和私有）
 * @date        2017-03-15
 * -------------------------------
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const requireDir = require('require-dir');
const taskObj = requireDir('./gulp/tasks');
const utils = requireDir('./gulp/utils');
/**
 * @method      watch
 * @public
 * @description 监控文件变化执行相应的任务
 * @param {object} browserSync 异步浏览器
 */
gulp.task('watch', () => {
    return taskObj.watch(browserSync);
});

/**
 * @method      sass
 * @public
 * @description sass编译
 * @param {object} browserSync 异步浏览器
 */
gulp.task('sass', () => {
    return utils.handleEnter(taskObj.sass, [browserSync]);
});

/**
 * @method      prv_sass
 * @private     私有
 * @description sass编译
 * @param {object} browserSync 异步浏览器
 */
gulp.add('prv_sass', () => {
    return taskObj.sass(browserSync);
});


/**
 * @method      compress
 * @public
 * @description js文件压缩
 * @param {object} browserSync 异步浏览器
 */
gulp.task('compress', () => {
    return utils.handleEnter(taskObj.compress, [browserSync]);
});

/**
 * @method      prv_compress
 * @private     私有
 * @description 所有js文件压缩
 * @param {object} browserSync 异步浏览器
 */
gulp.task('prv_compress', () => {
    return taskObj.compress(browserSync);
});

/**
 * @method      webpack打包
 * @public
 * @description 文件打包
 * @param {object} browserSync 异步浏览器
 */
gulp.task('pack', function() {
  return utils.handleEnter(taskObj.pack, [browserSync]);
});

/**
 * @method      prv_pack
 * @private     私有
 * @description 所有文件打包
 * @param {object} browserSync 异步浏览器
 */
gulp.task('prv_pack', function() {
  return taskObj.pack(browserSync);
});

/**
 * @method      imagemini
 * @public
 * @description 图片压缩
 * @param {object} browserSync 异步浏览器
 */
gulp.task('imagemini', () => {
    return utils.handleEnter(taskObj.imagemini, [browserSync]);
})

/**
 * @method      base64
 * @public
 * @description 图片base64转码
 * @param {object} browserSync 异步浏览器
 */
gulp.task('base64', () => {
    return utils.handleEnter(taskObj.base64, [browserSync]);
})

/**
 * @method      ejs
 * @public
 * @description ejs文件编译
 * @param {object} browserSync 异步浏览器
 */
gulp.task('ejs', () => {
    // return utils.handleEnter(taskObj.ejs, [browserSync]);
})

/**
 * @method      iconfont
 * @public
 * @description 生成字体图标
 * @param {object} browserSync 异步浏览器
 */
gulp.task('iconfont', () => {
    // return utils.handleEnter(taskObj.iconfont, [browserSync]);
})

/**
 * @method      book
 * @public
 * @description 生成目录预览文件
 * @param {object} browserSync 异步浏览器
 */
gulp.task('book', () => {
    // return utils.handleEnter(taskObj.book, [browserSync]);
})

/**
 * @method      sprites
 * @public
 * @description 生成精灵图
 * @param {object} browserSync 异步浏览器
 */
gulp.task('sprites', () => {
    // return utils.handleEnter(taskObj.sprites, [browserSync]);
})

/**
 * @method      ftp
 * @public
 * @description ftp上传，上传相应文件到测试服务器
 * @param {object} browserSync 异步浏览器
 */
gulp.task('ftp', () => {
    // return utils.handleEnter(taskObj.ftp, [browserSync]);
})

/**
 * @method      CDN
 * @public
 * @description CDN地址替换，替换所有的本地地址为cdn地址
 * @param {object} browserSync 异步浏览器
 */
gulp.task('CDN', () => {
    // return utils.handleEnter(taskObj.CDN, [browserSync]);
})

/**
 * @method      build
 * @public
 * @description 项目构建，生成开发需要的前端页面
 * @param {object} browserSync 异步浏览器
 */
gulp.task('build', () => {
    // return utils.handleEnter(taskObj.build, [browserSync]);
})