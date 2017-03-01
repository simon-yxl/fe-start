/**
 * -------------------------------
 * @file        config.js
 * @description 全局参数配置
 * @date        2017-02-21
 * -------------------------------
 */
module.exports = {
  // 如果 debug 为true，则开启本地调试模式
  "debug":true,
  // 平台 m:移动端，pc:PC端
  "platform":"m",
  // tinypng API_KEY
  "TINYPNG_API_KEY":'',
  // 上传配置
  "ftp":{
    host:'10.168.66.180',
    port:'21',
    user:'autoproxy',
    pwd:'',
    root:''
  },
  // 上传图片配置
  "ftp-img":{
    host:'10.168.66.180',
    port:'21',
    user:'autoproxy',
    pwd:'',
    root:''
  }
}
