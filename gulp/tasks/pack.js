/**
 * -------------------------------
 * @file        pack.js
 * @description 文件打包
 * @date        2017-03-14
 * -------------------------------
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber'); //添加文件头信息
const webpack = require('webpack-stream');
const requireDir = require('require-dir');
const utils = requireDir('../utils');
const CONFIG = utils.global.config(); // 获取全局配置文件

/**
 * @function
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 * @param {string} filename 文件名
 */
module.exports = (browserSync, watchTask, filename) => {
  var enrties = utils.getEntry('pack');
  if(enrties) {
    var webpackConfig = {
      entry: enrties,
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      resolve: {
        extensions: CONFIG.pack.ext.js
      },
      devtool:CONFIG.debug ? 'cheap-module-source-map' : '',
      externals: {
        zepto: 'Zepto'
      }
    };
    return gulp.src(CONFIG.pack.src.js)
    .pipe(webpack(webpackConfig))
    .pipe(plumber({
      errorHandler: utils.handleError
    }))
    .pipe(gulp.dest(CONFIG.pack.assets.js))
    .pipe(utils.through(function () {
						browserSync.reload();
					}))

  }
};