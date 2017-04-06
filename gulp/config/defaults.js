/**
 * -------------------------------
 * @file        defaults.js
 * @description 默认配置文件
 * @date        2017-04-06
 * -------------------------------
 */
// 获取项目跟目录
const path = require('path');
let CONFIG = {
  // 如果 debug 为true，则开启本地调试模式，默认为false
  "debug": true,
  // 平台 m:移动端，pc:PC端
  "platform": "m",
  // 静态服务器相关配置
  "server": {
    "baseDir": './',
    "directory": true,
    "port": 8658
  },
  // 根目录
  "root": path.resolve(__dirname, '../../'),
  // sass编译相关配置
  "sass": {
    "src": 'src/sass/app/',
    "assets": 'assets/css/',
    "autoprefixer": {
      "browsers": ["ios >= 6", "android >= 4.0"]
    },
    "dependent": ['base64'],
    "ext": ['sass', 'scss', 'css'],
    "suffix": ''
  },
  // 打包配置编译相关配置
  "pack:js": {
    "src": 'src/scripts/app/',
    "assets":"assets/js/",
    "ext":['', '.js']
  },
  // compress压缩js配置
  "compress": {
    "src": 'assets/js/',
    "assets": 'assets/js/',
    "ext": ['js'],
    "suffix": '.min'
  },
  // 图片编译相关配置
  "imagemin": {
    "src": 'src/images/',
    "assets": 'assets/images/',
    "tiny_api_key": 'PX5DcFnxfCnKGyyBpqgJoUUe9ibfbVkI', // 此key码在https://tinypng.com/上注册，免费版每月免费500张
    "ext": ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
    "suffix": ''
  },
  // base64相关配置
  "base64": {
    "src": 'assets/css/',
    "assets": 'assets/css/',
    "ext": ['css'],
    "options": {
      "ext": ['png', 'jpg', 'jpeg', 'svg', 'webp'],
      "suffix": "__inline",
      "maxImageSize": 8, // k
      "exclude": ['gif']
    }
  },
  // 上传配置
  "ftp": {
    "img": {
      host: '',
      port: '',
      user: '',
      pwd: '',
      root: ''
    }
  }
};

let entries = function* (obj) {
  // console.log(Object.keys(obj));
  for (let k of Object.keys(obj)) {
    yield [k, obj[k]];
  }
}

// 路径格式化
let pathNormalize = (obj) => {
  for(let [k, v] of entries(obj)){
    if(v instanceof Object){
      pathNormalize(v);
    } else {
      if(k.indexOf(['src', 'assets', 'baseDir']) >= 0){
        v = path.normalize(v);
      }
    }
  }
}

pathNormalize(CONFIG);

module.exports = CONFIG;
