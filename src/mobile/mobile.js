"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	移动端 公共类库 IE10+
 * 作者：hqs
 */

(function (global, factory) {

	//  cmd commonjs
	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
		module.exports = factory(global);
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return factory(global);
		});
	}

	// cmd seajs
	else if (typeof define === "function" && define.cmd) {
			define(function (require, exports, module) {
				module.exports = factory(global);
			});
		} else {
			factory(global);
		}
})(typeof window !== "undefined" ? window : undefined, function (window) {

	"use strict";

	// 冲突Mobile兼容

	var _mobile = window.mobile,
	    _m = window.m,
	    _$ = window.$;

	// 创建mobile对象
	window.Mobile = window.$ = window.m = window.mobile = function (selector, context) {

		if (typeof selector === "function" && arguments.length === 1) {
			Mobile.ready(selector);
			return;
		}
		return new Mobile.fn.init(selector, context);
	};

	// 版本号
	Mobile.version = "1.1.5";

	// 查找父元素
	function _searchParents(el, fn) {

		try {
			if (el.parentElement) {
				if (fn(el.parentElement)) {
					return el.parentElement;
				}
			}

			if ((el.nodeName || "").toLowerCase() === "html") {
				return;
			}
		} catch (ex) {
			return null;
		}

		return _searchParents(el.parentElement, fn);
	}

	// scrollTop 动画
	function _scrollTop(self, y, time) {

		time = typeof time === "number" ? time : 400;
		y = typeof y === "number" ? y : parseFloat(y);
		y = isNaN(y) ? 0 : y;
		var fx = 20;
		var speed = 100;

		self.clearTimeId = self.clearTimeId || 0;
		clearInterval(self.clearTimeId);

		var isElement = true;
		if (self === window || self === document) {
			isElement = false;
		} else {
			isElement = true;
		}

		var windowStartTop = (isElement ? self.scrollTop : parseFloat(window.pageYOffset)) || 0;
		var speed2 = Math.abs(windowStartTop - y);
		speed = speed2 / time * fx;

		if (windowStartTop > y) {

			self.clearTimeId = setInterval(function () {
				windowStartTop = windowStartTop - speed;
				isElement ? self.scrollTop = windowStartTop : window.scrollTo(0, windowStartTop);
				//	console.log("scrolltop")
				if (windowStartTop - speed <= y) {
					// stop
					isElement ? self.scrollTop = y : window.scrollTo(0, y);
					clearInterval(self.clearTimeId);
				}
			}, fx);
		} else {
			if (windowStartTop === y) {
				// stop
				clearInterval(self.clearTimeId);
				return;
			}
			self.clearTimeId = setInterval(function () {
				windowStartTop = windowStartTop + speed;
				isElement ? self.scrollTop = windowStartTop : window.scrollTo(0, windowStartTop);
				//console.log("scrolltop");
				if (windowStartTop + speed > y) {
					// stop
					isElement ? self.scrollTop = y : window.scrollTo(0, y);
					clearInterval(self.clearTimeId);
				}
			}, fx);
		}
	}

	// scrollLeft 动画
	function _scrollLeft(self, x, time) {

		time = typeof time === "number" ? time : 400;
		x = typeof x === "number" ? x : parseFloat(x);
		x = isNaN(x) ? 0 : x;
		var fx = 10;
		var speed = 100;

		self.clearTimeId = self.clearTimeId || 0;
		clearInterval(self.clearTimeId);

		var isElement = true;
		if (self === window || self === document) {
			isElement = false;
		} else {
			isElement = true;
		}

		var windowStartLeft = (isElement ? self.scrollLeft : parseFloat(window.pageXOffset)) || 0;
		var speed2 = Math.abs(windowStartLeft - x);
		speed = speed2 / time * fx;

		if (windowStartLeft > x) {

			self.clearTimeId = setInterval(function () {
				windowStartLeft = windowStartLeft - speed;
				isElement ? self.scrollLeft = windowStartLeft : window.scrollTo(windowStartLeft, 0);
				//	console.log("scrolltop")
				if (windowStartLeft - speed <= x) {
					// stop
					isElement ? self.scrollLeft = x : window.scrollTo(x, 0);
					clearInterval(self.clearTimeId);
				}
			}, fx);
		} else {
			if (windowStartLeft === x) {
				// stop
				clearInterval(self.clearTimeId);
				return;
			}
			self.clearTimeId = setInterval(function () {
				windowStartLeft = windowStartLeft + speed;
				isElement ? self.scrollLeft = windowStartLeft : window.scrollTo(windowStartLeft, 0);
				//console.log("scrolltop");
				if (windowStartLeft + speed > x) {
					// stop
					isElement ? self.scrollLeft = x : window.scrollTo(x, 0);
					clearInterval(self.clearTimeId);
				}
			}, fx);
		}
	}
	// 浅复制 parentObj 父元素 childObj子元素
	function _extend(parentObj, childObj) {

		childObj = childObj || {};

		for (var prop in parentObj) {
			childObj[prop] = parentObj[prop];
		}
		return childObj;
	}

	// 深复制 parentObj 父元素 childObj子元素
	function _extendDeep(parentObj, childObj) {

		childObj = childObj || {};

		for (var prop in parentObj) {

			if (_typeof(parentObj[prop]) === "object") {

				childObj[prop] = parentObj[prop].constructor === Array ? [] : {};
				_extendDeep(parentObj[prop], childObj[prop]);
			} else {
				childObj[prop] = parentObj[prop];
			}
		}
		return childObj;
	};

	// 原型-prototype
	Mobile.fn = Mobile.prototype = {

		init: function init(selector, content) {

			var arrs = [];
			this.length = 0;
			if (!content) {

				// 字符串
				if (typeof selector === "string") {
					if (selector.trim().length === 0) {
						return this;
					}
					var els = document.querySelectorAll(selector);
					Array.prototype.push.apply(this, els);
				} else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object") {

					// Nodelist, HTMLCollection 对象
					if (selector.constructor && (selector.constructor === NodeList || selector.constructor === HTMLCollection)) {
						Mobile.each(selector, function (i, v) {
							arrs.push(v);
						});
					}
					// Mobile 对象
					else if (selector.hasOwnProperty("length") && selector.length > 0) {
							Mobile.each(selector, function (i, v) {
								arrs.push(v);
							});
						} else if (selector.nodeType === Node.ELEMENT_NODE || selector.nodeType === Node.DOCUMENT_NODE || selector === window) {
							// element 单例对象 
							arrs.push(selector);
						}

					Array.prototype.push.apply(this, arrs);
				}
			} else {

				if (typeof content === "string" && typeof selector === "string") {

					if (content.trim().length === 0) {
						return this;
					}
					if (selector.trim().length === 0) {
						return this;
					}

					var p = document.querySelectorAll(content);
					Mobile.each(p, function () {
						var childElements = this.querySelectorAll(selector);
						for (var i = 0; i < childElements.length; i++) {
							arrs.push(childElements[i]);
						}
					});
					Array.prototype.push.apply(this, arrs);
				} else if ((typeof content === "undefined" ? "undefined" : _typeof(content)) === "object" && typeof selector === "string") {
					if (selector.trim().length === 0) {
						return this;
					}
					// 遍历数组型对象
					if (content.hasOwnProperty("length") && content.length > 0) {

						Mobile.each(content, function () {
							var childElements = this.querySelectorAll(selector);
							for (var i = 0; i < childElements.length; i++) {
								arrs.push(childElements[i]);
							}
						});
						Array.prototype.push.apply(this, arrs);
					} else if (content.nodeType === Node.ELEMENT_NODE || content.nodeType === Node.DOCUMENT_NODE) {
						var childElements = content.querySelectorAll(selector);
						Array.prototype.push.apply(this, childElements);
					}
				}
			}
			return this;
		}

	};

	// 将init函数作为实例化的mobile原型。 
	Mobile.fn.init.prototype = Mobile.fn;

	// 添加静态和实例的扩展方法
	Mobile.extend = Mobile.fn.extend = function (deep, obj) {

		// mobile extend
		if (deep.constructor === Object && arguments.length === 1) {
			_extend(deep, this);
			return this;
		}
		// mobile extend deeply
		if (deep.constructor === Boolean && arguments.length === 2 && obj.constructor === Object) {
			if (deep) {
				_extendDeep(obj, this);
			} else {
				_extend(deep, this);
			}
			return this;
		}

		//  Object extend
		var i, item, deeply;
		if (deep.constructor === Object && arguments.length >= 2) {

			for (i = 1; i < arguments.length; i++) {

				item = arguments[i];
				if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object") {
					_extend(item, deep);
				}
			}

			return deep;
		}

		//  Object extend deeply
		if (deep.constructor === Boolean && arguments.length >= 3 && obj.constructor === Object) {

			for (i = 2; i < arguments.length; i++) {

				item = arguments[i];

				if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object") {
					if (deep) {
						_extendDeep(item, obj);
					} else {
						_extend(item, obj);
					}
				}
			}

			return obj;
		}
	};

	// 扩展静态方法
	Mobile.extend({

		noCoflict: function noCoflict(deep) {
			window.$ = _$;
			window.m = _m;
			if (deep) {
				window.mobile = _mobile;
			}

			return Mobile;
		},

		each: function each(els, fn) {
			if (!els) {
				throw new Error("els property type must is Array or Object");
			}
			for (var i = 0; i < els.length; i++) {

				if (typeof fn === "function") {
					var bl = fn.call(els[i], i, els[i]);
					if (bl === false) {
						break;
					}
				}
			}
		},

		ready: function ready(fn) {

			if (typeof fn === "function") {
				window.addEventListener("load", fn);
			}
			return;
		},

		// 列表项和子项的匹配	
		isEqual: function isEqual(list, item) {
			list = list || [];
			for (var i = 0; i < list.length; i++) {

				if (list[i] === item) {
					return true;
				}
			}

			return false;
		},

		// html字符串转dom对象
		htmlStringToDOM: function htmlStringToDOM(txt) {

			var df2 = document.createDocumentFragment();
			var df = document.createDocumentFragment();
			var div = document.createElement("div");
			div.innerHTML = txt;
			df.appendChild(div);
			var _nodes = df.querySelector("div").childNodes;
			for (var i = _nodes.length; i > 0; i--) {
				df2.insertBefore(_nodes[i - 1], df2.childNodes[0]);
			}
			df = null;
			return df2;
		},

		checkSelector: function checkSelector(el, txt) {
			if (!el) {
				return false;
			}
			txt = typeof txt === "string" ? txt : "";
			if (txt.trim() === "") {
				return false;
			}
			var regId = /\#[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g;
			var regClass = /\.[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g;
			var regTag = /^[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}|[\]][a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g;
			var regAttr = /\[[a-zA-Z][\w-=]*\]/g;

			var idList = txt.match(regId) || [];
			idList = rep(idList, "#", "");
			var isIdBl = isId(el, idList, txt);
			//alert(isIdBl)

			var classList = txt.match(regClass) || [];
			classList = rep(classList, ".", "");
			var isClassBl = isclass(el, classList, txt);
			//alert(isClassBl)

			var tagList = txt.match(regTag) || [];
			tagList = rep(tagList, "]", "");
			var isTagBl = istag(el, tagList, txt);
			//alert(isTagBl)

			var attrList = txt.match(regAttr) || [];
			attrList = rep(attrList, "[", "");
			attrList = rep(attrList, "]", "");
			var isAttrBl = isAttr(el, attrList, txt);
			//alert(attrList)

			function rep(list, old, now) {
				var arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push(list[i].replace(old, now));
				}

				return arr;
			}

			function isId(el, idList, searchTxt) {

				if (searchTxt.search(/#/) === -1) {
					return true;
				} else if (searchTxt.search(/#/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var id = el.id || "";
				for (var i = 0; i < idList.length; i++) {
					if (idList[i] === id) {
						return true;
					}
				}
				return false;
			}

			function isclass(el, idList, searchTxt) {
				if (searchTxt.search(/\./) === -1) {
					return true;
				} else if (searchTxt.search(/\./) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _class = el.classList || "";

				for (var i = 0; i < idList.length; i++) {
					if (!_class.contains(idList[i])) {
						return false;
					}
				}
				return true;
			}

			function istag(el, idList, searchTxt) {
				if (searchTxt.search(/^[a-zA-Z_]*|[\]][a-zA-Z_]/) === -1) {
					return true;
				} else if (searchTxt.search(/^[a-zA-Z_]|[\]][a-zA-Z_]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _tag = (el.nodeName || "").toLowerCase();

				for (var i = 0; i < idList.length; i++) {
					if (idList[i].trim() !== _tag) {
						return false;
					}
				}
				return true;
			}

			function isAttr(el, idList, searchTxt) {

				if (searchTxt.search(/\[.*\]/) === -1) {
					return true;
				} else if (searchTxt.search(/\[.*\]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				//var _tag = el.getat
				var _reg2 = /=/g;
				for (var i = 0; i < idList.length; i++) {

					if (_reg2.test(idList[i])) {
						//alert(idList[i]);
						var arr2 = idList[i].split("=");
						if ((el.getAttribute(arr2[0]) || "").trim() !== (arr2[1] || "").trim()) {
							return false;
						}
					} else {

						if (!el.hasAttribute(idList[i])) {
							return false;
						}
					}
				}
				return true;
			}

			return isIdBl && isClassBl && isTagBl && isAttrBl;
		},

		trim: function trim(txt) {
			var str = "";
			txt = typeof txt === "string" ? txt : "";
			str = txt.replace(/^\s*|\s*$/img, "");
			return str;
		},

		round: function round(value, ratio) {

			if (arguments.length === 1) {

				if (typeof value === "number") {
					return Math.round(value);
				}
			} else if (arguments.length === 2) {
				if (typeof value === "number" && typeof ratio === "number") {

					var _v = Math.floor(value);
					_v = _v + ratio;

					if (value > _v) {
						return Math.ceil(value);
					} else {
						return Math.floor(value);
					}
				}
			}

			return null;
		},

		// 检查是否为移动端
		isMobile: function isMobile() {

			var userAgentInfo = navigator.userAgent.toString().toLowerCase();
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			//console.log(userAgentInfo)
			var flag = false;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v].toLowerCase()) > 0) {
					flag = true;
					break;
				}
			}
			return flag;
		},

		//判断微信
		isWeixn: function isWeixn() {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) === "micromessenger") {
				return true;
			} else {
				return false;
			}
		},


		/* jsonToDate 
    /Date(1492048799952)/ 或 1492048799952
    fmt=("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    */
		toDate: function toDate(value, fmt) {
			fmt = typeof fmt !== "string" ? "yyyy-MM-dd HH:mm:ss" : fmt;
			var txt = value.toString().replace("/Date(", "").replace(")/", "");
			var times = Number(txt);
			times = isNaN(times) ? new Date(value).getTime() : times;
			var dt = new Date(Number(times.toString()));
			var o = {
				"M+": dt.getMonth() + 1,
				"d+": dt.getDate(),
				"H+": dt.getHours(),
				"m+": dt.getMinutes(),
				"s+": dt.getSeconds(),
				"q+": Math.floor((dt.getMonth() + 3) / 3),
				"S": dt.getMilliseconds()
			};
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return fmt;
		},

		isFunction: function isFunction(obj) {
			return typeof obj === "function";
		},

		isArray: function isArray(obj) {
			return obj.constructor === Array;
		},

		isEmptyObject: function isEmptyObject(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		max: function max(data, fn) {
			data = data || [];
			if (data.constructor !== Array) {
				throw new Error("参数必须是个数组");
			}
			var _array_max;
			var isOne = true;
			if (arguments.length === 1) {

				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = parseFloat(data[i]);
						if (isNaN(_num)) {
							continue;
						}
						_temp = _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_max = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp > _array_max) {
							_array_max = _temp;
						}
					}
				}
				return _array_max;
			}

			if (arguments.length === 2 && typeof fn === "function") {

				var maxVal = 0;
				for (var i2 = 0; i2 < data.length; i2++) {
					var _temp2 = 0;
					var item = data[i2];
					var v = fn(item);
					if (typeof v !== "number") {

						//  is not a number
						var _num2 = parseFloat(v);
						if (isNaN(_num2)) {
							continue;
						}
						_temp2 = _num2;
					} else {

						//  is a number
						_temp2 = v;
					}

					if (isOne) {
						maxVal = _temp2;
						_array_max = item;
						isOne = false;
					} else {
						// set value number
						if (_temp2 > maxVal) {
							maxVal = _temp2;
							_array_max = item;
						}
					}
				}
				return _array_max;
			}
		},

		min: function min(data, fn) {
			data = data || [];
			if (data.constructor !== Array) {
				throw new Error("参数必须是个数组");
			}
			var _array_min;
			var isOne = true;
			if (arguments.length === 1) {
				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						if (isNaN(_num)) {
							continue;
						}
						_temp = _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_min = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp < _array_min) {
							_array_min = _temp;
						}
					}
				}
				return _array_min;
			}

			if (arguments.length === 2 && typeof fn === "function") {
				var minVal = 0;
				for (var i2 = 0; i2 < data.length; i2++) {
					var _temp2 = 0;
					var item = data[i2];
					var v = fn(item);
					if (typeof v !== "number") {

						//  is not a number
						var _num2 = parseFloat(v);
						if (isNaN(_num2)) {
							continue;
						}
						_temp2 = _num2;
					} else {

						//  is a number
						_temp2 = v;
					}

					if (isOne) {
						minVal = _temp2;
						_array_min = item;
						isOne = false;
					} else {
						// set value number
						if (_temp2 < minVal) {
							minVal = _temp;
							_array_min = item;
						}
					}
				}
				return _array_min;
			}
		},

		proxy: function proxy(fn, obj) {

			return function () {
				if (typeof fn === "function") {
					fn.apply(obj, arguments);
				}
			};
		},

		// 把文本转换成html
		deHtml: function deHtml(txt) {
			txt = txt.replace(/&lt;/img, "<").replace(/&gt;/img, ">").replace(/&nbsp;/img, " ");
			return txt;
		},

		// 把html换成文本
		enHtml: function enHtml(txt) {
			txt = txt.replace(/</img, "&lt;").replace(/>/img, "&gt;").replace(/\s+/img, "&nbsp;");
			return txt;
		}

	});

	// 可计算值的列表值
	Mobile.numberList = ["left", "top", "right", "bottom", "width", "height", "max-width", "min-width", "max-height", "min-height"];

	// 扩展实例方法
	Mobile.fn.extend({

		//each
		each: function each(fn) {
			Mobile.each(this, fn);
		},

		// data
		data: function data() {

			var arg1 = arguments[0];

			// get 空值返回{}对象
			if (arguments.length === 0) {
				var o;
				Mobile.each(this, function () {

					o = this.vdata = this.vdata || {};

					return false;
				});

				return o;
			}

			// get
			if (arguments.length === 1 && typeof arguments[0] === "string") {
				var v;
				Mobile.each(this, function () {

					var o = this.vdata = this.vdata || {};

					v = o[arg1];

					return false;
				});

				return v;
			}

			// set
			if (arguments.length === 2 && typeof arguments[0] === "string") {
				var arg2 = arguments[1];
				Mobile.each(this, function () {

					var o = this.vdata = this.vdata || {};
					v = o[arg1] = arg2;
				});

				return this;
			}
		},

		// css
		css: function css(attr, value) {

			// get  返回第一个一个值
			if (arguments.length === 1 && typeof attr === "string") {

				var _css = "";
				Mobile.each(this, function (i, v) {

					if (window.getComputedStyle) {
						_css = window.getComputedStyle(v, null)[attr.trim()];
						if (Mobile.isEqual(Mobile.numberList, attr.trim())) {
							_css = parseFloat(_css) || 0;
						}
					}
					// ie8
					else if (v.currentStyle) {
							_css = v.currentStyle[attr];
						} else {
							_css = v.style[attr];
						}

					return false;
				});
				return _css;
			}

			// set
			if (arguments.length === 2) {

				Mobile.each(this, function () {
					if (Mobile.isEqual(Mobile.numberList, attr.trim())) {
						this.style[attr.trim()] = Number(value) ? Number(value).toString() + "px" : value;
					} else {
						this.style[attr.trim()] = value;
					}
				});
			}

			//set 对象的值
			if (arguments.length === 1 && (typeof attr === "undefined" ? "undefined" : _typeof(attr)) === "object") {
				Mobile.each(this, function (i, v) {
					for (var _attr in attr) {
						if (Mobile.isEqual(Mobile.numberList, _attr.trim())) {
							this.style[_attr] = Number(attr[_attr]) ? Number(attr[_attr]).toString() + "px" : attr[_attr];
						} else {
							this.style[_attr] = attr[_attr];
						}
					}
				});
			}

			return this;
		},

		// find
		find: function find(selector) {
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				var _arr = obj[i].querySelectorAll(selector);
				Mobile.each(_arr, function (i, v) {
					arr.push(v);
				});
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// text
		text: function text(value) {

			//set 对象的值
			var _text = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_text += this.innerText;
				});
				return _text;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.innerText = value;
				});
			}
			return this;
		},

		// val
		val: function val(value) {

			//set 对象的值
			var _val = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_val += this.value;
				});
				return _val;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.value = value;
				});
			}
			return this;
		},

		// html
		html: function html(value) {

			//set 对象的值
			var _html = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_html += this.innerHTML;
				});
				return _html;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.innerHTML = value;
				});
			}
			return this;
		},

		// attr
		attr: function attr(_attr2, value) {

			// 返回第一个属性值
			if (arguments.length === 1 && typeof _attr2 === "string") {
				var _attr = undefined;
				Mobile.each(this, function () {
					_attr = this.getAttribute(_attr2);
					if (_attr === null) {
						_attr = undefined;
					}
					return false;
				});
				return _attr;
			}

			if (arguments.length === 2) {

				Mobile.each(this, function () {
					this.setAttribute(_attr2, value.toString());
				});
			}
			return this;
		},

		// hasAttr
		hasAttr: function hasAttr(attr) {

			// 是否含有元素的属性
			var _attr = false;
			if (arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function () {
					_attr = this.hasAttribute(attr);
					return false;
				});
				return _attr;
			}
		},

		// removeAttr
		removeAttr: function removeAttr(attr) {

			// 返回第一个属性值
			if (arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function () {
					this.removeAttribute(attr);
				});
			}

			return this;
		},

		// addClass
		addClass: function addClass(className) {

			if (typeof className === "string") {
				className = className.split(/\s+/);
			} else {

				return this;
			}

			if (arguments.length === 1) {

				Mobile.each(this, function () {
					for (var y = 0; y < className.length; y++) {
						if (className[y]) {
							this.classList.add(className[y]);
						}
					}
				});
			}

			return this;
		},

		// toggleClass
		toggleClass: function toggleClass(className) {

			if (typeof className === "string") {
				className = className.split(/\s+/);
			} else {

				return this;
			}

			if (arguments.length === 1) {

				Mobile.each(this, function () {
					for (var y = 0; y < className.length; y++) {
						if (className[y]) {
							if (this.classList.contains(className[y])) {
								this.classList.remove(className[y]);
							} else {
								this.classList.add(className[y]);
							}
						}
					}
				});
			}

			return this;
		},

		//  hasclass
		hasClass: function hasClass(className) {
			var ishasClass = false;
			if (arguments.length === 1) {

				Mobile.each(this, function () {
					ishasClass = this.classList.contains(className);
					return false;
				});
			}

			return ishasClass;
		},

		// removeClass
		removeClass: function removeClass(className) {

			if (typeof className === "string") {
				className = className.split(/\s+/);
			} else {

				return this;
			}

			if (arguments.length === 1) {

				Mobile.each(this, function () {
					for (var y = 0; y < className.length; y++) {
						if (className[y]) {
							this.classList.remove(className[y]);
						}
					}
				});
			}
			return this;
		},

		// parent 
		parent: function parent() {
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				var _arr = obj[i].parentElement;
				if (_arr) {
					arr.push(_arr);
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// parents 
		parents: function parents(selector) {
			selector = typeof selector === "string" ? $.trim(selector) : "";
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {

				var p = _searchParents(obj[i], function (elm) {
					return Mobile.checkSelector(elm, selector);
				});

				delete obj[i];
				if (p) {
					arr.push(p);
				}
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// closest
		closest: function closest(selector) {
			selector = typeof selector === "string" ? $.trim(selector) : "";
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				var p;
				if (Mobile.checkSelector(obj[i], selector)) {
					arr.push(obj[i]);
				} else {
					p = _searchParents(obj[i], function (elm) {
						return Mobile.checkSelector(elm, selector);
					});
				}
				delete obj[i];
				if (p) {
					arr.push(p);
				}
			}

			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// get return native dom 
		get: function get(index) {
			if (typeof index !== "number") {
				throw Error("index property must is number type");
			}

			if (index >= this.length) {
				return undefined;
				//throw Error("number  value max object length ");
			}

			return this[index];
		},

		// eq 
		eq: function eq(index) {
			if (typeof index !== "number") {
				throw Error("index property must is number type");
			}
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				if (i === index) {
					arr.push(obj[i]);
				}
				delete obj[i];
			}
			delete obj.length;

			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  first
		first: function first() {

			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				if (i === 0) {
					arr.push(obj[i]);
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  prev
		prev: function prev() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function (i, v) {
				var _prev = v.previousElementSibling;
				if (_prev) {
					arr.push(_prev);
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  next
		next: function next() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function (i, v) {
				var _next = v.nextElementSibling;
				if (_next) {
					arr.push(_next);
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  siblings
		siblings: function siblings() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function (i, v) {
				var _children = v.parentElement.children;
				var _index = m(v).index();

				for (var y = 0; y < _children.length; y++) {
					if (y !== _index) {
						arr.push(_children[y]);
					}
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  last
		last: function last() {

			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				var _length = obj.length > 0 ? obj.length - 1 : 0;
				if (i === _length) {
					arr.push(obj[i]);
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  heigth 根据box-sizing去获取 默认content-box
		height: function height() {

			if (arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function (i, v) {

					// window

					if (this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if (this === document) {
						_h = m(document.documentElement).css("height"); //document.documentElement.offsetHeight;
					} else {
						_h = m(this).css("height");
					}
					_h = parseFloat(_h);

					return false;
				});
				return _h;
			}

			// set
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("height", _value);
					});
				}
			return this;
		},

		//  clientHeight  垂直方向 height + 上下padding
		innerHeight: function innerHeight() {

			if (arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function (i, v) {

					// window

					if (this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if (this === document) {
						_h = m(document.documentElement).css("height"); //document.documentElement.offsetHeight;
					} else {
						_h = m(this).eq(0) && m(this).eq(0)[0].clientHeight;
					}
					_h = parseFloat(_h);

					return false;
				});
				return _h;
			}

			return this;
		},

		//  outerHeight 垂直方向 height + 上下padding + 上下border-width
		outerHeight: function outerHeight() {

			if (arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function (i, v) {

					// window

					if (this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if (this === document) {
						_h = m(document.documentElement).eq(0) && m(document.documentElement).eq(0)[0].offsetHeight; //document.documentElement.offsetHeight;
					} else {
						_h = m(this).eq(0) && m(this).eq(0)[0].offsetHeight;
					}
					_h = parseFloat(_h);

					return false;
				});
				return _h;
			}

			return this;
		},

		//  width 根据box-sizing去获取 默认content-box
		width: function width() {

			// get
			if (arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function () {

					// window
					if (this === window) {

						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if (this === document) {
						_w = m(document.documentElement).css("width"); //document.documentElement.offsetWidth;
					} else {
						_w = m(this).css("width");
					}
					_w = parseFloat(_w);
					return false;
				});

				return _w;
			}

			// set
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("width", _value);
					});
				}

			return this;
		},

		//  clientWidth  水平方向 width + 左右padding
		innerWidth: function innerWidth() {

			// get
			if (arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function () {

					// window
					if (this === window) {

						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if (this === document) {
						_w = m(document.documentElement).css("width"); //document.documentElement.offsetWidth;
					} else {
						_w = m(this).eq(0) && m(this).eq(0)[0].clientWidth;
					}
					_w = parseFloat(_w);
					return false;
				});

				return _w;
			}

			return this;
		},

		//  outWidth 水平方向 width + 左右padding + 左右border-width
		outerWidth: function outerWidth() {

			if (arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function () {

					// window
					if (this === window) {
						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if (this === document) {
						_w = m(document.documentElement).eq(0) && m(document.documentElement).eq(0)[0].offsetWidth; //document.documentElement.offsetWidth;
					} else {
						_w = m(this).eq(0) && m(this).eq(0)[0].offsetWidth;
					}
					_w = parseFloat(_w);

					return false;
				});

				return _w;
			}

			return this;
		},

		//  scroll 区域的高度 
		scrollHeight: function scrollHeight() {

			// get
			var _h = 0;
			if (arguments.length === 0) {
				Mobile.each(this, function () {

					_h = m(this).eq(0) && m(this).eq(0)[0].scrollHeight;
					return false;
				});
			}

			return _h;
		},

		//  scroll 区域的宽度 
		scrollWidth: function scrollWidth() {

			// get
			var _w = 0;
			if (arguments.length === 0) {
				Mobile.each(this, function () {

					_w = m(this).eq(0) && m(this).eq(0)[0].scrollWidth;
					return false;
				});
			}

			return _w;
		},

		// getBoundingClientRect() 用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left,width,heigth
		rect: function rect() {

			// get
			var o = {};
			if (arguments.length === 0) {

				Mobile.each(this, function () {

					if (this === window || this === document) {
						o = {};
					} else {
						o = m(this).eq(0) && m(this).eq(0)[0].getBoundingClientRect();
					}

					return false;
				});
			}

			return o;
		},

		// offsetTop  获取当前元素到 定位父节点 的top方向的距离
		offsetTop: function offsetTop() {
			var _top = 0;
			Mobile.each(this, function () {
				_top = this.offsetTop;
				return false;
			});
			return _top;
		},

		// offsetLeft  获取当前元素到 定位父节点 的left方向的距离
		offsetLeft: function offsetLeft() {
			var _left = 0;
			Mobile.each(this, function () {
				_left = this.offsetLeft;
			});
			return _left;
		},

		// offset
		offset: function offset() {
			var obj = {};
			Mobile.each(this, function () {
				obj.left = this.offsetLeft;
				obj.top = this.offsetTop;
			});
			return obj;
		},

		// index
		index: function index(obj) {
			var _index = -1;
			if (arguments.length === 0) {
				Mobile.each(this, function (index, v) {
					if (v.parentElement) {
						var els = v.parentElement.children;
						for (var i = 0; i < els.length; i++) {
							if (els[i].isEqualNode(v)) {
								_index = i;
							}
						}
					}

					return false;
				});
			}

			return _index;
		},

		//  remove
		remove: function remove() {
			var arr = [];
			var $this = this;
			Mobile.each(this, function (index, v) {
				if (v.parentElement) {
					var els = this.parentElement;
					var _indexObj = els.removeChild(this);
					arr.push(_indexObj);
				}
				delete $this[index];
			});

			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  append
		append: function append(obj) {
			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function () {
					for (var i = 0; i < obj.length; i++) {
						this.appendChild(obj[i]);
					}
				});
			} else if (typeof obj === "string") {
				Mobile.each(this, function () {
					this.innerHTML += obj;
				});
			} else {
				Mobile.each(this, function () {
					this.appendChild(obj);
				});
			}

			return this;
		},

		//  prepend
		prepend: function prepend(obj) {
			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function () {
					for (var i = obj.length; i > 0; i--) {
						this.insertBefore(obj[i - 1], this.childNodes[0]);
					}
				});
			} else if (typeof obj === "string") {
				var els = Mobile.htmlStringToDOM(obj);
				Mobile.each(this, function () {
					this.insertBefore(els, this.childNodes[0]);
				});
			} else {
				Mobile.each(this, function () {
					this.insertBefore(obj, this.childNodes[0]);
				});
			}

			return this;
		},

		//  clone
		clone: function clone(obj) {
			var _obj;
			Mobile.each(this, function () {
				_obj = this.cloneNode(true);
				return false;
			});
			return _obj;
		}

	});

	// 动画
	Mobile.fn.extend({

		// show
		show: function show(_showType) {

			Mobile.each(this, function (i, el) {

				var _showType = _showType ? _showType : "block";
				$(this).data("display-type", true);
				this.style.display = _showType;
			});
			return this;
		},

		// hide
		hide: function hide(_showType) {

			Mobile.each(this, function (i, el) {

				var _showType = _showType ? _showType : "none";
				$(this).data("display-type", false);
				this.style.display = _showType;
			});
			return this;
		},

		// toggle
		toggle: function toggle() {

			Mobile.each(this, function () {

				var displayType = $(this).data("display-type");
				if (displayType) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});
			return this;
		},

		//  windowTop
		windowTop: function windowTop(y, time) {

			// get
			if (arguments.length === 0) {
				return parseFloat(window.pageYOffset) || 0;
			}

			Mobile.each(this, function () {
				if (this === window || this === document) {
					_scrollTop(this, y, time);
				} else {
					throw new Error("windowTop() function with element must is window or document ");
				}

				return false;
			});
			return this;
		},

		//  scrollTop
		scrollTop: function scrollTop(y, time) {

			// get
			if (arguments.length === 0) {
				var _size = 0;
				Mobile.each(this, function () {
					if (this === window || this === document) {
						_size = window.pageYOffset || 0;
					} else {
						_size = this.scrollTop;
					}
					return false;
				});
				return _size;
			} else {
				Mobile.each(this, function () {
					_scrollTop(this, y, time);
				});

				return this;
			}
		},

		//  scrollLeft
		scrollLeft: function scrollLeft(x, time) {

			// get
			if (arguments.length === 0) {
				var _size = 0;
				Mobile.each(this, function () {
					if (this === window || this === document) {
						_size = window.pageXOffset || 0;
					} else {
						_size = this.scrollLeft;
					}
					return false;
				});
				return _size;
			} else {
				Mobile.each(this, function () {
					_scrollLeft(this, x, time);
				});

				return this;
			}
		},

		// stop 

		stop: function stop() {
			Mobile.each(this, function () {
				var clearTimeId = this.clearTimeId || 0;
				clearInterval(clearTimeId);
			});

			return this;
		}

	});

	// 绑定事件
	Mobile.fn.extend({

		on: function on(type) {

			// tap是tuochstart,tuochmove,tuochend 集合封装
			if (type === "tap") {
				var tapAarrs = [];
				for (var i = 0; i < arguments.length; i++) {
					if (i !== 0) {
						tapAarrs.push(arguments[i]);
					}
				}

				this.tap.apply(this, tapAarrs);
				return;
			}

			var $this = this;
			var isonebind = $this.length > 0 && $this.bindOneElementEvent ? true : false; // m(el).one()只绑定一次事件
			var handler = function handler() {};
			var bl = false;
			var obj = null;
			var el = "";

			//  正常事件绑定
			function f(event) {
				if (type === "input") {
					// delete event.data;
					Object.defineProperty(event, 'data', {
						enumerable: true,
						configurable: true,
						writable: true,
						value: obj
					});
				}

				if (obj) {

					event.data = obj;
				}

				var props = [];
				var detail = typeof event.detail === "undefined" ? {} : event.detail;
				props.push(event);

				if (detail.length) {
					for (var i = 0; i < detail.length; i++) {
						props.push(detail[i]);
					}
				} else {
					props.push(detail);
				}

				handler.apply(this, props);

				// m(el).one()只绑定一次事件
				if (isonebind) {
					m(this).off(type, f, bl);
					m.events.on(type, f);
					$this.bindOneElementEvent = false;
				}
			}

			// 委托事件绑定
			function f2(event) {

				var entrustObj = m(event.target).closest(el).get(0); //委托对象
				if (entrustObj) {

					if (type === "input") {
						//delete event.data;
						Object.defineProperty(event, 'data', {
							enumerable: true,
							configurable: true,
							writable: true,
							value: obj
						});
					}
					if (obj) {
						event.data = obj;
					}

					var props = [];
					var detail = event.detail;
					props.push(event);

					if (detail.length) {
						for (var i = 0; i < detail.length; i++) {
							props.push(detail[i]);
						}
					} else {
						props.push(detail);
					}

					handler.apply(entrustObj, props);

					// m(el).one()只绑定一次事件
					if (isonebind) {
						m(this).off(type, f2, bl);
						m.events.on(type, f2);
						$this.bindOneElementEvent = false;
					}
				}
			}

			// 正常绑定事件
			if (arguments.length >= 2 && typeof arguments[1] === "function") {
				handler = arguments[1] || function () {};
				bl = typeof arguments[2] === "boolean" ? arguments[2] : false;

				Mobile.each(this, function () {
					if (this.addEventListener) {
						this.addEventListener(type, m.proxy(f, this), bl);
					}
					//ie8
					//else if(this.attachEvent) {
					//	this.attachEvent("on" + type, f, bl)
					//} else {
					//	this["on" + type] =f /*直接赋给事件*/
					//}
				});

				m.events.on(type, f);
			}

			// 正常绑定事件传object值
			if (arguments.length >= 3 && _typeof(arguments[1]) === "object" && typeof arguments[2] === "function") {
				obj = arguments[1];
				handler = arguments[2] || function () {};
				bl = typeof arguments[3] === "boolean" ? arguments[3] : false;

				Mobile.each(this, function () {
					if (this.addEventListener) {
						this.addEventListener(type, m.proxy(f, this), bl);
					}
				});

				m.events.on(type, f);
			}

			// 委托绑定事件
			if (arguments.length >= 3 && typeof arguments[1] === "string" && typeof arguments[2] === "function") {
				el = arguments[1].toString() || "";
				handler = arguments[2] || function () {};
				bl = typeof arguments[3] === "boolean" ? arguments[3] : false;

				Mobile.each(this, function () {
					if (this.addEventListener) {

						this.addEventListener(type, m.proxy(f2, this), bl);
					}
				});

				m.events.on(type, f2);
			}

			// 委托绑定事件传object值
			if (arguments.length >= 4 && typeof arguments[1] === "string" && _typeof(arguments[2]) === "object" && typeof arguments[3] === "function") {
				el = arguments[1].toString() || "";
				obj = arguments[2];
				handler = arguments[3] || function () {};
				bl = typeof arguments[4] === "boolean" ? arguments[4] : false;

				Mobile.each(this, function () {
					if (this.addEventListener) {
						this.addEventListener(type, m.proxy(f2, this), bl);
					}
				});

				m.events.on(type, f2);
			}

			return this;
		},

		off: function off(type, handler) {

			if (arguments.length === 1) {
				Mobile.each(this, function () {
					for (var i = m.events.props[type].length - 1; i >= 0; i--) {

						if (this.removeEventListener) {
							this.removeEventListener(type, m.events.props[type][i], false);
						} else {
							this.deattachEvent("on" + type, m.events.props[type][i]);
						}

						Mobile.events.off(type, m.events.props[type][i]);
					}
				});

				return;
			}
			Mobile.each(this, function () {
				if (this.removeEventListener) this.removeEventListener(type, handler, false);else if (this.deattachEvent) {
					/*IE*/
					this.deattachEvent('on' + type, handler);
				} else {

					// 直接赋给事件
					this["on" + type] = null;
				}
				Mobile.events.off(type, handler);
			});

			return this;
		},

		// trigger
		trigger: function trigger(type, obj) {

			Mobile.each(this, function () {
				try {
					var btnEvent = document.createEvent("CustomEvent");
					btnEvent.initCustomEvent(type, true, false, obj);
					this.dispatchEvent(btnEvent);
				} catch (ex) {
					console.log(ex);
				}
			});
		},

		// emit
		emit: function emit(type, obj) {
			Mobile.each(this, function () {
				m(this).trigger(type, obj);
			});
		},

		//  only bind one event
		one: function one() {
			var args = arguments;
			var $this = this;
			this.bindOneElementEvent = true;
			Mobile.each($this, function (i, v) {
				m(this).on.apply($this, args);
			});
		},

		// click
		click: function click(fn, bl) {

			if (arguments.length === 0) {
				Mobile.each(this, function () {
					this.click(); // 原生触发
				});
				return this;
			}

			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("click", fn, bl);
			});
		},

		// dblclick
		dblclick: function dblclick(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("dblclick", fn, bl);
			});
		},

		//  blur
		blur: function blur(fn, bl) {
			if (arguments.length === 0) {
				$(this).each(function () {
					this.blur(); // 原生触发
				});
				return this;
			}

			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("blur", fn, bl);
			});
		},

		// focus
		focus: function focus(fn, bl) {
			if (arguments.length === 0) {
				$(this).each(function () {
					this.focus(); // 原生触发
				});
				return this;
			}
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("focus", fn, bl);
			});
		},

		// touchstart
		touchstart: function touchstart(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchstart", fn, bl);
			});
		},

		// touchmove
		touchmove: function touchmove(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchmove", fn, bl);
			});
		},

		// touchend
		touchend: function touchend(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchend", fn, bl);
			});
		},

		// touchcancel
		touchcancel: function touchcancel(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchcancel", fn, bl);
			});
		},

		// touchend 和 touchcancel 
		touchendcancel: function touchendcancel(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchend", fn, bl);
				m(this).on("touchcancel", fn, bl);
			});
		},

		// window cancel event
		windowcancel: function windowcancel(fn) {
			var $this = this[0] || {};
			m(window).on("touchstart", function (event) {

				m(event.target).one("touchend", function (event) {
					fn.call($this, event);
				});
			});
		},

		// tap
		tap: function tap() {
			var args = arguments;
			var fn = function fn() {};
			var deletage = "";
			var bl = false;

			Mobile.each(this, function (i, v) {

				var isMOve = true; // 判断是否往上拖动
				var isMOveFirst = true;

				var startX = 0;
				var startY = 0;
				var isDeleDageTarget = true; // 是否是委托事件

				function start(event) {

					isMOve = true;
					isMOveFirst = true;
					var touch = event.changedTouches[0];
					startX = touch.clientX;
					startY = touch.clientY;

					if (event.touches.length > 1) {
						isMOve = false;
						isMOveFirst = false;
					} else {
						isMOve = true;
						isMOveFirst = true;
					}
				}

				function move(event) {

					var touch = event.changedTouches[0];
					var nowX = touch.clientX;
					var nowY = touch.clientY;
					var _x = Math.abs(nowX - startX);
					var _y = Math.abs(nowY - startY);
					if ((_x > 1 || _y > 1) && isMOveFirst) {
						isMOve = false;
						isMOveFirst = false;
					}
				}

				function end(event) {

					var _target;
					if (isDeleDageTarget) {
						_target = this;
					} else {
						_target = m(event.target).closest(deletage).get(0); //委托对象
					}

					if (isMOve) {
						if (typeof fn === "function") {
							fn.call(_target, event);
						}
					}
				}

				// 使用事件	
				if (args.length >= 1 && typeof args[0] === "function") {
					fn = args[0];
					bl = args[1] || false;
					isDeleDageTarget = true;

					m(this).on("touchstart", start, bl);
					m(this).on("touchmove", move, bl);
					m(this).on("touchend", end, bl);
				}

				// 使用委托事件	
				else if (args.length >= 2 && typeof args[0] === "string" && typeof args[1] === "function") {
						deletage = args[0];
						fn = args[1];
						bl = args[2] || false;
						isDeleDageTarget = false;

						m(this).on("touchstart", deletage, start, bl);
						m(this).on("touchmove", deletage, move, bl);
						m(this).on("touchend", deletage, end, bl);
					}

					// 使用事件data		
					else if (args.length >= 2 && _typeof(args[0]) === "object" && typeof args[1] === "function") {
							fn = args[1];
							bl = args[2] || false;
							var obj = args[0];
							isDeleDageTarget = true;

							m(this).on("touchstart", obj, start, bl);
							m(this).on("touchmove", obj, move, bl);
							m(this).on("touchend", obj, end, bl);
						}

						// 使用委托事件传值data	
						else if (args.length >= 3 && typeof args[0] === "string" && _typeof(args[1]) === "object" && typeof args[2] === "function") {
								deletage = args[0];
								var obj2 = args[1];
								fn = args[2];
								bl = args[3] || false;
								isDeleDageTarget = false;

								m(this).on("touchstart", deletage, obj2, start, bl);
								m(this).on("touchmove", deletage, obj2, move, bl);
								m(this).on("touchend", deletage, obj2, end, bl);
							}
			});
		},

		// scroll
		scroll: function scroll(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("scroll", fn, bl);
			});
		},

		// resize
		resize: function resize(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("resize", fn, bl);
			});
		},

		// change
		change: function change(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("change", fn, bl);
			});
		},

		// keyup
		keyup: function keyup(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keyup", fn, bl);
			});
		},

		// keyup
		keydown: function keydown(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keydown", fn, bl);
			});
		},

		// keypress
		keypress: function keypress(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keypress", fn, bl);
			});
		}
	});

	// 自定义事件列表
	Mobile.extend({
		events: {
			props: {},

			// bind events
			on: function on(eventName, fn) {
				this.props[eventName] = this.props[eventName] || [];
				this.props[eventName].push(fn);
			},
			off: function off(eventName, fn) {
				if (arguments.length === 1) {

					this.props[eventName] = [];
				} else if (arguments.length === 2) {
					var $events = this.props[eventName] || [];
					for (var i = 0; i < $events.length; i++) {
						if ($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}
					}
				}
			}
		}
	});

	return Mobile;
});
"use strict";

