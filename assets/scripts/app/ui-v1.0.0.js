// 输入框
require('../components/input.js');
// 选择框
require('../components/select.js');

new Vue({
  el:"#form"
  // data:{
  //   options:{}
  // },
  // beforeMount: function() {
  //   var self = this;
  //   console.log(self);
  //   // console.log(Vue.http.get, this.url);
  //   self.$http.get(this.url).then(function(response){
  //     // console.log(response.data);
  //     // self.json = response.data;
  //     console.log(response.data);
  //     self.$set('options', response.data);
  //   }, function(response){
  //     console.log("fail");
  //   });
  // }
})
