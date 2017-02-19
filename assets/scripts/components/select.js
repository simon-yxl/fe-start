Vue.component('t-select', {
  props:['name', 'title', 'geturl', 'cnt'],
  template:' \
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
  beforeMount:function(){
    this.child = this.childdata;
    if(this.geturl){
      this.getIinitData(this.geturl);
    }
  },
  data:function(){
    return {
      child:{},
      hide:'fn-hide',
      errorinfo:''
    }
  },
  computed:{
    // 获取选中的值
    value:function(){
      var $select = this.$el.querySelectorAll('select');
      var value = {};
      $select.forEach(function(v){
        value[v.name] = v.value;
      })
      return value;
    },
    // 初始化select默认值
    childdata:function(){
      var result = {};
      var cnt = this.cnt;
      for(var i = 1;i <= cnt; i++) {
        result[i] = [
          {"value":"0", "des":"无数据"}
        ];
      }
      return result;
    }
  },
  methods:{
    //获取select数据
    getIinitData:function(url){
      var self = this;
      if(typeof url == 'string') url = [url];
      url.forEach(function(v, k){
        self.$http.get(v).then(function(response){
          if(response.data.return == 1){
            self.child[k + 1] = response.data.list;
          }
        },function(response){
          console.error('fail');
        }).then(function(){
          var $select = this.$el.querySelectorAll('select');
          $select.forEach(function(v){
            self.value[v.name] = v.value;
          })
        });
      });

    },
    // select里的值，刷新相关联的下一个select
    getChildData:function(event, n){
      var self = this;
      // console.log(self.geturl && typeof self.geturl == 'string');
      if(self.geturl && typeof self.geturl == 'string'){
        // alert(23);
        var $target = event.target;
        var _index = $target.selectedIndex;
        var $selected = $target.options[_index];
        var childurl = $selected.getAttribute('url');
        if(childurl){
          this.$http.get(childurl).then(function(response){
            if(response.data.return == 1){
              self.child[n] = response.data.list
            }
          },function(response){
            console.error('fail');
          });
        } else {
          console.warn('该选项下没有数据');
          if(n <= this.cnt){
            this.child[n] = [
              {"value":"0", "des":"无数据"}
            ];
          }
        }
      }

    }
  }

});
