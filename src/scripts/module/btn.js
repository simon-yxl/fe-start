/**
 * @name        aside.js 插件
 * @description 侧边栏动画
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2015-11-02
 */
/*
 * class aside 侧边栏动画
 * @params obj config {control:触发侧边栏的开关, aside:默认的侧边栏id, timer:动画持续时间}
 */
;
(function ($) {
  function Aside(config) {
    config = $.extend({
      control: '[data-role=aside]',
      aside: '.aside', //目标侧边栏
      timer: 200 //侧边栏滑动时间
    }, config);
    var self = this;
    self.cfg = config;
    self.control = config.control; //侧边栏开关
    self.$mask = $('.mask-aside');
    self.$aside = $(self.cfg.aside);
    self.$curAside = $(self.cfg.aside);
    self.scrollTop = 0; //触发侧滑的开关滚动距离
    //    self._eventEle = $({}); // Zepto对象
    //初始化
    self.init();

    //绑定事件
    self.event();
  }

  /**
   * function init 初始化
   */

  Aside.prototype.init = function () {
    var self = this;
    //保存初始化aside的z-index值
    $.mCfg.$body.data('aside-zIndex', '10000');

    //默认侧边栏状态－关闭
    self.$aside.data('isClose', true);

    if (self.$mask.length <= 0) {
      $.mCfg.$body.append('<div class='mask mask-aside fn-hide'></div>');
      self.$mask = $('.mask-aside');
    }

    self.$mask.data('isClose', true);

    // console.log(self.$mask);
    //打开
    self.open();
    //关闭
    self.close();
  }

  /**
   * function event 事件绑定
   */
  Aside.prototype.event = function () {

    $.mCfg.$document.on('touchmove', '.aside > *:not(.aside-main)', function (e) {
      e.preventDefault();
      //  alert(2345);
    })

    //
    $.mCfg.$document.on('touchmove', '.aside-main', function (e) {
      var $this = $(this),
        _height = 0;
      $this.children().each(function () {
        _height += $(this).height();
      });

      if (_height + 100 <= $this.parents('.aside').height()) {
        e.preventDefault();
      }
    })


  }

  /**
   * function tpl 默认侧边栏模板
   * @params className 侧边栏的className
   * @params title 导航标题
   */
  Aside.prototype.tpl = function (className, title) {
    var self = this;
    var tpl = '<aside class="aside" ' + className + '>';
    // if(navSign !== false){
    tpl += '<nav class="nav-final">';
    tpl += '<p>' + title + '</p>';
    tpl += '<a class="back" href="#"><i class="iconfont icon-arrow-left"></i></a>';
    tpl += '</nav>';
    tpl += '<section class="aside-main">';
    tpl += '</section>';
    tpl += '</aside>';
    return tpl;
  }
}(Zepto))