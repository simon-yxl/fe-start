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

	// 输入框
	__webpack_require__(3);
	// 选择框
	__webpack_require__(4);

	new Vue({
	  el: "#form"
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
	});

/***/ },
/* 1 */,
/* 2 */,
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