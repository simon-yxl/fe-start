"use strict";
// 公共方法
require('../core/mixin.js');
// 自定义过滤器
require('../core/filters.js');
// 输入框
require('../components/input.js');
// 选择框
require('../components/select.js');

// 主页面数据
var index = new Vue({
  el:'#index',
  beforeMount:function(){
    this.getpagedata();
  },
  //初始化页面数据，默认值
  data:{
    time:'0000.00.00',
    explain:'本实例由二手车前端组提供，专用于讲解前端人员使用vue.js嵌套数据，仅供参考',
    description:"活动开始：0000.00.00 <br /> 活动截止：0000.00.00"
  },
  methods:{
    // 获取第一时间需要显示的数据
    getpagedata:function(){
      console.log(this.getQueryStr('test'));
      this.$http.get('../assets/mock/index.json').then(function(response){
        if(response.data.return == 1){
          var content = response.data.content;
          this.time = content.time;
          this.description = content.description;
        }
      }, function(response){
        console.log('fail');
      });
    },
    // 提交表单数据
    submit:function(){
      // alert(234);
      var self = this;
      var params = {};
      for(var v in this.$refs){
        params = Object.assign(params, this.$refs[v].value);
      }
      self.$http.get('assets/mock/fail.json', params)
                .then(function(response, resolve){
                  if(response.data.return == 1){
                    alert('提交数据成功');
                  }
                  return response.data;
                },function(response){
                  alert('提交失败');
                })
                .then(function(data){
                  if(data && data.return == 0){

                    for(var v in data.error){
                      var $component = self.$refs[v.split('-')[0]];
                      if($component){
                        $component.$data.hide = '';
                        $component.$data.errorinfo = data.error[v];
                      }
                    }
                  }
                });
    }
  }
});

//填充数据
// 所有的下拉菜单
// var $refs = vm.$refs;
// Vue.http.get('../assets/mock/city.json').then(function(response){
//   // 如果返回数据成功
//   // console.log();
//   if(response.data.return == 1){
//     $refs.city.child[1] = response.data.list;
//   }
// }, function(response){
//   console.log('fail');
// });
//
// Vue.http.get('../assets/mock/cartype.json').then(function(response){
//   // 如果返回数据成功
//   if(response.data.return == 1){
//     $refs.cartype.child[1]= response.data.list;
//
//   }
// }, function(response){
//   console.log('fail');
// });
