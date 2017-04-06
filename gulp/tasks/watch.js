/**
 * -------------------------------
 * @file        watch.js
 * @description 监控任务
 * @date        2017-03-03
 * -------------------------------
 */
const gulp        = require('gulp');
const path        = require('path');
const requireDir = require('require-dir');
const taskObj = requireDir('./');
const CONFIG = require(path.join(process.env.INIT_CWD, process.env.GULP_CONFIG || 'development')); // 获取全局配置文件
/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 */
module.exports = (browserSync) => {
  // 启动服务   API: //www.browsersync.io/docs/options/
  browserSync.init({
    // proxy: '//10.168.0.151:4000',      // 代理配置
    // serveStatic: ['./'],               // 配置代理服务器得本地路径 可替换线上资源
    server: {
      baseDir: CONFIG.server.baseDir,                      // 配置目录
      directory: CONFIG.server.directory                     // 是否显示文件目录
    },
    open: 'external',                     // 此配置 按照本地IP打开(需要连网)
    startPath: './',
    port: CONFIG.server.port
  });

  // HTML文件改变，刷新页面
  gulp.watch(CONFIG.root + "*.{html,htm}", () => {
    browserSync.reload();
  });
  //
  // // sass文件变更触发自动编译
  gulp.watch(CONFIG.sass.src + '**/*.{'+CONFIG.sass.ext.join(',').toLowerCase()+'}', (event) => {
    return taskObj.sass(browserSync, event);
  });
  //
  // // js文件自动打包
  gulp.watch(CONFIG['pack:js'].src + '**/*.js', function (event){
    return taskObj.pack(browserSync, event);
  });

  // 监控图片变化，自动压缩
  // gulp.watch(CONFIG.images.src + '**/*.{'+CONFIG.images.ext.join(',').toLowerCase()+'}', function(event){
  //   return taskObj.imagemini(CONFIG, browserSync, event);
  // });
};
