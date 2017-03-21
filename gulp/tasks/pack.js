/**
 * -------------------------------
 * @file        pack.js
 * @description 文件打包
 * @date        2017-03-14
 * -------------------------------
 */
const gulp = require('gulp');
const Q = require('q'); // promise功能
const gutil = require('gulp-util');
const header = require('gulp-header'); //添加文件头信息
const plumber = require('gulp-plumber'); //添加文件头信息
const cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const sourcemaps = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const size = require('gulp-size'); // 计算文件大小
const rename = require('gulp-rename'); // 文件重命名
const webpack = require('webpack-stream');
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = utils.global.config(); // 获取全局配置文件
const PKG = require(CONFIG.root + 'package.json'); // 获取package.json对象

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @param {string} filename 文件名
 */
module.exports = (browserSync, watchTask, filename) => {
  var enrties = utils.getEntry('pack', filename);
  console.log(enrties);
  if (enrties) {
    var webpackConfig = {
      entry: enrties,
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
          // ,
          // {
          //   test: /\.js$/,
          //   exclude: /node_modules/,
          //   loader: 'eslint-loader'
          // }
        ]
      },
      resolve: {
        extensions: CONFIG.pack.ext.js
      },
      devtool: CONFIG.debug ? 'cheap-module-source-map' : '',
      externals: {
        zepto: 'Zepto'
      }
    };

    var packStream = () => {
      var gulpQ = Q(gulp.src(CONFIG.pack.src.js)
        .pipe(cached('pack'))
        .pipe(plumber({
          errorHandler: utils.handleError
        }))
        .pipe(webpack(webpackConfig)));

      var gulpStream = null
      gulpQ = gulpQ.then((s) => {
          return s.pipe(header(PKG.banner, {
              pkg: PKG
            }))
            .pipe(gulp.dest(CONFIG.pack.assets.js))    
        }).then((s) => {
          gulpStream = utils.stream.uglify(s)
          .pipe(rename({
            suffix: CONFIG.compress.suffix
          }))
          .pipe(gulp.dest(CONFIG.pack.assets.js))
          .pipe(utils.through(function () {
              browserSync.reload();
            }))
        })
        .done();
      return gulpStream;

    }
    return packStream();
  }
};