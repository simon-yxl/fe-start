Vue.component('t-input', {
  // 外部传值， name:input的那么值， title:标题，placeholder：placeholder值
  props:['name', 'title', 'placeholder'],
  template:' \
  <div class="form-input"> \
    <label :for="\'input-\' + name" class="input-tt">{{ title }}</label> \
    <div class="input-ct"> \
      <input type="text" :name="name" :placeholder="placeholder" :class="{error:errorinfo}" :id="\'input-\' + name" @blur="validate" /> \
    </div> \
    <span :class="\'error-init \' + hide">{{ errorinfo }}</span> \
  </div>',
  data:function(){
    // 控制错误提示的值
    return {
      hide:'fn-hide',
      errorinfo:''
    }
  },
  computed:{
    // 获取改组件的value值
    value:function(){
      var $input = this.$el.querySelectorAll('input');
      var value = {};
      $input.forEach(function(v){
        value[v.name] = v.value;
      })
      return value;
    }
  },
  methods:{
    // 验证
    validate:function(event){
      var $target = event.target;
      var value = $target.value;
      if(!value) {
        this.hide = '';
        this.errorinfo = '不能为空';
      } else if(/\d+/.test(value)){
        this.hide = '';
        this.errorinfo = '请输入数字';
      } else {
        this.hide = 'fn-hide';
        this.errorinfo = '';
      }

    }
  }
});
