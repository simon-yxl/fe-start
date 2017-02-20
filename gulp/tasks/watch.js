// watch 任务
var gulp    = require('gulp');
// var merge   = require('merge-stream');
var pkg     = require('../package.json');

module.exports = function(paths, browserSync){
  // 启动服务   API: http://www.browsersync.io/docs/options/
  browserSync.init({
    // proxy: 'http://www.uis.cc:4000',       // 代理配置
    // serveStatic: ['./'],                   // 配置代理服务器得本地路径 可替换线上资源
    server: {
      baseDir: "./",                      // 配置目录
      directory: true                     // 是否显示文件目录
    },
    open: 'external',                       // 此配置 按照本地IP打开(需要连网)
    startPath: './',
    port: 8655
  });

  var ejs = gulp.watch(paths.src.html + '../**/*.ejs', ['ejs']);

  var html = gulp.watch("*.{html,htm}", function(){
    browserSync.reload();
  });
  gulp.watch(paths.src.css + '../**/*.scss', ['sass']);
  // // gulp.watch(paths.src.js + '../**/*.js' , ['babel']);
  gulp.watch(paths.src.js + '../**/*.js' , ['webpack:pack']);
  // merge(ejs, html);
};
