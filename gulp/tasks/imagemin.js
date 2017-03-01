/**
 * -------------------------------
 * @file        imagemin.js
 * @description 图片压缩
 * @date        2017-02-27
 * -------------------------------
 */
var gulp         = require('gulp');
var tinypng      = require('gulp-tinypng-compress'); //图片压缩
var size         = require('gulp-size'); // 计算文件大小
var cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
var gutil        = require('gulp-util'); //打印日志，获取参数变量等
var notify       = require('gulp-notify'); //通知

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 */
module.exports = function(PATHS, CONFIG) {
    // const paths = PATHS;
    const file = gutil.env['file'];
    var mini = (path, file) => {
      return gulp.src(PATHS.BEFORE.IMAGE)
          .pipe(cached('imagemin'))
          .pipe(size({title: 'images 压缩前'}))
          .pipe(tinypng({
              key: CONFIG.TINYPNG_API_KEY,
              sigFile: PATHS.BEFORE.IMAGE + '/.tinypng-sigs',
              log: true
          }))
          .on('error', (err) => {
            gutil.log(gutil.colors.red(err));
          })
          .pipe(size({title: 'images',gzip: true}))
          .pipe(gulp.dest(PATHS.AFTER.IMAGE))
          .on('end', function(){
            gutil.log(gutil.colors.green(file), gutil.colors.magenta('图片压缩完成'));
          });
    }
    const suffix = '.{jpg,png,gif,jpeg,PNG,JPG,GIF}';
    if (file) {
      if(/(\.png|\.PNG|\.JPG|\.jpeg|\.jpg|\.gif)$/g.test(file)){
        return mini(PATHS.BEFORE.IMAGE + file);
      }else{
        return mini(PATHS.BEFORE.IMAGE + file + suffix);
      }
    } else {
      return mini(PATHS.BEFORE.IMAGE + '**/*' + suffix);
    }
};