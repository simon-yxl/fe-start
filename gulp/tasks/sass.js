// sass 编译
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var sourcemaps   = require('gulp-sourcemaps');
var header       = require('gulp-header');
var gutil        = require('gulp-util');
var cached       = require('gulp-cached');
var pkg          = require('../package.json');


module.exports = function(paths, browserSync){
    return sass(paths.src.css + '**/**/*.scss',{
            sourcemap: false,
            precision: 6,           // sass中计算精度
            // stopOnError: true,   // 错误是否忽略继续编译
            style: "compressed"
        })
        .pipe(cached('sass'))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['ios >= 6', 'android >= 4.0']
        }))
        .pipe(sourcemaps.write())
        .pipe(header(pkg.banner,{pkg: pkg}))
        .pipe(size({title: 'styles',gzip: true}))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream())
        .on('end', function(){
            gutil.log(gutil.colors.magenta('sass 编译完成'));
        });
};
