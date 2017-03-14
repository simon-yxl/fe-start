/**
 * -------------------------------
 * @file        handleEnter.js
 * @description 控制编译入口文件
 * @date        2017-03-07
 * -------------------------------
 */
const Q = require('q'); // promise功能
const prompt = require('prompt'); // 输入提示进行下一步
const gutil = require('gulp-util'); // 打印日志，获取参数变量等
// const step  = require('step'); // 流控制
// const async  = require('async'); // 流控制

/**
 * @function
 * @param {object} task 当前需要执行的任务
 */
module.exports = function(task){
  var params = arguments[1];
  if(params){
    return Q.Promise((resolve, reject, notify) => {
        prompt.start();
        prompt.get([{
            name: 'filename',
            description: 'Enter file name, please. Default all files if it is empty'
        }], function (err, result) {
          if(!err){
            var filename = '';
            if (result.filename) {
                filename = result.filename;
            } 
            resolve(filename);
          } else {
            reject(err);
          }
        });
    }).then((filename) => {
      if(typeof task == 'function'){
        return task(params[0], null, filename);
      } else if(task instanceof Array){
        if(task.length >= 2){ 
         //多个任务
        } else {
          return task[0](params[0], null, filename);
        }
      } else {
        gutil.log(gutil.colors.red('Error!'));
      }
    })
  } else {
    gutil.log(gutil.colors.red('Error!'));
  }
}