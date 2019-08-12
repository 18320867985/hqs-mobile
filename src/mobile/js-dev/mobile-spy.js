
/*
					 滚动监听
					 <body data-spy="spy" data-target=".index-slide-pwr>
						 
						 <div class="index-slide-pwr">

                            <ul class="">
                                <li class="spy-itm"><a href="#lv0">今日指数</a></li>
                                <li  class="active spy-itm"><a href="#lv1">价格对比</a></li>
                                <li class="spy-itm"> <a href="#lv2">行业讯息</a></li>
                                <li class="spy-itm"><a href="#lv3">价格走势</a></li>
                                <li class="spy-itm"><a href="#lv4">合作伙伴</a></liclass="spy-item">
                                <!--<li  class="spy-itm"><a href="#lv-5">友情链接</a></li>-->

                                <li class="btn-top"><a href="javascript:;">顶部</a></li>


                            </ul>
                         </div>
					 </body>
				 */

+function ($) {

    var obj = {

        init: function (top) {

            var _top = Number(top);
            _top = isNaN(_top) ? 0 : _top;

            this.offsetTop = _top;
            this.bindEvent(this.offsetTop);
            this.onLoad();
            this.onReset();
            
        },


        offsetTop: 0,

        setOffsetTop: function (top) {
            this.offsetTop = typeof top === "number" ? top : 0;

        },

        onReset: function () {

            $(window).resize(function () {
                this.scrollList();
                this.scroll(this.offsetTop);
            }.bind(this));

        },

        onLoad: function () {

            var $this = this;
            $(function () {
               
                $this.scrollList();
                $this.scroll($this.offsetTop);
            
               
            });

            

        },

        selector: function () {
            var _tagget = $("[data-spy=spy]").attr("data-target");
            return $(_tagget);

        },

        bindEvent: function (top) {

            this.selector().find(".spy-itm  a").click(function () {

                // animation
                var $this = $(this);
                var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
                $("body,html").stop().animate({
                    scrollTop: _top
                }, 250);

            });

        },
        setTimeoutId:0,
        scroll: function (top) {

            var ff = this.getScrollList;
            var p = this.selector();
            var $this=this;
            $(window).on("scroll", function () {
             
                $this.setTimeoutId = setTimeout(function () {
                    clearTimeout($this.setTimeoutId);
                    var arrs = ff || [];
                  
                    for (var i = 0; i < arrs.length; i++) {
                        var item = arrs[i];
                        var m1 = parseInt(item.top); //- parseInt(top);
                        var m2 = parseInt(item.maxTop); //- parseInt(top);
                        if ($(window).scrollTop() >= (m1) && $(window).scrollTop() < (m2)) {

                            p.find(".spy-itm").removeClass("active");
                            $("[href=" + item.selector + "]").parent().addClass("active");

                            break;
                        }
                    }

                }, 250);
            });

        },

        scrollList: function () {

            var objs = [];

            var _offsetTop = this.offsetTop;
            var els = this.selector().find(".spy-itm");
            for (var i = 0; i < els.length; i++) {

                var a = $(els[i]).find("a");//.attr("href") || "";
              
                if (a[0].hasAttribute("href")) {
                    var _el = a.attr("href");
                   
                    var obj = {};
                    var _top = Math.floor($(_el).offset().top) - _offsetTop;

                    var maxTop = 0;
                    if (i < (els.length - 1)) {
                        var _el2 = $(els[i + 1]).find("a").attr("href");
                        maxTop = Math.floor($(_el2).offset().top) - _offsetTop;

                    } else {
                        maxTop = Math.floor($(document).height());

                    }

                    obj.selector = _el;
                    obj.top = _top;
                    obj.maxTop = maxTop;
                    objs.push(obj);

                }

            }

            return this.getScrollList = objs;

        },

        getScrollList: []

    };

    window.spy = obj;

}($);

      




