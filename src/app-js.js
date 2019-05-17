
// js的module主打包入口

module.exports = {

	// 模块列表
	list: [
		 "index", // 默认主模块
		 "template",
		 "spa"

	],

	dir: "./src/view/",   // 默认文件父级
	watch: "index",          // 监听和打包当前的模块，

}

