/**
 * -------------------------------
 * @file        watch.js
 * @description 监控任务
 * @date        2017-03-03
 * -------------------------------
 */
const gulp        = require('gulp');
const taskObj     = require('require-dir')('./');
// const gutil       = require('gulp-util');
// const iconv       = require('gulp-iconv');

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 */
module.exports = function(PATHS, CONFIG, browserSync){
  // 启动服务   API: //www.browsersync.io/docs/options/
  browserSync.init({
    // proxy: '//10.168.0.151:4000',      // 代理配置
    // serveStatic: ['./'],               // 配置代理服务器得本地路径 可替换线上资源
    server: {
      baseDir: "./",                      // 配置目录
      directory: true                     // 是否显示文件目录
    },
    open: 'external',                     // 此配置 按照本地IP打开(需要连网)
    startPath: './',
    port: 8654
  });

  // sass文件变更触发自动编译
  gulp.watch(PATHS.BEFORE.CSS + '**/*.scss', function(event){
    return taskObj.sass(PATHS, CONFIG, browserSync, event);   
  });
};
