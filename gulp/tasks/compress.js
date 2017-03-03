/**
 * -------------------------------
 * @file        compress.js
 * @description js压缩
 * @date        2017-03-02
 * -------------------------------
 */
const gulp         = require('gulp');
const sass         = require('gulp-ruby-sass'); // sass编译
const autoprefixer = require('gulp-autoprefixer'); // 自动不起css3前缀
const size         = require('gulp-size'); // 计算文件大小
const sourcemaps   = require('gulp-sourcemaps'); //配置sourcemaps文件功能
const header       = require('gulp-header'); //添加文件头信息
const uglify       = require('gulp-uglify'); //js压缩
const gutil        = require('gulp-util'); //打印日志，获取参数变量等
const cached       = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道
const notify       = require('gulp-notify'); //通知
const prompt       = require('prompt'); // 输入提示进行下一步

/**
 * @function
 * @param {object} PATHS 路径对象
 * @param {object} CONFIG 基础配置参数对象
 * @param {object} browserSync 异步浏览器控制
 */
module.exports = function (PATHS, CONFIG, browserSync) {
	

};
