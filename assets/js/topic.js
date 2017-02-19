/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// 公共方法

	__webpack_require__(1);
	// 自定义过滤器
	__webpack_require__(2);
	// 输入框
	__webpack_require__(3);
	// 选择框
	__webpack_require__(4);

	// 主页面数据
	var index = new Vue({
	  el: '#index',
	  beforeMount: function () {
	    this.getpagedata();
	  },
	  //初始化页面数据，默认值
	  data: {
	    time: '0000.00.00',
	    explain: '本实例由二手车前端组提供，专用于讲解前端人员使用vue.js嵌套数据，仅供参考',
	    description: "活动开始：0000.00.00 <br /> 活动截止：0000.00.00"
	  },
	  methods: {
	    // 获取第一时间需要显示的数据
	    getpagedata: function () {
	      console.log(this.getQueryStr('test'));
	      this.$http.get('../assets/mock/index.json').then(function (response) {
	        if (response.data.return == 1) {
	          var content = response.data.content;
	          this.time = content.time;
	          this.description = content.description;
	        }
	      }, function (response) {
	        console.log('fail');
	      });
	    },
	    // 提交表单数据
	    submit: function () {
	      // alert(234);
	      var self = this;
	      var params = {};
	      for (var v in this.$refs) {
	        params = Object.assign(params, this.$refs[v].value);
	      }
	      self.$http.get('assets/mock/fail.json', params).then(function (response, resolve) {
	        if (response.data.return == 1) {
	          alert('提交数据成功');
	        }
	        return response.data;
	      }, function (response) {
	        alert('提交失败');
	      }).then(function (data) {
	        if (data && data.return == 0) {

	          for (var v in data.error) {
	            var $component = self.$refs[v.split('-')[0]];
	            if ($component) {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	Vue.mixin({
	  methods: {
	    getQueryStr: function (name) {
	      var url = location.search; //获取url中"?"符后的字串
	      var theRequest = {};
	      if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        var strs = str.split("&");
	        for (var i = 0; i < strs.length; i++) {
	          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	        }
	      }
	      return name ? theRequest[name] : theRequest;
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @function len
	 * @description 截取字符串长度
	 * @param {string} value 需要处理的值
	 * @param {number} num 需要截取的长度
	 **/
	Vue.filter('len', function (value, num) {
	  return value.substr(0, num);
	});

	/**
	 * @function firstUpperCase
	 * @description 首字母大写
	 * @param {string} value 需要处理的值
	 **/
	Vue.filter('firstUpperCase', function (value) {
	  var str = value.toLowerCase();
	  var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
	  return str.replace(reg, function (m) {
	    return m.toUpperCase();
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	Vue.component('t-input', {
	  // 外部传值， name:input的那么值， title:标题，placeholder：placeholder值
	  props: ['name', 'title', 'placeholder'],
	  template: ' \
	  <div class="form-input"> \
	    <label :for="\'input-\' + name" class="input-tt">{{ title }}</label> \
	    <div class="input-ct"> \
	      <input type="text" :name="name" :placeholder="placeholder" :class="{error:errorinfo}" :id="\'input-\' + name" @blur="validate" /> \
	    </div> \
	    <span :class="\'error-init \' + hide">{{ errorinfo }}</span> \
	  </div>',
	  data: function () {
	    // 控制错误提示的值
	    return {
	      hide: 'fn-hide',
	      errorinfo: ''
	    };
	  },
	  computed: {
	    // 获取改组件的value值
	    value: function () {
	      var $input = this.$el.querySelectorAll('input');
	      var value = {};
	      $input.forEach(function (v) {
	        value[v.name] = v.value;
	      });
	      return value;
	    }
	  },
	  methods: {
	    // 验证
	    validate: function (event) {
	      var $target = event.target;
	      var value = $target.value;
	      if (!value) {
	        this.hide = '';
	        this.errorinfo = '不能为空';
	      } else if (/\d+/.test(value)) {
	        this.hide = '';
	        this.errorinfo = '请输入数字';
	      } else {
	        this.hide = 'fn-hide';
	        this.errorinfo = '';
	      }
	    }
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	Vue.component('t-select', {
	  props: ['name', 'title', 'geturl', 'cnt'],
	  template: ' \
	  <div class="form-select"> \
	    <span class="select-tt">{{ title }}</span> \
	    <div class="select-ct"> \
	      <div class="ct-s" v-for="n in cnt"> \
	        <slot :name="name+ \'-\' + n" :classname="errorinfo ? \'error\' : \'\'" :sname="name+ \'-\' + n"> \
	          <select :name="name + \'-\' + n" @change="getChildData($event, n+1)" :class="{error:errorinfo}"> \
	            <option v-for="v in child[n]" :value="v.value" :url="v.url || \'\'"> \
	              {{ v.des }} \
	            </opotion> \
	          </select> \
	        </slot> \
	      </div> \
	    </div> \
	    <span :class="\'error-init\' + hide">{{ errorinfo }}</span> \
	  </div>',
	  // 填充数据
	  beforeMount: function () {
	    this.child = this.childdata;
	    if (this.geturl) {
	      this.getIinitData(this.geturl);
	    }
	  },
	  data: function () {
	    return {
	      child: {},
	      hide: 'fn-hide',
	      errorinfo: ''
	    };
	  },
	  computed: {
	    // 获取选中的值
	    value: function () {
	      var $select = this.$el.querySelectorAll('select');
	      var value = {};
	      $select.forEach(function (v) {
	        value[v.name] = v.value;
	      });
	      return value;
	    },
	    // 初始化select默认值
	    childdata: function () {
	      var result = {};
	      var cnt = this.cnt;
	      for (var i = 1; i <= cnt; i++) {
	        result[i] = [{ "value": "0", "des": "无数据" }];
	      }
	      return result;
	    }
	  },
	  methods: {
	    //获取select数据
	    getIinitData: function (url) {
	      var self = this;
	      if (typeof url == 'string') url = [url];
	      url.forEach(function (v, k) {
	        self.$http.get(v).then(function (response) {
	          if (response.data.return == 1) {
	            self.child[k + 1] = response.data.list;
	          }
	        }, function (response) {
	          console.error('fail');
	        }).then(function () {
	          var $select = this.$el.querySelectorAll('select');
	          $select.forEach(function (v) {
	            self.value[v.name] = v.value;
	          });
	        });
	      });
	    },
	    // select里的值，刷新相关联的下一个select
	    getChildData: function (event, n) {
	      var self = this;
	      // console.log(self.geturl && typeof self.geturl == 'string');
	      if (self.geturl && typeof self.geturl == 'string') {
	        // alert(23);
	        var $target = event.target;
	        var _index = $target.selectedIndex;
	        var $selected = $target.options[_index];
	        var childurl = $selected.getAttribute('url');
	        if (childurl) {
	          this.$http.get(childurl).then(function (response) {
	            if (response.data.return == 1) {
	              self.child[n] = response.data.list;
	            }
	          }, function (response) {
	            console.error('fail');
	          });
	        } else {
	          console.warn('该选项下没有数据');
	          if (n <= this.cnt) {
	            this.child[n] = [{ "value": "0", "des": "无数据" }];
	          }
	        }
	      }
	    }
	  }

	});

/***/ }
/******/ ]);