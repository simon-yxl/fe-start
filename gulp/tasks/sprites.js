/**
 * -------------------------------
 * @file        sprites.js
 * @description 精灵图
 * @date        2017-03-03
 * -------------------------------
 */
var gulp         = require("gulp"); //gulp
// var spritesmith  = require("gulp.spritesmith"); //精灵图插件
// var fs           = require('fs'); // 文件操作插件
var gutil        = require('gulp-util'); //打印日志，获取参数变量等
// var buffer       = require('vinyl-buffer'); // buffer流转换
// var imagemin     = require('gulp-imagemin'); 
// var htmlbeautify = require('gulp-html-beautify');
// var Q            = require('q'); // promise插件
// var taskObj      = require('require-dir')('./'); 

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 * @param {object} watchTask watch任务
 */
module.exports = function(PATHS, CONFIG, browserSync){
  // var paths = config.paths;
  // var date = new Date();
  // var _dir = gutil.env['dir'];
  // var v = date.getFullYear()+""+(date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1)+""+(date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  // if(gutil.env.v) v = gutil.env.v;

  // var spriteData = function(filename, path, tap){
  //   var data = {
  //     cssName:'_'+filename+'.scss',
  //     cssFormat:'scss',
  //     cssTemplate:paths.ROOT+'gulp/lib/sprites.tpl.'+config.project.name+'.mustache',
  //     // cssOpts:'spriteSrc',
  //     // retinaSrcFilter:path+'/*@2x.png',
  //     imgName:filename+'.png',
  //     // retinaImgName:filename+'@2x.png',
  //     padding:10,
  //     imgPath:'#{$imgSrc}'+v+'/'+filename+'.png'
  //   };

  //   if(tap) {
  //     data.retinaSrcFilter = path+'/*@2x.png';
  //     data.retinaImgName = filename+'@2x.png';
  //   }
  //   return data;
  // }

  // if(!fs.existsSync(paths.SPRITES_IMG)){
  //   fs.mkdir(paths.SPRITES_IMG, function(isok){
  //     if(!isok){
  //       gutil.log(gutil.colors.cyan('帮您创建了个文件夹，路径：'+paths.SPRITES_IMG+'，赶紧放几张icon图片进去试试吧，记得以文件夹分组哦'));
  //     }else{
  //       gutil.log(gutil.colors.cyan('很遗憾，路径创建失败了，请在 \'src\' 目录下手动创建 \'sprites\' 文件夹用于存放图片'));
  //     }
  //   })
  //   return;
  // }

  // function preaddir(path, dir) {
  //   return Q.Promise(function(resolve, reject, notify) {
  //       fs.readdir(path, function(err, files){
  //         if(!err) {
  //           var matchs = {path:path, dir:dir, is:[], no:[], '@2x':[]};
  //           files.forEach(function(value){
  //             if(value.indexOf(dir) == 0){
  //               if(value.indexOf('@2x') > 0) {
  //                 matchs['@2x'].push(value);
  //               } else {
  //                 matchs.is.push(value);
  //               }
  //             } else {
  //               matchs.no.push(value);
  //             }
  //           });
  //           resolve(matchs);
  //         } else {
  //           reject(err);
  //         }
  //       })
  //   });
  // }
  // var spritesImg = function(dir){
  //   preaddir(paths.SPRITES_IMG+dir, dir).then(function(data){
  //     var isLen = data.is.length;
  //     var noLen = data.no.length;
  //     var dLen = data['@2x'].length;
  //     if(noLen > 0 && isLen <= 0){
  //       gutil.log(gutil.colors.red('ERROR:'+data.dir+'文件夹所有图片都不符合命名规范，生成精灵图失败！命名规范：文件夹名-自定义名称'));
  //       return;
  //     }
  //     if(isLen > 0){
  //       if(noLen > 0) {
  //         gutil.log(gutil.colors.yellow('WARN:'+data.dir+'文件夹下有部分图片部分图片不符合命名规范，请注意！分别是：'+data.no.join(',')));
  //       }

  //       var sprites = gulp.src(data.path+'/'+data.dir+'*.png').pipe(spritesmith(spriteData(data.dir, data.path, dLen)));
  //         sprites.img
  //         .on('error', function(err){
  //           gutil.log(gutil.colors.red(err));
  //         })
  //         .pipe(buffer())
  //         .pipe(imagemin())
  //         .pipe(gulp.dest(paths.MINI_IMG+v))
  //         .on('end', function(){
  //             gutil.log(gutil.colors.cyan('精灵图生成成功，路径：' + paths.MINI_IMG+v +'/'+data.dir+'.png'));
  //             if(dLen) {
  //               gutil.log(gutil.colors.cyan('2倍精灵图生成成功，路径：' + paths.MINI_IMG+v +'/'+data.dir+'@2x.png'));
  //             }

  //         });
  //         sprites.css
  //         .pipe(gulp.dest(paths.SPRITES_CSS))
  //         .on('end', function(){
  //             gutil.log(gutil.colors.cyan('sass文件生成成功，路径：' + paths.SPRITES_CSS+'_'+data.dir+'.scss'));

  //         });
  //     }
  //   })
  // }

  // if(_dir){
  //   spritesImg(paths.SPRITES_IMG + _dir);
  // } else {
  //   fs.readdir(paths.SPRITES_IMG, function(err, files){
  //     for(var i in files) {
  //       if(typeof files[i] == 'string') {
  //           if(/^([a-zA-Z]+\d*[-_]*[a-zA-Z]*\d*)([-_@]*[a-zA-Z0-9]*)*/g.test(files[i])) {
  //             spritesImg(files[i]);

  //           } else {
  //             gutil.log(gutil.colors.red(files[i]+'名称不符合规则，以字母开头，中间可以混合-、_、数字'));
  //           }
  //         }
  //       }
  //   })
  // }

}
