var gulp = require('gulp');
var watch = require("gulp-watch");
var del = require("del");
var minCss = require('gulp-clean-css'); //gulp-minify-css:压缩css文件 npm install gulp-clean-css
var connect = require('gulp-connect'); //gulp-connect 创建服务器  npm install --save-dev gulp-connect
var minJs = require('gulp-uglify'); //压缩javascript文件  npm install gulp-uglify
var img = require('gulp-imagemin'); //gulp-imagemin:压缩png、jpj、git、svg格式图片 npm install --save-dev gulp-imagemin
var rename = require("gulp-rename"); // npm install gulp-rename --save-dev  重命名文件，把一个文件储存不同版本时使用
var concat = require('gulp-concat'); //npm install gulp-concat --save-dev  整合文件
var gulpbabel = require("gulp-babel");
/*
 * es6 转换 es5
 * $ npm install --save-dev  gulp-babel  babel-preset-env babel-preset-es2015
 * */
var minHtml = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev 压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作

var vue = require('rollup-plugin-vue');
var vembedCss = require('rollup-plugin-embed-css');


//var css = require('rollup-plugin-css-only');
// var scss = require('rollup-plugin-scss');
// var postcss = require('rollup-plugin-postcss');

var replace = require('rollup-plugin-replace');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var json = require("rollup-plugin-json");
var postcss = require("gulp-postcss"); // 手机端自动补全css3前缀  cnpm install --save-dev gulp-postcss
var autoprefixer = require('autoprefixer'); // npm install --save-dev autoprefixer
var sass = require('gulp-sass');
var eslint = require("gulp-eslint"); // 检查es5 ees6 js gulp-eshint
var less = require("gulp-less");



/* 1. =======================================gulp-rollup 使用单页和多页应用 =================================== */

/***  打包修改的配置 ***/
var appJs = require("./src/multiModuleSetting").jsObj;  // js 打包入口
var appScss = require("./src/multiModuleSetting").cssObj; // scss 打包入口
var isScss = true;        // scss=>true 或 less=>false

// 文件路径
var paths = {
	stylePath: ['./src/view/**/*.scss', './src/view/**/*.less', './src/scss/**/*.scss', './src/less/**/*.less'],
	htmlPath: ['./src/**/*.html'],
	jspath: ['./src/view/**/*.js', './src/view/**/*.vue', './src/components/**/*.*', './src/libs/**/*.*'],
}

// common的cdn模式
var commonCdn = {
	devCdn: ["./node_module/vue/dist/vue.js"],
	buildCdn: ["./node_module/vue/dist/vue.min.js"]
}


// 清空目录gulp-del
gulp.task('del', function (cd) {

	del(["./dist"], cd); //gulp-del
});

//  打包common-cdn的js 
gulp.task("dev-cdn", function () {
	return gulp.src(commonCdn.devCdn)
		.pipe(concat('common-cdn.js'))
		.pipe(gulp.dest('./src/static/js/'));
});

gulp.task("build-cdn", function () {
	return gulp.src(commonCdn.buildCdn)
		.pipe(concat('common-cdn.js'))
		.pipe(minJs()) // 压缩js文件
		.pipe(gulp.dest('./src/static/js/'));
});


/******发布文件*******/
gulp.task('release', ["build-css", "build-js"], function () {

	gulp.src(['./src/**/*.html'])
		//.pipe(minHtml({ collapseWhitespace: true }))  // 压缩html
		.pipe(gulp.dest('./dist/')); //复制html

	gulp.src(['./src/static/css/*.css'])
		.pipe(minCss()).pipe(gulp.dest('./dist/static/css')); //复制css

	gulp.src(['./src/static/css/view/**/*.css'])
		.pipe(minCss()).pipe(gulp.dest('./dist/static/css/view')); //复制module的css

	gulp.src(['./src/static/css/view/fonts/**/*.*'])
		.pipe(gulp.dest('./dist/static/css/view/fonts')); //复制fonts-css

	gulp.src(['./src/static/css/cstFonts/**/*.*'])
		.pipe(gulp.dest('./dist/static/css/cstFonts')); //复制cstFonts-css

	gulp.src('./src/static/js/**/*.*')
		.pipe(gulp.dest('./dist/static/js/')); //复制js

	gulp.src('./src/static/images/**/*.*')
		//.pipe(img())                     // 压缩图片
		.pipe(gulp.dest('./dist/static/images/')); //复制img

	gulp.src(['./src/ueditor/**/*.*']) // ueditor 富文本编辑器
		.pipe(gulp.dest('./dist/ueditor'));

	gulp.src(['./src/static/**/*.*', '!./src/static/css/**/*.*', '!./src/static/js/**/*.*',
		'!./src/static/images/**/*.*'
	]).pipe(gulp.dest('./dist/static'));

});

