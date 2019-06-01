(function (m) {

    // transform 
    m.fn.extend({

        // setTransform 
        setTransform: function (transforName, value, value2) {


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

                            var arrs = this.transform[item];
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
                            var arrs = this.transform[item];

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
                            var arrs = this.transform[item];

                            if (arrs.length === 2) {
                                result += item + '(' + parseFloat(arrs[0]) + 'px,' + parseFloat(arrs[1]) + 'px)  ';
                            } else {
                                result += item + '(' + parseFloat(arrs) + 'px,' + parseFloat(arrs) + 'px)  ';
                            }
                            break;

                    };

                };

                this.style.WebkitTransform = result;
                this.style.MozTransform = result;
                this.style.msTransform = result;
                this.style.OTransform = result;
                this.style.transform = result;

                //this.style.cssText+=result;

            });

            return this;
        },

        // getTransform
        getTransform: function (transforName) {

            var result = 0;
            Mobile.each(this, function () {
                if (!this.transform) {
                    this.transform = {};
                }

                // read
                if (typeof this.transform[transforName] == 'undefined') {
                    if (transforName == 'scale' || transforName == 'scaleX' || transforName == 'scaleY') {
                        result = 1
                        if (transforName === "scale") {
                            result = [1, 1];
                        }

                    } else {
                        result = 0;
                        if (transforName === "skew" || transforName === "translate") {
                            result = [0, 0];
                        }
                    }

                } else {
                    if (transforName === "skew" || transforName === "translate" || transforName === "scale") {

                        result = this.transform[transforName];

                        if (result.constructor !== Array) {
                            result = [result, result];
                        }

                    } else {
                        result = parseFloat(this.transform[transforName]);
                    }

                }

            });

            return result;
        },

        // translate
        translate: function () {

            if (arguments.length === 0) {
                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("translate");
                    return false;
                });

                return _v;

            } else {
                if (arguments.length === 1) {
                    m(this).setTransform("translate", arguments[0]);
                }
                if (arguments.length === 2) {
                    m(this).setTransform("translate", arguments[0], arguments[1]);
                }

                return this;
            }

        },

        // translateX
        translateX: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("translateX");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("translateX", size);
                return this;
            }

        },

        // translateY
        translateY: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("translateY");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("translateY", size);
                return this;
            }

        },

        // translateZ
        translateZ: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("translateZ");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("translateZ", size);
                return this;
            }

        },

        // rotate
        rotate: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("rotate");
                    return false;
                });

                return _v;

            } else {

                if (arguments.length >= 1) {
                    m(this).setTransform("rotate", size);
                }

                return this;
            }

        },

        // rotateX
        rotateX: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("rotateX");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("rotateX", size);
                return this;
            }

        },

        // rotateY
        rotateY: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("rotateY");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("rotateY", size);
                return this;
            }

        },

        // rotateZ
        rotateZ: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("rotateZ");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("rotateZ", size);
                return this;
            }

        },


        // skew
        skew: function () {

            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("skew");
                    return false;
                });

                return _v;

            } else {
                if (arguments.length === 1) {
                    m(this).setTransform("skew", arguments[0]);
                }
                if (arguments.length === 2) {
                    m(this).setTransform("skew", arguments[0], arguments[1]);
                }

                return this;
            }

        },

        // skewX
        skewX: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("skewX");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("skewX", size);
                return this;
            }


        },

        // skewY
        skewY: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("skewY");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("skewY", size);
                return this;
            }


        },
        // skewZ
        skewZ: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("skewZ");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("skewZ", size);
                return this;
            }


        },

        // scale
        scale: function () {

            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("scale");
                    return false;
                });

                return _v;

            } else {
                if (arguments.length === 1) {
                    m(this).setTransform("scale", arguments[0]);
                }
                if (arguments.length === 2) {
                    m(this).setTransform("scale", arguments[0], arguments[1]);
                }

                return this;
            }

        },

        // scaleX
        scaleX: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("scaleX");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("scaleX", size);
                return this;
            }


        },

        // scaleY
        scaleY: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("scaleY");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("scaleY", size);
                return this;
            }


        },
        // scaleZ
        scaleZ: function (size) {
            if (arguments.length === 0) {

                var _v = 0;
                Mobile.each(this, function () {
                    _v = m(this).getTransform("scaleZ");
                    return false;
                });

                return _v;

            } else {

                m(this).setTransform("scaleZ", size);
                return this;
            }


        },


    });

})(Mobile);
