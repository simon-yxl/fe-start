var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");
var fs          = require('fs');
var gutil       = require('gulp-util');
var htmlbeautify = require('gulp-html-beautify');

module.exports = function(paths){
  var date = new Date();
  var v = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
  if(gulp.env.v) v = gulp.env.v;
  var spriteData = {
    cssName:'_sprites.scss',
    cssFormat:'scss',
    cssTemplate:paths.sprites.image+'sprites/scss.template.mustache',
    cssOpts:'spriteSrc',
    imgName:'sprite.png',
    padding:10,
    imgPath:'#{$imgSrc}'+v+'/sprite.png'
  };
  if(!fs.existsSync(paths.sprites.image+'sprites/')){
    gutil.log(gutil.colors.cyan('还没有精灵图呢，赶紧创建一份吧，所有图片必须是png格式'));
    fs.mkdir(paths.sprites.image+'sprites/', function(isok){
      if(!isok){
        gutil.log(gutil.colors.cyan('帮您创建了个文件夹，路径：'+paths.sprites.image+'sprites/，赶紧放几张icon图片进去试试吧'));
      }else{
        gutil.log(gutil.colors.cyan('很遗憾，路径创建失败了'));
      }
    })
    return;
  }else{
    if(!fs.existsSync(spriteData.cssTemplate)){
      var tmp = "${{options}}:'{{spritesheet.escaped_image}}'; \
                  {{#items}}\
                    ${{name}} : ptrd({{px.x}}), ptrd({{px.y}}), ptrd({{px.offset_x}}), ptrd({{px.offset_y}}), \ ptrd({{px.width}}), ptrd({{px.height}}), ptrd({{px.total_width}}), ptrd({{px.total_height}}), \ ${{../options}}, '{{name}}' ;\
                  {{/items}}";
      var mixin = "@mixin sprite-width($sprite) {\
        width: nth($sprite, 5);\
      }\
      @mixin sprite-height($sprite) {\
        height: nth($sprite, 6);\
      }\
      @mixin sprite-position($sprite) {\
        $sprite-offset-x: nth($sprite, 3);\
        $sprite-offset-y: nth($sprite, 4);\
        background-position: $sprite-offset-x  $sprite-offset-y;\
      }\
      @mixin sprite-image($sprite) {\
        $sprite-image: nth($sprite, 9);\
        background-image: url(#{$sprite-image});\
      }\
      @mixin sprite-size($sprite) {\
        background-size: nth($sprite, 5) nth($sprite, 6);\
      }\
      @mixin sprite($sprite) {\
        @include sprite-image($sprite);\
        @include sprite-position($sprite);\
        @include sprite-width($sprite);\
        @include sprite-height($sprite);\
        @include sprite-size($sprite);\
      }\
      @mixin sprites($sprites) {\
        @each $sprite in $sprites {\
          $sprite-name: nth($sprite, 10);\
          .#{$sprite-name} {\
            @include sprite($sprite);\
          }\
        }\
      }\
      //$sprites-sheet:$test-logo-A, $test-logo-B, $test-logo-C, $test-logo-D;\
      //@include sprites($sprites-sheet);\
      ";
      fs.writeFile(spriteData.cssTemplate, tmp + mixin, function(err){
        if (err) throw err;
        gutil.log(gutil.colors.cyan('新建模板文件scss.template.mustache成功！'));
      });
    }
  }
  var sprites = gulp.src(paths.sprites.src).pipe(spritesmith(spriteData));
  sprites.img
  .pipe(gulp.dest(paths.sprites.image))
  .on('end', function(){
      gutil.log(gutil.colors.cyan('精灵图生成成功，路径：' + paths.sprites.image+spriteData.imgName));
  });
  sprites.css
  .pipe(htmlbeautify({
    "indentSize": 2,
    "indent_char":" ",
    "indent_with_tabs": true,
    "preserve_newlines": false
  }))
  .pipe(gulp.dest(paths.sprites.css))
  .on('end', function(){
      gutil.log(gutil.colors.cyan('sass文件生成成功，路径：' + paths.sprites.css+spriteData.cssName));
  });

}