/* watch监听*/
gulp.task("watch", ['build-css', 'build-js', 'connect'], function () {

	//合拼vue组件css和js文件
	watch(paths.jspath, function () {
		gulp.start("dev-js");
	});

	//styles的scss
	watch(paths.stylePath, function () {
		gulp.start("dev-css");

	});

	//监听html
	watch(paths.htmlPath, function () {
		gulp.start("html");
	});

});

gulp.task("html", function () {
	gulp.src(paths.htmlPath).pipe(connect.reload());
});


//开启http服务器

var sev = function () {
	connect.server({
		root: 'src',
		livereload: true,
		port: 8888,


	});
}
gulp.task('connect',
	function () {
		sev();
	});


// 全局的css 
gulp.task("dev-css", async function () {

	try {
		appScss.list.forEach(function (item) {

			if (item == appScss.watch) {
				if (isScss) {
					gulp.src(appScss.dir + item + "/style/all.scss")
						.pipe(sass().on('error', sass.logError)) // sass编译
						.pipe(postcss([autoprefixer])) // 自动添加css3缀-webkit-  适合用于手机端 
						.pipe(rename(item + ".css")).pipe(gulp.dest('./src/static/css/view')).pipe(connect.reload());
				} else {
					gulp.src(appScss.dir + item + "/style/all.less")
						.pipe(less()) // less编译
						.pipe(postcss([autoprefixer])) // 自动添加css3缀-webkit-  适合用于手机端 
						.pipe(rename(item + ".css")).pipe(gulp.dest('./src/static/css/view')).pipe(connect.reload());
				}
			}
		});

	} catch (error) {
		console.log(error);
	}

});

gulp.task("build-css", async function () {

	try {
		return await Promise.all(appScss.list.map(async function (item) {
			return compileCss(item, appScss.dir);
		}));

	} catch (error) {
		console.log(error);
	}

});

function compileCss(item, dir) {

	if (isScss) {
		try {

			return new Promise(function (resolve, reject) {
				var result = gulp.src(dir + item + "/style/all.scss")
					.pipe(sass().on('error', sass.logError)) // sass编译
					.pipe(postcss([autoprefixer])) // 自动添加css3缀-webkit-  适合用于手机端 
					.pipe(rename(item + ".css")).pipe(gulp.dest('./src/static/css/view'));
				resolve(result);
			});

		} catch (error) {
			console.log(error);
		}
	}

	// less
	else {
		try {
			return new Promise(function (resolve, reject) {
				var result = gulp.src(dir + item + "/style/all.less")
					.pipe(less()) // less编译
					.pipe(postcss([autoprefixer])) // 自动添加css3缀-webkit-  适合用于手机端 
					.pipe(rename(item + ".css")).pipe(gulp.dest('./src/static/css/view'));
				resolve(result);
			});

		} catch (error) {
			console.log(error);
		}
	}

}

function reloadJs() {
	return new Promise(function (resolve, reject) {
		var result = gulp.src(paths.jspath).pipe(connect.reload());
		resolve(result);
	});
}

gulp.task('dev-js', async function () {

	try {
		return await Promise.all(appJs.list.map(async function (item) {
			if (item == appJs.watch) {
				return asyncDevList(item, appJs.dir);
			}

		})).then(function () {
			reloadJs(); // 重启浏览器
		});

	} catch (error) {
		console.log(error);
	}

});

gulp.task('build-js', async function () {
	try {
		return await Promise.all(appJs.list.map(async function (item) {
			return asyncBuildList(item, appJs.dir);
		}));
	} catch (error) {
		console.log(error);
	}


});

