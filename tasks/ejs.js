var gulp = require("gulp");
var ejs = require("gulp-ejs");
var plumber = require("gulp-plumber");
var notify = require('gulp-notify');
var cached = require('gulp-cached');
var rename = require('gulp-rename');
// var prettify = require('gulp-prettify');
// var htmlhint = require("gulp-htmlhint");
var htmlbeautify = require('gulp-html-beautify');
var gutil    = require('gulp-util');

module.exports = function(paths, browserSync){
  gutil.log(gutil.colors.magenta('开始加载html模块'));
  return gulp.src(
      [paths.src.html + "/*.ejs", '!' + paths.src.html +"/_*.ejs"]
      )
      .pipe(cached('ejs'))
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(ejs())
      .pipe(rename({
          extname: '.html'
      }))
      // .pipe(prettify({indent_size: 2}))
      .pipe(htmlbeautify({
        "indentSize": 2,
        "indent_char":" ",
        "indent_with_tabs": true,
        "preserve_newlines": false
      }))
      .pipe(gulp.dest(paths.dest.html))
      .on('end', function(){
          gutil.log(gutil.colors.magenta('ejs 编译完成'));
      });
      // return gulp.src(
      //     [paths.src.html + "/*.ejs", '!' + paths.src.html +"/_*.ejs"]
      //     )
      //     .pipe(cache('ejs'))
      //     .on('error', function(err) {
      //       gutil.log('ejs Error!', err.message);
      //       this.end();
      //     })
      //     .pipe(ejs())
      //     .pipe(rename({
      //         extname: '.html'
      //     }))
      //     // .pipe(prettify({
      //     //   // "indent": 2,
      //     //   // "preserve_newlines": false,
      //     //   "contense": true
      //     // }))
      //     .pipe(gulp.dest(paths.dest.html));
};
