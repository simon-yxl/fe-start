/**
 * -------------------------------
 * @file        handleEnter.js
 * @description 控制编译入口文件
 * @date        2017-03-07
 * -------------------------------
 */
const Q = require('q'); // promise功能
// const prompt = require('prompt'); // 输入提示进行下一步
const inquirer    = require('inquirer');
const fs    = require('fs');
const path = require('path'); //获取路径相关
const gutil = require('gulp-util'); // 打印日志，获取参数变量等
const platform = process.platform; // 获取当前平台
const readFileList = require('./readFileList'); //获取文件列表

/**
 * @function
 * @param {object} task 当前需要执行的任务
 * @param {object} src 需要编译的文件路径
 * @param {object} browserSync 异步浏览器
 */
module.exports = (task, src, browserSync) => {
  if(browserSync){
    // 选择选项后执行任务
    var exeTask = (filename) => {
      if(typeof task == 'function'){
        return task(browserSync, null, filename);
      } else if(task instanceof Array){
        if(task.length >= 2){ 
        //多个任务
        } else {
          return task[0](browserSync, null, filename);
        }
      } else {
        gutil.log(gutil.colors.red('Error!'));
        return;
      }
    }

    if(platform != 'darwin'){ // 如果是window系统
      return inquirer.prompt([{
        'type':'input',
        'name':'filename',
        'message':'请输入文件名，如果为空则为全部文件：',
        'validate': (filename) => {
          if(filename){
            return !!fs.existsSync(path.join(CONFIG.root, src, filename));
          } else {
            return true;
          }
        }
      }]).then((res) => {
        exeTask(res.filename);
      });
    } else {
      return inquirer.prompt([{
        'type':'list',
        'name':'filename',
        'message':'请选择需要编译的文件：',
        'choices': readFileList(src),
        'validate': (filename) => {
          if(filename){
            const stats = fs.statSync(path.join(CONFIG.root, src, filename));
            if(stats.isFile()){
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      }]).then((res) => {
        exeTask(res.filename);
      });
    }
  } else {
    gutil.log(gutil.colors.red('Error!'));
    return;
  }
}