async function asyncDevList(item, dir) {

	const bundle = await rollupBuild(false, item, dir);
	await bundle.write({
		file: './src/static/js/view/' + item + ".js",
		format: 'umd',
		name: 'umd',
		//sourcemap: true,
		strict: false, //在生成的包中省略`"use strict";`
	});

}

async function asyncBuildList(item, dir) {
	/* 
	1. amd -- 异步模块定义，用于像RequestJS这样的模块加载器。
	2. cjs -- CommonJS, 适用于Node或Browserify/webpack
	3. es -- 将软件包保存为ES模块文件。
	4. iife -- 一个自动执行的功能，适合作为 <script>标签这样的。
	5. umd -- 通用模块定义，以amd, cjs, 和 iife 为一体。
	*/

	const bundle = await rollupBuild(true, item, dir);
	await bundle.write({
		file: './src/static/js/view/' + item + ".js",
		format: 'umd',    
		name: 'umd',
		//sourcemap: true,
		strict: false, //在生成的包中省略`"use strict";`
	});

}

// 是否压缩js
function uglify_list(isBuild) {
	return isBuild ? uglify() : function () { };
}

function rollupBuild(isBuild, name, dir) {
	return rollup.rollup({

		input: dir + name + "/script/_app.js",

		/* 默认情况下，模块的上下文 - 即顶级的this的值为undefined。您可能需要将其更改为其他内容，如 'window'。*/
		context: "window",

		plugins: [
			vue(),
			vembedCss(),
			/*commonjs 转换 es6*/
			resolve(),
			commonjs(),
			replace({
				'process.env.NODE_ENV': isBuild ? JSON.stringify('production') : JSON.stringify('development'),
			}),

			babel({
				exclude: ['node_modules/**'],
				presets: ["es2015-rollup", "stage-2"]
			}),
			/* 使用uglify压缩js 不能output 输出 format: 'es' 格式 否会报错*/
			uglify_list(isBuild)

		],
	});
}




/* 2. ============================================== rollup 单项编译===================================================*/

/* 
1. amd -- 异步模块定义，用于像RequestJS这样的模块加载器。
2. cjs -- CommonJS, 适用于Node或Browserify/webpack
3. es -- 将软件包保存为ES模块文件。
4. iife -- 一个自动执行的功能，适合作为 <script>标签这样的。
5. umd -- 通用模块定义，以amd, cjs, 和 iife 为一体。
*/

var rollupName = "umd";
var rollupOutputFormat = "iife";  
var rollupDir ="rollupJsFile";   // 输出目录

var outputFileName="all";   //js 输出的名称
var rollup_url = `./src/${rollupDir}/js-dev/app.js`;
var rollup_url_watch = `./src/${rollupDir}/js-dev/**/*.js`;
var rollup_url_dev = `./src/${rollupDir}/js/${outputFileName}.js`;
var rollup_url_build = `./dist/${rollupDir}/js/${outputFileName}.js`;

var outputCssFileName="all";   //css 输出的名称
var rollup_css_url=`./src/${rollupDir}/css-dev/all.scss`;
var rollup_css_url_watch = `./src/${rollupDir}/css-dev/**/*.scss`;
var rollup_css_url_dev = `./src/${rollupDir}/css`;
// var rollup_css_url_build = `./dist/${rollupDir}/css`;

// 是否压缩js
function rollup_list(isBuildRollup) {
	return isBuildRollup ? uglify() : function () { };
}

function rollup_dev(isBuildRollup) {

	return rollup.rollup({
		input:rollup_url ,

		/* 默认情况下，模块的上下文 - 即顶级的this的值为undefined。您可能需要将其更改为其他内容，如 'window'。*/
		//context: "window",

		plugins: [

			/*commonjs 转换 es6*/
			resolve(),
			commonjs(),
			babel({
				exclude: ['node_modules/**'],
				presets: ["es2015-rollup", "stage-2"]
			}),

			/* 使用uglify压缩js 不能output 输出 format: 'es' 格式 否会报错*/
			rollup_list(isBuildRollup)

		],
	});
}

async function asyncRollupDev(isBuildRollup,interUrl) {

	const bundle = await rollup_dev(isBuildRollup);

	await bundle.write({
		file: interUrl,
		format: rollupOutputFormat,
		name: rollupName,
		//sourcemap: true,
		strict: false, //在生成的包中省略`"use strict";`
	});

}

