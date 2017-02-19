/*!
 * copyright (c) 2014-2015, Autohome.2sc v1.0.0
 * description: Autohome.2sc FE Group
 * build time: Mon Nov 28 2016 17:33:58 GMT+0800 (CST)
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//加载公共配置文件
//var mCfg = require("../module/config");
//公共方法类
require("../module/config");
//
require("../module/enhance");
// 弹窗
require("../module/pop.js");

// tab
require("../module/searchcity");

// //加载侧边栏类
require("../module/aside");

//单行导航
require("../module/overslide");

// 返回顶部
require("../module/backtop");

// share
require("../module/sharebrowser");

// 轮播
require("../module/carousel.js");

//搜索框
require("../module/search.js");

//图片懒加载
require("../module/lazyload.js");

// 公共提示
require("../module/promptpop.js");

// 横滑
require("../module/overslide.js");

// 弹窗
require("../module/select.js");

// tab
require("../module/tab.js");

// 字母跳转
require("../module/quickjump");

//吸顶
// require("../module/navfix");

},{"../module/aside":2,"../module/backtop":3,"../module/carousel.js":4,"../module/config":5,"../module/enhance":6,"../module/lazyload.js":7,"../module/overslide":8,"../module/overslide.js":8,"../module/pop.js":9,"../module/promptpop.js":10,"../module/quickjump":11,"../module/search.js":12,"../module/searchcity":13,"../module/select.js":14,"../module/sharebrowser":15,"../module/tab.js":16}],2:[function(require,module,exports){
/**
 * @name        aside.js 插件
 * @description 侧边栏动画
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2015-11-02
 */
