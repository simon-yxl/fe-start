'use strict';
var gulp        = require('gulp');
var path        = require('path');
var fs          = require('fs');
var gutil       = require('gulp-util');
var webpack     = require('webpack-stream');

module.exports = function(paths, browserSync, ev) {
  function getEntry(pathArr) {
    var files = {};
    if(pathArr instanceof Array){
      pathArr.forEach(function(item){
        let jsPath = path.normalize(item);
        let dirs = fs.readdirSync(jsPath);
        let matchs = [];
        dirs.forEach(function(file) {
          matchs = file.match(/(.+)\.js$/);
          if (matchs) {
            files[matchs[1]] = path.resolve(jsPath, file);
          }
        });
      });
    } else {
      var s = pathArr.split(/[\/\\]/gi);
      var filename = s[s.length - 1].match(/.+(?=\.)/);
      files[filename] = pathArr;
    }
    return files;
  }
  var webpackConfig = {
    entry: getEntry([paths.src.js]),
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
      extensions: ['', '.js', '.json']
    },
    externals: {
      zepto: 'Zepto'
    }
  };

  // console.log(paths.ROOT + '/' + paths.JS);
  return gulp.src(paths.src.js)
    .pipe(webpack(webpackConfig))
    .on('error', function(err) {
      gutil.log(gutil.colors.red(err.message));
      this.emit('end', 'webpack 编译错误');
    })
    .pipe(gulp.dest(paths.dest.js))
    .on('end', function(e) {
      browserSync.reload();
    });
};
