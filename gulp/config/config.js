/**
 * -------------------------------
 * @file        config.js
 * @description 全局参数配置
 * @date        2017-02-21
 * -------------------------------
 */
// 获取项目跟目录
const path = require('path');
const root = path.resolve(__dirname, '../../');

module.exports = {
  // 如果 debug 为true，则开启本地调试模式，默认为false
  "debug":false,
  // 平台 m:移动端，pc:PC端
  "platform":"m",
  // 静态服务器相关配置
  "server":{
    "baseDir":'./',
    "directory":true,
    "port":8658
  },
 // 根目录
  "root": root+'/',
  // sass编译相关配置
  "css":{
    "src":'src/sass/app/',
    "assets":'assets/css/',
     "autoprefixer": {
        "browsers": ["ios >= 6", "android >= 4.0"]
    },
    "ext":['sass', 'scss', 'css'],
    "suffix":''
  },
  // js编译相关配置
  "js":{
    "src":'src/scripts/app/',
    "assets":'assets/js/',
    "ext":['js'],
    "suffix":'.min'
  },
  // 图片编译相关配置
  "images":{
    "src":'src/images/',
    "assets":'assets/images/',
    "tiny_api_key":'PX5DcFnxfCnKGyyBpqgJoUUe9ibfbVkI',
    "ext":['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
    "suffix":''
  },
  // base64相关配置
  "base64":{
    "ext":['png', 'jpg', 'jpeg', 'svg', 'webp'],
    "suffix":"__inline",
    "maxImageSize":8,  // k
    "exclude":['gif']
  },
  // 上传配置
  "ftp":{
    "img":{
      host:'10.168.66.180',
      port:'21',
      user:'autoproxy',
      pwd:'',
      root:''
    } 
  }
}
