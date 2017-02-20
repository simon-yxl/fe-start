// 移动文件
var gulp        = require('gulp');
var fs          = require('fs');
var del         = require('del');
var size        = require('gulp-size');
var gutil       = require('gulp-util');
var merge       = require('merge-stream');
var iconv       = require('gulp-iconv');
var prompt      = require('gulp-prompt');
var inquirer    = require('inquirer');
var BigNumber   = require('bignumber.js');
var pkg         = require('../package.json');
var task_images = require('./images');

module.exports = function(paths, browserSync, cb){

    var verson;                 // 版本号字符串
    var num;                    // 版本数组
    var dirList = [];           // 文件夹列表
    var path = './build';       // 构建目录
    var backupPath = './backup';       // 构建目录
    var build;                  // 存储当前任务构建路径
    var cssStream, jsStream, htmlStream, imgStream, resourcesStream;
    inquirer.prompt([
      {
        type: 'list',
        name: 'theme',
        message: '请选择您要转换的编码格式?',
        choices: [
          'gbk',
          'utf-8'
        ]
      }
    ]).then(function (answers) {
      // console.log(JSON.stringify(answers, null, '  '));
      // build 移动文件
      // var done = this.async();
      // console.log(this.async);
      // 判断是否已经创建 'build' 文件夹
      if(!fs.existsSync(path)) fs.mkdirSync(path);
      if(!fs.existsSync(backupPath)) fs.mkdirSync(backupPath);

      // 判断是否通过控制台传参 来启动自定义版本构建
      if(global.buildVersion){
          if(!/^\d+\.{1}\d+\.{1}\d+$/.test(global.buildVersion)){
              gutil.log(gutil.colors.magenta('任务失败 请正确传入参数 例：1.0.1'));
              return;
          }
          build = './build/v' + global.buildVersion;
          del.sync(build);            // 防止文件混乱 全部删掉

      } else {
          var files = fs.readdirSync(path);
          files.forEach(function(item, index, array) {
              var childPath = path + '/' + item;
              var stat = fs.statSync(childPath);
              if(stat.isDirectory()){
                  // 数组中存储 文件夹的路径 和 创建时间
                  dirList.push({path: childPath, btime: new Date(stat.birthtime).getTime()});
              }
          });
          // 按照创建时间排序
          dirList.sort(function(n1,n2){
              return n1.btime - n2.btime;
          });

          // 计算版本号
          if(dirList.length === 0) {
              verson = '1.0.1';
          } else {
              var verString = dirList[dirList.length - 1].path.replace(path + '/v','');
              var verArr = verString.split('.');
              var lastVerNum = verArr[verArr.length - 1];
              verArr[verArr.length - 1] = parseInt(lastVerNum,10) + 1;
              verson = verArr.join('.');
          }

          build = './build/v' + verson;
      }

      cssStream = gulp.src(paths.dest.css + '**/*.css')
          .pipe(iconv({
            encoding: answers.theme
            // encoding: 'gbk'
          }))
          .pipe(gulp.dest(build + '/assets/css/'));
      jsStream = gulp.src([paths.dest.js + '**/*.js'])
          .pipe(iconv({
            encoding: answers.theme
            // encoding: 'gbk'
          }))
          .pipe(gulp.dest(build + '/assets/scripts/'));
      htmlStream = gulp.src(['./*.{html,htm}','!./*form.{html,htm}'])
          .pipe(iconv({
            encoding: answers.theme
            // encoding: 'gbk'
          }))
          .pipe(gulp.dest(build));

      // Backup 移动文件
      resourcesStream = gulp.src(paths.backup.resources)
          .pipe(gulp.dest(backupPath + '/v' + verson ));

      imgStream = null;
      // 压缩移动图片
      if(fs.existsSync(paths.dest.img)){
          gutil.log(gutil.colors.cyan('直接抽取本地压缩版本图片'));
          imgStream = gulp.src(paths.dest.img+'**/*.{jpg,png,gif,webp,swf}')
              .pipe(gulp.dest(build + '/assets/images/'))
              .on('end', function(){
                  gutil.log(gutil.colors.cyan('构建完成 目录：' + build));
              });
      }else{
          gutil.log(gutil.colors.magenta('开始压缩图片,请稍后...'));
          del.sync(paths.dest.img + '*');
          imgStream = task_images(paths, browserSync)
              .on('end', function(){
                  gutil.log(gutil.colors.cyan('构建完成 目录：' + build));
              });
      }

      // cb();
    });

    if(cssStream && jsStream && htmlStream && imgStream && resourcesStream){
      return merge(cssStream, jsStream, htmlStream, imgStream, resourcesStream);
    }
};