/*
    hqs-move

    changedTouches 改变后的触摸点集合
    targetTouches 当前元素的触发点集合
    touches 页面上所有触发点集合

   changedTouches 每个事件都会记录
   targetTouches，touches 在离开屏幕的时候无法记录触摸点

    支持多指触摸 touchstart touchmove touchend  合并封装
    $(el).move(touchstart=function(event,obj){},touchmove=function(event,obj){},touchend=function(event,obj){});

    // event 是事件对象
    // obj 是touch 移动对象
        obj = {
         x: 0, // 手指移动的X坐标的值
         y: 0, // 手指移动的Y坐标的值
         isX: false, // 是否为X方向移动
         isY: false // 是否为Y方向移动
        };

*/

+function (Mobile) {

    Mobile.fn.extend({

        // 多指触摸
        move: function move(startfn, movefn, endfn, bl) {

            var $self = this;
            bl = !!bl;
            this.isAddMoveEventFirst = true; // 判断是否第一次拖动
            this.startX = 0;
            this.startY = 0;

            this.obj = {
                x: 0, // 手指移动的X坐标的值
                y: 0, // 手指移动的Y坐标的值
                isX: false, // 是否为X方向移动
                isY: false // 是否为Y方向移动

            };

            /* 变化touchList的identifier和时间戳的集合
                {
                    id,
                    timestamp
                }
            */
            $self.tempObj = [];
            m(this).touchstart(function (event) {

                try {

                    //兼容ios的返回键和 window.history.back()
                    if (event.touches.length === 1) {
                        $self.tempObj = [];
                    }

                    var touches = event.targetTouches;
                    var len = touches.length;
                    Object.keys(touches).forEach(function (name) {

                        if (!$self.tempObj.some(function (item) {
                            return touches[name].identifier === item.id;
                        })) {
                            $self.tempObj.push({
                                id: touches[name].identifier,
                                timestamp: new Date().getTime()
                            });
                        }
                    });

                    var _index = 0;

                    var maxCh = m.max($self.tempObj, function (item) {
                        return item.timestamp;
                    });
                    if (maxCh) {

                        var i = 0;
                        Object.keys(touches).forEach(function (name) {
                            var ch = touches[name];
                            if (ch.identifier === maxCh.id) {
                                _index = i;
                            }
                            i++;
                        });
                    } else {
                        _index = len - 1;
                    }

                    var touch = touches[_index];
                    $self.obj.x = $self.startX = touch.clientX;
                    $self.obj.y = $self.startY = touch.clientY;

                    if (typeof startfn === "function") {
                        //event.obj=obj;
                        startfn.call($self, event, $self.obj);
                    }

                    // 异常处理
                } catch (e) {

                    //TODO handle the exception
                    $self.tempObj = [];
                    $self.isAddMoveEventFirst = true; // 判断是否第一次拖动
                    if (typeof endfn === "function") {
                        //event.obj=obj;
                        endfn.call($self, event, $self.obj);
                    }
                }
            }, bl);

            m(this).touchmove(function (event) {

                try {

                    var touches = event.touches;
                    var len = touches.length;
                    var _index = 0;

                    var maxCh = m.max($self.tempObj, function (item) {
                        return item.timestamp;
                    });
                    if (maxCh) {
                        var i = 0;
                        Object.keys(touches).forEach(function (name) {
                            var ch = touches[name];
                            if (ch.identifier === maxCh.id) {
                                _index = i;
                            }

                            i++;
                        });
                    } else {
                        _index = len - 1;
                    }

                    var touch = touches[_index];
                    var nowX = touch.clientX;
                    var nowY = touch.clientY;

                    var _x = Math.abs(nowX - $self.startX);
                    var _y = Math.abs(nowY - $self.startY);
                    $self.obj.x = nowX - $self.startX;
                    $self.obj.y = nowY - $self.startY;

                    // 检查是否向上下或左右移动
                    if ($self.isAddMoveEventFirst && _x !== _y) {
                        $self.isAddMoveEventFirst = false;
                        if (_y > _x) {

                            $self.obj.isY = true;
                            $self.obj.isX = false;
                        } else {

                            $self.obj.isY = false;
                            $self.obj.isX = true;
                        }
                    }

                    if (typeof movefn === "function") {
                        //event.obj=obj;
                        movefn.call($self, event, $self.obj);
                    }

                    // 异常处理
                } catch (e) {
                    //TODO handle the exception
                    $self.tempObj = [];
                    $self.isAddMoveEventFirst = true; // 判断是否第一次拖动
                    if (typeof endfn === "function") {
                        //event.obj=obj;
                        endfn.call($self, event, $self.obj);
                    }
                }
            }, bl);

            m(this).touchendcancel(function (event) {

                try {

                    var touches = event.changedTouches;
                    var touches2 = event.touches;

                    $self.tempObj = $self.tempObj.filter(function (item) {
                        return item.id !== touches[0].identifier;
                    });
                    var _index = 0;
                    var maxCh = m.max($self.tempObj, function (item) {
                        return item.timestamp;
                    });
                    if (maxCh) {
                        var i = 0;
                        Object.keys(touches2).forEach(function (name) {
                            var ch = touches2[name];
                            if (ch.identifier === maxCh.id) {
                                _index = i;
                            }
                            i++;
                        });
                    } else {
                        _index = touches2.length - 1;
                    }

                    if (touches2.length > 0) {
                        var touch = touches2[_index];
                        $self.startX = touch.clientX - $self.obj.x;
                        $self.startY = touch.clientY - $self.obj.y;
                    }

                    if ($self.tempObj.length === 0) {
                        $self.tempObj = [];
                        $self.isAddMoveEventFirst = true; // 判断是否第一次拖动                     
                        if (typeof endfn === "function") {

                            //event.obj=obj;
                            endfn.call($self, event, $self.obj);
                        }
                    }

                    //异常处理
                } catch (e) {
                    //TODO handle the exception
                    $self.tempObj = [];
                    $self.isAddMoveEventFirst = true; // 判断是否第一次拖动
                    if (typeof endfn === "function") {
                        //event.obj=obj;
                        endfn.call($self, event, $self.obj);
                    }
                }
            }, bl);
        }

    });
}(Mobile);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
      hqs-ajax
