/**
 * -------------------------------
 * @file        handleError.js
 * @description 错误控制
 * @date        2017-03-07
 * -------------------------------
 */
const notify = require("gulp-notify"); // 通知

/**
 * @function
 */
module.exports = function() {
	// console.log(params);
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Error!',
		message: '<%=error.message %>'
	}).apply(this, args);//替换为当前对象
	this.emit('end');//提交
}
