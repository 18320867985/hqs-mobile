!function(){var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var e,y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};n=e={exports:{}},i="undefined"!=typeof window?window:t,n.exports=function(r){var e=r.mobile,n=r.m,i=r.$;r.Mobile=r.$=r.m=r.mobile=function(t,e){if("function"!=typeof t||1!==arguments.length)return new Mobile.fn.init(t,e);Mobile.ready(t)},Mobile.version="1.1.0",Mobile.numberList=["left","top","right","bottom","width","height"];var t=["body","div","p","table","tr","thead","tbody","tfoot","h1","h2","h3","h4","h5","h6","article","aside","details","figcaption","figure","footer","header","hgroup","main","menu","nav","section","summary","ul","li","ol","dl","dt","dd","fieldset"],o=["img","audio","canvas","progress","video","text-area","select","input","button"];function h(n){var i="inline";return Mobile.each(t,function(t,e){if(e===n)return!(i="block")}),Mobile.each(o,function(t,e){if(e===n)return!(i="inline-block")}),i}function s(t,e){return t.parentElement&&e(t.parentElement)?t.parentElement:"html"!==(t.nodeName||"").toLowerCase()?s(t.parentElement,e):void 0}return Mobile.fn=Mobile.prototype={init:function(n,t){var i=[];if(this.length=0,t){if("string"==typeof t&&"string"==typeof n){if(0===t.trim().length)return this;if(0===n.trim().length)return this;var e=document.querySelectorAll(t);Mobile.each(e,function(){for(var t=this.querySelectorAll(n),e=0;e<t.length;e++)i.push(t[e])}),Array.prototype.push.apply(this,i)}else if("object"===(void 0===t?"undefined":y(t))&&"string"==typeof n){if(0===n.trim().length)return this;if(t.hasOwnProperty("length")&&0<t.length)Mobile.each(t,function(){for(var t=this.querySelectorAll(n),e=0;e<t.length;e++)i.push(t[e])}),Array.prototype.push.apply(this,i);else if(t.nodeType===Node.ELEMENT_NODE||t.nodeType===Node.DOCUMENT_NODE){var o=t.querySelectorAll(n);Array.prototype.push.apply(this,o)}}}else if("string"==typeof n){if(0===n.trim().length)return this;var s=document.querySelectorAll(n);Array.prototype.push.apply(this,s)}else"object"===(void 0===n?"undefined":y(n))&&(n.hasOwnProperty("length")&&0<n.length?Mobile.each(n,function(t,e){i.push(e)}):n.nodeType!==Node.ELEMENT_NODE&&n.nodeType!==Node.DOCUMENT_NODE&&n!==r||i.push(n),Array.prototype.push.apply(this,i));return this}},Mobile.fn.init.prototype=Mobile.fn,Mobile.extend=Mobile.fn.extend=function(t){var e,n,i,o,s,r,h=t||{},l=1,a=arguments.length,c=!1;for("boolean"==typeof h&&(c=h,h=arguments[l]||{},l++),"object"===(void 0===h?"undefined":y(h))||Mobile.isFunction(h)||(h={}),l===a&&(h=this,l--);l<a;l++)if(null!=(s=arguments[l]))for(o in s)e=h[o],h!==(i=s[o])&&(c&&i&&(Mobile.isPlainObject(i)||(n=Mobile.isArray(i)))?(r=n?(n=!1,e&&Mobile.isArray(e)?e:[]):e&&Mobile.isPlainObject(e)?e:{},h[o]=Mobile.extend(c,r,i)):void 0!==i&&(h[o]=i));return h},Mobile.extend({noCoflict:function(t){return r.$=i,r.m=n,t&&(r.mobile=e),Mobile},each:function(t,e){if(!t)throw new Error("els property type must is Array or Object");for(var n=0;n<t.length&&("function"!=typeof e||!1!==e.call(t[n],n,t[n]));n++);},ready:function(t){"function"==typeof t&&r.addEventListener("load",t)},isEqual:function(t,e){t=t||[];for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1},htmlStringToDOM:function(t){var e=document.createDocumentFragment(),n=document.createDocumentFragment(),i=document.createElement("div");i.innerHTML=t,n.appendChild(i);for(var o=n.querySelector("div").childNodes,s=o.length;0<s;s--)e.insertBefore(o[s-1],e.childNodes[0]);return n=null,e},checkSelector:function(t,e){if(""===(e="string"==typeof e?e:"").trim())return!1;var n=e.match(/\#[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g)||[],i=function(t,e,n){if(-1===n.search(/#/))return!0;if(-1!==n.search(/#/)&&0===e.length)return!1;for(var i=t.id||"",o=0;o<e.length;o++)if(e[o]==i)return!0;return!1}(t,n=c(n,"#",""),e),o=e.match(/\.[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g)||[],s=function(t,e,n){if(-1===n.search(/\./))return!0;if(-1!==n.search(/\./)&&0===e.length)return!1;for(var i=t.classList||"",o=0;o<e.length;o++)if(!i.contains(e[o]))return!1;return!0}(t,o=c(o,".",""),e),r=e.match(/^[a-zA-Z][\w|-]*[^\.|^#|\[]{0,}|[\]][a-zA-Z][\w|-]*[^\.|^#|\[]{0,}/g)||[],h=function(t,e,n){if(-1===n.search(/^[a-zA-Z]|[\]][a-zA-Z]/))return!0;if(-1!==n.search(/^[a-zA-Z]|[\]][a-zA-Z]/)&&0===e.length)return!1;for(var i=(t.nodeName||"").toLowerCase(),o=0;o<e.length;o++)if(e[o].trim()!==i)return!1;return!0}(t,r=c(r,"]",""),e),l=e.match(/\[[a-zA-Z][\w-=]*\]/g)||[],a=function(t,e,n){if(-1===n.search(/\[.*\]/))return!0;if(-1!==n.search(/\[.*\]/)&&0===e.length)return!1;for(var i=/=/g,o=0;o<e.length;o++)if(i.test(e[o])){var s=e[o].split("=");if((t.getAttribute(s[0])||"").trim()!==(s[1]||"").trim())return!1}else if(!t.hasAttribute(e[o]))return!1;return!0}(t,l=c(l=c(l,"[",""),"]",""),e);function c(t,e,n){for(var i=[],o=0;o<t.length;o++)i.push(t[o].replace(e,n));return i}return i&&s&&h&&a},trim:function(t){return(t="string"==typeof t?t:"").replace(/^\s*|\s*$/gim,"")},round:function(t,e){if(1===arguments.length){if("number"==typeof t)return Math.round(t)}else if(2===arguments.length&&"number"==typeof t&&"number"==typeof e){var n=Math.floor(t);return(n+=e)<t?Math.ceil(t):Math.floor(t)}return null},isMobile:function(){for(var t=navigator.userAgent.toString().toLowerCase(),e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!1,i=0;i<e.length;i++)if(0<t.indexOf(e[i].toLowerCase())){n=!0;break}return n},jsonToDate:function(t,e){e="string"!=typeof e?"yyyy-MM-dd":e;var n=t.toString().replace("/Date(","").replace(")/",""),i=parseInt(n);i=isNaN(i)?new Date(1970,0,1,0,0,1):i;var o=new Date(Number(i.toString())),s={"M+":o.getMonth()+1,"d+":o.getDate(),"H+":o.getHours(),"m+":o.getMinutes(),"s+":o.getSeconds(),"q+":Math.floor((o.getMonth()+3)/3),S:o.getMilliseconds()};for(var r in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(o.getFullYear()+"").substr(4-RegExp.$1.length))),s)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?s[r]:("00"+s[r]).substr((""+s[r]).length)));return e},isFunction:function(t){return"function"===Mobile.type(t)},isArray:Array.isArray||function(t){return"array"===Mobile.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return 0<=t-parseFloat(t)},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;if(!t||"object"!==Mobile.type(t)||t.nodeType||Mobile.isWindow(t))return!1;try{if(t.constructor&&!hasOwn.call(t,"constructor")&&!hasOwn.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}if(support.ownLast)for(e in t)return hasOwn.call(t,e);for(e in t);return void 0===e||hasOwn.call(t,e)},type:function(t){var e={},n=e.toString;return null==t?t+"":"object"===(void 0===t?"undefined":y(t))||"function"==typeof t?e[n.call(t)]||"object":void 0===t?"undefined":y(t)}}),Mobile.fn.extend({each:function(t){Mobile.each(this,t)},css:function(i,t){if(1!==arguments.length||"string"!=typeof i)return 2===arguments.length&&Mobile.each(this,function(){Mobile.isEqual(Mobile.numberList,i.trim())?this.style[i.trim()]=Number(t)?Number(t).toString()+"px":t:this.style[i.trim()]=t}),1===arguments.length&&"object"===(void 0===i?"undefined":y(i))&&Mobile.each(this,function(t,e){for(var n in i)Mobile.isEqual(Mobile.numberList,n.trim())?this.style[n]=Number(i[n])?Number(i[n]).toString()+"px":i[n]:this.style[n]=i[n]}),this;var n="";return Mobile.each(this,function(t,e){return r.getComputedStyle?(n=r.getComputedStyle(e,null)[i.trim()],Mobile.isEqual(Mobile.numberList,i.trim())&&(n=parseFloat(n)||0)):n=e.currentStyle?e.currentStyle[i]:e.style[i],!1}),n},find:function(t){for(var n=[],e=m(this),i=0;i<e.length;i++){var o=e[i].querySelectorAll(t);Mobile.each(o,function(t,e){n.push(e)}),delete e[i]}return delete e.length,Array.prototype.push.apply(e,n),e},text:function(t){var e="";return 0===arguments.length?(Mobile.each(this,function(){e+=this.innerText}),e):(1===arguments.length&&Mobile.each(this,function(){this.innerText=t}),this)},val:function(t){var e="";return 0===arguments.length?(Mobile.each(this,function(){e+=this.value}),e):(1===arguments.length&&Mobile.each(this,function(){this.value=t}),this)},html:function(t){var e="";return 0===arguments.length?(Mobile.each(this,function(){e+=this.innerHTML}),e):(1===arguments.length&&Mobile.each(this,function(){this.innerHTML=t}),this)},attr:function(t,e){if(1!==arguments.length||"string"!=typeof t)return 2===arguments.length&&Mobile.each(this,function(){this.setAttribute(t,e.toString())}),this;var n=void 0;return Mobile.each(this,function(){return null===(n=this.getAttribute(t))&&(n=void 0),!1}),n},hasAttr:function(t){var e=!1;if(1===arguments.length&&"string"==typeof t)return Mobile.each(this,function(){return e=this.hasAttribute(t),!1}),e},removeAttr:function(t){return 1===arguments.length&&"string"==typeof t&&Mobile.each(this,function(){this.removeAttribute(t)}),this},addClass:function(e){return"string"!=typeof e||(e=e.split(/\s+/),1===arguments.length&&Mobile.each(this,function(){for(var t=0;t<e.length;t++)e[t]&&this.classList.add(e[t])})),this},toggleClass:function(e){return"string"!=typeof e||(e=e.split(/\s+/),1===arguments.length&&Mobile.each(this,function(){for(var t=0;t<e.length;t++)e[t]&&(this.classList.contains(e[t])?this.classList.remove(e[t]):this.classList.add(e[t]))})),this},hasClass:function(t){var e=!1;return 1===arguments.length&&Mobile.each(this,function(){return e=this.classList.contains(t),!1}),e},removeClass:function(e){return"string"!=typeof e||(e=e.split(/\s+/),1===arguments.length&&Mobile.each(this,function(){for(var t=0;t<e.length;t++)e[t]&&this.classList.remove(e[t])})),this},parent:function(){for(var t=[],e=m(this),n=0;n<e.length;n++){var i=e[n].parentElement;i&&t.push(i),delete e[n]}return delete e.length,Array.prototype.push.apply(e,t),e},parents:function(e){e="string"==typeof e?e:"";for(var t=[],n=m(this),i=0;i<n.length;i++){var o=s(n[i],function(t){return Mobile.checkSelector(t,e)});delete n[i],o&&t.push(o)}return delete n.length,Array.prototype.push.apply(n,t),n},closest:function(e){e="string"==typeof e?e:"";for(var t=[],n=m(this),i=0;i<n.length;i++){var o;Mobile.checkSelector(n[i],e)?t.push(n[i]):o=s(n[i],function(t){return Mobile.checkSelector(t,e)}),delete n[i],o&&t.push(o)}return delete n.length,Array.prototype.push.apply(n,t),n},get:function(t){if("number"!=typeof t)throw Error("index property must is number type");if(t>=this.length)throw Error("number  value max object length ");return this[t]},eq:function(t){if("number"!=typeof t)throw Error("index property must is number type");for(var e=[],n=m(this),i=0;i<n.length;i++)i===t&&e.push(n[i]),delete n[i];return delete n.length,Array.prototype.push.apply(n,e),n},first:function(){for(var t=[],e=m(this),n=0;n<e.length;n++)0===n&&t.push(e[n]),delete e[n];return delete e.length,Array.prototype.push.apply(e,t),e},prev:function(){var i=[],t=m(this);return Mobile.each(t,function(t,e){var n=e.previousElementSibling;n&&i.push(n),delete e[t]}),delete t.length,Array.prototype.push.apply(t,i),t},next:function(){var i=[],t=m(this);return Mobile.each(t,function(t,e){var n=e.nextElementSibling;n&&i.push(n),delete e[t]}),delete t.length,Array.prototype.push.apply(t,i),t},siblings:function(){var s=[],t=m(this);return Mobile.each(t,function(t,e){for(var n=e.parentElement.children,i=m(e).index(),o=0;o<n.length;o++)o!==i&&s.push(n[o]);delete e[t]}),delete t.length,Array.prototype.push.apply(t,s),t},last:function(){for(var t=[],e=m(this),n=0;n<e.length;n++)n===(0<e.length?e.length-1:0)&&t.push(e[n]),delete e[n];return delete e.length,Array.prototype.push.apply(e,t),e},height:function(){if(0===arguments.length){var n=0;return Mobile.each(this,function(t,e){return n=this===r?r.innerHeight||r.document.documentElement.clientHeight||r.document.body.clientHeight:this===document?m(document.documentElement).css("height"):m(this).css("height"),n=parseFloat(n),!1}),n}if(1===arguments.length){var t=arguments[0];Mobile.each(this,function(){m(this).css("height",t)})}return this},outerHeight:function(){if(0===arguments.length){var n=0;return Mobile.each(this,function(t,e){return n=this===r?r.innerHeight||r.document.documentElement.clientHeight||r.document.body.clientHeight:this===document?m(document.documentElement).eq(0)&&m(document.documentElement).eq(0)[0].offsetHeight:m(this).eq(0)&&m(this).eq(0)[0].offsetHeight,n=parseFloat(n),!1}),n}if(1===arguments.length){var t=arguments[0];Mobile.each(this,function(){m(this).css("height",t)})}return this},outerWidth:function(){if(0===arguments.length){var t=0;return Mobile.each(this,function(){return t=this===r?r.innerWidth||r.document.documentElement.clientWidth||r.document.body.clientWidth:this===document?m(document.documentElement).eq(0)&&m(document.documentElement).eq(0)[0].offsetWidth:m(this).eq(0)&&m(this).eq(0)[0].offsetWidth,t=parseFloat(t),!1}),t}if(1===arguments.length){var e=arguments[0];Mobile.each(this,function(){m(this).css("width",e)})}return this},width:function(){if(0===arguments.length){var t=0;return Mobile.each(this,function(){return t=this===r?r.innerWidth||r.document.documentElement.clientWidth||r.document.body.clientWidth:this===document?m(document.documentElement).css("width"):m(this).css("width"),t=parseFloat(t),!1}),t}if(1===arguments.length){var e=arguments[0];Mobile.each(this,function(){m(this).css("width",e)})}return this},offsetTop:function(){var t=0;return Mobile.each(this,function(){return t=this.offsetTop,!1}),t},offsetLeft:function(){var t=0;return Mobile.each(this,function(){t=this.offsetLeft}),t},offset:function(){var t={};return Mobile.each(this,function(){t.left=this.offsetLeft,t.top=this.offsetTop}),t},index:function(t){var i=-1;return 0===arguments.length&&Mobile.each(this,function(t,e){if(e.parentElement){var n=e.parentElement.children;for(t=0;t<n.length;t++)n[t].isEqualNode(e)&&(i=t)}return!1}),i},remove:function(t){var i=[],o=this;return Mobile.each(this,function(t,e){if(e.parentElement){var n=this.parentElement.removeChild(this);i.push(n)}delete o[t]}),Array.prototype.push.apply(this,i),this},append:function(e){return"object"===(void 0===e?"undefined":y(e))&&e.length&&0<e.length?Mobile.each(this,function(){for(var t=0;t<e.length;t++)this.appendChild(e[t])}):"string"==typeof e?Mobile.each(this,function(){this.innerHTML+=e}):Mobile.each(this,function(){this.appendChild(e)}),this},prepend:function(e){if("object"===(void 0===e?"undefined":y(e))&&e.length&&0<e.length)Mobile.each(this,function(){for(var t=e.length;0<t;t--)this.insertBefore(e[t-1],this.childNodes[0])});else if("string"==typeof e){var t=Mobile.htmlStringToDOM(e);Mobile.each(this,function(){this.insertBefore(t,this.childNodes[0])})}else Mobile.each(this,function(){this.insertBefore(e,this.childNodes[0])});return this},clone:function(t){var e;return Mobile.each(this,function(){return e=this.cloneNode(!0),!1}),e}}),Mobile.fn.extend({show:function(){return Mobile.each(this,function(t,e){clearInterval(this.clearTimeId),this.isshow=!0;var n=this.showValue||"none",i=this.nodeName.toLowerCase();"none"===n&&(n=h(i)),this.style.display=n,this.style.opacity=1}),this},hide:function(){return Mobile.each(this,function(t,e){clearInterval(this.clearTimeId),this.isshow=!1;var n=m(this).css("display")||"none";this.showValue=n,this.style.display="none",this.style.opacity=0}),this},toggle:function(){return Mobile.each(this,function(){"none"!=(m(this).css("display")||"none").trim()?m(this).hide():m(this).show()}),this},fadeIn:function(s){return Mobile.each(this,function(t,e){clearInterval(this.clearTimeId);var n="";this.isshow=!0,this.firstclick?(n=this.showValue||"none",this.style.opacity=parseFloat(m(this).css("opacity"))||0):(this.firstclick=!0,n=m(this).css("display")||"none",this.style.opacity="none"===n?0:1);var i=this.nodeName.toLowerCase();parseFloat(m(this).css("opacity")),"none"==n&&(n=h(i)),this.style.display=n,this.showValue=n;var o=1e3/((s="number"==typeof s?s:400)/30);this.clearTimeId=setInterval(function(){var t=parseFloat(e.style.opacity)||0;t*=1e3,e.style.opacity=(o+t)/1e3,1e3<(t=1e3*(parseFloat(e.style.opacity)||0))+o&&(e.style.opacity=1,e.style.opacity=1,e.style.display=n,clearInterval(this.clearTimeId))}.bind(this),30)}),this},fadeOut:function(o){return Mobile.each(this,function(t,e){clearInterval(this.clearTimeId),this.firstclick=!0,this.isshow=!1;var n=m(this).css("display")||"none";"none"!=n&&(this.style.opacity=parseFloat(e.style.opacity)||1),this.showValue=n;var i=1e3/((o="number"==typeof o?o:400)/30);this.clearTimeId=setInterval(function(){var t=parseFloat(e.style.opacity)||0;t*=1e3,e.style.opacity=(t-i)/1e3,(t=1e3*(parseFloat(e.style.opacity)||0))-i<0&&(e.style.opacity=0,e.style.display="none",clearInterval(this.clearTimeId))}.bind(this),30)}),this},fadeToggle:function(e){return Mobile.each(this,function(){var t=m(this).css("display")||"none";void 0!==this.isshow?this.isshow?(m(this).fadeOut(e),this.isshow=!1):(m(this).fadeIn(e),this.isshow=!0):"none"!=t?this.firstclick?(m(this).fadeIn(e),this.isshow=!0):(m(this).fadeOut(e),this.isshow=!1):this.firstclick?(m(this).fadeOut(e),this.isshow=!1):(m(this).fadeIn(e),this.isshow=!0)}),this},windowTop:function(i,o){if(0===arguments.length)return parseFloat(r.pageYOffset)||0;o="number"==typeof o?o:400,i="number"==typeof i?i:parseFloat(i),i=isNaN(i)?0:i;var s=20;return Mobile.each(this,function(){if(this.clearTimeId=this.clearTimeId||0,clearInterval(this.clearTimeId),this!==r)throw new Error("element must is window");var t=o/20,e=parseFloat(r.pageYOffset)||0,n=Math.abs(e-i);if(s=n/t,i<e)this.clearTimeId=setInterval(function(){e-=s,r.scrollTo(0,e),e-s<i&&(r.scrollTo(0,i),clearInterval(this.clearTimeId))},20);else{if(e===i)return;this.clearTimeId=setInterval(function(){e+=s,r.scrollTo(0,e),i<e+s&&(r.scrollTo(0,i),clearInterval(this.clearTimeId))},20)}return!1}),this},scrollTop:function(t){if(0!==arguments.length)return Mobile.each(this,function(){this===r||this===document?r.scrollTo(0,parseFloat(t)):this.scrollTop=parseFloat(t)}),this;var e=0;return Mobile.each(this,function(){return e=this===r||this===document?r.pageYOffset||0:this.scrollTop,!1}),e},transition:function(s,r,t,h,l){var a="all "+r/1e3+"s  "+(t="string"==typeof t?t:"ease")+" "+(h="number"==typeof h?h:0)/1e3+"s";return"string"==typeof s?(1===arguments.length?a=s:1<arguments.length&&(a=s+" "+r/1e3+"s  "+t+" "+h/1e3+"s"),Mobile.each(this,function(){this.style.MozTransition=a,this.style.msTransition=a,this.style.webkitTransition=a,this.style.OTransition=a,this.style.transition=a}),this):"object"==(void 0===s?"undefined":y(s))?(Mobile.each(this,function(t,n){if(r="number"==typeof r?r:400,n.setTimeout=n.setTimeout||0,n.isEnd=n.isEnd||!1,!1===n.isEnd)if(n.isStart){var i=setTimeout(function(){for(var t in n.style.MozTransition=a,n.style.msTransition=a,n.style.webkitTransition=a,n.style.OTransition=a,n.style.transition=a,s)n.style[t]=s[t];if("function"==typeof l)var e=setTimeout(function(){l(n),clearTimeout(e)},r+h);clearTimeout(i)},n.setTimeout);n.setTimeout=r+n.setTimeout+h}else{for(var e in n.isStart=!0,n.one=s,n.setTimeout=r+n.setTimeout+h,n.style.MozTransition=a,n.style.msTransition=a,n.style.webkitTransition=a,n.style.OTransition=a,n.style.transition=a,s)n.style[e]=s[e];if("function"==typeof l)var o=setTimeout(function(){l(n),clearTimeout(o)},r+h)}}),this):void 0},transitionEnd:function(i,o){Mobile.each(this,function(t,n){n.setTimeout=n.setTimeout||0,n.isEnd=!0,setTimeout(function(){if(n.isEnd=!1,n.setTimeout=0,n.isStart=!1,"function"==typeof i)i(n);else if("boolean"==typeof i&&!0===i){for(var t in n.one)n.style[t]=n.one[t];var e="none";n.style.MozTransition=e,n.style.msTransition=e,n.style.webkitTransition=e,n.style.OTransition=e,n.style.transition=e}"function"==typeof o&&o(n)},n.setTimeout+20)})}}),Mobile.fn.extend({on:function(e){var n=this,i=!!(0<n.length&&n.bindOneElementEvent);if(2<=arguments.length&&"function"==typeof arguments[1]){function o(t){s.call(this,t),i&&(m(this).off(e,o,r),m.events.on(e,o),n.bindOneElementEvent=!1)}var s=arguments[1],r="boolean"==typeof arguments[2]&&arguments[2];Mobile.each(this,function(){this.addEventListener&&this.addEventListener(e,o,r)}),m.events.on(e,o)}if(3<=arguments.length&&"object"===y(arguments[1])&&"function"==typeof arguments[2]){function h(t){t.data=l,s.call(this,t),i&&(m(this).off(e,h,r),m.events.on(e,h),n.bindOneElementEvent=!1)}var l=arguments[1];s=arguments[2],r="boolean"==typeof arguments[3]&&arguments[3],Mobile.each(this,function(){this.addEventListener&&this.addEventListener(e,h,r)}),m.events.on(e,h)}if(3<=arguments.length&&"string"==typeof arguments[1]&&"function"==typeof arguments[2]){function a(t){Mobile.checkSelector(t.target,c)&&(s.call(t.target,t),i&&(m(this).off(e,a,r),m.events.on(e,a),n.bindOneElementEvent=!1))}var c=arguments[1].trim();s=arguments[2],r="boolean"==typeof arguments[3]&&arguments[3],Mobile.each(this,function(){this.addEventListener&&this.addEventListener(e,a,r)}),m.events.on(e,a)}if(4<=arguments.length&&"string"==typeof arguments[1]&&"object"===y(arguments[2])&&"function"==typeof arguments[3]){function u(t){Mobile.checkSelector(t.target,c)&&(t.data=l,s.call(t.target,t),i&&(m(this).off(e,u,r),m.events.on(e,u),n.bindOneElementEvent=!1))}c=arguments[1].trim(),l=arguments[2],s=arguments[3],r="boolean"==typeof arguments[4]&&arguments[4],Mobile.each(this,function(){this.addEventListener&&this.addEventListener(e,u,r)}),m.events.on(e,u)}return this},off:function(e,t){if(1!==arguments.length)return Mobile.each(this,function(){this.removeEventListener?this.removeEventListener(e,t,!1):this.deattachEvent?this.deattachEvent("on"+e,t):this["on"+e]=null,Mobile.events.off(e,t)}),this;Mobile.each(this,function(){for(var t=m.events.props[e].length-1;0<=t;t--)this.removeEventListener?this.removeEventListener(e,m.events.props[e][t],!1):this.deattachEvent("on"+e,m.events.props[e][t]),Mobile.events.off(e,m.events.props[e][t])})},trigger:function(e,n){Mobile.each(this,function(){n=n||{};var t=document.createEvent("CustomEvent");t.initCustomEvent(e,!0,!1,n),this.dispatchEvent(t)})},emit:function(t,e){Mobile.each(this,function(){m(this).trigger(t,e)})},one:function(){var n=arguments,i=this;this.bindOneElementEvent=!0,Mobile.each(i,function(t,e){m(this).on.apply(i,n)})},click:function(t,e){if(0===arguments.length)return Mobile.each(this,function(){this.click()}),this;e=e||!1,Mobile.each(this,function(){m(this).on("click",t,e)})},dblclick:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("dblclick",t,e)})},blur:function(t,e){if(0===arguments.length)return $(this).each(function(){this.blur()}),this;e=e||!1,Mobile.each(this,function(){m(this).on("blur",t,e)})},focus:function(t,e){if(0===arguments.length)return $(this).each(function(){this.focus()}),this;e=e||!1,Mobile.each(this,function(){m(this).on("focus",t,e)})},touchstart:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("touchstart",t,e)})},touchmove:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("touchmove",t,e)})},touchend:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("touchend",t,e)})},touchcancel:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("touchcancel",t,e)})},touchendcancel:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("touchend",t,e),m(this).on("touchcancel",t,e)})},windowcancel:function(e){var n=this[0]||{};m(r).on("touchstart",function(t){m(t.target).one("touchend",function(t){e.call(n,t)})})},tap:function(){var u=arguments,f=function(){},p="",d=!1;Mobile.each(this,function(t,e){var r=!0,h=!0,l=0,a=0,n=!0;function i(t){t.preventDefault(),h=r=!0;var e=t.changedTouches[0];l=e.clientX,a=e.clientY}function o(t){t.preventDefault();var e=t.changedTouches[0],n=e.clientX,i=e.clientY,o=Math.abs(n-l),s=Math.abs(i-a);(1<o||1<s)&&h&&(h=r=!1)}function s(t){var e;t.preventDefault(),e=n?this:t.target,r&&"function"==typeof f&&f.call(e,t)}if(1<=u.length&&"function"==typeof u[0])f=u[0],d=u[1]||!1,n=!0,m(this).on("touchstart",i,d),m(this).on("touchmove",o,d),m(this).on("touchend",s,d);else if(2<=u.length&&"string"==typeof u[0]&&"function"==typeof u[1])p=u[0],f=u[1],d=u[2]||!1,n=!1,m(this).on("touchstart",p,i,d),m(this).on("touchmove",p,o,d),m(this).on("touchend",p,s,d);else if(2<=u.length&&"object"===y(u[0])&&"function"==typeof u[1]){f=u[1],d=u[2]||!1;var c=u[0];n=!0,m(this).on("touchstart",c,i,d),m(this).on("touchmove",c,o,d),m(this).on("touchend",c,s,d)}else 3<=u.length&&"string"==typeof u[0]&&"object"===y(u[1])&&"function"==typeof u[2]&&(p=u[0],c=u[1],f=u[2],d=u[3]||!1,n=!1,m(this).on("touchstart",p,c,i,d),m(this).on("touchmove",p,c,o,d),m(this).on("touchend",p,c,s,d))})},scroll:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("scroll",t,e)})},resize:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("resize",t,e)})},change:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("change",t,e)})},keyup:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("keyup",t,e)})},keydown:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("keydown",t,e)})},keypress:function(t,e){e=e||!1,Mobile.each(this,function(){m(this).on("keypress",t,e)})}}),Mobile.extend({events:{props:{},on:function(t,e){this.props[t]=this.props[t]||[],this.props[t].push(e)},off:function(t,e){if(1===arguments.length)this.props[t]=[];else if(2===arguments.length)for(var n=this.props[t]||[],i=0;i<n.length;i++)if(n[i]===e){n.splice(i,1);break}}}}),Mobile.fn.extend({setTransform:function(i,o){return Mobile.each(this,function(){this.transform||(this.transform={}),this.transform[i]=o;var t="";for(var e in this.transform)switch(e){case"rotate":case"rotateX":case"rotateY":case"rotateZ":case"skewX":case"skewY":case"skewZ":t+=e+"("+parseFloat(this.transform[e])+"deg)  ";break;case"skew":2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+"deg,"+parseFloat(n[1])+"deg)  ":t+=e+"("+parseFloat(n)+"deg,0deg)  ";break;case"scaleX":case"scaleY":case"scaleZ":t+=e+"("+parseFloat(this.transform[e])+")  ";break;case"scale":2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+","+parseFloat(n[1])+")  ":t+=e+"("+parseFloat(n)+","+parseFloat(n)+")  ";break;case"translateX":case"translateY":case"translateZ":t+=e+"("+parseFloat(this.transform[e])+"px)  ";break;case"translate":var n;2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+"px,"+parseFloat(n[1])+"px)  ":t+=e+"("+parseFloat(n)+"px,0px)  "}this.style.WebkitTransform=t,this.style.MozTransform=t,this.style.msTransform=t,this.style.OTransform=t,this.style.transform=t}),this},getTransform:function(o){var s=0;return Mobile.each(this,function(){if(this.transform||(this.transform={}),void 0===this.transform[o])"scale"==o||"scaleX"==o||"scaleY"==o?(s=1,"scale"===o&&(s=[1,1])):(s=0,"skew"!==o&&"translate"!==o||(s=[0,0]));else if("skew"===o||"translate"===o||"scale"===o){for(var t=this.transform[o].split(","),e=[],n=0;n<t.length;n++){var i=parseFloat(t[n]);i="scale"===o?isNaN(i)?1:i:isNaN(i)?0:i,e.push(i)}1===e.length&&("scale"===o?e.push(e[0]):e.push(0)),s=e}else s=parseFloat(this.transform[o])}),s}}),Mobile}(i);var n,i}();