//加载公公配置
;(function ($, undefined) {

  var el = $("[data-role=aside]");

  /*
   * class aside 侧边栏动画
   * @params obj config {control:触发侧边栏的开关, aside:默认的侧边栏id, timer:动画持续时间}
   */
  function Aside(config) {
    config = $.extend({
      control:"[data-role=aside]",
      aside  : ".aside", //目标侧边栏
      timer: 200 //侧边栏滑动时间
    }, config);
    var self = this;
    self.cfg = config;
    self.control = config.control; //侧边栏开关
    self.$mask = $(".mask-aside");
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
    $.mCfg.$body.data("aside-zIndex", "10000");

    //默认侧边栏状态－关闭
    self.$aside.data("isClose", true);

    if(self.$mask.length <= 0) {
      $.mCfg.$body.append("<div class='mask mask-aside fn-hide'></div>");
      self.$mask = $(".mask-aside");
    }

    self.$mask.data("isClose", true);

    // console.log(self.$mask);
    //打开
    self.open();
    //关闭
    self.close();
  }

  /**
   * function event 事件绑定
   */
   Aside.prototype.event = function(){

     $.mCfg.$document.on("touchmove", ".aside > *:not(.aside-main)", function(e){
       e.preventDefault();
      //  alert(2345);
     })

     //
     $.mCfg.$document.on("touchmove", ".aside-main", function(e){
       var $this = $(this),
           _height = 0;
       $this.children().each(function(){
         _height += $(this).height();
       });

       if(_height + 100 <= $this.parents(".aside").height()){
         e.preventDefault();
       }
     })


   }

  /**
   * function tpl 默认侧边栏模板
   * @params className 侧边栏的className
   * @params title 导航标题
   */
  Aside.prototype.tpl = function(className, title){
    var self = this;
    var tpl = "<aside class='aside "+className+"'>";
    // if(navSign !== false){
    tpl += "<nav class='nav-final'>";
    tpl += "<p>"+title+"</p>";
    tpl += "<a class='back' href='#'><i class='iconfont icon-arrow-left'></i></a>";
    tpl += "</nav>";
    tpl += "<section class='aside-main'>";
    tpl += "</section>";
    tpl += "</aside>";
    return tpl;
  }

  /**
   * function open 打开侧边栏
   */
  Aside.prototype.open = function(){
    var self = this;
    // alert(23423);
    //点击打开
    $.mCfg.$body.on("click", self.control, function(e){
      var $this = $(this),
          dest = $this.data("relation"),
          url = $this.data("url"); //获取数据模版的接口
      //触发开关时的滚动条位移
      if($this.parents(".aside").length <= 0){
        self.scrollTop = $(window).scrollTop();
      }

      self.$curAside = $(dest ? ("."+dest) : self.cfg.aside); //相关联的侧边栏
      self.cfg.timer = $this.data("time") || self.cfg.timer;
      //侧边栏标题
      var title = !!$this.data("title") === true ? $this.data("title") : $this.text();

      //判断侧边栏是否存在，不存在则使用模板
      if(self.$curAside.length <= 0){
        $.mCfg.$body.append(self.tpl(dest, title));
        // console.log($("."+dest));
        self.$curAside = $("."+dest);
        self.$aside = $(".aside");
        self.$aside.data("isClose", true);
      }else{
        self.$curAside = $(dest ? ("."+dest) : self.cfg.aside ); //相关联的侧边栏
      }

      //设置侧边栏标题
      var $title = self.$curAside.find(".nav-final p");

      $title.html(title);

      //隐藏页面滚动条
      $("html, body, .wrapper").css({"height":$(window).height()+"px","overflow":"hidden"});

      self.$mask.removeClass($.mCfg.hideClass);
      self.$curAside.removeClass($.mCfg.hideClass);

      //侧边栏滑动

      self.slide(self.$curAside, $this, url);

    })
  }

  /**
   * function side 滑动
   * @params dom $curAside 侧边栏对象
   * @params dom $cur 当前操作的元素
   * @params str url  接口地址
   */
  Aside.prototype.slide = function($curAside, $cur, url){
    var self = this,
        isClose = $curAside.data("isClose");

    //同时加载数据
    var hisUrl = $curAside.data("his-url");

    if(url && (!hisUrl || (hisUrl && hisUrl != url))){
      self.ajax($curAside, $cur, url);
    }

    if(isClose){
      //蒙层渐显
      self.$mask.animate({
        opacity:1
      }, self.cfg.timer, "ease-in-out");

      var curIndex = parseInt($.mCfg.$body.data("aside-zIndex"));
      $curAside.css({zIndex:curIndex + 1});
      $curAside.animate({
        translate3d: "0, 0, 0"
      }, self.cfg.timer, "ease-in-out", function(){
        $curAside.data("isClose", false);
        $.mCfg.$body.data("aside-zIndex", curIndex+1);
        self.$mask.data("isClose", false).removeClass($.mCfg.hideClass);
      });
    }

  }

  /**
   * function close 关闭侧边栏
   */
  Aside.prototype.close = function(){
    var self = this;
    //点击蒙板，关闭侧边栏
    var _close = function($cur){
      self.cfg.timer = $cur.data("time") || self.cfg.timer;
      self.closeAll();
    }
    $.mCfg.$document.on("click", ".aside-close", function(e){
      e.preventDefault();
      _close($(this));
    });
    self.$mask.on("click", function(e){
      e.preventDefault();
      _close($(this));
    });


    //点击侧边栏的返回按钮，关闭当前的侧边栏
    $.mCfg.$document.on("click", ".aside .back, .aside-back", function(e){
      e.stopPropagation();
      e.preventDefault();
      var $curAside = $(this).parents(".aside");
      self.cfg.timer = $(this).data("time") || self.cfg.timer;
      $curAside.animate({translate3d:"100%, 0, 0"}, self.cfg.timer, "ease-in-out",function(){
        //关闭侧边栏后，设置侧边栏状态为true（关闭）
        $curAside.data("isClose", true);
      });

      // setTimeout(function(){
      //判断如果只有一个侧边栏属于打开状态，则蒙层一起关闭
      var openCnt = self.$aside.length;
      self.$aside.each(function(){
        if($(this).data("isClose") == true) --openCnt;
      });

      if(openCnt === 1){

        self.$mask.data("isClose", true).animate({
          opacity:0
        }, self.cfg.timer, "ease-in-out",function(){
          self.$mask.addClass($.mCfg.hideClass);
        });
        //关闭页面滚动条
        // $.mCfg.$body.attr("style", "");
        $("html, body, .wrapper").css({"height":"auto","overflow-x":"hidden", "overflow-y":"auto"});
        // $.mCfg.$wrapper.attr("style", "");
        document.documentElement.scrollTop = document.body.scrollTop = self.scrollTop;
      };
      // }, 0);

    });
  };

  /**
   * function closeAll 关闭所有的窗口
   * @params obj callback 回调函数
   */
  Aside.prototype.closeAll = function(callback){
    var self = this,
        cnt = 0;
    if(self.$mask.data("isClose") === false){
      $(".aside").each(function(){
        if($(this).data("isClose") === false){
          $(this).animate({translate3d:"100%, 0, 0"}, self.cfg.timer,"ease-in-out", function(){
            //关闭侧边栏后，设置侧边栏状态为true（关闭）
            $(".aside").data("isClose", true);
            document.documentElement.scrollTop = document.body.scrollTop = self.scrollTop;
          });

          self.$mask.data("isClose", true).animate({
            opacity:0
          }, self.cfg.timer, "ease-in-out",function(){
            self.$mask.addClass($.mCfg.hideClass);
            if(callback && cnt == 0){
              callback();
              ++cnt;
            }
          });
        }
      })
    }

    $("html, body, .wrapper").css({"height":"auto","overflow-x":"hidden", "overflow-y":"auto"});
  }

  /**
   * function ajax 异步请求数据
   * @params obj $aside 侧边栏对象
   * @params obj $cur 当前操作的元素
   * @params str url  接口地址
   */

  Aside.prototype.ajax = function($aside, $cur, url){
    var self = this;
    //判断是否有遮罩层
    $.ajax({
      type:"get",
      url: url,
      dataType: "text",
      success:function(data){
        if(data){
          var $asideMain = $aside.find(".aside-main");
          if($asideMain.length){
            $asideMain.html(data);
          }else{
            $aside.html(data);
          }

          // 选择地区特殊处理
          if($cur.data("relation") == "block-area" || $cur.data("relation") == "block-brand") {
            var $main = $aside.find(".aside-main");
            var titCell = "jump-tag";
            var tips = true;
            var tipsName = 'jump-tips';
            new $.QuickJump($aside[0], {
              titCell: titCell || 'quickJump',
              tips: tips,
              tipsName: tipsName || 'jump-tips'
            });

            //开启搜索城市功能
            new $.SearchCity();
          }

          $aside.data("his-url", url);
        }
      },
      error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log("ajax error");
      }
    })
  }
  //侧边栏功能
  if(el.length > 0){
    $.aside = new Aside();
  }

// module AMD CMD Browser
//  if(typeof define === 'function'){
//    define(function(){
//      return Aside;
//    });
//  } else if (typeof exports !== 'undefined'){
//    module.exports = Aside;
//  } else {
//    window.Aside = Aside;
//  }
}(Zepto))

},{}],3:[function(require,module,exports){
/**
 * @name        backtop.js 插件
 * @description 返回顶部
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2015-11-23
 */

;(function($) {
  'use strict';
  //backtop
  var el = $("[data-role=backTop]");

  /*
   * class BackTop 返回顶部
   */
  function BackTop(){

    this.cfg = {
      dist:!!el.data("dist") == true ? parseInt(el.data("dist")) : $.mCfg.wH //滚动距离
    }

    this.timer = null;
    this.init();
  }

  /**
   * function init 初始化函数
   */
  BackTop.prototype.init = function(){
    var self = this;
    self.show();
    self.back();
  }

  /**
   * function show 显示backtop
   */
  BackTop.prototype.show = function(){
    var self = this;
    $.mCfg.$win.on("scroll", function() {
      if (self.timer ) {
        clearTimeout(self.timer);
      }
      self.timer = setTimeout(function(){
        if ($.mCfg.$win.scrollTop() > self.cfg.dist) {
          el.removeClass($.mCfg.hideClass);
        } else {
          el.addClass($.mCfg.hideClass);
        }
      }, 100);
    });
  }

  /**
   * function back 返回顶部
   */
  BackTop.prototype.back = function(){
    el.on("click", function(){
      window.scrollTo(0,0);
    });
  }

  if(el.length) new BackTop();



}(Zepto));

},{}],4:[function(require,module,exports){
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';

      if(options.scale && $(slide).find("img").length == 1){
        $(slide).find("img").css("height", width*options.scale+"px");
      }

      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date;

    var timer = setInterval(function() {

      var timeElap = +new Date - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }

    var el = $("[data-role=carousel]");
    el.each(function(){

      var $this = $(this),
          speed = $this.data("speed") || 300,
          start = $this.data("start") || 0,
          autoPlay = $this.data("autoplay"),
          auto = autoPlay == false ? 0 : ($this.data("timeout") || 3000) ,
          stopPropagation = $(this).data("stopPropagation") || false,
          type = $this.data("type") || 1,
          scale = $this.data("scale"),
          defImg = $this.data("def-img") || "//x.autoimg.cn/2scimg/m/20160427/def-upload-"+(scale || "4x3")+".png",
          $h2 = $this.find("h2"),
          $children = $this.find(".carousel").children(),
          len = $children.length;

      if($h2.length > 0 && type == 1){
        $h2.find("span").replaceWith("<span><b>"+(len > 0 ? start+1 : 0)+"</b>/<em>"+len+"</em></span>");

      }else if($h2.length > 0 && type == 2){
        var nav = "", i =0;
        for(i; i < len; i++){
          nav += "<span "+(i == start ? "class='active'" : "")+"></span>";
        }
        $h2.addClass("carousel-nav").html(nav);
      }

      if(type == 3 || type == 1){
        $h2.find("span").replaceWith("<span><b>"+(len > 0 ? start+1 : 0)+"</b>/<em>"+len+"</em></span>");
        var isTitle = false;
        $this.find(".c-item").each(function(){
          var $this = $(this),
              title = $this.data("title");
          if(title){
            isTitle = true;
          }
        });
        if(type == 3){
          $this.after($h2.addClass("carousel-nav-03"));
          $this.append("<p class='carousel-info'>"+($this.find(".c-item:nth-of-type(1)").data("title") || "")+"</p>");
        }else{
          $h2.html(($h2.find("p").length ? $h2.find("p")[0].outerHTML : "")+"<span><b>"+(len > 0 ? start+1 : 0)+"</b>/<em>"+len+"</em></span>");
        }
      }

      //首先加载2张图片

      $this.find(".c-item").eq(0).find("img[data-src-load]").each(function(){
        var $this = $(this);
        $this.attr("src", $this.data("src-load"))
        .on("error", function(){
          $(this).attr("src", defImg);
        });
        // $this.attr('data-src-load', null);
        var $next = $this.parents(".c-item").next();
        if($next.length){
          $next.find("img[data-src-load]").each(function(){
            var $nextImg = $(this);
            $nextImg.attr("src", $nextImg.data("src-load")).on("error", function(){
              $(this).attr("src", defImg);
            });
          })
        }
      });
      // console.log($this, $this.data("scale"), scale ? (scale.split("x") ? scale.split("x")[1]/scale.split("x")[0] : false) : false);
      // alert($this.data("scale"));
      //开启轮播
      $this.Swipe({
          startSlide: start,
          speed: speed,
          auto: auto,
          scale: scale ? (scale.split("x") ? scale.split("x")[1]/scale.split("x")[0] : false) : false,
          continuous: true,
          disableScroll: false,
          stopPropagation: false,
          callback: function(index, elem) {},
          transitionEnd: function(index, elem) {

            if(type == 1){
              var $cur = $this.find(".c-item:nth-of-type("+(index+1)+")");
              // if($cur.data("title")){
                $h2.html(($h2.find("p").length ? $h2.find("p")[0].outerHTML : "")+"<span><b>"+(index+1)+"</b>/<em>"+len+"<em></span>");
              // }
            }else if(type == 2){
              $h2.find("span").removeClass("active");
            }else if(type == 3){
              $this.find(".carousel-info").html($this.find(".c-item:nth-of-type("+(index+1)+")").data("title") || "");
            }

            if(len <= 2){
              if(type == 1 || type == 3){
                $h2.find("span").find("b").html(index > len - 1 ? index - len + 1 : index+1);
              } else {
                $h2.find("span:nth-of-type("+(index > len - 1 ? index - len + 1 : index+1)+")").addClass("active");
              }
            }else{
              if(type == 1 || type == 3){
                $h2.find("span").find("b").html(index+1);
              }else{
                $h2.find("span:nth-of-type("+(index+1)+")").addClass("active");
              }
            }

            // //异步加载图片
            // var $imgs = $(elem).find("img[data-src-load]");
            // // console.log(elem);

            var loadImgs = function($imgs){
              if($imgs.length > 0){
                //未加载及加载失败图片统计
                var n = 0, unloadImgs = [];
                $imgs.each(function(i, content){
                  var $this = $(content);
                  if(!$this.attr("src") || $this.attr("src") != $this.data("src-load")){
                    unloadImgs.push($this);
                  }
                });

                //未加载图片数量
                var unloadImgsLen = unloadImgs.length;
                //如果有图片未加载完全
                // if(unloadImgsLen > 0){
                //   $.promptPop.open({
                //     sign:2,
                //     content:"正在加载中...."
                //   });
                //   var $prompt = $(".prompt-pop.prompt-loading");
                //   var _top = $this.offset().top;
                //   $prompt.css({
                //     position:"absolute",
                //     top:_top + $this.height()/2 +"px"
                //   });
                // }

                $.each(unloadImgs, function(i){
                  unloadImgs[i].attr({"src": unloadImgs[i].data("src-load")})
                  // .on("load", function(){
                  //   var $this = $(this);
                  //   ++n;
                  //   if(n >= unloadImgsLen){
                  //     $.promptPop.close();
                  //     $prompt.attr("style", "");
                  //   }
                  // })
                  .on("error", function(){
                    $(this).attr("src", defImg);
                  });
                });
              }
            }

            loadImgs($(elem).find("img[data-src-load]"));
            var $next = $(elem).next();
            if($next.length){
              loadImgs($next.find("img[data-src-load]"));
            }
          }
        });
    })
  })( window.jQuery || window.Zepto )
}

},{}],5:[function(require,module,exports){
/**
 * @description config.js 公公配置文件，用于存放所有控件中使用的公共属性
 * @author  yuaniaolong@autohome.com.cn
 * @version v0.1
 * @data    2015-11-02
 */
;(function($) {
  $.mCfg = {
    $document: $(document),
    $win: $(window),
    $body: $("body"),
    $wrapper: $(".wrapper"),
    $mask: $(".mask"),
    hideClass: 'fn-hide',
    weiboAppKey: '1035238687'
  }

  //获取屏幕高度
  $.mCfg.wH = document.documentElement.clientHeight;
  $.mCfg.wW = document.documentElement.clientWidth;
  $.mCfg.bH = $.mCfg.$body.height();

  //module AMD CMD Browser
  // if (typeof define === 'function') {
  //   define(function() {
  //     return mCfg;
  //   });
  // } else if (typeof exports !== 'undefined') {
  //   module.exports = mCfg;
  // } else {
  //   window.mCfg = mCfg;
  // }
}(Zepto))

},{}],6:[function(require,module,exports){
/**
 * @description enhance.js 公共类，用于存放所有控件中使用的公共方法
 * @author  yuaniaolong@autohome.com.cn
 * @version v0.1
 * @data    2015-11-02
 */
;(function ($) {

  'use strict';

  var doc = document;


  $("body").children().on("click", function(){});

  $.mCfg.$document.on("touchmove", ".mask",function(e){
    // e.stopPropagation();
    e.preventDefault();
    // return false;
  })

  //显示导航菜单
  var $menuContrl = $(".icon-menu");
  if($menuContrl.length){
    $menuContrl.data("isClose", true).on("click", function(){
      var $this = $(this),
          $menu = $this.next(".layer-menu").length ? $this.next(".layer-menu") : ($this.parent().find(".layer-menu").length ? $this.parent().find(".layer-menu") : $this.parent().next(".layer-menu")),
          isClose = $this.data("isClose");
      if(isClose){
        $menu.removeClass($.mCfg.hideClass);
        $this.data("isClose", false);
      }else{
        $menu.addClass($.mCfg.hideClass);
        $this.data("isClose", true);
      }
    });
  }

  //扩展数组方法，包含
  Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
  }


  //动态加载js文件
  $.getScript = function (src, func) {
    var script = doc.createElement('script');
    script.src = src;
    script.async = 'async';
    if (func) {
      script.onload = func;
    }
    doc.getElementsByTagName('head')[0].appendChild(script);
  };


  $.setCookie = function (name, value, option) {

    var str = name + '=' + escape(value);
    var d = new Date();
    var time = 24 * 60 * 60 * 30;  // 默认30天
    var path = '/';                // 默认路径
    var domainName = '.autohome.com.cn';    // 默认域
    option = option || {};
    if (option) {
      if (option.expireHours) {
        time = option.expireHours * 3600 * 1e3;
      }
      d.setTime(d.getTime() + time);
      str += '; expires=' + d.toGMTString();

      if (option.path) {
        path = option.path;
      }
      str += '; path=' + path;

      if (option.domain) {
        domainName = option.domain;
      }
      str += '; domain=' + domainName;

      if (option.secure) {
        str += '; true';
      }
    }
    doc.cookie = str;
  };

  $.getCookie = function (name, defaultValue) {
    var coObj = doc.cookie;
    var coLen = coObj.length;
    var start = 0;
    var end = 0;
    if (coLen > 0) {
      start = coObj.indexOf(name + '=');
      if (start !== -1) {
        start = start + name.length + 1;
        end = coObj.indexOf(';', start);
        if (end === -1) {
          end = coLen;
        }
        return unescape(coObj.substring(start, end));
      }
    }
    return defaultValue;
  };

  // 模板实现
  var cache = {};
  $.tmpl = function (str, data) {
    data = data || {};
    if (str[0] === '#') {
      str = $(str).html();
    }
    str = str.trim();
    var fn = cache[str] ||
      new Function("o", "var p=[];with(o){p.push('" +
        str.replace(/[\r\t\n]/g, " ")
          .replace(/'(?=[^%]*%})/g,"\t")
          .split("'").join("\\'")
          .split("\t").join("'")
          .replace(/{%=(.+?)%}/g, "',$1,'")
          .split("{%").join("');")
          .split("%}").join("p.push('")
        + "');}return p.join('');");
    return fn.apply(data, [data]);
  };

  var ua = navigator.userAgent;

  $.os = {
    iphone : ua.indexOf('iPhone') !== -1,
    android: ua.indexOf('Android') !== -1
  };
  $.browser = {
    uc: ua.indexOf('UCBrowser') !== -1,
    qq: ua.indexOf('MQQBrowser/') !== -1
    // chrome:""
  };

  // alert(ua);

  $.getVersion = function (param) {
    // param格式 navigator.appVersion.split("MQQBrowser/")[1] MQQBrowser可换成UCBrowser
    var a = param.split('.');
    var b = parseFloat(a[0] + '.' + a[1]);
    return b;
  };

  $.getQueryString = function(key){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
       var str = url.substr(1);
       var strs = str.split("&");
       for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
       }
    }
    return key ? theRequest[key] : theRequest;
  }
})(Zepto);

},{}],7:[function(require,module,exports){
/*
 * 名称：延迟加载
 * 说明：data-src属性控制图片的延迟加载是否开启。
 * 注意：原生，不需要Zepto
 * 修改记录：
 *     1. 添加了对外的接口，使用方法。window.ahm.lazyload('.asyncdom')
 *     2. 添加了lazyload第二个参数，可以指定原src属性名，默认继续使用data-src
 *     3. 第一个参数可以直接传dom对象了，下面两种都是可以的
 *     window.ahm.lazyload(document.querySelector('.asyncdom'), "data-src2");
 *     window.ahm.lazyload('.asyncdom', "data-src2");
 */
(function lazyload(container, datasrc) {
  'use strict';
  datasrc = datasrc || 'data-src'; // 原src参数如果为空，那么默认使用data-src
  var doc = document;
  var nodes;
  var store = []; // 图片储存器
  var offset = 600; // 提前100像素开始加载
  var timeout = 250; // 异步的timeout
  var selector = 'img[' + datasrc + ']'; // 选择器
  var poll; // 定时器

  // 判断当前这个img元素是否将要显示
  function _inView(element) {
    var coords = element.getBoundingClientRect();
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <=
      (window.innerHeight || doc.documentElement.clientHeight) + offset);
  }

  // 异步获取图片
  function _throttle() {
    clearTimeout(poll);
    poll = setTimeout(_pollImages, timeout);
  }

  // 获取图片
  function _pollImages() {
    var len = store.length;

    if (len > 0) {
      for (var i = 0; i < len; i++) {
        var self = store[i];

        if (self && _inView(self)) {
          if (self.src === '' || self.src.indexOf('loading') > -1) {
            self.src = self.getAttribute(datasrc);
            self.removeAttribute(datasrc);
            store.splice(i, 1);
            len = store.length;
            i--;
          }
        }
      }
    } else {

      window.removeEventListener('scroll', _throttle);
      //      $(window).off('scroll',_throttle);
      clearTimeout(poll);
    }
  }

  if (container) {
    if (typeof(container) === 'string') {
      nodes = doc.querySelectorAll(container + ' ' + selector);
    } else if (typeof(container) === 'object') {
      nodes = container.querySelectorAll(selector);
    }
  } else {
    nodes = doc.querySelectorAll(selector);
  }

  for (var i = 0; i < nodes.length; i++) {
    store.push(nodes[i]);
  }
  _pollImages();
  window.addEventListener('scroll', _throttle, false);
  //  $(window).on('scroll',_throttle);
  window.ahm = window.ahm || {};
  window.ahm.lazyload = lazyload;
})();

},{}],8:[function(require,module,exports){
/**
 * @name        overslide.js 单行-横向过滚动导航
 * @description 让导航条支持触碰横向滚动操作，支持超出回滚、当前项居中效果。
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2015-11-09
 */
;(function($) {
  //  alert(2343);
  var el = $('[data-role*="overSlide"]');

  //  alert(24234);

  // $(el).each(function() {
  function Overslide($cur) {
    var self = this;
    self.el = $cur;
    self.cols = self.el.data('cols') || 4,
    self.fontSize = parseInt($.mCfg.$body.css("font-size")),
    self.width = self.el.data("width") || 80,

    // self.cookieName = self.el.data("cookie") || "";
    // alert(2233);
    self.init();
  }

  /**
   * 初始化：根据高亮选择，定位transalteX的X偏移量
   */
  Overslide.prototype.init = function() {
    var self = this;

    self.itemNumber = self.el.children().length;
    self.boxW = self.el.parent().width();
    self.itemW = self.width ? self.width*self.fontSize/16 : self.boxW / self.cols; // 每一项多宽？
    self.elW = self.itemW * self.itemNumber; // 真实的元素宽度
    self.actIndex = $('.active', self.el).index() || 0;
    self.overX = 0; // translate X值
    self.distX = 0; // 手抬起和放下的距离
    self.distMoveX = 0;
    self.startX = 0;
    // self.overY = 0; // translate Y值
    // self.distY = 0; // 手抬起和放下的距离
    // self.distMoveY = 0;
    self.startY = 0;

    if (self.width != "auto") {
      self.el.css('width', self.elW + 10 + "px")
        .children().css('width', self.itemW + "px");
    } else {
      var maxW = [];
      self.elW = 0;
      self.el.children().each(function() {
        self.elW += $(this).width();
        maxW.push($(this).width());
      });
//    console.log(self.elW);
      self.itemW = Math.max.apply({}, maxW);
      self.el.css('width', self.elW + 10 + "px");

    }

    // self.overX = -(self.itemW * self.actIndex);
    // // 非第一个选项选中，将选中项位移到居中
    // if (self.actIndex !== 0) {
    //   self.overX += (self.cols / 2 * self.itemW - (self.itemW / 2));
    // }
    if (self.elW - 10 > self.boxW) {

      self.el.on('touchstart', function(e){
        self.tStart(e, $(this))
      })
      .on('touchmove', function(e){
        self.tMove(e, $(this))
      })
      .on('touchend', function(e){
        self.tEnd(e, $(this))
      })
      .on('click', "a", function() {});
    }
    self.el.css({
      height:"auto"
    })
    // self.fixX(self.el);
  }


  Overslide.prototype.tStart = function(e, $cur) {
    var self = this;
    self.startX = e.changedTouches[0].clientX;
    self.startY = e.changedTouches[0].clientY;

  }

  Overslide.prototype.tMove = function(e, $cur) {
    var self = this,
        x = e.targetTouches[0].clientX - self.startX,
        y = e.targetTouches[0].clientY - self.startY;

    if(Math.abs(x) - Math.abs(y) > 0){
      e.preventDefault();
    }

    self.overX = x + self.distX;


    if(self.overX >= 30){
      self.overX = 30;
    }else if(self.overX < 0 && (Math.abs(self.overX) - (self.elW - $.mCfg.wW)) >= 30){
      self.overX = -(self.elW - $.mCfg.wW + 30);
    }
    self.setX(self.overX, $cur);
  }

  Overslide.prototype.tEnd = function(e, $cur) {
    var self = this;
    self.distX +=  e.changedTouches[0].clientX - self.startX;

    // 判断：如果在控件宽度哪滚动then继续滚动一段距离，否则（超出控件宽度产生过滚动），只fixX
    if (self.overX >= 30 || self.overX <= -(self.elW - $.mCfg.wW + 30)) {
      if(self.overX >= 30) {
        self.overX = self.distX = 0;
      }
      if(self.overX <= -(self.elW - $.mCfg.wW + 30)){
        self.overX = self.distX = -(self.elW - $.mCfg.wW);
      }

      $cur.animate({
        'translate3d': self.overX + 'px,0,0'
      }, 300, 'ease-out');
    }
  }

  /**
   * 设置 X 轴偏移量
   * @param {Number} x 偏移量具体数值
   */
  Overslide.prototype.setX = function(x, $cur) {
    var self = this;
    $cur.css('-webkit-transform', 'translate3d(' + x + 'px,0,0)');
  }

  /**
   * 计算是否滚过了，如果超出了，那么滚回来
   */
  // Overslide.prototype.fixX = function($cur) {
  //   var self = this;
  //   if (self.overX > 0) { // 向右过滚动
  //     $cur.animate({
  //       'translate3d': '0px,0,0'
  //     }, 300, 'ease');
  //     self.overX = 0;
  //   } else if (self.overX < -(self.elW - self.boxW)) { // 向左过滚动
  //     $cur.animate({
  //       'translate3d': (self.boxW - self.elW - 15) + 'px,0,0'
  //     }, 300, 'ease');
  //     self.overX = self.boxW - self.elW;
  //   }
  // }

  Overslide.prototype.tab = function(tabIndex){
    var self = this;
    if(!tabIndex) tabIndex = 0;

    if(tabIndex >= 0){
      var $children = self.el.children(),
          $curTab = $children.eq(tabIndex);
      $children.find(".item").removeClass("active");
      $curTab.find(".item").addClass("active");

      if($curTab.position().left + $curTab.width() - parseInt($curTab.find(".item").css("margin-right")) - 4 > $.mCfg.wW){
        self.overX = -(self.elW - $.mCfg.wW);
      }else{
        self.overX = 0;
      }
    }

    self.setX(self.overX, self.el);

  }

  $.extend($.fn, {
    tab:function(tabIndex){
      if(typeof tabIndex == "number"){
        if(!tabIndex) tabIndex = 0;
        $.overSlide[$(this).data("index")].tab(tabIndex);
      }
    },
    overSlideInit:function(){
      if(typeof $(this).data("index") !== 'undefined'){
        $.overSlide[$(this).data("index")].init();
      } else {
        new Overslide($(this));
      }
    }
  })

  if(el.length > 0){
    $.overSlide = [];
    el.each(function(i){
      $(this).data("index", i).find(".item").each(function(j){
        $(this).data("index", j);
      });
      $.overSlide.push(new Overslide($(this)));
    });

    //
    el.each(function(i){
      var $this = $(this);
      if($this.find(".active").length > 0){
        $this.tab($this.find(".active").data("index"));
      }
    });

  }

}(Zepto));

},{}],9:[function(require,module,exports){
/**
 * @name        pop.js 插件
 * @description 弹层显示
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.2
 * @time        2016-02-15
 */

;(function($) {
  'use strict';
  //backtop
  var el = $("[data-role=pop]");

  /*
   * class Pop 弹窗
   */

  function Pop(){
    var self = this;
    self.cross = ".icon-cross";
    self.popClass = ".pop";
    self.$curPop = $(self.popClass);
    self.suc = "pop-success";
    self.fail = "pop-fail";
    self.$mask = $(".mask-pop");
    self.init();
    // if($(self.popClass).length){
    self.event();
    // }

    // alert("test");
  }

  /**
   * function init 初始化
   */
  Pop.prototype.init = function(){

  }

  /**
   * function event 绑定事件
   */
  Pop.prototype.event = function(){
    var self = this,
        posT = 0;
    //打开
    el.each(function(i){
      $(this).on("click", function(){
        var $this = $(this),
            relation = $this.data("relation");
        self.open(relation);
      });

    });

    // //禁止弹出层触发滚动条
    // if(self.$curPop.height() <= $.mCfg.wH){
    //   $.mCfg.$document.on("touchmove", self.popClass ,function(e){
    //     e.stopPropagation();
    //     e.preventDefault();
    //     return false;
    //   });
    // }
    // alert(234324);

    //禁止输入框获取焦点默认事件
    var $inputs = self.$curPop.find("input, select, textarea")
    if($inputs.length > 0){
      $inputs.on("focus", function(e){
        e.stopPropagation();
        e.preventDefault();
        // alert(12312321321);
        var $download = $(".app-adv-top");
        var downloadHeight = 0;

        if($download.length && $download.css("display") != "none"){
          downloadHeight = $download.height();
        }
        self.$curPop.css({
            position: "relative",
            // top: document.body.scrollTop + $.mCfg.wH/2 + "px",
            top:(document.documentElement.clientHeight - self.$curPop.height())/2 - downloadHeight + "px",
            transform:"translate3d(-50%, 0, 0)",
            "-webkit-transform":"translate3d(-50%, 0, 0)"
        });

        // document.body.scrollTop = 0;
        return false;
      });

      $inputs.on("blur", function(e){
        e.stopPropagation();
        e.preventDefault();

        if($.browser.uc){
          self.$curPop.css({
              position: "fixed",
              top:"10%"
          });

        }else{
          self.$curPop.css({
              position: "fixed"
          });
        }
      })

    }

    // console.log($);
    // 关闭
    // $.mCfg.$document.on("click", self.cross + ", .mask, .pop-close", function(){
    //   e.stopPropagation();
    //   e.preventDefault();
    //   self.close();
    //   return false;
    // });
  }

  /**
   * function open 打开弹窗
   * @params string relationClass 弹层的class名称
   * @params boolean isMask true/false 是否显示蒙层
   */
  Pop.prototype.open = function(relationClass, isMask){
    if(isMask !== false) isMask = true;
    var self = this,
        $dest = relationClass instanceof Object ? relationClass : $("."+relationClass),
        parentClass = $dest.data("parent");
    // console.log(self.suc, self.fail);

    if(parentClass){
      $.each(parentClass.split(" "), function(i, content){
        $("."+content).css({
          opacity:0
        });
      })
    }

    if(isMask){
      if(self.$mask.length <= 0){
        $.mCfg.$body.append('<div class="mask mask-pop fn-hide"></div>');
        self.$mask = $(".mask-pop");
      }
      self.$mask.data("isClose", false);
    }

    if($dest.length > 0){

      if(isMask){
        self.$mask.on("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          self.close();
          // return false;
        });

        self.$mask.removeClass($.mCfg.hideClass);
        self.$mask.animate({
          opacity:1
        }, 200, "ease-in-out");
      }

      $(".icon-cross, .pop-close").one("click", function(e){
        e.stopPropagation();
        e.preventDefault();

        self.close();
        return false;
      });


      $dest.removeClass($.mCfg.hideClass);
      self.$curPop = $dest;
      // 判断屏幕高度
      if(self.$curPop.height() > $.mCfg.wH){
        self.$curPop.find(".pop-content, .pop-form").css({
          "height":"240px",
          "overflow-x":"hidden",
          "overflow-y":"auto"
        });
      }

      if($dest.find("input, select, textarea").length > 0){

        var $download = $(".app-adv-top");
        var downloadHeight = 0;

        if($download.length && $download.css("display") != "none"){
          downloadHeight = $download.height();
        }

        $dest.css({
            position: "relative",
            top:(document.documentElement.clientHeight - $dest.height())/2 - downloadHeight + "px",
            transform:"translate3d(-50%, 0, 0)",
            "-webkit-transform":"translate3d(-50%, 0, 0)"
        });

        $(".wrapper").css({
          position:"absolute",
          width:"100%",
          height:"100%",
          overflow:"hidden"
        });

        document.body.scrollTop = 0;
      }
    }
  }

  /**
   * function close 关闭弹窗
   * @params dom $cur 当前的关闭按钮dom
   */
  Pop.prototype.close = function(relationClass){
    var self = this,
        $dest = !relationClass ? self.$curPop : $("."+relationClass),
        parentClass = $dest.data("parent");
    $dest.addClass($.mCfg.hideClass);
    // alert("pop");
    var mastAnima = function(){
      // $.mCfg.$wrapper.attr("style", "");
      self.$mask.animate({
        opacity:0
      }, 200, "ease-in-out", function(){
          self.$mask.addClass($.mCfg.hideClass);
          $(".wrapper").attr("style", "");
          $dest.attr("style", "");
          self.$mask.data("isClose", true);

          var wH = $(window).height();
          $("body").css({
            height: $("body").height() <= wH ? wH : "auto"
          });

          // $("*").each(function(){
          //   var $this = $(this);
          //   if($this.css("position") == "fixed"){
          //     setTimeout(function(){
          //       $this.css("position","fixed");
          //       alert(22);
          //     }, 10);
          //   }
          // });
          // $(document).scrollTo(100);
          // self.$mask.off("click");
      });
    }

    if(parentClass){
        $.each(parentClass.split(" "), function(i, content){
          $("."+content).addClass($.mCfg.hideClass).css({
            opacity:1
          });
        })
    }
    mastAnima();
  }

  //公共弹窗方法
  // if($(".pop").length){
    $.pop = new Pop();
  // }


}(Zepto));

},{}],10:[function(require,module,exports){
/**
 * @name        prompt.js 插件
 * @description 公共提示框（规定时间消失）
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2016-02-26
 */

;(function($) {
  'use strict';

  // var el = $("[data-role=promptpop]");

  function PromptPop(config){
    var self = this;
    //默认配置参数
    self.cfg = $.extend({
      sign : 0, //0:普通提示，1:带警告提示，2:正在加载中提示
      content:"收藏成功",
      time : 300,
      showtime:3000
    }, config);

    self.signClass = "normal";

  }

  /**
   * function event 绑定事件
   */
  // PromptPop.prototype.event = function(){
  //   var self = this;
  //   self.$elm.on("click", function(){
  //     // alert(2344);
  //     self.open();
  //   });
  // }

  /**
   * function open 打开提示
   */
  PromptPop.prototype.open = function(options){
    var self = this,
        html = "";
    if(!options.sign) options.sign = 0;
    options = $.extend(self.cfg, options);
    if(options.sign == 1) {
      self.signClass = "warn";
    }else if(options.sign == 2){
      self.signClass = "loading";
    }else{
      self.signClass = "normal";
    }
    // options.sign == 1 ?  : ( ? options.signClass = "loading" : "normal");
    if($(".prompt-"+self.signClass).length > 0){
      $(".prompt-"+self.signClass).removeClass($.mCfg.hideClass).find("p").html(options.content);
    }else{
      $.mCfg.$body.append(self.tmpl(options));
    }

    //设置多行提示框样式
    if(options.sign == 3) {
      $(".prompt-"+self.signClass).css({width:440/16 + "rem"})
    }

    var $prompt = $(".prompt-"+self.signClass);
    $prompt.animate({
      opacity:1
    }, options.time, "ease-in-out",function(){
      if(options.sign != 2){
        setTimeout(function(){
          $prompt.animate({
            opacity:0
          }, self.cfg.time, "ease-in-out",function(){
            $prompt.addClass($.mCfg.hideClass);
          })
        }, options.showtime);
      }
    });
  }

  /**
   * function close 关闭提示
   */
  PromptPop.prototype.close = function(options){
    var self = this,
        $prompt = $(".prompt-"+self.signClass);
    $prompt.animate({
      opacity:0
    }, self.cfg.time, "ease-in-out",function(){
      $prompt.addClass($.mCfg.hideClass);
    })
  }

  /**
   * function tmp 拼装模板
   */
  PromptPop.prototype.tmpl = function(options){
    var self = this,
        html = "";

      html += "<div class='prompt-pop prompt-"+self.signClass+"'>";
      if(options.sign == 1){
        html += "<i class='iconfont icon-warn'></i>";
      }else if(options.sign == 2){
        html += "<span class='prompt-loading'><i class='iconfont icon-loading'></i><i class='iconfont icon-loading'></i></span>";
      }
      html += "<p>"+options.content+"</p>";
      html += "</div>";
      return html;
  }

  $.promptPop = new PromptPop();


}(Zepto));

},{}],11:[function(require,module,exports){
/**
 * @name        quickjump.js 插件
 * @description 字母定位插件
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2016-06-27
 */
//加载公公配置
;(function ($, undefined) {
  'use strict';

  var QuickJump = function(target, option) {
    this.oJumpTarget = target;
    this.$oCaption = $(this.oJumpTarget).find('[data-tips]');

    option = $.extend({
      titCell: 'quickJump',
      tips: true,
      tipsName: 'jump-tips'
    }, option);

    this.titCell = option.titCell;
    this.tips = option.tips;
    this.tipsName = option.tipsName;
    this.init();
  };

  QuickJump.prototype.init = function() {
    this.render();
    this.handle();
  };

  QuickJump.prototype.render = function() {
    var oJump = document.createElement('div');
    oJump.className = this.titCell;

    var oJumpUL = document.createElement('ul');
    oJumpUL.className = 'jump-ul';

    for (var liIndex = 0; liIndex < this.$oCaption.length; liIndex++) {
      var oLI = this.$oCaption[liIndex];
      var view = oLI.id;
      var tips = oLI.getAttribute('data-tips');
      oJumpUL.innerHTML += '<li class="jump-li" data-view="' + view + '">' + tips + '</li>';
    }

    oJump.appendChild(oJumpUL);
    this.oJumpTarget.appendChild(oJump);
  };

  QuickJump.prototype.handle = function() {
    var _this = this;
    var timer = null;
    var $oTitCell = $('.' + this.titCell);
    var tempX = 0;
    var tempY = 0;
    var tempObj = null;

    $oTitCell.on('touchstart touchmove', '.jump-li', function(event) {
      event.preventDefault();
      event.stopPropagation();
      gotoView(timer, event, _this.tips, _this.oTips);
    });

    if (this.tips) {
      $oTitCell.after('<div class="' + this.tipsName + '"></div>');
      this.oTips = document.querySelector('.' + this.tipsName);

      $oTitCell.on('touchend', '.jump-li', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
          _this.oTips.style.display = '';
        }, 100);
      });
    }

    function gotoView(timer, event, tipsFlag, oTips) {
      clearTimeout(timer);

      timer = setTimeout(function() {
        var x = event.changedTouches[0].clientX;
        var y = event.changedTouches[0].clientY;
        var oCurrent = document.elementFromPoint(x, y);

        if ($(oCurrent).hasClass('jump-li')) {
          tempX = x;
          tempY = y;
          tempObj = oCurrent;
        } else {
          var rect = tempObj.parentNode.getBoundingClientRect();
          var left = rect.left;
          var right = rect.right;
          var top = rect.top;
          var bottom = rect.bottom;
          if ((x <= left || x >= right) && (y <= top || y >= bottom)) {
            oCurrent = document.elementFromPoint(tempX, tempY);
          } else if (x <= left || x >= right) {
            oCurrent = document.elementFromPoint(tempX, y);
          } else if (y <= top || y >= bottom) {
            oCurrent = document.elementFromPoint(x, tempY);
          }
        }
        // alert(oCurrent.html());
        var viewID = oCurrent.getAttribute('data-view');

        if (viewID) {
          var oTarget = document.getElementById(viewID);
          oTarget.scrollIntoView();

          if (tipsFlag) {

            oTips.innerHTML = oTarget.getAttribute('data-tips');
            oTips.style.display = 'block';
          }
        }
      }, 10);

    }
  };

  QuickJump.prototype.destroy = function() {
    var $oTitCell = $('.' + this.titCell);
    $oTitCell.off('touchstart touchmove touchend').remove();
    $('.' + this.tipsName).remove();
  };


  $('[data-role="quickjump"]').each(function() {
    var titCell = $(this).data('titcell');
    var tips = $(this).data('tips');
    var tipsName = $(this).data('tipsname');

    new QuickJump(this, {
      titCell: titCell || 'quickJump',
      tips: tips,
      tipsName: tipsName || 'jump-tips'
    });
  });

  //全局调用
 $.QuickJump = QuickJump;
}(Zepto))

},{}],12:[function(require,module,exports){
/**
 * @name        search.js
 * @description 搜索页面
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2015-11-30
 */
;
(function ($, undefined) {


  var el = $("[data-role=search]");
  /*
   * @class search 搜索类
   */
  function Search($elem, config){
    var self = this;
    self.cfg = $.extend({
      searchUrl:"//souapi.che168.com/perception/car.ashx", //搜索数据接口
      searchClickUrl:"//m.che168.com/handler/carlist/SearchClick.ashx", //搜索跳转链接
      throttle: null, // input事件的节流器
      throttleTime: 300, // input事件的节流间隔设置，默认300ms
      searchEnterClass:".search-enter", //搜索框的class
      inputClearClass:".input-clear", // 清除搜索框内容
      searchResultClass: ".search-result", //搜索结果弹层
      searchResultDirectClass:".result-direct", //直接获取的结果
      searchResultHotClass:".result-hot", //热门搜索结构
      searchResultHisClass:".result-his", //历史记录
      searchHandleClass:".search-handle", //搜索操作
      clearHisClass:".his-clear", //搜索操作
      backClass:".back", //搜索操作
      findClass:".search-skip, .icon-search", //搜索操作
      resultListClass:".result-list", //搜索操作
      cookieName:"HistorySearch",
      callback: el.data("callback") ? new Function(el.data("callback"))() : function () { }
    }, config);

    self.$elem = $elem;
    self.$search = $(".search"); //搜索页面
    self.$inputClear = $(self.cfg.inputClearClass, self.$search); //搜索结果弹窗
    self.$input = $(self.cfg.searchEnterClass, self.$search); //搜索框
    self.$result = $(self.cfg.searchResultClass, self.$search); //搜索结果框
    self.$direct = $(self.cfg.searchResultDirectClass, self.$search); //搜索结果框
    self.$hot = $(self.cfg.searchResultHotClass, self.$search); //热门搜索结果
    self.$his = $(self.cfg.searchResultHisClass, self.$search); //历史搜索结果
    // self.$handle = $(self.cfg.searchHandleClass, self.$search); //搜索框操作区域
    self.$find = $(self.cfg.findClass, self.$search); //搜索框操作区域
    self.$clearHis = $(self.cfg.clearHisClass, self.$search); //搜索框操作区域
    self.$list = $(self.cfg.resultListClass, self.$search); //搜索框操作区域
    self.history = [];

    if(self.$elem.data('page') == 'applist'){
      self.cfg.searchUrl = '//souapi.che168.com/perception/appcar.ashx';
      self.cfg.searchClickUrl = '//m.che168.com/handler/carlist/appsearchclick.ashx';
    }

    self.init();
    self.event();
  }

  /**
   * @function init 初始化
   */
  Search.prototype.init = function(){
    var self = this;
    //判断历史搜索
    if(self.getHis()){
      self.appendHis(self.getHis());
    }

  }

  /**
   * @function event 事件绑定
   */
  Search.prototype.event = function(){
    var self = this;
    var $footerNav = $(".footer-nav");

    //打开搜索页面
    self.$elem.on("click", function(){
      self.$search.removeClass($.mCfg.hideClass);
      // $.mCfg.$wrapper.addClass($.mCfg.hideClass);
      $.mCfg.$wrapper.css({height:"0px"});
      $footerNav.length && $footerNav.addClass($.mCfg.hideClass);
      self.getInputFocus();
    });

    $(".search-input").on("touchmove", function(e){
      e.stopPropagation();
      e.preventDefault();
    });

    //进入页面清除数据
    $.mCfg.$win.on("pageshow", function(e){
      self.$input.val("");
    });


    self.$search.on("input focus", self.cfg.searchEnterClass, function(e){
      if(e.type == "focus"){
        document.documentElement.scrollTop = document.body.scrollTop = self.$search.offset().top;
      }

      self.updateTip($(this));
      // return false;
    });

    self.$inputClear.on("click", function(){
      self.clearInput(self);
    });

    //记录历史
    self.$result.on("click", self.cfg.searchResultDirectClass+" li,"+self.cfg.searchResultHotClass+ " li", function(e){
      var $this = $(this);
      self.addHis($this.find("span").text(), $this.find("a").attr("href"));
    });

    self.$find.on("click", function(e){
      var $this = $(this);
      var val = $this.parent().find(self.cfg.searchEnterClass).val();
      if(val){
        location.href = self.transUrl(self.cfg.searchClickUrl+"?kw="+val+"&prov=" + self.$input.data("province")); // 省份;
        if(self.$direct.children().length > 0){
          self.addHis(val, self.transUrl(self.cfg.searchClickUrl+"?kw="+val +"&prov=" + self.$input.data("province")));
        }
      }
    });


    self.$input.on("keyup", function(e){
      if(e.keyCode == 13){
        var $this = $(this);
        var val = $this.val();
        if(val){
          location.href = self.transUrl(self.cfg.searchClickUrl+"?kw="+val+"&prov=" + $this.data("province")); // 省份;
          if(self.$direct.children().length > 0){
            self.addHis(val, self.transUrl(self.cfg.searchClickUrl+"?kw="+val +"&prov=" + $this.data("province")));
          }
        }
      }
    });

    //清空历史记录
    self.$result.on("click", self.cfg.clearHisClass, function(e){
      var $this = $(this);
      self.clearHis();
    })

    //关闭搜索层
    // self.$result.on("click", self.cfg.closeClass+","+self.cfg.resultListClass, function(e){
    //   var $this = $(this);
    //   self.$result.addClass($.mCfg.hideClass);
    // })

    //返回上一页
    self.$search.on("click", self.cfg.backClass, function(e){
      var $this = $(this);
      self.$search.addClass($.mCfg.hideClass);
      $footerNav.length && $footerNav.removeClass($.mCfg.hideClass);
      $.mCfg.$wrapper.css("height", "auto");
    })

  }

  /**
   * @function updateTip 输入框在输入或者获得焦点，显示历史层或者AJAX请求数据
   * @param $cur dom 输入框
   */
  Search.prototype.updateTip = function($input){
    // console.info('输入框在输入或者获得焦点，updateTip');
    var self = this,
        val = $input.val(),
        province = $input.data("province"); // 省份
    if (!self.cfg.throttle) {
      self.cfg.throttle = setTimeout(function () {
        // 输入框有值

        if (val !== '') {
          // 根据关键字搜索结果
          self.getJsonp(val, province);
          self.$inputClear.show();

          self.$inputClear.removeClass("fn-hide");
          if(self.$hot.length > 0) {
            self.$hot.addClass($.mCfg.hideClass);
            self.$hot.prev(".tt").addClass($.mCfg.hideClass);
          }
          if(self.$his.length > 0) {
            self.$his.addClass($.mCfg.hideClass);
            self.$his.prev(".tt").addClass($.mCfg.hideClass);
          }
          self.$clearHis.addClass($.mCfg.hideClass);
          self.$find.addClass("active");
        }else{
          //判断热门搜索是否存在
          if(self.$hot.length <= 0){
            var html = "";
            html += "<h3 class=\"tt\">热门搜索</h3>";
            html += "<ul class=\"result-hot\"></ul>";
            self.$list.append(html);
            self.$hot = $(self.cfg.searchResultHotClass, self.$search);
          }
          if(self.$hot.children().length > 0){
            self.$hot.removeClass($.mCfg.hideClass);
            self.$hot.prev(".tt").removeClass($.mCfg.hideClass);
          } else {
            self.getJsonp("", province);
          }

          self.appendHis(self.getHis());

          //删除直达搜索结果
          if(self.$direct.length > 0){
            self.$direct.html("");
          }

          self.$inputClear.addClass($.mCfg.hideClass);
          self.$find.removeClass("active");
        }
        self.$result.removeClass($.mCfg.hideClass);
        //关闭操作

          if(self.history.length <= 0){
            self.$clearHis.addClass($.mCfg.hideClass);
          }
        // }
        self.cfg.throttle = null;
      }, self.cfg.throttleTime);
    }
  }

  /*
   * @function getJson 获得JSONP数据，到这里异步出去了，后面的操作需要在成功回调函数中完成
   * @param inputword string 需要搜索的关键字
   * @param province string 省份
   */
  Search.prototype.getJsonp = function(inputword, province) {
    // console.info('获取JSONP结果：getJsonp');
    var self = this,
        params = {
          _appid:"2sc.m",
          kw: encodeURIComponent(inputword),
          prov: province
        };
    if(!inputword){
      params.pageindex = 0;
      params.sourcename = "";
    }

    var page = self.$elem.data('page');
    if(page) {
      if(page == 'appindex') {
        params.safe = $.getQueryString('safe');
        params.sourcename = $.getQueryString('sourcename');
      }
    }
    // console.log(params);
    $.ajax({
      url: self.cfg.searchUrl,
      data: params,
      dataType: 'jsonp',
      jsonpCallback:"search",
      jsonp:"_callback",
      cache:true,
      success: function (data) {

        if (data.returncode === 0) {
          if(!inputword){
            self.render(self.$hot, self.getTemplateData(data.result));
          }else{
            //判断direct是否存在
            if(self.$direct.length <= 0){
              var html = "";
              html += "<ul class=\"result-direct\"></ul>";
              self.$list.append(html);
              self.$direct = $(self.cfg.searchResultDirectClass, self.$search);
            }else{
              self.$direct.html("");
            }
            self.render(self.$direct, self.getTemplateData(data.result));
            if(self.$direct.children().length > 0){
              self.$hot.addClass($.mCfg.hideClass);
              self.$hot.prev(".tt").addClass($.mCfg.hideClass);
            }
          }
        }
      }
    });
  }

  /*
   * 嵌套模板
   * @function getTemplateData
   */
  Search.prototype.getTemplateData = function(result){
    var self = this;
    var tpl = "",
        i = 0,
        len = result["list"].length;
    if(len > 0){
      // tpl += "<ul class='search-result list-line'>";
      var sadd = "&sourcename=" + $('#sourcename').val() + "&pvareaid=" + $('#pvareaid').val();
      for (i; i < len; i++) {
          if (result["list"][i].numfound) {
              tpl += "<li><a href='" + self.transUrl(result["list"][i].url.replace('http://m.che168.com', '') + sadd) + "'><span>" + result["list"][i].keyword + "</span><em>约有" + result["list"][i].numfound + "车源</em></a></li>";
          }
          else {
              tpl += "<li><a href='" + self.transUrl(result["list"][i].url.replace('http://m.che168.com', '') + sadd) + "'><span>" + result["list"][i].keyword + "</span></a></li>";
          }
      }
      // tpl += "</ul>";
    }
    return tpl;
  }

  Search.prototype.render = function($target, tpl){
    var self = this;
    if(tpl){
      $target.html(tpl);
      $target.prev(".tt").removeClass($.mCfg.hideClass);
      $target.removeClass($.mCfg.hideClass);
      self.cfg.callback("none")
    }else{
      $target.addClass($.mCfg.hideClass);
      $target.prev(".tt").addClass($.mCfg.hideClass);
      self.cfg.callback("");
    }

  }

  /*
   * 输入框右侧叉子，清空输入框中内容
   * @function clearInput
   */
  Search.prototype.clearInput = function(self){
    // console.info('清空输入：clearInput');
    self.$input.val('');
    self.getInputFocus();
    self.$result.addClass($.mCfg.hideClass);
    self.cfg.callback("");
  }

  /*
   * 过滤关键字中特殊字符
   * @function 获取焦点
   */
  Search.prototype.getInputFocus = function() {
    window.scrollTo(0, 0);
    var self = this;
    self.$input.trigger('click').focus();
    // setTimeout(function () {
    //   self.$input.trigger('click').focus();
    // }, 20)
  }

  /*
   * 获取历史数据
   * @function 获取历史数据
   */
  Search.prototype.addHis = function(keyword, href) {
    var self = this;
    if (!self.history.contains(keyword)) {
      self.history.push(keyword+"|"+href);
      $.setCookie(self.cfg.cookieName, self.history.join(","), { 'path': "/", 'domain': location.hostname});
    }
  }

  /*
   * 获取历史数据
   * @function 获取历史数据
   */
  Search.prototype.getHis = function() {
    var self = this;
    return $.getCookie(self.cfg.cookieName);
  }

  /*
   * 封装历史记录
   * @function 封装历史记录
   */
  Search.prototype.appendHis = function(his) {
    var self = this;
    if(his){
      self.history = his.split(",");
      if(self.$his.length <= 0){
        var html = "";
        html += "<h3 class=\"tt\">最近搜索<i class='iconfont icon-clear his-clear'></i></h3>";
        html += "<ul class=\"result-his\"></ul>";
        self.$list.prepend(html);
        self.$his = $(self.cfg.searchResultHisClass, self.$search);
      }else{
        self.$his.prev(".tt").removeClass($.mCfg.hideClass);
        self.$his.removeClass($.mCfg.hideClass);
      }

      var history = his.split(","),
          len = history.length,
          tpl = "",
          i = 0;

      var sadd = "&sourcename=" + $('#sourcename').val() + "&pvareaid=" + $('#pvareaid').val();
      for (i; i < len; i++) {
          var info = history[i].split("|");
          tpl += "<li><a href='" + info[1] + sadd + "'><span>" + info[0] + "</span></a></li>";
      }
      self.$his.html(tpl);
    }
  }

  /*
   * 清除历史数据
   * @function 清除历史数据
   */
  Search.prototype.clearHis = function() {
    var self = this;

    if(self.$his.children().length > 0){
      self.$his.prev(".tt").addClass($.mCfg.hideClass);
      self.$his.html("");
    }
    $.setCookie(self.cfg.cookieName, "", { 'path': "/", 'domain': location.hostname});
    // console.log();
    // self.$clearHis.addClass($.mCfg.hideClass);
  }

  /*
   * 过滤关键字中特殊字符
   * @function valueFilter
   * @params val string 关键字
   */
  Search.prototype.valueFilter = function(val) {
    return $.trim(val.replace(/<|>|!#$%^&#$%^&amp;*()\[\]\{\}\?,\&#$%^&amp;*()\[\]\{\}\?,\&lt;\&#$%^&amp;*()\[\]\{\}\?,\&lt;\&gt;，。【】（）/g, ''));
  }

  /*
   * 用于判断开发是否有使用转场协议
   * @function transUrl
   * @param String url 链接地址
   */
  Search.prototype.transUrl = function(url){
    return !typeof OpenTransUrl ? OpenTransUrl(url, 1) : url;
  }


  if(el.length > 0){
    new Search(el);
  }
}(Zepto))

},{}],13:[function(require,module,exports){
/**
 * @name        searchcity.js
 * @description 搜索城市
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.1
 * @time        2016-06-29
 */
;
(function($, undefined) {
  'use strict';
  // alert(233);
  /*
   * @class search 搜索类
   */
  function SearchCity(config) {
    var self = this;
    self.$search = $('[data-role=searchcity]'); //搜索页面
    self.cfg = $.extend({
      searchUrl: "//m.che168.com/Handler/CarList/SearchCity.ashx", //搜索数据接口
      // searchUrl: "Handler/CarList/SearchCity.ashx", //搜索数据接口
      throttle: null, // input事件的节流器
      throttleTime: 300, // input事件的节流间隔设置，默认300ms
      searchEnterClass: ".search-enter", //搜索框的class
      inputClearClass: ".input-clear", // 清除搜索框内容
      // noResultClass:".result-no", // 清除搜索框内容
      searchResultClass: ".search-result", //搜索结果弹层
      areaClass: ".area-content",
      callback: self.$search.data("callback") ? new Function(self.$search.data("callback"))() : function() {}
    }, config);


    self.$inputClear = $(self.cfg.inputClearClass, self.$search); //搜索结果弹窗
    self.$input = $(self.cfg.searchEnterClass, self.$search); //搜索框
    // self.$noResult = self.$search.parent().find(self.cfg.noResultClass); //搜索结果框
    self.$area = self.$search.parent().find(self.cfg.areaClass); //搜索结果框

    self.$list = self.$search.parent().find(self.cfg.searchResultClass); //搜索框操作区域
    self.init();
    self.event();
  }


  /**
   * @function init 初始化
   */
  SearchCity.prototype.init = function() {
    var self = this;
  }

  /**
   * @function event 事件绑定
   */
  SearchCity.prototype.event = function() {
    var self = this;
    //进入页面清除数据
    $.mCfg.$win.on("pageshow", function(e) {
      self.$input.val("");
    });

    self.$search.on("input focus", self.cfg.searchEnterClass, function() {
      self.updateTip($(this));
    });

    self.$inputClear.on("click", function() {
      self.clearInput(self);
    });

    //记录cookie

    $(".block-area .aside-main, .block-area-sub .aside-main").on("click", "a", function() {
      var aid=parseInt($(this).attr("aid")),
          apy=$(this).attr("apy");
      if(aid%10000 > 0 || aid == 110000 || aid === 500000|| aid===310000 || aid === 120000) {
        self.writeCityHistory(aid, apy);
      }
    });
  }

  /**
   * @function writeCityHistory 记录历史数据
   * @param {number} 城市aid
   */

  SearchCity.prototype.writeCityHistory = function(city, apy) {
    var carhid = $.getCookie('citybrowsehistory', '');
    if (carhid == null) carhid = '';
    var carhidsplit = carhid.split(',');
    for (i = 0; i < carhidsplit.length; i++) {
      if (typeof carhidsplit[i] != 'undefined' && carhidsplit[i].length > 0) {
        if (city == carhidsplit[i]) {
          carhidsplit.splice(i, 1);
        }
      }
    }
    var cont = 0;
    if (carhidsplit.length < 3) {
      cont = carhidsplit.length;
    } else {
      cont = 2;
    }



    carhid = '';
    for (var i = 0; i < cont; i++) {
      if (typeof carhidsplit[i] != 'undefined' && carhidsplit[i].length > 0) {
        carhid += carhidsplit[i] + ',';
      }
    }

    if (cont > 0) {
      carhid = carhid.substring(0, carhid.length - 1);
    }

        if (carhid != '' && $.trim(carhid).length > 0) {
          carhid = city + ',' + carhid;
        } else {
          carhid = ""+city;
        }
    $.setCookie('citybrowsehistory', carhid, {
      domain: '.che168.com',
      expireHours: 30 * 24 * 60 * 60
    });

    $.setCookie('uarea', city + '|' + apy, { domain: '.che168.com', expireHours: 24 * 30 });
  };

  /**
   * @function updateTip 输入框在输入或者获得焦点，显示历史层或者AJAX请求数据
   * @param $cur dom 输入框
   */
  SearchCity.prototype.updateTip = function($input) {
    // console.info('输入框在输入或者获得焦点，updateTip');
    var self = this,
      val = $input.val();
    if (!self.cfg.throttle) {
      self.cfg.throttle = setTimeout(function() {
        // 输入框有值

        if (val !== '') {
          // 根据关键字搜索结果
          self.getJsonp(val);
          self.$inputClear.show();
          self.$inputClear.removeClass($.mCfg.hideClass);
        } else {
          self.$inputClear.addClass($.mCfg.hideClass);
          self.$list.addClass($.mCfg.hideClass);
          self.$area.removeClass($.mCfg.hideClass);
        }

        self.cfg.throttle = null;
      }, self.cfg.throttleTime);
    }
  }

  /*
   * @function getJson 获得JSONP数据，到这里异步出去了，后面的操作需要在成功回调函数中完成
   * @param inputword string 需要搜索的关键字
   */
  SearchCity.prototype.getJsonp = function(inputword) {
    // console.info('获取JSONP结果：getJsonp');
    var self = this;
    $.ajax({
      url: self.cfg.searchUrl,
      data: 'kwCity=' + encodeURIComponent(inputword) + "&pagename=" + self.$search.data('page') + "&" + ($("#carlistfilter").length ? SolrFilterInfo.Convert($("#carlistfilter").val()).ToJString() : ""),
      dataType: 'jsonp',
      jsonpCallback: "searchcity",
      jsonp: "_callback",
      cache: true,
      success: function(data) {
        if (data.returncode === 1) {
          if (!inputword) {
            self.$area.removeClass($.mCfg.hideClass);
            self.$list.addClass($.mCfg.hideClass);
          } else {

            if (data.result.length <= 0) {
              self.$list.addClass($.mCfg.hideClass);
              self.$area.removeClass($.mCfg.hideClass);
            } else {
              self.$area.addClass($.mCfg.hideClass);
              self.render(self.$list, self.getTemplateData(data.result));
              self.$list.removeClass($.mCfg.hideClass);
            }
          }
        }
      }
    });

  }

  /*
   * 嵌套模板
   * @function getTemplateData
   */
  SearchCity.prototype.getTemplateData = function(result) {
    var tpl = "",
      i = 0,
      list = result,
      len = result.length;
    if (len > 0) {
      // tpl += "<ul class='search-result list-line'>";
      for (i; i < len; i++) {
        if (list[i].province == 1) {
          tpl += "<span class='item' data-role='aside' data-relation='block-area-sub' data-url=" + list[i]["city_url"] + " data-title=" + list[i].keyword + ">" + list[i].keyword + "</span>";
        } else {
          tpl += "<a class='item' href='" + list[i]["city_url"] + "' aid=" + list[i].id + " apy=" + list[i].pinyin + ">" + list[i].keyword + "</a>";
        }
      }
      // tpl += "</ul>";
    }
    return tpl;
  }

  SearchCity.prototype.render = function($target, tpl) {
    var self = this;
    if (tpl) {
      $target.html(tpl);
      $target.prev(".tt").removeClass($.mCfg.hideClass);
      $target.removeClass($.mCfg.hideClass);
      self.cfg.callback("none")
    } else {
      $target.addClass($.mCfg.hideClass);
      $target.prev(".tt").addClass($.mCfg.hideClass);
      self.cfg.callback("");
    }

  }

  /*
   * 输入框右侧叉子，清空输入框中内容
   * @function clearInput
   */
  SearchCity.prototype.clearInput = function(self) {
    // console.info('清空输入：clearInput');
    self.$input.val('');
    self.getInputFocus();
    self.$list.addClass($.mCfg.hideClass);
    self.cfg.callback("");
  }

  /*
   * 过滤关键字中特殊字符
   * @function 获取焦点
   */
  SearchCity.prototype.getInputFocus = function() {
    window.scrollTo(0, 0);
    var self = this;
    setTimeout(function() {
      self.$input.focus();
    }, 20)
  }


  /*
   * 过滤关键字中特殊字符
   * @function valueFilter
   * @params val string 关键字
   */
  SearchCity.prototype.valueFilter = function(val) {
    return $.trim(val.replace(/<|>|!#$%^&#$%^&amp;*()\[\]\{\}\?,\&#$%^&amp;*()\[\]\{\}\?,\&lt;\&#$%^&amp;*()\[\]\{\}\?,\&lt;\&gt;，。【】（）/g, ''));
  }

  $.SearchCity = SearchCity;

  // if(el.length > 0){
  //   new $.SearchCity();
  // }
}(Zepto))

},{}],14:[function(require,module,exports){
/**
 * @file        select.js
 * @description 选择框插件
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.2
 * @time        2016-07-18
 */

;(function($) {
  'use strict';

  //动态改变上牌时间
  var el = $("[data-role*=select]");

  /**
   * tab切换
   *
   * @class ClassSelect
   */
  var ClassSelect = function($elem){
    var self = this;
    self.el = $elem;
    self._event();
  };

  /**
   * 事件绑定
   *
   * @private
   */
  ClassSelect.prototype._event = function(){
    this.el.find("select").on("change", function() {
      var $this = $(this),
          val = $this.val(),
          $parent = $this.parents(".select"),
          $tt = $parent.find(".placeholder").length ? $parent.find(".placeholder") : $parent.find("time") ;
      $tt.addClass("active").html(val);
    });
  };

  /**
   * 封装zepto控件，select选择框
   *
   * @return {Object} 返回当前元素
   */
  $.fn.select = function(){
    return this.each(function() {
      var that = $(this);
      var data = that.data('2sc.select');

      if (!data) {
        that.data('2sc.select', (data = new ClassSelect(that)));
      }
    });
  };

  if(el.length){
    new ClassSelect(el);
  }

}(Zepto))

},{}],15:[function(require,module,exports){
/*
* @ uc 与 qq 分享功能，非UC或QQ浏览器，调用微博/qq空间分享
* @ author liuxinwei 邮箱liuxinwei@autohome.com.cn
* @ version 1.2.0
* 修改纪录：
* 1. 使用delegate方式进行事件绑定，为了兼容当前页加载更多的效果 by caichao
* 2. dataset换成了$.data方法，减少代码量 by caichao
* 3. 加入了微博的分享，当非QQ或UC浏览器，调用微博的share service进行分享 by caichao
* 4. 统计用请求地址使用$.get进行记录 by caichao
* 5. 追加分享来源标示 target。1为浏览器分享（默认），2为微博打底http方式分享 by caichao
* 6. 追加plusOne方法，进行dom中的计数＋1和，后台＋1统计的jsonp请求 by caichao
* 7. 追加qq空间分享及分享层 by maxingguo
*/

(function ($) {
  'use strict';

  // 相关参数
  // qq浏览器加载资源
  var qApiSrc = {
    lower : 'http://3gimg.qq.com/html5/js/qb.js',     // 低版本
    higher: 'http://jsapi.qq.com/get?api=app.share'  // 高版本
  };
  var cfg = $.mCfg;
  var isqqBrowser = $.browser.qq;    // 判断qq浏览器
  var isucBrowser = $.browser.uc;    // 判断uc浏览器
  var weiboAppKEY = cfg.weiboAppKey; // 微博的AppKey
  // 版本号
  var version = {
    uc: '',
    qq: ''
  };
  var tap = 'click';
  var oShareEle = null;      // 分享按钮
  var shareInfo = {};        // 分享信息
  var shareDomFlag = false;  // 分享DOM

  if (tap === 'click') {
    $('body').children().click(function () {});
  }

  /**
  * @loadFn 加载主函数，在qq加载完资源后
  */
  function loadFn() {

    var selector = '[data-role="share"]';  // 获取绑定元素

    $(document).on(tap, selector, function (e) {

      e.preventDefault();

      oShareEle = $(this);
      shareInfo = {
        url    : oShareEle.data('share-url') || document.location.href,  // 分享网址
        title  : oShareEle.data('share-title') || document.title,      // 分享标题
        pics   : oShareEle.data('share-img'),                           // 分享图片（uc分享不支持，自动抓取）
        summary: oShareEle.data('share-description')                 // 分享摘要
      };
      var $mask = $(".mask");
      if($mask.length <= 0){
        cfg.$body.append("<div class='mask fn-hide'></div>");
      }

      if(!isucBrowser && !isqqBrowser){
        $(".mask").removeClass(cfg.hideClass).animate({
          opacity:"1"
        }, 200, "ease-in-out", function(){
          if($(".mask").hasClass(cfg.hideClass)) $(".mask").removeClass(cfg.hideClass);
        });
      }


      if (isqqBrowser) { // qq浏览器
        if (typeof (browser) !== 'undefined') {
          window.browser.app.share({
            url        : shareInfo.url,
            title      : shareInfo.title,
            description: shareInfo.summary,
            img_url    : shareInfo.pics
          });
        }
        else {
          if (typeof (window.qb) !== 'undefined') {
            window.qb.share({
              url        : shareInfo.url,
              title      : shareInfo.title,
              description: shareInfo.summary,
              img_url    : shareInfo.pics
            });
          }
        }
        // 向后台发送＋1请求和统计信息
        plusOne(oShareEle, 1);

      }
      else if (isucBrowser) { // uc浏览器
        if ($.os.android) {
          window.ucweb.startRequest(
            'shell.page_share',
            [
              shareInfo.title,
              shareInfo.summary,
              shareInfo.url,
              '',
              '',
              shareInfo.title,
              ''
            ]
          );
        }
        else if ($.os.iphone) {
          window.ucbrowser.web_share(shareInfo.title, shareInfo.summary, shareInfo.url, '', '', '@二手车之家', '');
        }
        // 向后台发送＋1请求和统计信息
        plusOne(oShareEle, 1);

      }
      else { // 非qq或uc浏览器
        if (shareDomFlag) {
          $('.j-share').removeClass(cfg.hideClass);
          return;
        }

        var shareDom = '' +
        '<section class="w-sharing j-share">'+
          '<div class="module">'+
            '<ul class="method">'+
              '<li>'+
                '<a href="#" class="share-weibo">'+
                  '<i class="icon-sharing icon-sharing-weibo"></i>'+
                  '<strong>新浪微博</strong>'+
                '</a>'+
              '</li>'+
              '<li>'+
                '<a href="#" class="share-qzone">'+
                  '<i class="icon-sharing icon-sharing-qq-zone"></i>'+
                  '<strong>QQ空间</strong>'+
                '</a>'+
              '</li>'+
            '</ul>'+
            '<a class="cancel" href="javascript:;">取消</a>'+
          '</div>'+
        '</section>';

        $('body').append(shareDom);

        $('body').on('touchmove.share', function (e) {
          e.preventDefault();
        }, false);

        shareDomFlag = true;
      }

    });

  }

  // 分享到微博
  $(document).on(tap, '.j-share .share-weibo', function (e) {
    e.preventDefault();

    // 渠道为微博，分享url后追加channel参数为5
    shareInfo.url += '&channel=5';
    plusOne(oShareEle, 2, function () {
      var shareURL = 'http://service.weibo.com/share/mobile.php?';
      shareURL += 'appkey=' + weiboAppKEY;
      shareURL += '&title=' + encodeURIComponent(shareInfo.title)+" "+encodeURIComponent(shareInfo.summary);
      shareURL += '&url=' + encodeURIComponent(shareInfo.url);
      shareURL += '&pic=' + encodeURIComponent(shareInfo.pics);
      location.href = shareURL;
    });
  });
  // 分享到qq空间
  $.mCfg.$document.on(tap, '.j-share .share-qzone', function (e) {
    e.preventDefault();
    // console.log(shareInfo);
    // 渠道为Qzone，分享url后追加channel参数为4
    shareInfo.url += '&channel=4';
    plusOne(oShareEle, 2, function () {
      var shareURL = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';

      location.href = shareURL + $.param(shareInfo);
    });
  });

  // 取消分享
  $.mCfg.$document.on(tap, '.j-share .cancel, .mask', function (e) {
    e.preventDefault();
    $('body').off('touchmove.share');
    $(".j-share").addClass(cfg.hideClass);
    $(".mask").animate({opacity:"0"}, 200, "ease-in-out", function(){
      $(".mask").addClass(cfg.hideClass);
    })
  });

  /**
   * 分享数加一 && 统计点击数
   * @param {String} url    请求地址
   * @param {Number} target 统计用的target
   */
  function plusOne(el, target, callback) {

    var url = el.data('share-action');  // 统计用，GET请求地址
    var count = el.data('share-count'); // 分享次数

    $('.number', el).html(++count);     // 分享次数＋1

    if (url) {

      $.ajax({
        dataType: 'jsonp',
        url     : url + '&datatype=jsonp' + '&target=' + target,
        timeout : 1000,
        success : function () {
          // if (data.returncode !== 0) return; 不判断用户是否登录，直接执行回调
          if (callback) {
            callback();
          }
        },
        error: function () {
          if (callback) {
            callback();
          }
        }
      });
    }else{
      if (callback) {
        callback();
      }
    }
  }


  /**
   * 根据不同版本号的qq浏览器加载不同接口
   */
  function isloadqqApi() {

    version.qq = isqqBrowser ? $.getVersion(navigator.appVersion.split('MQQBrowser/')[1]) : 0;
    version.uc = isucBrowser ? $.getVersion(navigator.appVersion.split('UCBrowser/')[1]) : 0;
    if (isqqBrowser) {
      var url = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
      $.getScript(url, function () {
        // 加载函数
        loadFn();
      });
    }
    else {
      // 加载函数
      loadFn();
    }
    return;
  }

  isloadqqApi();


})(Zepto);

},{}],16:[function(require,module,exports){
/**
 * @file        tab.js
 * @description 切换tab内容
 * @author      yuaniaolong@autohome.com.cn
 * @version     v0.2
 * @time        2016-07-13
 */

;(function($) {
  'use strict';

  //引入公共类
  // var ClassPublic = require("../module/public.js");

  var el = $('[data-role*="tab"]');

  /**
   * tab切换
   *
   * @class ClassTab
   * @param {object} $elem   执行控件的元素对象
   * @param {object} options 传参
   */
  var ClassTab = function($elem, options) {
    // ClassPublic.call(this);
    var self = this;
    self.el = $elem;
    self.options = $.extend({}, self.DEFAULTS, typeof options === 'object' && options);
    self.init();
  };

  /**
   * 默认参数（静态变量）
   *
   * @type {object}
   * @public
   */
  ClassTab.prototype.DEFAULTS = {
    item: '.tab-content'
  };

  /**
   * 初始化
   * @function init
   * @public
   */
  ClassTab.prototype.init = function() {
    var self = this;
    self._event();
  };

  /**
   * 事件绑定
   *
   * @function _event
   * @private
   */
  ClassTab.prototype._event = function() {
    var self = this;
    var $itemContent = $(self.options.item);
    // tab切换
    self.el.each(function(i) {
      var $item = $(this).children();
      $item.on('click', function() {
        var $curItem = $(this);
        var _index = $curItem.index();
        if ($curItem.parents('[data-role*="overSlide"]').length) {
          $curItem.parents('[data-role*="overSlide"]').tab(_index);
        } else {
          if ($curItem.hasClass('item')) {
            $item.removeClass('active');
            $curItem.addClass('active');
          } else {
            $item.find('.item').removeClass('active');
            $curItem.find('.item').addClass('active');
          }
        }
        $itemContent.addClass('fn-hide');
        $itemContent.eq(_index).removeClass('fn-hide');
      });
    });
  };

  /**
   * 封装zepto控件，tab切换
   *
   * @param {object} option 自定义参数{content:选择器}，需要tab切换的内容
   * @return {Object} 返回当前元素
   */
  $.fn.tab = function(option){
    if (typeof option === 'object' || typeof option === 'string') {
      return this.each(function() {
        var that = $(this);
        var data = that.data('2sc.tab');
        var options = $.extend({}, that.data(), typeof option === 'object' && option);

        if (!data) {
          that.data('2sc.tab', (data = new ClassTab(that, options)));
        }

        if(option === "string") {
          data[option]();
        }
      });
    }
  };

  //监控控件，一进入页面就执行
  if(el.length) {
    el.each(function(){
      new ClassTab($(this), $(this).data());
    });

  }



}(Zepto));

},{}]},{},[1]);
