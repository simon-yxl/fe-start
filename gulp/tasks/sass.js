/**
 * -------------------------------
 * @file        sass.js
 * @description sass编译
 * @date        2017-02-21
 * -------------------------------
 */
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var sourcemaps   = require('gulp-sourcemaps');
var header       = require('gulp-header');
var gutil        = require('gulp-util');
var cached       = require('gulp-cached');

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器
 */
module.exports = function(PATHS, CONFIG, browserSync){
  // 获取package.json对象
  const PKG = require(PATHS.ROOT+'package.json');
  // sass编译
  return sass(PATHS.BEFORE.CSS + '**/**/*.scss',{
          sourcemap: false,
          precision: 6,           // sass中计算精度
          // stopOnError: true,   // 错误是否忽略继续编译
          style: "compressed"    // 压缩css
      })
      .pipe(cached('sass'))
      .on('error', sass.logError)
      .pipe(autoprefixer({
          browsers: ['ios >= 6', 'android >= 4.0']
      }))
      .pipe(sourcemaps.write())
      .pipe(header(PKG.banner,{pkg: PKG}))
      .pipe(size({title: 'styles',gzip: true}))
      .pipe(gulp.dest(PATHS.AFTER.CSS))
      .pipe(browserSync.stream())
      .on('end', function(){
          gutil.log(gutil.colors.magenta('sass 编译完成'));
      });
};