gulp.task("rollup-dev", function () {
	asyncRollupDev(false,rollup_url_dev);
	gulp.src(rollup_url).pipe(connect.reload());
});


gulp.task("rollup-build",["rollup-dev-css"], function () {

	asyncRollupDev(true,rollup_url_build);

	gulp.src([`./src/${rollupDir}/css/*.css`]).pipe(minCss()).pipe(gulp.dest(`./dist/${rollupDir}/css`)); //复制css
	gulp.src([`./src/${rollupDir}/**/*.html`]).pipe(gulp.dest(`./dist/${rollupDir}/`)); //复制html
	gulp.src(`./src/${rollupDir}/static/**/*.*`).pipe(gulp.dest(`./dist/${rollupDir}/static/`)); //复制
	gulp.src([`./src/${rollupDir}/css/fonts/**/*.*`])
	.pipe(gulp.dest(`./dist/${rollupDir}/css/fonts`)); //复制fonts-css

});
gulp.task("rollup-watch", ["rollup-dev-css", "connect"], function () {

	// js
	watch(rollup_url_watch, function () {
		gulp.start("rollup-dev");
	});

	// css 
	watch(rollup_css_url_watch, function () {
		gulp.start("rollup-dev-css");
	});

	// html
	watch(`./src/${rollupDir}/**/*.html`, function () {
		gulp.start("rollup-html");
	});

})

gulp.task("rollup-html", function () {
	gulp.src(`./src/${rollupDir}/**/*.html`).pipe(connect.reload());
});


gulp.task("rollup-dev-css", async function () {

	gulp.src(rollup_css_url)
	.pipe(sass().on('error', sass.logError)) // sass编译
	.pipe(postcss([autoprefixer])) // 自动添加css3缀-webkit-  适合用于手机端 
	.pipe(rename(outputCssFileName+".css"))
	.pipe(gulp.dest(rollup_css_url_dev)).pipe(connect.reload());
				
});



/* 3. ======================================= gulp  单项编译=================================== */

var gulpJsFile = [
	"./src/mobile/js-dev/mobile-dom.js",
	"./src/mobile/js-dev/mobile-transition.js",
	"./src/mobile/js-dev/mobile-ajax.js",

];

var outputDir="mobile"
var outputFileName="mobile.js";

var isgulpMinJs = true;
var gulpMinJs = isgulpMinJs ? minJs : function () { };

gulp.task("gulp-build", function () {

	gulp.src(gulpJsFile)
		.pipe(gulpbabel({
			presets: ['es2015']
		})) // es6编译
		.pipe(concat(outputFileName))
		.pipe(gulpMinJs()) //压缩js文件
		.pipe(gulp.dest(`./dist/${outputDir}/`));

	gulp.src([`./src/${outputDir}/*.html`]).pipe(gulp.dest(`./dist/${outputDir}/`)); //复制html

	gulp.src([`./src/${outputDir}/demo/**/*.*`]).pipe(gulp.dest(`./dist/${outputDir}/demo`)); //复制demo目录

})

gulp.task("gulp-dev", function () {

	return gulp.src(gulpJsFile)
		.pipe(gulpbabel({
			presets: ['es2015']
		})) // es6编译
		.pipe(concat(outputFileName))
		.pipe(gulp.dest(`./src/${outputDir}`));

})

gulp.task("gulp-dev-watch", function () {

	gulp.src(gulpJsFile)
		.pipe(gulpbabel({
			presets: ['es2015']
		})) // es6编译
		.pipe(concat(outputFileName))
		.pipe(gulp.dest(`./src/${outputDir}`)).pipe(connect.reload());

})

gulp.task("gulp-watch", ["gulp-dev","connect"], function () {

	watch(gulpJsFile, function () {
		gulp.start("gulp-dev-watch")
	});


	//监听html
	watch(`./src/${outputDir}/**/*.html`, function () {
		gulp.start("gulp-html");
	});


})

gulp.task("gulp-html", function () {
	gulp.src(`./src/${outputDir}/**/*.html`).pipe(connect.reload());
});




