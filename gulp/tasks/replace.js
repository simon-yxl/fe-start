// cdn替换
var gulp        = require('gulp');
var fs          = require('fs');
var replace     = require('gulp-replace');
var size        = require('gulp-size');
var gutil       = require('gulp-util');
var prompt      = require('gulp-prompt');
var gutil       = require('gulp-util');
var pkg         = require('../package.json');



// 实验性得 替换CDN地址 替换build .html文件 CDN连接
var cdnUrl = process.env.CDN;
var cdnUrl = 'http://www0.autoimg.cn/topic/2015/9/citroen/m/';

var zeptoReg = /[\w|\_|\-|\/|\.|\:]*?zepto\-1\.2\.min\.js/g;
var zeptoCDNUrl = 'http://s.autoimg.cn/as/static/js/zepto-1.2.min.js';
var imgReg = /src\=\"[\w|\_|\-|\/]*?([\w|\_|\-]+[(\.jpg)|(\.png)|(\.webp)]+)\"/img;
// 可替换外部连接的正则
// var imgReg = /src\=\"[\w|\_|\-|\/|\.|\:]*?([\w|\_|\-]+[(\.jpg)|(\.png)|(\.webp)]+)\"/img;   
var linkReg = /href\=\"[\w|\_|\-|\/]*?([\w|\_|\-]+(\.css))\"/img; 

module.exports = function(paths, browserSync){

    // 读取文件列表
    var dirList = [];            // 文件夹列表
    var path = './build/';       // 构建目录

    var folder_exists = fs.existsSync(path);
    if(!folder_exists) {
        gutil.log(gutil.colors.cyan('请先运行构建命令 gulp build'));
        return;
    }
    var files = fs.readdirSync(path);
    files.forEach(function(item, index, array) {
        var childPath = path + item;
        var stat = fs.statSync(childPath);
        if(stat.isDirectory()){
            // 数组中存储 文件夹的路径 和 创建时间
            dirList.push({path: childPath, btime: new Date(stat.birthtime).getTime()});
        }
    });
    // 按照创建时间排序
    dirList.sort(function(n1,n2){
        return n1.btime < n2.btime;
    });
    var choices = [];       // 生成 prompt 需要的数据
    for(var i = 0; i < dirList.length; i++){
        choices.push(dirList[i].path.replace(path, ''));
    }
    
    if(!cdnUrl){
        gutil.log(gutil.colors.cyan('请用CDN输入CDN地址'));
        return;
    }
    if(dirList.length === 0){
        gutil.log(gutil.colors.magenta('build目录为空'));
        return;
    }
    return gulp.src(path + '*')
        .pipe(prompt.prompt({
            type: 'checkbox',
            name: 'bump',
            message: '请选择需要替换连接的文件夹：',
            choices: choices
        }, function(res){
            gutil.log(gutil.colors.magenta('选择了' + res.bump + '进行批量替换'));
            for (var z = 0; z < res.bump.length; z++){
                var dPath = path + res.bump[z];
                var sPath = dPath + '/*.{html,htm}';
                gulp.src(sPath)
                    .pipe(replace(zeptoReg, zeptoCDNUrl))
                    .pipe(replace(imgReg, 'src="' + cdnUrl + 'images/$1"'))
                    .pipe(replace(linkReg, 'href="' + cdnUrl + 'css/$1"'))
                    .pipe(replace(/QingUI\.baseImgPath\s*\=\s*\"assets\/images\/\"\;/, 'QingUI.baseImgPath = "' + cdnUrl + 'images/";'))
                    .pipe(gulp.dest(dPath));
            }
            gutil.log(gutil.colors.magenta('批量替换完成'));
        })
    );
};