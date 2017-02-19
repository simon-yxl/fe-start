/**
 * @function len
 * @description 截取字符串长度
 * @param {string} value 需要处理的值
 * @param {number} num 需要截取的长度
 **/
Vue.filter('len', function(value, num){
  return value.substr(0, num);
});

/**
 * @function firstUpperCase
 * @description 首字母大写
 * @param {string} value 需要处理的值
 **/
Vue.filter('firstUpperCase', function(value){
  var str = value.toLowerCase();
  var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
  return str.replace(reg, function(m){
   return m.toUpperCase()
  });
});
