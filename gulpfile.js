// gulp核心文件
var gulp = require('gulp')
// 压缩js
var uglify = require('gulp-uglify')
// 压缩css
var cleanCSS = require('gulp-clean-css')
// 压缩图片
var imagemin = require('gulp-imagemin')
// 合并文件
var concat = require('gulp-concat')
// 清除打包目录
var clean = require('gulp-clean')

var SRC = 'src/'
var DEST = 'dist/'

// 压缩合并js
gulp.task('m-js', function() {
  gulp
    .src(SRC + 'js/lib/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DEST + 'js'))

  gulp
    .src(SRC + 'js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DEST + 'js'))
})
// 压缩合并css
gulp.task('m-css', () => {
  gulp
    .src(SRC + 'css/*.css')
    .pipe(concat('main.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(DEST + 'css'))
})
// 压缩图片
gulp.task('m-img', function() {
  gulp
    .src(SRC + 'img/*')
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest(DEST + '/img'))
})
// 清除目标文件夹
gulp.task('clean', function() {
  return gulp.src('dist').pipe(clean())
})

// 开发的时候在命令行启动
// $ gulp auto
gulp.task('auto', function() {
  gulp.watch(SRC + 'js/lib/*', ['m-js'])
  gulp.watch(SRC + 'js/*', ['m-js'])
  gulp.watch(SRC + 'css/*.css', ['m-css'])
  gulp.watch(SRC + 'img/*', ['m-img'])
})

// 清除与打包异步执行
gulp.task('build', ['m-js', 'm-css', 'm-img'])

// gulp 入口
gulp.task('default', ['clean'], function() {
  return gulp.start('build')
})