*/

+function (Mobile) {

	/* 封装ajax函数
     @param {string}opt.type http连接的方式，包括POST,GET PUT DELETE
     @param {string}opt.url 发送请求的url
     @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
     @param {object}opt.data 发送的参数，格式为对象类型
     @param {function}opt.contentType   内容类型
     @param{function}opt.success ajax发送并接收成功调用的回调函数
     @param {function}opt.error ajax发送并接收error调用的回调函数
     @param {function}opt.xhr 获取xhr对象
     @param {number}opt.timeout // 超时  默认0
 	@param {string}opt.dataType // 回调结果处理模式 默认text
 	@param {string}opt.headers  // headers 默认值是{},
  */

	var _ajaxSetup = Mobile.ajaxSettings = {
		type: "GET",
		url: '',
		async: true,
		data: {},
		success: function success() {},
		error: function error() {},
		dataType: "text",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		timeout: 0,
		//progress: {},
		headers: {},
		xhr: function xhr() {
			return Mobile.createXHR();
		}
	};

	// ajax type
	function _ajaxFun(url, type, data, _arguments) {
		var success;
		var error;
		//var progress;
		if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && _arguments.length > 2) {
			success = _arguments[2];
			if (_arguments.length >= 3) {
				error = _arguments[3];
				//	progress = _arguments[4] || null;
			}
		} else if (typeof data === "function") {
			success = data;
			if (_arguments.length > 2) {
				error = _arguments[2];
				//progress = _arguments[3] || null;
			}
		}

		// 最后的参数是字符类型赋值给 dataType
		var _dataType = "text";
		var lastArg = _arguments[_arguments.length - 1];
		if (typeof lastArg === "string") {
			_dataType = lastArg;
		}

		Mobile.ajax({
			type: type,
			url: url,
			data: (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" ? data : null,
			dataType: _dataType,
			success: success,
			error: error
			//progress: progress
		});
	}

	// 链接ajax发送的参数数据
	function _JoinParams(data) {

		var params = [];
		if (data instanceof Object) {
			_compilerparams(params, data, "");
		}
		return params.join("&") || "";
	}

	function _compilerparams(params, data, preKey) {
		preKey = preKey || "";

		for (var key in data) {
			var data2 = data[key];

			if (data2 === undefined) {
				continue;
			} else if (data2 !== null && data2.constructor === Object) {
				for (var key2 in data2) {

					var _key = "";
					var _key2 = "[" + key2 + "]";
					if (preKey === "") {
						_key = preKey + key + _key2;
					} else {
						_key = preKey + "[" + key + "]" + _key2;
					}

					var _value = data2[key2];

					if (_value.constructor === Array || _value.constructor === Object) {

						_compilerparams(params, _value, _key);
					} else {
						params.push(encodeURIComponent(_key) + '=' + encodeURIComponent(_value));
					}
				}
			} else if (data2 !== null && data2.constructor === Array) {

				for (var key2_ in data2) {
					var data3 = data2[key2_];
					if ((typeof data3 === "undefined" ? "undefined" : _typeof(data3)) === "object") {
						for (var key3 in data3) {

							var _key_ = "";
							var _key2_ = "[" + key2_ + "]" + "[" + key3 + "]";
							if (preKey === "") {
								_key_ = preKey + key + _key2_;
							} else {
								_key_ = preKey + "[" + key + "]" + _key2_;
							}

							var _value_ = data3[key3];

							if (_value_.constructor === Array || _value_.constructor === Object) {

								_compilerparams(params, _value_, _key_);
							} else {
								params.push(encodeURIComponent(_key_) + '=' + encodeURIComponent(_value_));
							}
						}
					} else {
						var _key_2 = preKey + key + "[]";
						var _value_2 = data3;
						params.push(encodeURIComponent(_key_2) + '=' + encodeURIComponent(_value_2));
					}
				}
			} else {
				var _key_3 = "";
				if (preKey === "") {
					_key_3 = preKey + key;
				} else {
					_key_3 = preKey + "[" + key + "]";
				}
				var dataVal = data[key];
				dataVal = dataVal === null ? "" : dataVal;
				params.push(encodeURIComponent(_key_3) + '=' + encodeURIComponent(dataVal));
			}
		}
	}

	Mobile.extend({

		// create XHR Object
		createXHR: function createXHR() {

			if (window.XMLHttpRequest) {
				//IE7+、Firefox、Opera、Chrome 和Safari
				return new window.XMLHttpRequest();
			}
		},

		ajaxSetup: function ajaxSetup(options) {

			options = (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" ? options : {};
			$.extend(_ajaxSetup, options);
			return _ajaxSetup;
		},
		ajax: function ajax(options) {

			options = (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" ? options : {};
			var opt = $.extend({}, _ajaxSetup, options);

			// setting timeout
			var abortTimeoutId = 0;
			var abort = function abort() {
				if (opt.timeout > 0) {
					abortTimeoutId = setTimeout(function () {
						xhr.onreadystatechange = function () {};
						xhr.abort();
						opt.error("timeout");
					}, opt.timeout);
				};
			};

			var xhr = null;
			var _xhrObj = opt.xhr();
			if ((typeof _xhrObj === "undefined" ? "undefined" : _typeof(_xhrObj)) === "object") {
				xhr = _xhrObj;
			}
			xhr.xhrFields = opt.xhrFields || {};

			// 连接参数
			var postData;
			var reg = /application\/x-www-form-urlencoded/;

			if (reg.test(opt.contentType)) {
				postData = _JoinParams(opt.data);
			} else {
				postData = opt.data;
			}

			// xhr.setRequestHeader
			for (var propName in opt.headers) {
				xhr.setRequestHeader(propName, opt.headers[propName]);
			}

			// setting contentType
			if (opt.contentType !== false) {
				xhr.setRequestHeader('Content-Type', opt.contentType);
			}

			if (opt.type.toUpperCase() === 'POST' || opt.type.toUpperCase() === 'PUT' || opt.type.toUpperCase() === 'DELETE') {
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() : opt.url + "&_=" + Math.random();

				xhr.open(opt.type, opt.url, opt.async);
				abort();
				xhr.send(postData);
			} else if (opt.type.toUpperCase() === 'GET') {
				if (postData.length > 0) {
					postData = "&" + postData;
				}
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() + postData : opt.url + "&_=" + Math.random() + postData;

				xhr.open(opt.type, opt.url, opt.async);
				abort();
				xhr.send(null);
			}
			xhr.onreadystatechange = function () {

				if (xhr.readyState === 4) {
					//xhr.onreadystatechange = function(){};
					clearTimeout(abortTimeoutId);
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
						if (typeof opt.success === "function") {
							try {
								var res;
								if (opt.dataType === "json") {
									res = JSON.parse(xhr.responseText);
								} else if (opt.dataType === "javascript") {
									res = xhr.responseText;
									window.eval(xhr.responseText);
								} else {
									res = xhr.responseText;
								}
								opt.success(res, xhr.status, xhr.statusText);
							} catch (e) {
								// handle the exception
								opt.success(xhr.responseText, xhr.status, xhr.statusText);
							}
						}
					} else {
						if (typeof opt.error === "function") {
							opt.error(xhr.status, xhr.statusText);
						}
					}
				}
			};
		},

		// get
		get: function get(url, data) {
			_ajaxFun(url, "get", data, arguments);
		},

		// post
		post: function post(url, data) {
			_ajaxFun(url, "post", data, arguments);
		},

		// put
		put: function put(url, data) {
			_ajaxFun(url, "put", data, arguments);
		},

		// delete
		delete: function _delete(url, data) {
			_ajaxFun(url, "delete", data, arguments);
		}

		// jsonp
		// jsonp: function (url, data) {

		// 	var callback;
		// 	if (typeof data === "function") {
		// 		callback = data;
		// 	} else if (arguments.length >= 3) {
		// 		callback = arguments[2];
		// 	}

		// 	// 创建一个几乎唯一的id
		// 	var callbackName = "mobile" + (new Date()).getTime().toString().trim();
		// 	window[callbackName] = function (result) {

		// 		// 创建一个全局回调处理函数
		// 		if (typeof callback === "function") {
		// 			callback(result);
		// 		}
		// 	};

		// 	// 参数data对象字符
		// 	var params = [];
		// 	var postData = "";
		// 	if (typeof data === "object") {

		// 		postData = _JoinParams(data);
		// 	}

		// 	if (postData.length > 0) {
		// 		postData = "&" + postData;
		// 	}
		// 	url = url.indexOf("?") === -1 ? url + "?" + "callback=" + callbackName + postData : url + "&callback=" +
		// 		callbackName + postData;

		// 	// 创建Script标签并执行window[id]函数
		// 	var script = document.createElement("script");
		// 	script.setAttribute("id", callbackName);
		// 	script.setAttribute("src", url);
		// 	script.setAttribute("type", "text/javascript");
		// 	document.body.appendChild(script);

		// }

	});
}(Mobile);
"use strict";

/*
 hqs-transform
*/

+function (m) {

    function getTransformArrayByCss($this) {
        var transformText = m($this).css("transform");
        if (!transformText) {
            transformText = m($this).css("-webkit-transform");
        }
        transformText = m.trim(transformText);
        //console.log(transformText)
        var reg = /\((.*)\)$/img;
        var bl = reg.test(transformText),
            arrs = [];
        if (bl) {
            var txts = RegExp.$1.split(",") || [];
            txts.forEach(function (item) {
                arrs.push(parseFloat(item.trim()));
            });
        }

        return arrs;
    }

    // getDeg
    function getDeg(transformArrs, a, b, c, d) {

        var len = transformArrs.length,
            deg = 0,
            aa = 0,
            bb = 0,
            cc = 0,
            dd = 0;

        if (len === 6) {
            aa = Math.round(180 * Math.asin(transformArrs[a]) / Math.PI);
            bb = Math.round(180 * Math.acos(transformArrs[b]) / Math.PI);
            cc = Math.round(180 * Math.asin(transformArrs[c]) / Math.PI);
            dd = Math.round(180 * Math.acos(transformArrs[d]) / Math.PI);
        } else {
            aa = Math.round(180 * Math.asin(transformArrs[a]) / Math.PI);
            bb = Math.round(180 * Math.acos(transformArrs[b]) / Math.PI);
            cc = Math.round(180 * Math.asin(transformArrs[c]) / Math.PI);
            dd = Math.round(180 * Math.acos(transformArrs[d]) / Math.PI);
        }

        if (aa === bb || -aa === bb) {
            deg = dd;
        } else if (-aa + bb === 180) {
            deg = 180 + cc;
        } else if (aa + bb === 180) {
            deg = 360 - cc || 360 - dd;
        }

        return deg >= 360 ? 0 : deg;
    }

    // setTransform 
    function setTransform(transforName, value, value2) {

        // 参数为3个
        if (arguments.length === 3) {
            var vals = [value];
            vals.push(value2);
            value = vals;
        }

        m.each(this, function () {
            if (!this.transform) {
                this.transform = {};
            }

            this.transform[transforName] = value;
            var result = '';
            var arrs = [];
            for (var item in this.transform) {
                switch (item) {
                    case 'rotate':
                    case 'rotateX':
                    case 'rotateY':
                    case 'rotateZ':
                    case 'skewX':
                    case 'skewY':
                    case 'skewZ':
                        result += item + '(' + parseFloat(this.transform[item]) + 'deg)  ';
                        break;
                    case 'skew':

                        arrs = this.transform[item] || [];
                        if (arrs.length === 2) {
                            result += item + '(' + parseFloat(arrs[0]) + 'deg,' + parseFloat(arrs[1]) + 'deg)  ';
                        } else {
                            result += item + '(' + parseFloat(arrs) + 'deg,' + parseFloat(arrs) + 'deg)  ';
                        }
                        break;

                    case 'scaleX':
                    case 'scaleY':
                    case 'scaleZ':
                        result += item + '(' + parseFloat(this.transform[item]) + ')  ';
                        break;

                    case 'scale':
                        arrs = this.transform[item] || [];

                        if (arrs.length === 2) {
                            result += item + '(' + parseFloat(arrs[0]) + ',' + parseFloat(arrs[1]) + ')  ';
                        } else {
                            result += item + '(' + parseFloat(arrs) + ',' + parseFloat(arrs) + ')  ';
                        }
                        break;

                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        result += item + '(' + parseFloat(this.transform[item]) + 'px)  ';
                        break;
                    case 'translate':
                        arrs = this.transform[item] || [];

                        if (arrs.length === 2) {
                            result += item + '(' + parseFloat(arrs[0]) + 'px,' + parseFloat(arrs[1]) + 'px)  ';
                        } else {
                            result += item + '(' + parseFloat(arrs) + 'px,' + parseFloat(arrs) + 'px)  ';
                        }
                        break;

                }
            }

            this.style.WebkitTransform = result;
            this.style.MozTransform = result;
            this.style.msTransform = result;
            this.style.OTransform = result;
            this.style.transform = result;

            //this.style.cssText+="transform:"+result;

        });

        return this;
    }

    //  getTransform by style
    // function getTransform(transforName) {

    //     var result = 0;
    //     Mobile.each(this, function () {
    //         if (!this.transform) {
    //             this.transform = {};
    //         }

    //         // read
    //         if (typeof this.transform[transforName] == 'undefined') {
    //             if (transforName == 'scale' || transforName == 'scaleX' || transforName == 'scaleY') {
    //                 result = 1
    //                 if (transforName === "scale") {
    //                     result = [1, 1];
    //                 }

    //             } else {
    //                 result = 0;
    //                 if (transforName === "skew" || transforName === "translate") {
    //                     result = [0, 0];
    //                 }
    //             }

    //         } else {
    //             if (transforName === "skew" || transforName === "translate" || transforName === "scale") {

    //                 result = this.transform[transforName];

    //                 if (result.constructor !== Array) {
    //                     result = [result, result];
    //                 }

    //             } else {
    //                 result = parseFloat(this.transform[transforName]);
    //             }

    //         }

    //     });

    //     return result;
    // };

    // getTransform  by css
    function getTransformByCss(transforName) {

        var result;
        Mobile.each(this, function () {
            var transformArrs = getTransformArrayByCss(this);
            // console.log(transformArrs)
            var len = transformArrs.length;
            switch (transforName) {

                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':

                    if (transforName === "rotate") {

                        if (transformArrs.length === 0) {
                            result = 0;
                        } else {

                            result = getDeg(transformArrs, 0, 1, 2, 3);
                        }
                    }

                    if (transforName === "rotateX") {
                        if (transformArrs.length === 0) {
                            result = 0;
                        } else {
                            result = getDeg(transformArrs, 5, 6, 9, 10);

                            // if(transformArrs[6]<0){
                            //     result=-(360-result);
                            // }
                        }
                    }

                    if (transforName === "rotateY") {
                        if (transformArrs.length === 0) {
                            result = 0;
                        } else {
                            result = getDeg(transformArrs, 0, 2, 8, 10);

                            // if(transformArrs[8]<0){
                            //     result=-(360-result);
                            // }
                        }
                    }

                    break;

                // case 'skew':
                // case 'skewX':
                // case 'skewY':
                // case 'skewZ':

                //     if (transforName === "skew") {

                //         if (transformArrs.length === 0) {
                //             result = 0;
                //         } else {

                //             result = getDeg(transformArrs, 0, 1, 2, 3);

                //         }

                //     }

                //     if (transforName === "skewX") {
                //         if (transformArrs.length === 0) {
                //             result = 0;
                //         } else {
                //             result = getDeg(transformArrs, 5, 6, 9, 10);

                //             // if(transformArrs[6]<0){
                //             //     result=-(360-result);
                //             // }

                //         }

                //     }

                //     if (transforName === "skewY") {
                //         if (transformArrs.length === 0) {
                //             result = 0;
                //         } else {
                //             result = getDeg(transformArrs, 0, 2, 8, 10);

                //             // if(transformArrs[8]<0){
                //             //     result=-(360-result);
                //             // }
                //         }

                //     }

                //     break;


                case 'translate':
                case 'translateX':
                case 'translateY':
                case 'translateZ':

                    if (transforName === "translate") {
                        if (len === 0) {
                            result = [0, 0];
                        } else {
                            result = len === 6 ? [transformArrs[4], transformArrs[5]] : [transformArrs[12], transformArrs[13]];
                        }
                    }
                    if (transforName === "translateX") {
                        if (len === 0) {
                            result = 0;
                        } else {
                            result = len === 6 ? transformArrs[4] : transformArrs[12];
                        }
                    }

                    if (transforName === "translateY") {
                        if (len === 0) {
                            result = 0;
                        } else {
                            result = len === 6 ? transformArrs[5] : transformArrs[13];
                        }
                    }
                    if (transforName === "translateZ") {
                        if (len === 0) {
                            result = 0;
                        } else {
                            result = len === 16 ? transformArrs[14] : 0;
                        }
                    }

                    break;

                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':

                    if (transforName === "scale") {
                        if (len === 0) {
                            result = [1, 1];
                        } else {
                            result = len === 6 ? [transformArrs[0], transformArrs[3]] : [transformArrs[0], transformArrs[5]];
                        }
                    }
                    if (transforName === "scaleX") {
                        if (len === 0) {
                            result = 1;
                        } else {
                            result = transformArrs[0];
                        }
                    }

                    if (transforName === "scaleY") {
                        if (len === 0) {
                            result = 1;
                        } else {
                            result = len === 6 ? transformArrs[3] : transformArrs[5];
                        }
                    }

                    break;
            }

            return false;
        });

        return result;
    };

    // transform 
    m.fn.extend({

        // translate
        translate: function translate() {

            if (arguments.length === 0) {
                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "translate");
                    return false;
                });

                return _v;
            } else {
                if (arguments.length === 1) {
                    setTransform.call(this, "translate", arguments[0]);
                }
                if (arguments.length === 2) {
                    setTransform.call(this, "translate", arguments[0], arguments[1]);
                }

                return this;
            }
        },

        // translateX
        translateX: function translateX(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "translateX");
                    return false;
                });

                return _v;
            } else {

                setTransform.call(this, "translateX", size);
                return this;
            }
        },

        // translateY
        translateY: function translateY(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "translateY");
                    return false;
                });

                return _v;
            } else {
                setTransform.call(this, "translateY", size);
                return this;
            }
        },

        // translateZ
        translateZ: function translateZ(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "translateZ");
                    return false;
                });

                return _v;
            } else {

                setTransform.call(this, "translateZ", size);
                return this;
            }
        },

        // scale
        scale: function scale() {

            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "scale");
                    return false;
                });

                return _v;
            } else {
                if (arguments.length === 1) {
                    setTransform.call(this, "scale", arguments[0]);
                }
                if (arguments.length === 2) {
                    setTransform.call(this, "scale", arguments[0], arguments[1]);
                }

                return this;
            }
        },

        // scaleX
        scaleX: function scaleX(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "scaleX");
                    return false;
                });

                return _v;
            } else {

                setTransform.call(this, "scaleX", size);
                return this;
            }
        },

        // scaleY
        scaleY: function scaleY(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "scaleY");
                    return false;
                });

                return _v;
            } else {

                setTransform.call(this, "scaleY", size);
                return this;
            }
        },

        // rotate
        rotate: function rotate(size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = getTransformByCss.call(m(this), "rotate");
                    return false;
                });

                return _v;
            } else {

                if (arguments.length >= 1) {
                    msetTransform.call(this, "rotate", size);
                }

                return this;
            }
        }

        //,

        // rotateX
        // rotateX: function (size) {
        //     if (arguments.length === 0) {

        //         var _v = 0;
        //         Mobile.each(this, function () {
        //             _v = getTransformByCss.call(m(this), "rotateX");
        //             return false;
        //         });

        //         return _v;

        //     } else {
        //         setTransform.call(this, "rotateX", size);
        //         return this;
        //     }

        // },

        // // rotateY
        // rotateY: function (size) {
        //     if (arguments.length === 0) {
        //         var _v = 0;
        //         Mobile.each(this, function () {
        //             _v = getTransformByCss.call(m(this), "rotateY");
        //             return false;
        //         });

        //         return _v;

        //     } else {
        //         setTransform.call(this, "rotateY", size);
        //         return this;
        //     }

        // },


        // // skew
        // skew: function () {

        //     if (arguments.length === 0) {

        //         var _v = 0;
        //         Mobile.each(this, function () {
        //             _v = getTransformByCss.call(m(this), "skew");
        //             return false;
        //         });

        //         return _v;

        //     } else {
        //         if (arguments.length === 1) {
        //             setTransform.call(this, "skew", arguments[0]);
        //         }
        //         if (arguments.length === 2) {
        //             setTransform.call(this, "skew", arguments[0], arguments[1]);
        //         }

        //         return this;
        //     }

        // },

        // // skewX
        // skewX: function (size) {
        //     if (arguments.length === 0) {

        //         var _v = 0;
        //         Mobile.each(this, function () {
        //             _v = getTransformByCss.call(m(this), "skewX");
        //             return false;
        //         });

        //         return _v;

        //     } else {

        //         setTransform.call(this, "skewX", size);
        //         return this;
        //     }


        // },

        // // skewY
        // skewY: function (size) {
        //     if (arguments.length === 0) {

        //         var _v = 0;
        //         Mobile.each(this, function () {
        //             _v = getTransformByCss.call(m(this), "skewY");
        //             return false;
        //         });

        //         return _v;

        //     } else {

        //         setTransform.call(this, "skewY", size);
        //         return this;
        //     }


        // },


    });
}(Mobile);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
css3 transition 
*/

