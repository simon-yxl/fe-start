/**
 * -------------------------------
 * @file        gulpfile.js
 * @description gulp配置文件，各种任务开关
 * @date        2017-02-21
 * -------------------------------
 */
const gulp = require('gulp');
const gulpSequence  = require('gulp-sequence'); // gulp任务执行顺序
const browserSync = require('browser-sync').create();
const requireDir = require('require-dir');
const taskObj = requireDir('./gulp/tasks');
const utils = requireDir('./gulp/utils'); // 工具类
const CONFIG = requireDir('./gulp/utils/global').config(); // 获取全局配置文件

/**
 * @method      watch
 * @public
 * @description 监控文件变化执行相应的任务
 * @param {object} CONFIG 基础配置参数对象
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
 * @method      webpack打包
 * @public
 * @description 文件打包
 * @param {object} browserSync 异步浏览器
 */
gulp.task('pack', function() {
  return utils.handleEnter(taskObj.pack, [browserSync]);
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

//
//
// // 清除构建任务
// gulp.task('clean',function(cb){
//     // return del('./build/*', cb);
// });
//
// // moveFile 移动文件
// gulp.task('moveFiles',function(){
//     return taskObj.movefiles(paths, browserSync);
// });
//
// // 发布任务
// gulp.task('build',function (cb){
//     // return gulpSequence(['browserify','sass'],['compress'],['moveFiles'], cb);
// });
//
// // 替换CDN连接
// gulp.task('replace', function () {
//     return taskObj.replace(paths, browserSync);
// });
//
//
// //生成项目目录
// gulp.task('book', function(){
//   return taskObj.book();
// })
//
// //ejs
// gulp.task('ejs', function(){
//    return taskObj.ejs(paths, browserSync);
// });
//
// //精灵图
// gulp.task('sprites', function(){
//    return taskObj.sprites(paths);
// });
//


//retina
// gulp.task('retina', function(){
//    return taskObj.retina(paths);
// });