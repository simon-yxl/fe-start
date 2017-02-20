;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-xiazai" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M915.972635 490.681462c-14.129812 0-25.582655 11.453866-25.582655 25.582655l0 364.297007c0 8.463766-6.885827 15.349593-15.349593 15.349593l-736.780463 0c-8.463766 0-15.349593-6.885827-15.349593-15.349593l0-364.297007c0-14.128789-11.453866-25.582655-25.582655-25.582655s-25.582655 11.453866-25.582655 25.582655l0 364.297007c0 36.676317 29.838585 66.514903 66.514903 66.514903l736.780463 0c36.676317 0 66.514903-29.838585 66.514903-66.514903l0-364.297007C941.55529 502.135328 930.102447 490.681462 915.972635 490.681462z"  ></path>'+
      ''+
      '<path d="M488.561172 775.854387c4.995781 4.995781 11.541871 7.492648 18.090007 7.492648s13.094226-2.496867 18.090007-7.492648l241.500263-241.500263c9.990538-9.990538 9.990538-26.188452 0-36.178991-9.991562-9.990538-26.188452-9.990538-36.178991 0L532.23281 696.002734 532.23281 102.848413c0-14.128789-11.453866-25.582655-25.582655-25.582655-14.128789 0-25.582655 11.453866-25.582655 25.582655l0 593.154321L283.239899 498.17411c-9.991562-9.990538-26.188452-9.990538-36.178991 0-9.990538 9.990538-9.990538 26.188452 0 36.178991L488.561172 775.854387z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-arrow-up" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M154.947 716.033 512.01 358.971l357.073 357.062c9.394 9.393 24.61 9.393 34.003 0 9.393-9.394 9.393-24.61 0-34.003L529.011 307.967c-9.393-9.393-24.621-9.393-34.015 0L120.921 682.03c-9.369 9.393-9.393 24.609 0 34.003C130.338 725.426 145.555 725.426 154.947 716.033z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-arrow-right" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M319.585 175.28l336.732 336.722L319.585 848.734c-8.858 8.857-8.858 23.207 0 32.064 8.857 8.859 23.208 8.859 32.065 0l352.766-352.766c8.857-8.857 8.857-23.218 0-32.076L351.65 143.192c-8.857-8.836-23.208-8.857-32.065 0C310.727 152.072 310.727 166.421 319.585 175.28z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-arrow-left" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M706.479 852.35 366.134 511.994l340.344-340.345c8.953-8.952 8.953-23.456 0-32.409s-23.457-8.953-32.408 0L317.52 495.79c-8.952 8.952-8.952 23.479 0 32.432L674.07 884.76c8.951 8.953 23.455 8.953 32.408 0S715.432 861.303 706.479 852.35z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-arrow-down" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M869.061 307.967 511.998 665.029 154.925 307.967c-9.394-9.393-24.61-9.393-34.003 0-9.393 9.394-9.393 24.61 0 34.003l374.075 374.063c9.393 9.393 24.621 9.393 34.015 0L903.087 341.97c9.369-9.393 9.393-24.609 0-34.003C893.67 298.574 878.453 298.574 869.061 307.967z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-cross" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M555.2 512l280.5-280.5c11.9-11.9 11.9-31.2 0-43.2-11.9-11.9-31.2-11.9-43.2 0L512 468.8 231.5 188.3c-11.9-11.9-31.2-11.9-43.2 0-11.9 11.9-11.9 31.2 0 43.2L468.8 512 188.3 792.5c-11.9 11.9-11.9 31.2 0 43.2 11.9 11.9 31.2 11.9 43.2 0L512 555.2l280.5 280.5c11.9 11.9 31.2 11.9 43.2 0 11.9-11.9 11.9-31.2 0-43.2L555.2 512z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-warn" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M534.3 132.3l-44.7 0c-12.3 0-22.3 10-22.3 22.3L467.3 646c0 12.3 10 22.3 22.3 22.3l44.7 0c12.3 0 22.3-10 22.3-22.3L556.6 154.6C556.7 142.3 546.7 132.3 534.3 132.3z"  ></path>'+
      ''+
      '<path d="M534.3 802.4l-44.7 0c-12.3 0-22.3 10-22.3 22.3l0 44.7c0 12.3 10 22.3 22.3 22.3l44.7 0c12.3 0 22.3-10 22.3-22.3l0-44.7C556.7 812.4 546.7 802.4 534.3 802.4z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-add" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M874.5 462 562 462 562 149.5c0-20.7-16.8-37.5-37.5-37.5l-25 0c-20.7 0-37.5 16.8-37.5 37.5L462 462 149.5 462c-20.7 0-37.5 16.8-37.5 37.5l0 25c0 20.7 16.8 37.5 37.5 37.5L462 562l0 312.5c0 20.7 16.8 37.5 37.5 37.5l25 0c20.7 0 37.5-16.8 37.5-37.5L562 562l312.5 0c20.7 0 37.5-16.8 37.5-37.5l0-25C912 478.8 895.2 462 874.5 462z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-ok" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M982.591 174.799v0c-24.442-24.442-64.209-24.442-88.65 0l-541.566 541.428-222.315-222.315c-24.442-24.442-64.209-24.442-88.65 0v0c-24.442 24.442-24.442 64.209 0 88.65l266.64 266.64c24.442 24.442 64.209 24.442 88.65 0v0l585.891-585.751c24.303-24.442 24.303-64.209 0-88.65z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-add-fine" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M535 889 535 535l354 0c12.7 0 23-10.3 23-23s-10.3-23-23-23L535 489 535 135c0-12.7-10.3-23-23-23s-23 10.3-23 23l0 354L135 489c-12.7 0-23 10.3-23 23s10.3 23 23 23l354 0 0 354c0 12.7 10.3 23 23 23S535 901.7 535 889z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-cross-fine" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M794.8 762.3 544.5 512l250.3-250.3c8.9-8.9 8.9-23.6 0-32.5s-23.6-8.9-32.5 0L512 479.5 261.7 229.2c-8.9-8.9-23.6-8.9-32.5 0s-8.9 23.6 0 32.5L479.5 512 229.2 762.3c-8.9 8.9-8.9 23.6 0 32.5s23.6 8.9 32.5 0L512 544.5l250.3 250.3c8.9 8.9 23.6 8.9 32.5 0S803.8 771.3 794.8 762.3z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-ok-fine" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M915.9 241.8c-8.9-8.9-23.6-8.9-32.5 0L391.8 733.4 140.6 482.2c-8.9-8.9-23.6-8.9-32.5 0-8.9 8.9-8.9 23.6 0 32.5l267.5 267.5c8.9 8.9 23.6 8.9 32.5 0l507.9-507.9C924.9 265.4 924.9 250.7 915.9 241.8z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