+function (Mobile) {

    Mobile.fn.extend({

        // transition
        transition: function transition(option, time, ease, delay, fn) {

            ease = typeof ease === "string" ? ease : "ease";
            delay = typeof delay === "number" ? delay : 0;
            var _transition = "all " + time / 1000 + "s  " + ease + " " + delay / 1000 + "s";

            if (typeof option === "string") {

                if (arguments.length === 1) {
                    _transition = option;
                } else if (arguments.length > 1) {
                    _transition = option + " " + time / 1000 + "s  " + ease + " " + delay / 1000 + "s";
                }

                Mobile.each(this, function () {
                    this.style.MozTransition = _transition;
                    this.style.msTransition = _transition;
                    this.style.webkitTransition = _transition;
                    this.style.OTransition = _transition;
                    this.style.transition = _transition;
                });

                return this;
            }

            // option is object	
            if ((typeof option === "undefined" ? "undefined" : _typeof(option)) !== "object") {
                return;
            }
            Mobile.each(this, function (i, el) {
                time = typeof time === "number" ? time : 400;
                el.setTimeout = el.setTimeout || 0; // 第一次执行
                el.isEnd = el.isEnd || false; // 动画是否完毕

                if (el.isEnd === false) {

                    // 第一次执行
                    if (!el.isStart) {
                        el.isStart = true;
                        el.one = option; // 记录的第一次对象属性
                        el.setTimeout = time + el.setTimeout + delay;
                        el.style.MozTransition = _transition;
                        el.style.msTransition = _transition;
                        el.style.webkitTransition = _transition;
                        el.style.OTransition = _transition;
                        el.style.transition = _transition;
                        for (var name in option) {
                            el.style[name] = option[name];
                        }

                        //  第一次执行回调函数
                        if (typeof fn === "function") {
                            var clearTimeId2 = setTimeout(function () {
                                fn(el);
                                clearTimeout(clearTimeId2);
                            }, time + delay);
                        }
                    } else {
                        var clearTimeId = setTimeout(function () {

                            el.style.MozTransition = _transition;
                            el.style.msTransition = _transition;
                            el.style.webkitTransition = _transition;
                            el.style.OTransition = _transition;
                            el.style.transition = _transition;

                            for (var name in option) {
                                el.style[name] = option[name];
                            }
                            //  执行回调函数
                            if (typeof fn === "function") {
                                var clearTimeId2 = setTimeout(function () {
                                    fn(el);
                                    clearTimeout(clearTimeId2);
                                }, time + delay);
                            }
                            clearTimeout(clearTimeId);
                        }, el.setTimeout);

                        el.setTimeout = time + el.setTimeout + delay;
                    }
                }
            });

            return this;
        },

        // transitionEnd
        transitionEnd: function transitionEnd(isReset, fn) {

            // 是否回复到第一次的状态
            //isReset = typeof isReset === "boolean" ? isReset : false;
            var $arguments = arguments;
            Mobile.each(this, function (i, el) {

                // 第一次执行
                el.setTimeout = el.setTimeout || 0;

                // 动画是否完毕
                el.isEnd = true;
                //console.log("========end=======")

                // 动画是否完毕 回调函数
                var clearTimeId = setTimeout(function () {
                    el.isEnd = false;
                    el.setTimeout = 0;
                    el.isStart = false;

                    if (typeof isReset === "function") {
                        isReset(el);
                    } else if (typeof isReset === "boolean" && isReset === true) {

                        for (var name in el.one) {
                            el.style[name] = el.one[name];
                        }
                        var _v = "none";
                        el.style.MozTransition = _v;
                        el.style.msTransition = _v;
                        el.style.webkitTransition = _v;
                        el.style.OTransition = _v;
                        el.style.transition = _v;
                    }

                    if (typeof fn === "function") {
                        fn(el);
                    }
                }, el.setTimeout + 20);
            });
        }

    });
}(Mobile);