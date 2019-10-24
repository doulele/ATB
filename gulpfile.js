var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var connect = require('gulp-connect-php');
var browserSync = require('browser-sync').create();

gulp.task('html',function(){
	return gulp.src('develop/*.html')
	.pipe($.htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('product'))
	.pipe(browserSync.reload({stream:true}))
})
gulp.task('css',function(){
	return gulp.src('develop/css/*.css')
		.pipe($.cleanCss({compatibility:'ie8'}))
		.pipe($.concat('all.css'))
		.pipe(gulp.dest('product/css'))
		.pipe(browserSync.reload({stream:true}))
})
gulp.task('js',function(){
	return gulp.src('develop/js/*.js')
	.pipe($.concat('all.js'))
	.pipe(gulp.dest('product/js'))
	.pipe(browserSync.reload({stream:true}))
})
gulp.task('image',function(){
	return gulp.src('develop/image/**')
		.pipe($.imagemin())
		.pipe(gulp.dest('product/image'))
		.pipe(browserSync.reload({stream:true}))
})
gulp.task('php',function(){
	return gulp.src('develop/php/*php')
		.pipe(gulp.dest('product/php'))
		.pipe(browserSync.reload({stream:true}))
})

//自动刷新
gulp.task('server',function(){
	var options={
		base:'./product',
		port:8888,
		bin:'E:/wamp/bin/php/php5.5.12/php.exe',
		ini:'E:/wamp/bin/php/php5.5.12/php.ini'
	};
	return connect.server(options);
})
gulp.task('browser-sync',function(){
	var options={
		proxy:'127.0.0.1:8888',
		port:6555,
		open:true,
		startPath:'ATB.html',
		watch:true
	};
	return browserSync.init(options);
})

//清理文件
gulp.task('clean',function(){
	return gulp.src(['product/css/*css','product/js/*js','product/php/*php','product/*html'])
		.pipe($.clean())
})

//监控
gulp.task("watch",function(){
	gulp.watch("develop/*html",gulp.series("html"));
	gulp.watch('develop/css/*css',gulp.series('css'));
	gulp.watch('develop/js/*js',gulp.series('js'));
	gulp.watch('develop/image/**',gulp.series('image'));
	gulp.watch('develop/php/*php',gulp.series('php'))
})

gulp.task('default',gulp.series('clean','html','css','js','php','image',gulp.parallel('server','browser-sync','watch')));