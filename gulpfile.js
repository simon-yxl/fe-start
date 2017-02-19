var gulp          = require('gulp');
var fs            = require('fs');
var del           = require('del');

var gutil       = require('gulp-util');
var gulpSequence  = require('gulp-sequence');
var browserSync   = require('browser-sync').create();
var taskObj       = require('require-dir')('./tasks');

// 路径配置参数
var paths = {
    root:""+__dirname,
    src: {                                  // 源路径
        css: 'assets/sass/app/',
        js: 'assets/scripts/app/',
        img: 'assets/images/',
        html: 'ejs/'
    },
    dest: {                                 // 输出路径
        css: 'assets/css/',
        js: 'assets/js/',
        img: 'assets/min-images/',
        html: ''
    },
    build: {                                // 构建路径
        css: 'build/assets/css/',
        js: 'build/assets/js/',
        img: 'build/assets/images/',
        html: ''
    },
    sprites:{
      src:'assets/images/sprites/*.png',
      css:'assets/sass/core/',
      image:'assets/images/'
    },
    backup: {                               // 本地源码备份路径
        resources: ['**/*.*','!build/**/*.*','!backup/**/*.*','!form.html']
    }
};

global.buildVersion = process.env.VERSION;

// 监听任务
gulp.task('watch', function(){
   return taskObj.watch(paths, browserSync);
});

// 编译sass
gulp.task('sass',function(){
    return taskObj.sass(paths, browserSync);
});

// javascript 压缩
gulp.task('compress', function() {
    return taskObj.compress(paths, browserSync);
});

// 压缩图片
gulp.task('images', function(){
    return taskObj.images(paths, browserSync);
});

// 清除构建任务
gulp.task('clean',function(cb){
    return del('./build/*', cb);
});

// moveFile 移动文件
gulp.task('moveFiles',function(){
    return taskObj.movefiles(paths, browserSync);
});

// 发布任务
gulp.task('build',function (cb){
    return gulpSequence(['browserify','sass'],['compress'],['moveFiles'], cb);
});

// 替换CDN连接
gulp.task('replace', function () {
    return taskObj.replace(paths, browserSync);
});


//生成项目目录
gulp.task('book', function(){
  return taskObj.book();
})

//ejs
gulp.task('ejs', function(){
   return taskObj.ejs(paths, browserSync);
});

//精灵图
gulp.task('sprites', function(){
   return taskObj.sprites(paths);
});

// webpack 打包
gulp.task('webpack:pack', function() {
  return taskObj.pack(paths, browserSync);
});

//retina
// gulp.task('retina', function(){
//    return taskObj.retina(paths);
// });
