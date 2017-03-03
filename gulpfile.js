/**
 * -------------------------------
 * @file        gulpfile.js
 * @description gulp配置文件，各种任务开关
 * @date        2017-02-21
 * -------------------------------
 */
const gulp          = require('gulp');
const gulpSequence  = require('gulp-sequence');
const browserSync   = require('browser-sync').create();
const taskObj       = require('require-dir')('./gulp/tasks');

// 基本配置目录
const CONFIG_DIR = './gulp/config/';
// 基本项目配置
const CONFIG_OBJ = require(CONFIG_DIR + 'config');
// 目录配置
const PATHS_OBJ = require(CONFIG_DIR + 'path');

/**
 * @method      watch
 * @description 监控文件变化执行相应的任务
 * @param {object} PATHS_OBJ 路径对象
 * @param {object} CONFIG_OBJ 基础配置参数对象
 * @param {object} browserSync 异步浏览器
 */
gulp.task('watch', () => {
   return taskObj.watch(PATHS_OBJ, CONFIG_OBJ, browserSync);
});

/**
 * @method      sass
 * @description sass编译
 * @param {object} PATHS_OBJ 路径对象
 * @param {object} CONFIG_OBJ 基础配置参数对象
 * @param {object} browserSync 异步浏览器
 */
gulp.task('sass',() => {
    return taskObj.sass(PATHS_OBJ, CONFIG_OBJ, browserSync);
});

/**
 * @method      uglify
 * @description js文件压缩
 * @param {object} PATHS_OBJ 路径对象
 * @param {object} CONFIG_OBJ 基础配置参数对象
 * @param {object} browserSync 异步浏览器
 */
gulp.task('uglify',() => {
    return taskObj.uglify(PATHS_OBJ, CONFIG_OBJ, browserSync);
});

/**
 * @method      imagemin
 * @description 图片压缩
 * @param {object} PATHS_OBJ 路径对象
 * @param {object} CONFIG_OBJ 基础配置参数对象
 * @param {object} browserSync 异步浏览器
 */
// gulp.task('imagemin', function(){
//     return taskObj.imagemin(PATHS_OBJ, CONFIG_OBJ);
// });


// global.buildVersion = process.env.VERSION;


//

//
// // javascript 压缩
// gulp.task('compress', function() {
//     return taskObj.compress(paths, browserSync);
// });
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
// // webpack 打包
// gulp.task('webpack:pack', function() {
//   return taskObj.pack(paths, browserSync);
// });

//retina
// gulp.task('retina', function(){
//    return taskObj.retina(paths);
// });
