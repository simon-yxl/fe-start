var fs = require('fs'),
    util = require('util'),
    path = './assets/images',           //路径
    replacePath = './assets/images/',   //替换路径
    imgArr = [];

function explorer(path) {
    var files = fs.readdirSync(path);
    files.forEach(function(file) {
        var childPath = path + '/' + file;
        var stat = fs.statSync(childPath);
        if(stat.isDirectory()){
            // 如果是文件夹遍历
            explorer(path + '/' + file);
        }else {
            // 读出所有的文件
            var tempName = (childPath).replace(replacePath, '');

            if (tempName.indexOf('.DS_Store') === -1) {
                imgArr.push(tempName);
            }
        }
    });
}

explorer(path);

console.log(imgArr);
    



