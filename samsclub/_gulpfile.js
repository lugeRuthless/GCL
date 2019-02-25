/* const gulp=require('gulp');
const html=require('gulp-minify-html');
const compressed=require('gulp-sass');

gulp.task('html',function(){
    gulp.src('src/cart.html')
    .pipe(html())
    .pipe(gulp.dest('dist/'))
});

gulp.task('sass',function(){
    gulp.src('src/sass/*.scss')
    .pipe(compressed({outputStyle:'compressed'}))
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('watch',function(){
    gulp.watch('src/cart.html',gulp.series('html'));  //监听改变
    gulp.watch('src/sass/*.scss',gulp.series('sass'));
}); */

const gulp=require('gulp');//加载gulp插件
const gulpsass=require('gulp-sass');
const html=require('gulp-minify-html');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const rename=require('gulp-rename');
const watch=require('gulp-watch');//添加此插件
const imagemin = require('gulp-imagemin');//图片压缩插件

//1.新建gulp任务
/*gulp.task('taskname',function(){//taskname:任务名称，如果任务名称设置为default，执行的时候，只需要gulp
	console.log('hello,gulp');
});*/

//2.将开放目录下面的文件复制到线上目录(无需插件)
//gulp.src():引入文件的目录
//gulp.dest() : 输出文件目录设置
//pipe() : 管道（流）
/* gulp.task('copyfile',function(){
	gulp.src('src/*.html').pipe(gulp.dest('dist/'));
}); */


//3.sass编译--gulp-sass
gulp.task('runsass',function(){
	gulp.src('src/sass/*.scss')
	.pipe(gulpsass({outputStyle:'compressed'}))//执行编译
	.pipe(gulp.dest('dist/css/'))
});


//4.压缩html
gulp.task('uglifyhtml',function(){
	gulp.src('src/*.html')
	.pipe(html())//执行压缩
	.pipe(gulp.dest('dist/'));
})

//5.合并压缩js
gulp.task('alljs',function(){
	gulp.src('src/script/js/*.js')
	.pipe(concat('all.js'))//合并以及重命名
	.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())//压缩
	.pipe(gulp.dest('dist/js/'));
})


//6.图片的压缩
gulp.task('runimg',function(){
	gulp.src('images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('images/'));
});

//最终监听的写法
//监听需要任务执行一次之后进行操作。
gulp.task('default',function(){
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	watch(['src/sass/style.scss','src/*.html','src/js/*.js'],gulp.parallel('runsass','uglifyhtml','alljs'));
});



