## 初始化项目
### 使用方法
> 本项目如果用到公共控件的话，请在 [控件库](https://git.corpautohome.com/gp_rd_fe_2sc/2sc_mass_ui/tree/master)

#### 1.拷贝当前目录的所有内容到你的工作目录中去，并修改工作目录名称

规则：`M/PC-时间-项目名称 `  
例如：`PC-20151110-sencar`

#### 2.修改`authorInfo.json`中作者信息为自己的信息
示例：
![img](http://10.168.0.151/yuanxiaolong/git_images/authorinfo.png)

#### 3.自定义`sass`和`js`文件
`assets/sass/app`和`assets/scripts/app`中存放自定义的sass和js文件，本项目中的2sc.scss为示例文件，可以根据自身需求修改

#### 4.关于html的修改，可在[index.html](https://git.corpautohome.com/gp_rd_fe_2sc/2sc_pro/blob/master/init-gulp-m/index.html)文件中查看

#### 5.启动项目（[gulp安装](https://git.corpautohome.com/gp_rd_fe_2sc/2sc_pro/blob/master/doc/gulp.MD)）
在配置好的工作目录中使用命令：

	# 安装gulp依赖的所有插件
	$ npm install
	# 启动项目
	$ gulp watch

此操作会在当前工作目录下生成`node_modules`文件夹，用来存来所有的`gulp`插件

> 注意：安装好后请把 `node_modules` 移动到跟目录下，`gulp` 会在当前目录找不到`node_modules`插件的时候依次往上级目录查找，移动到根目录后就不用再每次做新项目都下载依赖插件了
>
> 另外，`npm install`的时候可能会报错，常见几种查看 [gulp安装常见错误](https://git.corpautohome.com/gp_rd_fe_2sc/2sc_pro/blob/master/doc/error.MD)

#### 6.项目完成，生成`build`目录 （这个目录的内容是给开发使用）
命令：

	# 创建开发使用目录
	$ gulp build

### 目录结构
	|__ index.html      示例html
	|__ authorInfo.json 作者信息（请修改为自己的信息）
	|__ gulpfile.js     gulp的配置文件
	|__ package.js      需要安装的gulp插件列表
	|__ readImgList.js  读取assets/images文件夹中的图片名称列表
	|__ tasks           gulpfile.js依赖的插件的配置文件目录
	      |__ babel.js      es6转es5
	      |__ browserify.js 使用部分node方法，常用于模块化开发中，引入外部文件，例如 ｀require("common")｀
	      |__ compress.js   js压缩
	      |__ images.js     图片压缩
	      |__ movefiles.js  移动文件
	      |__ node_sass.js  普通的sass编译，报错后需要重启gulp
	      |__ replace.js    文件路径等的替换
	      |__ sass.js       ruby编译sass，报错后继续执行gulp
	      |__ watch.js      监控文件变更，实现自动编译
	 |__ assets         所有的资源文件，包括sass，css，image，js，mock等
	      |__ css           存放编译后的css文件
	      |__ sass          存放sass文件
	      	     |__ app         sass工作目录（可自行修改）  
	      	     |__ core        公用的sass文件，例如reset，公共变量，字体图标等
	      	     |__ module      所有模块化的sass文件，例如导航，按钮，列表等
	      |__ js           存放编译后的js文件
	      |__ scripts
	      	     |__ app         js工作目录（可自行修改）  
	      	     |__ core        公用的js文件，例如zepto.js
	      	     |__ module      所有模块化的js功能，例如轮播等插件
	      |__ images       图片文件夹
                 |__ pic       示例图片文件夹，存放开发过程中用于展示给开发产品人员看的图片
          |__ mock         存放ajax模拟数据
