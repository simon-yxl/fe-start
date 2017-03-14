// /**
//  * -------------------------------
//  * @file        pack.js
//  * @description 文件打包
//  * @date        2017-03-14
//  * -------------------------------
//  */
// const gulp = require('gulp');
// const path        = require('path');
// const fs          = require('fs');
// const gutil       = require('gulp-util');
// const webpack     = require('webpack-stream');

// /**
//  * @function
//  * @param {object} browserSync 异步浏览器控制
//  * @param {object} watchTask watch任务
//  * @param {string} filename 文件名
//  */
// module.exports = (browserSync, watchTask, filename) => {
//   var paths = config.paths;
//   var watchPaths = [paths.SCRIPTS, paths.UI_SCRIPTS];
//   // var file = gutil.env['file'];
//   // 获取webpack入口文件对象函数
//   function getEntry(pathArr) {
//     var files = {};
//     if(pathArr instanceof Array){
//       pathArr.forEach(function(item){
//         let jsPath = path.normalize(item);
//         let dirs = fs.readdirSync(jsPath);
//         let matchs = [];
//         dirs.forEach(function(file) {
//           matchs = file.match(/(.+)\.js$/);
//           if (matchs) {
//             files[matchs[1]] = path.resolve(jsPath, file);
//           }
//         });
//       });
//     } else {
//       var s = pathArr.split(/[\/\\]/gi);
//       var filename = s[s.length - 1].match(/.+(?=\.)/);
//       files[filename] = pathArr;
//     }
//     return files;
//   }

//   var needPaths = [];
//   if(ev && (ev.type == 'changed' || ev.type == 'added' || ev.type == 'deleted')){
//     if(ev.type == 'changed' || ev.type == 'added'){
//       watchPaths = ev.path;
//       needPaths = [ev.path];
//     } else {
//       return;
//     }
//   } else {
//     if(file){
//       needPaths = paths.SCRIPTS + (file.indexOf('.js') > 0 ? file : file +'.js');
//       watchPaths = paths.ROOT + needPaths;
//     } else {
//       watchPaths.forEach(function(item){
//         needPaths.push(item+'**/*.js');
//       });
//     }
//   }

//   var webpackConfig = {
//     entry: getEntry(watchPaths),
//     output: {
//       filename: '[name].js'
//     },
//     module: {
//       loaders: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           loader: 'babel-loader'
//         }
//       ]
//     },
//     resolve: {
//       extensions: ['', '.js', '.json']
//     },
//     externals: {
//       zepto: 'Zepto'
//     }
//   };

//   // 开启开发者模式，调试sass
//   if(config.project.dev) {
//     webpackConfig.devtool = 'source-map';
//   }

//   // console.log(paths.ROOT + '/' + paths.JS);

//   return gulp.src(needPaths)
//     .pipe(webpack(webpackConfig))
//     .on('error', function(err) {
//       gutil.log(gutil.colors.red(err.message));
//       this.emit('end', 'webpack 编译错误');
//     })
//     .pipe(gulp.dest(paths.JS))
//     .on('end', function(e) {
//       browserSync.reload();
//     });
// };
