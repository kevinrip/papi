/** START: AppDynamics Configuration **/

window["adrum-start-time"] = new Date().getTime();
        (function(config){
            config.appKey = "AD-AAB-AAY-BSX";
            config.adrumExtUrlHttp = "http://www.southwest.com/swa-resources/scripts/vendors/appd";
            config.adrumExtUrlHttps = "https://www.southwest.com/swa-resources/scripts/vendors/appd";
            config.beaconUrlHttp = "http://pdx-col.eum-appdynamics.com";
            config.beaconUrlHttps = "https://pdx-col.eum-appdynamics.com";
            config.useHTTPSAlways = true;
            config.maxUrlLength = 512;
            config.spa = {"spa2":true};
        })(window["adrum-config"] || (window["adrum-config"] = {}));

/** END: AppDynamics Configuration **/


/** START: AppDynamics adrum.js **/

/* Copyright (c) 2010-2021 Google LLC. http://angular.io/license
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
/* Version bf71fe39e20d2aa8ad53d37ab6377745 v:23.3.0.4265, c:71dee88aa63177d46b34a845ef770835b7f8cfe1, b:23.3.0.4265 */
(function() {
    new function() {
        if (!window.ADRUM && !0 !== window["adrum-disable"]) {
            var h = window.ADRUM = {}
              , y = window.console
              , A = y && "function" == typeof y.log ? y : {
                log: function() {}
            };
            window["adrum-start-time"] = window["adrum-start-time"] || (new Date).getTime();
            var v = this && this.bd || function() {
                var a = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(a, m) {
                    a.__proto__ = m
                }
                || function(a, m) {
                    for (var e in m)
                        m.hasOwnProperty(e) && (a[e] = m[e])
                }
                ;
                return function(b, m) {
                    function e() {
                        this.constructor = b
                    }
                    a(b, m);
                    b.prototype = null === m ? Object.create(m) : (e.prototype = m.prototype,
                    new e)
                }
            }();
            (function(a) {
                (function(a) {
                    a.setUpMonitors = function() {
                        for (var a = [], b = 0; b < arguments.length; b++)
                            a[b] = arguments[b];
                        for (b = 0; b < a.length; b++) {
                            var c = a[b];
                            c && c.setUp()
                        }
                    }
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            window.Error.stackTraceLimit = Infinity;
            (function(a) {
                (function(b) {
                    function m(a) {
                        return b.refs.slice.apply(a, b.refs.slice.call(arguments, 1))
                    }
                    function e(a, l) {
                        return c(b.refs.setTimeout.apply) ? b.refs.setTimeout.apply(window, arguments) : b.refs.setTimeout(a, l)
                    }
                    function c(a) {
                        return "undefined" !== typeof a && null !== a
                    }
                    function k(a) {
                        return "object" == typeof a && !b.isArray(a) && null !== a
                    }
                    function l(a) {
                        return "function" == typeof a || !1
                    }
                    function f(a) {
                        return "string" == typeof a
                    }
                    function n(a) {
                        return "number" == typeof a
                    }
                    function q(a) {
                        return "" === a
                    }
                    function s(a, c) {
                        for (var l in c) {
                            var f = c[l];
                            if (t(c, l)) {
                                var n = a[l];
                                k(f) && k(n) ? s(n, f) : b.isArray(n) && b.isArray(f) ? a[l] = n.concat(f) : a[l] = f
                            }
                        }
                        return a
                    }
                    function t(a, b) {
                        return Object.prototype.hasOwnProperty.call(a, b) && c(a[b])
                    }
                    function r(a) {
                        return f(a) ? a.replace(/^\s*/, "").replace(/\s*$/, "") : a
                    }
                    function u() {
                        return b.refs.ra && l(b.refs.ra.now)
                    }
                    function h() {
                        return u() ? b.refs.round(b.refs.ra.now() + w()) : (new Date).getTime()
                    }
                    function w() {
                        var a = b.refs.ra
                          , a = a && a.timing && n(a.timing.navigationStart) ? a.timing.navigationStart : window["adrum-start-time"];
                        c(a) || (a = h());
                        return a
                    }
                    function p(a, b) {
                        var c = Array.prototype[a];
                        return c ? B(c) : I(a, b)
                    }
                    function B(a) {
                        return function(c) {
                            return a.apply(c, b.refs.slice.call(arguments, 1))
                        }
                    }
                    function I(a, b) {
                        return function(k, f) {
                            if (!c(k))
                                throw new TypeError(a + " called on null or undefined");
                            if (!l(f))
                                throw new TypeError(f + " is not a function");
                            return b.apply(null, arguments)
                        }
                    }
                    function z(a, b, c) {
                        var l = Object(a)
                          , k = l.length >>> 0
                          , f = 0;
                        if (3 > arguments.length) {
                            for (; f < k && !(f in l); )
                                f++;
                            if (f >= k)
                                throw new TypeError("Reduce of empty array with no initial value");
                            c = l[f++]
                        }
                        for (; f < k; f++)
                            f in l && (c = b(c, l[f], f, l));
                        return c
                    }
                    function D(a, c, l) {
                        return b.reduce(a, function(a, b, k, f) {
                            a[k] = c.call(l, b, k, f);
                            return a
                        }, Array(a.length >>> 0))
                    }
                    function E(a, c, l) {
                        return b.reduce(a, function(a, b, k, f) {
                            c.call(l, b, k, f) && a.push(b);
                            return a
                        }, [])
                    }
                    function F(a, b, c) {
                        a = Object(a);
                        for (var l = a.length >>> 0, k = 0; k < l; k++)
                            if (k in a && b.call(c, a[k], k, a))
                                return !0;
                        return !1
                    }
                    function G(a, c, l) {
                        return !b.some(a, function(a) {
                            return !c.call(l, a)
                        })
                    }
                    function R(a, c, l) {
                        b.reduce(a, function(a, b, k, f) {
                            c.call(l, b, k, f)
                        }, void 0)
                    }
                    function v(a) {
                        a = new b.refs.Error("Async Function:" + (a ? " " + a : ""));
                        a.stack && -1 == a.stack.toString().indexOf(a.message) && (a.stack = a.message + "\n" + a.stack);
                        return a
                    }
                    function C(a) {
                        return v(a).stack
                    }
                    function H(a) {
                        try {
                            throw v(a);
                        } catch (b) {
                            return b.stack
                        }
                    }
                    b.refs = {
                        isArray: Array.isArray,
                        toString: Object.prototype.toString,
                        slice: Array.prototype.slice,
                        setTimeout: window.setTimeout,
                        setInterval: window.setInterval,
                        ra: window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance,
                        assign: Object.assign,
                        round: Math.round,
                        Error: window.Error,
                        zj: Text
                    };
                    b.Ha = m;
                    b.oSTO = e;
                    b.isCORSSupported = function() {
                        var a = window.JSON && l(JSON.stringify);
                        return c(window.XMLHttpRequest) && "withCredentials"in new XMLHttpRequest && a
                    }
                    ;
                    b.isDefined = c;
                    b.dm = function(a) {
                        return "number" === typeof a && !window.isNaN(a)
                    }
                    ;
                    b.isArray = l(b.refs.isArray) && l(b.refs.isArray.bind) ? b.refs.isArray.bind(Array) : function(a) {
                        return b.refs.toString.call(a) === b.refs.toString.call([])
                    }
                    ;
                    b.isObject = k;
                    b.isFunction = l;
                    b.isString = f;
                    b.isNumber = n;
                    b.isBoolean = function(a) {
                        return "boolean" == typeof a
                    }
                    ;
                    b.$l = function(a) {
                        if (!k(a))
                            return !1;
                        var b = Object.prototype.toString.call(a);
                        return ("[object Error]" === b || "[object DOMException]" === b) && "name"in a && "message"in a
                    }
                    ;
                    b.max = function(a, b) {
                        return Math.max(isNaN(a) ? Number.NEGATIVE_INFINITY : a, isNaN(b) ? Number.NEGATIVE_INFINITY : b)
                    }
                    ;
                    b.rp = q;
                    b.wh = e;
                    b.Sp = function(a, b) {
                        e(a, b || 1E4)
                    }
                    ;
                    b.addEventListener = function(b, c, l, k) {
                        function f() {
                            try {
                                return l.apply(this, m(arguments))
                            } catch (k) {
                                a.exception(k, "M1", c, b, k)
                            }
                        }
                        void 0 === k && (k = !1);
                        a.logInfo("M0", c, b);
                        f.K = !0;
                        b.addEventListener ? b.addEventListener(c, f, k) : b.attachEvent && b.attachEvent("on" + c, f)
                    }
                    ;
                    b.loadScriptAsync = function(b) {
                        var l = document.createElement("script")
                          , k = a.conf.elementIdWithNonce;
                        l.type = "text/javascript";
                        l.async = !0;
                        l.src = b;
                        k && c(r(k)) && (k = document.getElementById(k)) && (k = k.Jp,
                        k = r(k),
                        c(k) && !q(k) && l.setAttribute("nonce", k));
                        (k = document.getElementsByTagName("script")[0]) ? (k.parentNode.insertBefore(l, k),
                        a.logInfo("M2", b)) : a.logInfo("M3", b)
                    }
                    ;
                    b.mergeJSON = s;
                    b.hasOwnPropertyDefined = t;
                    b.Wf = function(a, c) {
                        if (b.isFunction(Object.getPrototypeOf))
                            for (; b.isDefined(a) && !t(a, c); )
                                a = Object.getPrototypeOf(a);
                        return a
                    }
                    ;
                    b.yo = function(a) {
                        return c(a) ? b.isArray(a) ? a : [a] : []
                    }
                    ;
                    b.Wp = function(a, b) {
                        return null != a && a.slice(0, b.length) == b
                    }
                    ;
                    b.generateGUID = function(a) {
                        return c(a) && l(a.getRandomValues) && function() {
                            function b(a) {
                                a = a.toString(16);
                                return "0000".substr(a.length) + a
                            }
                            var c = new Uint16Array(8);
                            a.getRandomValues(c);
                            return b(c[0]) + b(c[1]) + "_" + b(c[2]) + "_" + b(c[3]) + "_" + b(c[4]) + "_" + b(c[5]) + b(c[6]) + b(c[7])
                        }
                    }(window.crypto || window.msCrypto) || function() {
                        return "xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                            var b = 16 * Math.random() | 0;
                            return ("x" == a ? b : b & 3 | 8).toString(16)
                        })
                    }
                    ;
                    b.tryExtractingErrorStack = function(a) {
                        return a ? (a = a.stack) && "string" === typeof a ? a : null : null
                    }
                    ;
                    b.trim = r;
                    b.Xm = function(a) {
                        var b = {}, c, l;
                        if (!a)
                            return b;
                        var k = a.split("\n");
                        for (l = 0; l < k.length; l++) {
                            var f = k[l];
                            c = f.indexOf(":");
                            a = r(f.substr(0, c)).toLowerCase();
                            c = r(f.substr(c + 1));
                            a && (b[a] = b[a] ? b[a] + (", " + c) : c)
                        }
                        return b
                    }
                    ;
                    b.tryPeriodically = function(a, b, c, l) {
                        function k() {
                            if (b())
                                c && c();
                            else {
                                var n = a(++f);
                                0 < n ? e(k, n) : l && l()
                            }
                        }
                        var f = 0;
                        k()
                    }
                    ;
                    b.wf = function(a) {
                        return a.charAt(0).toUpperCase() + a.slice(1)
                    }
                    ;
                    b.Xg = function(a) {
                        for (var b = [], c = 1; c < arguments.length; c++)
                            b[c - 1] = arguments[c];
                        return function() {
                            for (var c = [], l = 0; l < arguments.length; l++)
                                c[l] = arguments[l];
                            return a.apply(this, b.concat(c))
                        }
                    }
                    ;
                    b.sp = u;
                    b.now = h;
                    b.bb = w;
                    b.$o = z;
                    b.reduce = p("reduce", z);
                    b.Zo = D;
                    b.map = p("map", D);
                    b.Xo = E;
                    b.filter = p("filter", E);
                    b.ap = F;
                    b.some = p("some", F);
                    b.Wo = G;
                    b.every = p("every", G);
                    b.Yo = R;
                    b.forEach = p("forEach", R);
                    b.xk = function(a) {
                        return b.filter(a, c)
                    }
                    ;
                    b.ep = function(a) {
                        return [].concat.apply([], a)
                    }
                    ;
                    b.Ej = c(window.Reflect) && c(window.Reflect.construct) ? function(b, c, l, k) {
                        try {
                            return null !== c ? window.Reflect.construct(c, l, k) : b
                        } catch (f) {
                            return a.monitor.ErrorMonitor.A(f),
                            b
                        }
                    }
                    : function(b, c, l) {
                        try {
                            return null !== c && c.apply(b, l) || b
                        } catch (k) {
                            return a.monitor.ErrorMonitor.A(k),
                            b
                        }
                    }
                    ;
                    b.bd = function() {
                        var a = Object.setPrototypeOf || function(a, b) {
                            var c = Object.getOwnPropertyNames(b), l;
                            for (l in c)
                                a[l] = b[l]
                        }
                        ;
                        return function(b, c) {
                            function l() {
                                this.constructor = b
                            }
                            a(b, c);
                            b.prototype = null === c ? Object.create(c) : (l.prototype = c.prototype,
                            new l)
                        }
                    }();
                    b.Fk = function(a) {
                        if (!b.isString(a))
                            return a;
                        var c = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            "'": "&#39;",
                            '"': "&quot;",
                            "/": "&#47;"
                        };
                        return a.replace(/[&<>'"/]/g, function(a) {
                            return c[a]
                        })
                    }
                    ;
                    b.$p = function(a) {
                        if (!b.isString(a))
                            return a;
                        var c = {
                            "&amp;": "&",
                            "&#38;": "&",
                            "&#x26;": "&",
                            "&lt;": "<",
                            "&#60;": "<",
                            "&#x3c;": "<",
                            "&gt;": ">",
                            "&#62;": ">",
                            "&#x3e;": ">",
                            "&apos;": "'",
                            "&#39;": "'",
                            "&#x27;": "'",
                            "&quot;": '"',
                            "&#34;": '"',
                            "&#x22;": '"',
                            "&sol;": "/",
                            "&#47;": "/",
                            "&#x2f;": "/"
                        };
                        return a.replace(/&(?:amp|#0*38|#x0*26|lt|#0*60|#x0*3c|gt|#0*62|#x0*3e|apos|#0*39|#x0*27|quot|#0*34|#x0*22|sol|#0*47|#x0*2f);/g, function(a) {
                            a = a.replace(/0+\B/g, "");
                            return c[a]
                        })
                    }
                    ;
                    b.sk = function(a) {
                        var b;
                        return function() {
                            var c = this;
                            b && clearTimeout(b);
                            b = e(function() {
                                a.apply(c, arguments)
                            }, 300)
                        }
                    }
                    ;
                    b.jl = function(a) {
                        var c = a.length;
                        if (c)
                            for (c -= 1; 0 <= c; c--)
                                if (b.isObject(a[c]) && a[c].adrumArgs)
                                    return c;
                        return -1
                    }
                    ;
                    b.Ed = function(a, c) {
                        var l = a.length, k;
                        k = null;
                        if (l)
                            for (l -= 1; 0 <= l; l--)
                                if (b.isObject(a[l]) && a[l].adrumArgs) {
                                    k = a[l].adrumArgs;
                                    k = k[c];
                                    break
                                }
                        return k
                    }
                    ;
                    b.Td = function() {
                        return c(window.__zone_symbol__Promise) || c(window.__zone_symbol__ZoneAwarePromise)
                    }
                    ;
                    var g = C("")
                      , J = H("");
                    b.Na = g ? C : J ? H : C
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.conf || (a.conf = {});
                b.userConf = window["adrum-config"] || {};
                b.useHTTPSAlways = !0 === b.userConf.useHTTPSAlways;
                b.modernBrowserFeaturesAvailable = a.utils.isDefined(window.addEventListener) && a.utils.isCORSSupported() && a.utils.isDefined(Array.prototype.forEach);
                b.spa2 = b.userConf.spa && b.userConf.spa.spa2 && (!0 === b.userConf.spa.spa2 || a.utils.isObject(b.userConf.spa.spa2));
                b.clearResTiming = b.userConf.spa && a.utils.isObject(b.userConf.spa.spa2) && a.utils.isDefined(b.userConf.spa.spa2.clearResTiming) ? b.userConf.spa.spa2.clearResTiming : !0;
                b.disableTextForTesting = !0 === b.userConf.disableTextForTesting;
                b.enablePrimaryMetrics = (!a.utils.isDefined(b.userConf.enablePrimaryMetrics) || !0 === b.userConf.enablePrimaryMetrics) && b.modernBrowserFeaturesAvailable;
                b.M = !1;
                b.considerCarouselForVCT = a.utils.isDefined(b.userConf.jk) ? b.userConf.jk : !0;
                b.devMode = !0 === b.userConf.devMode;
                b.isZonePromise = !0 === b.userConf.isZonePromise || !0 === b.userConf.angular;
                b.fetch = !a.utils.isDefined(b.userConf.fetch) || !0 == b.userConf.fetch;
                b.backTimeGap = Math.abs(b.userConf.backTimeGap) || 0;
                b.neverSendImageBeacon = !a.utils.isDefined(b.userConf.beacon) || !a.utils.isDefined(b.userConf.beacon.neverSendImageBeacon) || !0 == b.userConf.beacon.neverSendImageBeacon;
                b.beaconUrlHttp = a.utils.isDefined(b.userConf.beaconUrlHttp) ? b.userConf.beaconUrlHttp : "http://col.eum-appdynamics.com";
                b.beaconUrlHttps = a.utils.isDefined(b.userConf.beaconUrlHttps) ? b.userConf.beaconUrlHttps : "https://col.eum-appdynamics.com";
                b.corsEndpointPath = "/eumcollector/beacons/browser" + (b.spa2 ? "/v2" : "/v1");
                b.imageEndpointPath = "/eumcollector/adrum.gif?";
                b.appKey = b.userConf.appKey || window["adrum-app-key"] || "APP_KEY_NOT_SET";
                a = b.useHTTPSAlways || "https:" === document.location.protocol;
                var m = b.userConf.adrumExtUrlHttp || "http://cdn.appdynamics.com"
                  , e = b.userConf.adrumExtUrlHttps || "https://cdn.appdynamics.com";
                b.adrumExtUrl = (a ? e : m) + "/adrum-ext.bf71fe39e20d2aa8ad53d37ab6377745.js";
                b.adrumXdUrl = e + "/adrum-xd.bf71fe39e20d2aa8ad53d37ab6377745.html";
                b.agentVer = "23.3.0.4265";
                b.sendImageBeacon = b.userConf.beacon && b.userConf.beacon.sendImageBeacon || window["adrum-send-image-beacon"];
                window["adrum-geo-resolver-url"] ? (m = window["adrum-geo-resolver-url"],
                e = m.indexOf("://"),
                -1 != e && (m = m.substring(e + 3)),
                m = (a ? "https://" : "http://") + m) : (m = b.userConf.geoResolverUrlHttps || "",
                e = b.userConf.geoResolverUrlHttp || "",
                m = a ? m : e);
                b.geoResolverUrl = m;
                b.useStrictDomainCookies = !0 === window["adrum-use-strict-domain-cookies"];
                b.Zi = 10;
                b.Ti = 10;
                b.sendBeaconOnUnload = b.userConf.beacon && !1 === b.userConf.beacon.sendOnUnload ? !1 : !0;
                b.isReportingPaused = b.userConf.pauseReporting || !1;
                b.ga = !1 === b.userConf.longStackTrace ? !1 : !0;
                b.isAbapApp = b.userConf.isAbapApp || !1;
                b.elementIdWithNonce = b.userConf.elementIdWithNonce || void 0;
                b.releaseId = b.userConf.releaseId || void 0;
                b.disableWrappingEventListeners = b.userConf.disableWrappingEventListeners || !1;
                b.disableUsingCauseStart = b.userConf.disableUsingCauseStart || !1;
                b.getAjaxResponseHeaders = b.userConf.getAjaxResponseHeaders || void 0
            }
            )(h || (h = {}));
            (function(a) {
                function b(b, c, l, k) {
                    b = a.conf.beaconUrlHttps + "/eumcollector/error.gif?version=1&appKey=" + l + "&msg=" + encodeURIComponent(b.substring(0, 500));
                    k && (b += "&stack=",
                    b += encodeURIComponent(k.substring(0, 1500 - b.length)));
                    return b
                }
                function m(c, l) {
                    2 <= B || (document.createElement("img").src = b(c, 0, a.conf.appKey, l),
                    B++)
                }
                function e(a) {
                    return 0 <= a.location.search.indexOf("ADRUM_debug=true") || 0 <= a.cookie.search(/(^|;)\s*ADRUM_debug=true/)
                }
                function c(b, c) {
                    void 0 === c && (c = u.INFO);
                    a.isDebug && w.push("" + c + b)
                }
                function k(a) {
                    c(s(arguments).join(" | "), u.ERROR)
                }
                function l(a) {
                    c(s(arguments).join(" | "), u.INFO)
                }
                function f(a) {
                    p.push(s(arguments).join(" | "))
                }
                function n(a) {
                    var b = s(arguments).join(" | ");
                    k(b);
                    m(b, null)
                }
                function q(a) {
                    void 0 === a && (a = u.INFO);
                    return t(w, function(b, c) {
                        var l = parseInt(c.charAt(0));
                        l >= a && (b += "[" + u[l] + "] " + c.slice(1).replace(/\<br\/\>/g, "\n\t") + "\n");
                        return b
                    }, "")
                }
                var s = a.utils.Ha
                  , t = a.utils.reduce
                  , r = a.utils.isDefined;
                a.iDR = e;
                var u;
                (function(a) {
                    a[a.DEBUG = 0] = "DEBUG";
                    a[a.INFO = 1] = "INFO";
                    a[a.ERROR = 2] = "ERROR"
                }
                )(u = a.LOG_LVL || (a.LOG_LVL = {}));
                var h;
                (function(a) {
                    a[a.API_ERROR = 0] = "API_ERROR";
                    a[a.API_ERROR_INVALID_PARAMS = 1] = "API_ERROR_INVALID_PARAMS";
                    a[a.API_ERROR_INVALID_CONFIG = 2] = "API_ERROR_INVALID_CONFIG";
                    a[a.API_WARNING = 3] = "API_WARNING";
                    a[a.API_WARNING_INEFFECTIVE_CONFIG = 4] = "API_WARNING_INEFFECTIVE_CONFIG"
                }
                )(h = a.Y || (a.Y = {}));
                a.Ub = ["JS Agent API Error:", "JS Agent API Error Invalid Parameters: ", "JS Agent API Error Invalid Configs: ", "JS Agent API Warning:", "JS Agent API Warning Ineffective Config:"];
                a.pb = " a constructor is called as a function. Don't forget keyword new.";
                a.isDebug = e(document);
                a.apiMessageConsoleOut = r(a.conf.userConf) && r(a.conf.userConf.log) && !0 === a.conf.userConf.log.apiMessageConsoleOut ? !0 : !1;
                var w = []
                  , p = [];
                a.logMessages = w;
                a.apiMessages = p;
                a.logError = k;
                a.logInfo = l;
                a.logDebug = function(a) {
                    c(s(arguments).join(" | "), u.DEBUG)
                }
                ;
                a.Hp = f;
                a.error = n;
                a.reportAPIMessage = function(b, c, l, k) {
                    var n = a.dn.apply(this, arguments);
                    f(n);
                    a.apiMessageConsoleOut && A.log(n);
                    return n
                }
                ;
                a.exception = function() {
                    if (!(1 > arguments.length)) {
                        var b = s(arguments)
                          , c = a.utils.tryExtractingErrorStack(b[0])
                          , b = b.slice(1);
                        a.utils.isArray(b) && (b = b.slice(0, 20));
                        b = b.join(" | ");
                        a.logError(b);
                        m(b, c)
                    }
                }
                ;
                a.assert = function(a) {
                    for (var b = 1; b < arguments.length; b++)
                        ;
                    var c = s(arguments);
                    a || (b = c[1],
                    (c = c.slice(2)) && 0 < c.length ? n("M4", b, c) : n("M5", b))
                }
                ;
                a.mp = q;
                a.dumpLog = a.isDebug ? function(a) {
                    void 0 === a && (a = u.INFO);
                    A.log(q(a))
                }
                : function() {}
                ;
                a.Mf = 0;
                a.Nf = 0;
                a.S = a.isDebug && a.utils.refs.ra ? function() {
                    a.Mf = a.utils.refs.ra.now()
                }
                : function() {}
                ;
                a.T = a.isDebug && a.utils.refs.ra ? function() {
                    a.Nf += a.utils.refs.ra.now() - a.Mf
                }
                : function() {}
                ;
                a.dn = function(b, c, l, k) {
                    var f = "", f = "", n = (new window.Error).stack, e, n = a.utils.isString(n) ? n.substring(5) : n + "";
                    r(e) || (e = a.utils.map(k, function(a) {
                        return null === a ? "null" : void 0 == a ? "undefined" : "" === a ? "''" : a
                    }));
                    switch (b) {
                    case h.ua:
                    case h.Ho:
                        f = a.Ub[b];
                        f = r(l) ? "" + f + c + "\n in " + l + "(" + e.join(", ") + ")\n" + n : "" + f + c + "\n" + n;
                        break;
                    case h.Ee:
                        f = a.Ub[b];
                        f = "" + f + c + "\nin " + l + "(" + e.join(", ") + ")\n" + n;
                        break;
                    case h.Go:
                    case h.ki:
                        f = a.Ub[b];
                        f = "" + f + c + ", but " + l + "=" + e.join(", ") + "\n" + n;
                        break;
                    default:
                        f = a.Ub[h.ua],
                        f = "" + f + c + "\nin " + l + "(" + e.join(", ") + ")\n" + n
                    }
                    return f
                }
                ;
                a.cIEBU = b;
                var B = 0;
                l("M6")
            }
            )(h || (h = {}));
            (function(a) {
                var b = function() {
                    function a(b) {
                        this.max = b;
                        this.od = 0
                    }
                    a.prototype.El = function() {
                        this.sc() || this.od++
                    }
                    ;
                    a.prototype.sc = function() {
                        return this.od >= this.max
                    }
                    ;
                    a.prototype.reset = function() {
                        this.od = 0
                    }
                    ;
                    return a
                }()
                  , m = function() {
                    function e() {
                        this.cc = [];
                        this.oe = new b(e.jj);
                        this.Xd = new b(e.cj)
                    }
                    e.prototype.submit = function(b) {
                        this.push(b) && a.initEXTDone && this.processQ()
                    }
                    ;
                    e.prototype.processQ = function() {
                        for (var b = this.Ak(), k = 0; k < b.length; k++) {
                            var l = b[k];
                            "function" === typeof a.commands[l[0]] ? (a.isDebug && a.logInfo("M7", l[0], l.slice(1).join(", ")),
                            a.commands[l[0]].apply(a, l.slice(1))) : a.error("M8", l[0])
                        }
                    }
                    ;
                    e.prototype.nm = function(a) {
                        return "reportXhr" === a || "reportPageError" === a
                    }
                    ;
                    e.prototype.push = function(b) {
                        var k = b[0]
                          , l = this.nm(k)
                          , f = l ? this.oe : this.Xd;
                        if (f.sc())
                            return a.logInfo("M9", l ? "spontaneous" : "non spontaneous", k),
                            !1;
                        this.cc.push(b);
                        f.El();
                        return !0
                    }
                    ;
                    e.prototype.Ak = function() {
                        var a = this.cc;
                        this.reset();
                        return a
                    }
                    ;
                    e.prototype.size = function() {
                        return this.cc.length
                    }
                    ;
                    e.prototype.reset = function() {
                        this.cc = [];
                        this.oe.reset();
                        this.Xd.reset()
                    }
                    ;
                    e.prototype.isSpontaneousQueueDead = function() {
                        return this.oe.sc()
                    }
                    ;
                    e.prototype.isNonSpontaneousQueueDead = function() {
                        return this.Xd.sc()
                    }
                    ;
                    return e
                }();
                m.jj = 100;
                m.cj = 100;
                a.CommandExecutor = m
            }
            )(h || (h = {}));
            (function(a) {
                a.q = new a.CommandExecutor;
                a.command = function(b) {
                    for (var m = 1; m < arguments.length; m++)
                        ;
                    a.isDebug && a.logInfo("M10", b, Array.prototype.slice.call(arguments).slice(1).join(", "));
                    a.q.submit(Array.prototype.slice.call(arguments))
                }
            }
            )(h || (h = {}));
            (function(a) {
                (function(a) {
                    var m = function() {
                        function a() {
                            this.status = {}
                        }
                        a.prototype.setUp = function() {}
                        ;
                        a.prototype.set = function(a, b) {
                            this.status[a] = b
                        }
                        ;
                        return a
                    }();
                    a.Yc = m
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.utils.Fk
                  , m = function() {
                    function e(a, b, l, f, n, e, s, m) {
                        this.action = a || "";
                        this.Hi = b || "";
                        this.className = l || "";
                        this.tagName = f || "";
                        this.name = n || "";
                        this.text = e || "";
                        this.src = s;
                        this.item = m
                    }
                    e.Bm = function(c) {
                        var k = b(c.id) || ""
                          , l = b(c.className) || ""
                          , f = ""
                          , n = new e;
                        c instanceof HTMLHtmlElement ? (f = "html",
                        n.text = "#html") : c === document ? (f = "document",
                        n.text = "#document") : c === window ? (f = "window",
                        n.text = "#window") : c instanceof XMLHttpRequest ? (f = "xhr",
                        n.src = a.utils.isObject(c._adrumAjaxT) ? encodeURI(c._adrumAjaxT.url()) : "") : c instanceof WebSocket ? (f = "websocket",
                        n.src = encodeURI(c.url)) : c instanceof HTMLScriptElement ? (f = "script",
                        n.src = encodeURI(c.src)) : c instanceof HTMLAnchorElement ? (f = "a",
                        n.text = b(c.text) || "") : c instanceof HTMLButtonElement ? (f = "button",
                        n.name = b(c.name)) : c instanceof HTMLDivElement ? f = "div" : c instanceof HTMLImageElement ? (f = "img",
                        n.src = encodeURI(c.src),
                        n.text = b(c.title) || "") : c instanceof HTMLLIElement ? (f = "li",
                        n.item = c.value) : c instanceof HTMLUListElement ? f = "ul" : c instanceof HTMLFormElement ? f = "form" : c instanceof HTMLFrameElement ? (f = "frame",
                        n.src = encodeURI(c.src)) : c instanceof HTMLInputElement ? (f = b(c.type) || "input",
                        n.text = b(c.value),
                        n.name = b(c.name)) : c instanceof HTMLTableElement ? f = "table" : c instanceof HTMLTableCaptionElement ? f = "tcap" : c instanceof HTMLTableCellElement ? f = "td" : c instanceof HTMLTableRowElement ? f = "tr" : (f = a.utils.isDefined(c.tagName) ? b(c.tagName) : "",
                        a.logInfo("M11", f));
                        n.Hi = k;
                        n.className = l;
                        n.tagName = f;
                        a.utils.isString(n.text) && (n.text = a.utils.isDefined(String.prototype.trim) ? n.text.trim() : n.text,
                        n.text = n.text.substring(0, 30));
                        return n
                    }
                    ;
                    return e
                }();
                a.Ga = m
            }
            )(h || (h = {}));
            var d = h.utils.Ha
              , g = h.utils.isFunction;
            (function(a) {
                var b = a.utils.generateGUID, m;
                (function(a) {
                    a[a.USER = 0] = "USER";
                    a[a.TIMER = 1] = "TIMER";
                    a[a.XHR = 2] = "XHR";
                    a[a.RESOURCE = 3] = "RESOURCE";
                    a[a.PROMISE = 4] = "PROMISE";
                    a[a.FETCH = 5] = "FETCH";
                    a[a.BASE_PAGE_LOAD = 6] = "BASE_PAGE_LOAD";
                    a[a.OTHER = 7] = "OTHER"
                }
                )(m = a.CauseType || (a.CauseType = {}));
                a.Og = 50;
                var e = function() {
                    return function(c, l, f) {
                        this.start = a.utils.now();
                        this.parent = c;
                        this.Qc = l;
                        this.guid = b();
                        this.type = f
                    }
                }();
                a.Wb = e;
                var c = function() {
                    function b() {}
                    b.Yf = function() {
                        return b.events
                    }
                    ;
                    b.vg = function(b) {
                        return a.utils.isDefined(b) && a.utils.isFunction(b.handleEvent)
                    }
                    ;
                    b.ck = function(b) {
                        b = this.Wk(b);
                        var c = b.Hk;
                        b.count < a.Og || (c.parent = null)
                    }
                    ;
                    b.Wk = function(b) {
                        var c = b;
                        b = b.parent;
                        for (var k = 1; b && k < a.Og; )
                            k++,
                            c = b,
                            b = b.parent;
                        return {
                            count: k,
                            Hk: c
                        }
                    }
                    ;
                    b.Dn = function() {
                        this.Wd = !0
                    }
                    ;
                    b.bk = function(a) {
                        this.Wd && (a.parent = null,
                        this.Wd = !1)
                    }
                    ;
                    b.gh = function(c, f, n, e) {
                        var s, m = f.guid;
                        b.sa(f);
                        try {
                            b.vg(c) ? s = c.handleEvent.apply(c, e) : g(c) && (s = c.apply(n, e))
                        } catch (r) {
                            throw a.conf.ga && (c = a.b.Yf(),
                            f = c.length,
                            r.stack && c && 0 < f && (r.stack += b.Lh(c[f - 1]))),
                            r;
                        } finally {
                            b.P(m)
                        }
                        return s
                    }
                    ;
                    b.Wc = function(c, f, n, e) {
                        if (!a.utils.isDefined(f) || f.K)
                            return f;
                        e = e || !1;
                        var s, m = a.conf.ga ? a.utils.Na(c) : "";
                        e || (s = b.pa());
                        return function(e) {
                            var q = b.La(c, e, s, n);
                            a.conf.ga && (q.la = m);
                            return b.gh(f, q, this, arguments)
                        }
                    }
                    ;
                    b.La = function(c, f, n, q) {
                        n ? a.logInfo("M12", c, n.Qc.action) : a.logInfo("M13", c);
                        a.utils.isDefined(f) ? (f = a.Ga.Bm(f.target || f.srcElement),
                        f.action = c) : f = new a.Ga(c);
                        c = new e(n,f,q);
                        b.bk(c);
                        b.ck(c);
                        return c
                    }
                    ;
                    b.Co = function(c, f, n) {
                        if (!a.utils.isDefined(f) || f.K)
                            return f;
                        var e = b.La(c, void 0, b.pa(), n)
                          , s = a.conf.ga ? a.utils.Na(c) : "";
                        return function() {
                            new a.Ga(c);
                            a.conf.ga && (e.la = s);
                            return b.gh(f, e, this, arguments)
                        }
                    }
                    ;
                    b.cq = function(a, c) {
                        return function() {
                            var n = c.apply(this, arguments);
                            b.jd(a);
                            return n
                        }
                    }
                    ;
                    b.pa = function() {
                        return 0 < b.events.length ? b.events[b.events.length - 1] : null
                    }
                    ;
                    b.sa = function(a) {
                        b.events.push(a)
                    }
                    ;
                    b.P = function(a) {
                        var c = b.events
                          , n = c.length
                          , e = null;
                        if (a)
                            for (n -= 1; 0 <= n; n--)
                                if (a === c[n].guid)
                                    return e = b.events.splice(n, 1),
                                    e[0];
                        return b.events.pop()
                    }
                    ;
                    b.kd = function(b, c) {
                        var k = b
                          , e = 1
                          , s = "";
                        if (!a.utils.isDefined(k))
                            return null;
                        for (; a.utils.isDefined(k.parent); )
                            s = " -> " + k.Qc.action + s,
                            k = k.parent,
                            e += 1;
                        var m = a.utils.now();
                        a.utils.isDefined(k.Qc) && (s = k.Qc.action + s + " -> " + c);
                        a.logInfo("M14", s);
                        a.logInfo("M15", k.start, e);
                        a.logInfo("M16", m - k.start);
                        return k
                    }
                    ;
                    b.jd = function(a) {
                        return b.kd(b.pa(), a)
                    }
                    ;
                    b.Lh = function(b) {
                        var c = "";
                        if (a.utils.isDefined(b)) {
                            for (; a.utils.isDefined(b.parent); )
                                b.la && (c = c + "\n" + b.la),
                                b = b.parent;
                            c += b.la ? "\n" + b.la : ""
                        }
                        return c
                    }
                    ;
                    b.ul = function() {
                        var c = b.jd(void 0);
                        if (a.utils.isDefined(c) && a.utils.isDefined(c.type))
                            return [m.TIMER, m.USER].some(function(a) {
                                return c.type == a
                            }) ? c : void 0
                    }
                    ;
                    b.Tl = function(a) {
                        if (g(a))
                            return a;
                        var b = "" + a;
                        return function() {
                            eval.call(window, b)
                        }
                    }
                    ;
                    b.setUp = function() {
                        b.events = [];
                        var c = a.utils.refs;
                        [{
                            Wg: c.setTimeout,
                            Tf: "setTimeout"
                        }, {
                            Wg: c.setInterval,
                            Tf: "setInterval"
                        }].forEach(function(a) {
                            var c = a.Wg
                              , l = a.Tf;
                            window[l] = function(a) {
                                var f = d(arguments);
                                if (a) {
                                    if (a.usedByAgent)
                                        return c.apply(window, f);
                                    var e = b.qm(l, arguments[1]) ? m.OTHER : m.TIMER
                                      , e = b.Co(l, b.Tl(a), e);
                                    f[0] = e;
                                    return c.apply(window, f)
                                }
                                c.apply(window, f)
                            }
                        });
                        a.conf.ga && (c = b.La("pageLoadInit", null, null, m.BASE_PAGE_LOAD),
                        b.sa(c),
                        b.Ia = c.guid)
                    }
                    ;
                    b.qm = function(b, c) {
                        return "setTimeout" == b && (a.utils.isDefined(c) && 0 == c || !a.utils.isDefined(c))
                    }
                    ;
                    return b
                }();
                c.events = [];
                c.Ia = "";
                c.Wd = !1;
                a.b = c
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.Ha
                      , e = a.utils.isDefined;
                    window.ADRUM.aop = b;
                    b.support = function(a) {
                        return !a || "apply"in a
                    }
                    ;
                    b.around = function(c, k, l, f, n) {
                        a.assert(b.support(c), "M17");
                        c = c || function() {}
                        ;
                        return function() {
                            if (a.isDebug)
                                try {
                                    a.logInfo("M18", f, m(arguments).join(", "))
                                } catch (b) {
                                    a.logError("M19", e(b.stack) || b.toString())
                                }
                            var s = m(arguments), t, r = null;
                            try {
                                if (k && (t = k.apply(this, s))) {
                                    var u = a.utils.jl(t)
                                      , r = t[u];
                                    -1 !== u && t.splice(u, 1)
                                }
                            } catch (h) {
                                a.exception(h, "M20", f, h)
                            }
                            a.assert(!t || a.utils.isArray(t));
                            u = void 0;
                            try {
                                u = c.apply(this, t || s)
                            } catch (w) {
                                throw a.logInfo(w, "M21", f, w),
                                a.conf.ga && a.b && (s = a.b.Yf(),
                                t = s.length,
                                w.stack && 0 < t && (w.stack += a.b.Lh(s[t - 1]))),
                                n && n(w),
                                w;
                            } finally {
                                try {
                                    l && (r ? (r.adrumArgs.origFuncResult = u,
                                    s.push(r)) : e(u) && (r = {
                                        adrumArgs: {
                                            origFuncResult: u
                                        }
                                    },
                                    s.push(r)),
                                    l.apply(this, s))
                                } catch (p) {
                                    a.exception(p, "M22", f, p)
                                }
                            }
                            return u
                        }
                    }
                    ;
                    b.before = function(a, k, l) {
                        return b.around(a, k, null, l)
                    }
                    ;
                    b.after = function(a, k, l) {
                        return b.around(a, null, k, l)
                    }
                    ;
                    b.forceWrap = function(b) {
                        var k = b.customDescriptorConfig || {}
                          , l = null
                          , f = b.parentObject
                          , n = b.property
                          , q = b.setUpFunc
                          , s = b.wrapNewFunctionAgain || !1
                          , m = b.propertyWrappedFunctionName;
                        if (f && n) {
                            l = Object.getOwnPropertyDescriptor(f, n);
                            if (!l || l.configurable) {
                                l ? (delete l.writable,
                                delete l.value) : l = {
                                    configurable: !0,
                                    enumerable: !0
                                };
                                var r = l.set
                                  , u = l.get;
                                l.set = k.set || function(l) {
                                    !0 !== l.usedByAgent && (e(r) && r(arguments),
                                    e(b.Ya) && !s || !a.utils.isFunction(q) || q(l))
                                }
                                ;
                                l.get = k.get || function() {
                                    var l = u ? u() : a.utils.refs[m];
                                    e(b.Ya) && (l = b.Ya);
                                    return l
                                }
                            } else
                                a.logInfo("M23", m);
                            Object.defineProperty(f, n, l)
                        } else
                            a.error("M24")
                    }
                }
                )(a.aop || (a.aop = {}))
            }
            )(h || (h = {}));
            (function(a) {
                a = a.EventType || (a.EventType = {});
                a[a.PageView = 0] = "PageView";
                a[a.Ajax = 2] = "Ajax";
                a[a.VPageView = 3] = "VPageView";
                a[a.Error = 4] = "Error";
                a[a.IFRAME = 1] = "IFRAME";
                a[a.ABSTRACT = 100] = "ABSTRACT";
                a[a.ADRUM_XHR = 101] = "ADRUM_XHR";
                a[a.NG_VIRTUAL_PAGE = 102] = "NG_VIRTUAL_PAGE"
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.events || (a.events = {});
                b.V = {};
                b.V[a.EventType.ABSTRACT] = {
                    guid: "string",
                    url: "string",
                    parentGUID: "string",
                    parentUrl: "string",
                    parentType: "number",
                    parentPageName: "string",
                    timestamp: "number"
                };
                b.V[a.EventType.VPageView] = {
                    resTiming: "object"
                };
                b.V[a.EventType.NG_VIRTUAL_PAGE] = {
                    digestCount: "number"
                };
                b.V[a.EventType.Ajax] = {
                    method: "string",
                    parentPhase: "string",
                    parentPhaseId: "number",
                    error: "object",
                    parameter: "object",
                    xhrStatus: "number",
                    dataObject: "object"
                };
                b.V[a.EventType.ADRUM_XHR] = {
                    allResponseHeaders: "string"
                };
                b.V[a.EventType.Error] = {
                    msg: "string",
                    line: "number",
                    stack: "string"
                }
            }
            )(h || (h = {}));
            (function(a) {
                var b = function() {
                    function a() {
                        this.na = {}
                    }
                    a.prototype.mark = function(a, b) {
                        m.mark.apply(this, arguments)
                    }
                    ;
                    a.prototype.getTiming = function(a) {
                        return (a = this.getEntryByName(a)) && a.startTime
                    }
                    ;
                    a.prototype.measure = function(a, b, l) {
                        m.measure.apply(this, arguments)
                    }
                    ;
                    a.prototype.getEntryByName = function(a) {
                        return m.getEntryByName.call(this, a)
                    }
                    ;
                    return a
                }();
                b.nd = function(a) {
                    return m.nd(a)
                }
                ;
                a.PerformanceTracker = b;
                var m;
                (function(b) {
                    var c = a.utils.hasOwnPropertyDefined
                      , k = a.utils.bb()
                      , l = a.utils.now;
                    b.mark = function(b, c) {
                        this.na[b] = {
                            name: b,
                            entryType: "mark",
                            startTime: a.utils.isDefined(c) ? c : l(),
                            duration: 0
                        }
                    }
                    ;
                    b.measure = function(b, n, e) {
                        c(this.na, n) && c(this.na, e) ? this.na[b] = {
                            name: b,
                            entryType: "measure",
                            startTime: n ? this.na[n].startTime : k,
                            duration: (e ? this.na[e].startTime : l()) - (n ? this.na[n].startTime : k)
                        } : a.error("M25", c(this.na, n) ? e : n)
                    }
                    ;
                    b.getEntryByName = function(a) {
                        return this.na[a] || null
                    }
                    ;
                    b.nd = function(a) {
                        return a + k
                    }
                }
                )(m || (m = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    function m(b, c) {
                        b = b || {};
                        for (var f in b)
                            c[f] = function() {
                                var c = f
                                  , l = b[f];
                                return function(b) {
                                    var k = "_" + c
                                      , f = this[k];
                                    if (a.utils.isDefined(b))
                                        if (typeof b === l)
                                            this[k] = b;
                                        else
                                            throw k = "wrong type of " + c + " value, " + typeof b + " passed in but should be a " + l + ".",
                                            a.reportAPIMessage(a.Y.Ee, k, "ADRUM.report", Array.prototype.slice.call(arguments)),
                                            TypeError(k);
                                    return f
                                }
                            }()
                    }
                    function e(a) {
                        var b = {}, c;
                        for (c in a) {
                            var n = a[c];
                            b[n.start] = !0;
                            b[n.end] = !0
                        }
                        return b
                    }
                    var c = function() {
                        function b(c) {
                            this.perf = new a.PerformanceTracker;
                            "Object" === this.constructor.name && a.reportAPIMessage(a.Y.ua, a.pb);
                            this.timestamp(a.utils.now());
                            this.guid(a.utils.generateGUID());
                            this.url(document.URL);
                            this.Lc(c)
                        }
                        b.prototype.type = function() {
                            return a.EventType.ABSTRACT
                        }
                        ;
                        b.prototype.Lc = function(b) {
                            if (a.utils.isObject(b))
                                for (var c in b) {
                                    var k = this[c] || this["mark" + a.utils.wf(c)];
                                    k && a.utils.isFunction(k) && k.call(this, b[c])
                                }
                        }
                        ;
                        b.fd = function(a, b, c) {
                            return {
                                guid: function() {
                                    return a
                                },
                                url: function() {
                                    return b
                                },
                                type: function() {
                                    return c
                                }
                            }
                        }
                        ;
                        b.prototype.ml = function() {
                            return b.fd(this.parentGUID(), this.parentUrl(), this.parentType())
                        }
                        ;
                        b.prototype.parent = function(b) {
                            var c = this.ml();
                            a.utils.isDefined(b) && (a.utils.isFunction(b.guid) && a.utils.isFunction(b.url) && a.utils.isFunction(b.type) ? (this.parentGUID(b.guid()),
                            this.parentUrl(b.url()),
                            this.parentType(b.type())) : a.reportAPIMessage(a.Y.ua, "object is not a valid EventIdentifier", "EventTracker.parent", Array.prototype.slice.call(arguments)));
                            return c
                        }
                        ;
                        return b
                    }();
                    b.EventTracker = c;
                    b.Za = m;
                    b.qf = function(b, c) {
                        b = b || {};
                        var f = e(b), n;
                        for (n in f)
                            f = a.utils.wf(n),
                            c["mark" + f] = a.utils.Xg(function(a, b) {
                                this.perf.mark(a, b)
                            }, n),
                            c["get" + f] = a.utils.Xg(function(a) {
                                return this.perf.getTiming(a)
                            }, n)
                    }
                    ;
                    m(b.V[a.EventType.ABSTRACT], c.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function(b) {
                        function c(k) {
                            k = b.call(this, k) || this;
                            k.constructor != c && a.reportAPIMessage(a.Y.ua, a.pb, "ADRUM.events.Error", []);
                            return k
                        }
                        v(c, b);
                        c.prototype.type = function() {
                            return a.EventType.Error
                        }
                        ;
                        return c
                    }(b.EventTracker);
                    b.Error = m;
                    b.Za(b.V[a.EventType.Error], m.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function b() {}
                        b.setUp = function() {
                            b.perf = a.utils.refs.ra;
                            a.utils.isObject(b.perf) && a.utils.isObject(b.perf.timing) || (b.perf = void 0)
                        }
                        ;
                        return b
                    }();
                    m.perf = null;
                    b.PerformanceWrapper = m
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.navTiming = null
                        }
                        e.prototype.Df = function() {
                            var c = b.PerformanceWrapper.perf;
                            if (c = c && c.timing)
                                if (c.navigationStart && c.navigationStart <= c.loadEventEnd) {
                                    var k = {}, l;
                                    for (l in c) {
                                        var f = c[l];
                                        "number" === typeof f && (k[l] = f)
                                    }
                                    this.navTiming = k
                                } else
                                    a.logInfo("M27");
                            else
                                a.logInfo("M26")
                        }
                        ;
                        e.prototype.setUp = function() {
                            b.PerformanceWrapper.setUp()
                        }
                        ;
                        return e
                    }();
                    b.NavTimingMonitor = m;
                    b.navMonitor = new b.NavTimingMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.ce = null;
                            b.PerformanceWrapper.setUp();
                            this.resourceBuffer = [];
                            this.basePageResourceBuffer = [];
                            this.Ye = 500;
                            this.ad = 150;
                            this.rj = 3E3;
                            this.setResourceTimingBufferSize();
                            this.En()
                        }
                        e.prototype.setUp = function() {
                            b.PerformanceWrapper.setUp();
                            a.utils.isDefined(b.PerformanceWrapper.perf) && a.utils.isFunction(b.PerformanceWrapper.perf.getEntriesByType) ? a.utils.isFunction(b.PerformanceWrapper.perf.addEventListener) ? b.PerformanceWrapper.perf.addEventListener("resourcetimingbufferfull", this.zb.bind(this)) : "onresourcetimingbufferfull"in b.PerformanceWrapper.perf ? a.utils.isFunction(b.PerformanceWrapper.perf.be) ? b.PerformanceWrapper.perf.be = a.aop.around(b.PerformanceWrapper.perf.be, this.zb.bind(this)) : b.PerformanceWrapper.perf.be = this.zb.bind(this) : a.utils.refs.setInterval.call(window, this.rn.bind(this), this.rj) : a.logInfo("M28");
                            this.In();
                            this.sn()
                        }
                        ;
                        e.prototype.In = function() {
                            var c = a.conf.userConf && a.conf.userConf.resTiming && a.conf.userConf.resTiming.bufSize;
                            a.utils.isDefined(b.PerformanceWrapper.perf) && a.utils.isFunction(b.PerformanceWrapper.perf.setResourceTimingBufferSize) && a.utils.isNumber(c) && 0 < c && (this.ad = c)
                        }
                        ;
                        e.prototype.sn = function() {
                            var c = b.PerformanceWrapper.perf;
                            a.utils.isDefined(c) && (a.utils.isFunction(c.setResourceTimingBufferSize) && (c.setResourceTimingBufferSize = a.aop.around(c.setResourceTimingBufferSize, function() {
                                a.utils.isDefined(arguments) && a.utils.isDefined(arguments[0]) && (this.ad = arguments[0])
                            }
                            .bind(this))),
                            a.utils.isFunction(c.clearResourceTimings) && (c.clearResourceTimings = a.aop.around(c.clearResourceTimings, function() {
                                this.zb()
                            }
                            .bind(this))))
                        }
                        ;
                        e.prototype.Cf = function() {
                            this.basePageResourceBuffer = this.Vf()
                        }
                        ;
                        e.prototype.zb = function() {
                            this.resourceBuffer = this.Vf()
                        }
                        ;
                        e.prototype.rn = function() {
                            this.Fb().length >= this.ad && this.zb()
                        }
                        ;
                        e.prototype.Fb = function() {
                            var c = b.PerformanceWrapper.perf
                              , k = [];
                            c && c.getEntriesByType && (c = c.getEntriesByType("resource")) && c.length && 0 < c.length && c.unshift && (k = c);
                            0 == k.length && a.logInfo("M29");
                            return k
                        }
                        ;
                        e.prototype.ql = function(b, k) {
                            return a.utils.filter(this.resourceBuffer, function(a) {
                                return b + a.startTime >= k
                            })
                        }
                        ;
                        e.prototype.rl = function(a, b) {
                            this.resourceBuffer = this.resourceBuffer.concat(this.Fb());
                            var l = this.ql(a, b);
                            this.clearResourceTimings();
                            this.resourceBuffer = [];
                            return l
                        }
                        ;
                        e.prototype.En = function() {
                            var c = b.PerformanceWrapper.perf;
                            a.utils.isDefined(c) && a.utils.isFunction(c.clearResourceTimings) && (this.ce = c.clearResourceTimings.bind(c))
                        }
                        ;
                        e.prototype.setResourceTimingBufferSize = function() {
                            var c = b.PerformanceWrapper.perf
                              , k = a.conf.userConf && a.conf.userConf.resTiming && a.conf.userConf.resTiming.bufSize;
                            !a.utils.isNumber(k) || 0 >= k ? a.logInfo("M30") : c && a.utils.isFunction(c.setResourceTimingBufferSize) ? c.setResourceTimingBufferSize(k) : a.logInfo("M31")
                        }
                        ;
                        e.prototype.Vf = function() {
                            var b = this.Fb();
                            if (this.resourceBuffer.length + b.length > this.Ye)
                                return a.logInfo("M32"),
                                this.resourceBuffer.concat(b.slice(0, this.Ye - this.resourceBuffer.length));
                            this.clearResourceTimings();
                            return this.resourceBuffer.concat(b)
                        }
                        ;
                        e.prototype.clearResourceTimings = function() {
                            a.conf.clearResTiming && a.utils.isFunction(this.ce) && this.ce()
                        }
                        ;
                        return e
                    }();
                    b.ResourceMonitor = m;
                    b.resourceMonitor = new b.ResourceMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(a) {
                    function m(a) {
                        return a.nodeName.toLowerCase()
                    }
                    function e(a) {
                        return "video" == m(a)
                    }
                    function c(a) {
                        return "image" == m(a)
                    }
                    function k(a) {
                        return "svg" == m(a)
                    }
                    function l(a) {
                        return "use" == m(a)
                    }
                    function f(a) {
                        return a ? 0 === a.lastIndexOf("video/", 0) || 0 === a.lastIndexOf("image/", 0) || 0 === a.lastIndexOf("font/", 0) || 0 === a.lastIndexOf("model/", 0) || 0 === a.lastIndexOf("text/", 0) : !1
                    }
                    function n(a) {
                        return "embed" == m(a) && (a.type ? f(a.type) : f(a.getAttribute("type")))
                    }
                    function q(a) {
                        return "object" == m(a) && (a.type ? f(a.type) : f(a.getAttribute("type")))
                    }
                    function s(a) {
                        return "img" == m(a)
                    }
                    function t(a) {
                        return "script" == m(a)
                    }
                    function r(a) {
                        return "link" == m(a)
                    }
                    function u(c, l) {
                        if (!r(c))
                            return !1;
                        var k = c.attributes.getNamedItem("rel");
                        return a.isDefined(k) ? k.value == l : !1
                    }
                    function h(a) {
                        return u(a, "stylesheet")
                    }
                    function w(c) {
                        c = a.isDefined(c.attributes) ? c.attributes.getNamedItem("src") || c.attributes.getNamedItem("href") : void 0;
                        return a.isDefined(c) ? c.value : void 0
                    }
                    function p(a) {
                        return t(a) || h(a)
                    }
                    a.il = m;
                    a.Bg = e;
                    a.Bp = c;
                    a.Ap = k;
                    a.km = l;
                    a.tg = function(a) {
                        return "canvas" == m(a)
                    }
                    ;
                    a.zg = function(c) {
                        return c instanceof a.refs.zj
                    }
                    ;
                    a.yp = f;
                    a.Xf = function(a) {
                        return (a.right - a.left) * (a.bottom - a.top)
                    }
                    ;
                    a.xp = n;
                    a.zp = q;
                    a.bm = s;
                    a.lm = t;
                    a.tp = r;
                    a.up = u;
                    a.pm = h;
                    a.hm = function(a) {
                        return u(a, "preload")
                    }
                    ;
                    a.fb = function(a) {
                        return s(a) || q(a) || n(a) || e(a) || c(a) || k(a) || l(a)
                    }
                    ;
                    a.Ib = function(a, b) {
                        var c = b || window.getComputedStyle(a);
                        return "none" !== c.getPropertyValue("display") && "hidden" !== c.getPropertyValue("visibility")
                    }
                    ;
                    a.Id = function(a) {
                        var b = "";
                        a instanceof HTMLImageElement ? b = a.currentSrc || a.src : a instanceof HTMLEmbedElement ? b = a.src : a instanceof HTMLObjectElement ? b = a.data : "undefined" != typeof HTMLVideoElement && a instanceof HTMLVideoElement ? b = a.currentSrc || a.src : a instanceof SVGImageElement ? b = a.href.baseVal : a instanceof SVGUseElement && (b = a.href.baseVal);
                        return b
                    }
                    ;
                    a.np = function(a) {
                        var b = "";
                        a instanceof HTMLImageElement ? b = "img" : a instanceof HTMLEmbedElement ? b = "embed" : a instanceof HTMLObjectElement ? b = "object" : "undefined" != typeof HTMLVideoElement && a instanceof HTMLVideoElement ? b = "video" : a instanceof SVGImageElement ? b = "image" : a instanceof SVGUseElement && (b = "use");
                        return b
                    }
                    ;
                    a.cb = w;
                    a.mc = function(c) {
                        var l = w(c);
                        return l && 0 != l.length ? p(c) ? (a.isDefined(c.adrumNodeGUID) || (c.adrumNodeGUID = a.generateGUID()),
                        c.adrumNodeGUID) : l : null
                    }
                    ;
                    a.wp = p
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = function() {
                    function b() {
                        this.Ul = 0.2;
                        this.nb = 0;
                        this.Hb = !1;
                        this.Ka = a.conf.spa2;
                        this.yc = this.j = this.ha = this.w = this.c = this.ya = 0;
                        this.ab = null;
                        this.kc = 0;
                        this.tc = !1;
                        this.pd = 3;
                        this.lc = null;
                        this.Tc = this.Uc = 0;
                        this.viewport = {
                            top: 0,
                            left: 0,
                            bottom: this.Tc,
                            right: this.Uc
                        };
                        this.Ra = 1
                    }
                    b.prototype.setUp = function() {
                        this.O = {};
                        this.Jb = {};
                        this.Ra = 1;
                        this.ha = a.utils.now();
                        this.j = 0;
                        this.jb = [];
                        this.xb = [];
                        this.Cb = [];
                        this.w = this.c = this.yc = 0;
                        var b = window.MutationObserver;
                        this.tc = a.utils.isDefined(a.conf.considerCarouselForVCT) ? a.conf.considerCarouselForVCT : !0;
                        this.Bf();
                        a.utils.addEventListener(window, "resize", a.utils.sk(this.Bf).bind(this));
                        a.utils.isDefined(b) && (a.utils.isDefined(window.Zone) && a.utils.isDefined(window.Zone.__symbol__) && a.utils.isDefined(window.Zone.__symbol__("MutationObserver")) ? this.Bc = new (window[window.Zone.__symbol__("MutationObserver")])(this.Tg.bind(this)) : this.Bc = new b(this.Tg.bind(this)),
                        this.Bc.observe(document.documentElement, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0,
                            attributeFilter: ["src", "href"]
                        }),
                        a.logInfo("M33"))
                    }
                    ;
                    b.prototype.Tg = function(b) {
                        var c = this;
                        a.S();
                        b.forEach(function(a) {
                            switch (a.type) {
                            case "childList":
                                [].slice.call(a.addedNodes).forEach(function(a) {
                                    c.tf(a)
                                });
                                break;
                            case "attributes":
                                c.tf(a.target)
                            }
                        });
                        a.T()
                    }
                    ;
                    b.prototype.Bf = function() {
                        this.Uc = a.utils.isDefined(window.innerWidth) && a.utils.isDefined(document.documentElement.clientWidth) ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth;
                        this.Tc = a.utils.isDefined(window.innerHeight) && a.utils.isDefined(document.documentElement.clientHeight) ? Math.min(window.innerHeight, document.documentElement.clientHeight) : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
                        a.logInfo("M34", this.Uc, this.Tc);
                        this.viewport = {
                            top: 0,
                            left: 0,
                            bottom: this.Tc,
                            right: this.Uc
                        }
                    }
                    ;
                    b.prototype.start = function() {
                        a.S();
                        this.setUp();
                        a.T();
                        a.logInfo("M35")
                    }
                    ;
                    b.prototype.reset = function() {
                        this.O = {};
                        this.nb = 0;
                        this.Jb = {};
                        this.Ra = 1;
                        this.yc = 0;
                        this.jb = [];
                        this.lc = null;
                        this.pd = 3;
                        this.w = this.c = 0;
                        this.xb = [];
                        this.jb = [];
                        this.Cb = [];
                        this.tc = a.utils.isDefined(a.conf.considerCarouselForVCT) ? a.conf.considerCarouselForVCT : !0;
                        a.logInfo("M36")
                    }
                    ;
                    b.prototype.tf = function(b) {
                        a.S();
                        var c = a.utils.now();
                        if (a.utils.fb(b) && !b.isAdrumTrackedNode) {
                            this.Hb || (this.N = this.N.bind(this),
                            this.A = this.A.bind(this),
                            this.N.K = !0,
                            this.Hb = this.A.K = !0);
                            this.j++;
                            a.logInfo("M37", this.j);
                            var k = a.utils.cb(b);
                            a.logInfo("M38", k, c);
                            a.utils.Bg(b) ? (b.addEventListener("loadeddata", this.N),
                            a.logInfo("M39", k)) : (b.addEventListener("load", this.N),
                            a.logInfo("M40", k));
                            b.addEventListener("error", this.A);
                            b.isAdrumTrackedNode = !0
                        } else
                            a.utils.tg(b) && !b.adrumNodeId ? (a.logInfo("M41"),
                            this.wb(b, c)) : a.utils.zg(b) && (this.nb = Math.max(this.nb, c));
                        a.T()
                    }
                    ;
                    b.prototype.N = function(b) {
                        a.S();
                        var c = a.utils.now();
                        this.kc || (this.kc = c);
                        this.ha = c;
                        b = b.target;
                        var k = a.utils.Id(b);
                        this.yc++;
                        this.tc && this.vn();
                        a.utils.isDefined(k) && 0 < k.length ? "data:" != k.substring(0, 5) || b.adrumNodeId ? this.Jj(k, c, b) : (a.logInfo("M42"),
                        this.wb(b, c)) : b instanceof SVGElement && !b.adrumNodeId && (a.logInfo("M43"),
                        this.wb(b, c));
                        b && b.isAdrumTrackedNode && (this.Mb(b),
                        this.j--,
                        a.logInfo("M44", this.j));
                        a.T()
                    }
                    ;
                    b.prototype.A = function(b) {
                        var c = b.target;
                        c && c.isAdrumTrackedNode && (this.Mb(c),
                        this.j--,
                        b = a.utils.Id(b.target),
                        a.logInfo("M45", b))
                    }
                    ;
                    b.prototype.Mb = function(a) {
                        a.removeEventListener("load", this.N);
                        a.removeEventListener("error", this.A)
                    }
                    ;
                    b.prototype.pc = function(b) {
                        return this.X(b) && a.utils.Ib(b)
                    }
                    ;
                    b.prototype.Jj = function(b, c, k) {
                        a.utils.isDefined(this.O[b]) ? this.pc(k) && (this.O[b] = {
                            Ba: c,
                            element: k
                        },
                        a.logInfo("M46", b, c)) : (this.O[b] = {
                            Ba: c,
                            element: k
                        },
                        a.logInfo("M47", b, c))
                    }
                    ;
                    b.prototype.wb = function(b, c) {
                        a.logInfo("M48", this.Ra, c, b.outerHTML);
                        b.adrumNodeId = this.Ra;
                        this.Jb[this.Ra] = {
                            Ba: c,
                            element: b
                        };
                        this.Ra += 1
                    }
                    ;
                    b.prototype.Jm = function() {
                        var a = 2
                          , b = 3;
                        return function() {
                            var k = b + a;
                            a = b;
                            return b = k
                        }
                    }
                    ;
                    b.prototype.Yl = function() {
                        this.lc = this.lc || this.Jm();
                        return this.yc >= this.pd ? (this.pd = this.lc(),
                        !0) : !1
                    }
                    ;
                    b.prototype.vn = function() {
                        var b = this;
                        this.Yl() ? (this.ac(this.O),
                        this.ac(this.Jb),
                        clearTimeout(this.ab),
                        this.ab = null) : b.ab || (b.ab = a.utils.refs.setTimeout.call(window, function() {
                            b.ac(b.O);
                            b.ac(b.Jb);
                            clearTimeout(b.ab);
                            b.ab = null
                        }, 2E3))
                    }
                    ;
                    b.prototype.ac = function(a) {
                        for (var b = Object.keys(a), k = b.length, l = 0; l < k; l++) {
                            var f = a[b[l]]
                              , n = this.Fd(f.element)
                              , q = n.top + "-" + n.right + "-" + n.bottom + "-" + n.left;
                            f.yd ? 30 >= f.hc.length && (f.hc.push(n),
                            f.Bb = f.Bb + "|" + q) : (f.yd = window.getComputedStyle(f.element),
                            f.hc = [n],
                            f.Bb = q,
                            f.X = this.X(f.element))
                        }
                    }
                    ;
                    b.prototype.ug = function(b, c) {
                        if (!a.conf.considerCarouselForVCT)
                            return !1;
                        var k = !1
                          , l = c.Bb;
                        if (l) {
                            var l = l.split("|")
                              , f = l.length;
                            if (f) {
                                var n = 0
                                  , q = null
                                  , s = this.Fd(b);
                                2 == f && (q = s.top + "-" + s.right + "-" + s.bottom + "-" + s.left,
                                l.push(q),
                                f++);
                                for (var m = 0; m < f - 1 && !(l[m] !== l[m + 1] && (n++,
                                2 <= n)); m++)
                                    ;
                                2 <= n && (this.jb.push(c),
                                k = !0,
                                q && (c.Bb = c.Bb + "|" + q,
                                c.hc.push(s)))
                            }
                        }
                        return k
                    }
                    ;
                    b.prototype.ok = function(a) {
                        for (var b = a.length, k = [], l = [], f = [], n = [], q = 0; q < b; q++) {
                            var s = a[q]
                              , m = s.hc
                              , r = m[0]
                              , m = m[m.length - 1];
                            r && m && (50 < Math.abs(r.left - m.left) ? 50 < Math.abs(r.right - m.right) ? l.push(s) : n.push(s) : 50 < Math.abs(r.top - m.top) ? 50 < Math.abs(r.bottom - m.bottom) ? f.push(s) : n.push(s) : n.push(s))
                        }
                        n.length && (this.Cb = n);
                        this.Ef(l, k);
                        this.Ef(f, k);
                        k.length && (this.xb = k)
                    }
                    ;
                    b.prototype.Yk = function(a, b) {
                        for (var k = [], l = 0; l < a.length; l++) {
                            for (var f = !0, n = a[l].element.classList, q = 0; q < b.length; q++)
                                if (!n.contains(b[l])) {
                                    f = !1;
                                    break
                                }
                            f && (k.push(a[l]),
                            a.splice(l, 1),
                            l--)
                        }
                        return k
                    }
                    ;
                    b.prototype.Ef = function(a, b) {
                        for (var k = 0; k < a.length; k++)
                            b.push(this.Yk(a, a[0].element.classList))
                    }
                    ;
                    b.prototype.po = function(b, c, k, l) {
                        b.adrumConsiderForVCT && (this.c = Math.max(this.c, k - l),
                        a.logInfo("M49", c, this.c));
                        delete b.adrumConsiderForVCT
                    }
                    ;
                    b.prototype.lo = function(b, c, k, l) {
                        var f = this.dg(c);
                        a.utils.isDefined(f) && (k = f.startTime - (k - this.ya),
                        l = f.duration * l + k,
                        a.logInfo("M50", c, l),
                        a.logInfo("M51", f.duration, k),
                        this.Ka && (this.w = Math.max(this.w, l),
                        a.logInfo("M52", c, this.w)),
                        (0 >= this.kc || l < this.kc) && this.X(b) && (this.c = Math.max(this.c, l),
                        a.logInfo("M53", c, a.c)))
                    }
                    ;
                    b.prototype.mo = function(b, c) {
                        var k = this.Jb[b.adrumNodeId];
                        if (a.utils.isDefined(k)) {
                            var l = k.Ba;
                            a.utils.Ib(b, k.yd) && (this.Ka && (this.w = Math.max(this.w, l - c),
                            a.logInfo("M54", b.adrumNodeId, l)),
                            !this.ug(b, k) && this.X(b) && (a.utils.isDefined(b.adrumConsiderForVCT) ? (b.adrumConsiderForVCT && (this.c = Math.max(this.c, l - c),
                            a.logInfo("Element without src and from DOMObserver - VCT ", this.c)),
                            delete b.adrumConsiderForVCT) : (this.c = Math.max(this.c, l - c),
                            a.logInfo("Element without src and from Mutation Observer - VCT", this.c)),
                            a.logInfo("M55", b.adrumNodeId, l)))
                        }
                        delete b.adrumNodeId
                    }
                    ;
                    b.prototype.hl = function(a, b) {
                        for (var k = a.length, l, f, n = 0, q = 0; q < k; q++)
                            f = a[q],
                            l = f.element,
                            b.push(f.Ba),
                            (f.X || this.X(l)) && n++;
                        return n
                    }
                    ;
                    b.prototype.el = function(a) {
                        var b = []
                          , k = 0;
                        if (a = this.hl(a, b))
                            b.sort(),
                            k = b[a - 1];
                        return k
                    }
                    ;
                    b.prototype.no = function(a) {
                        for (var b = this.xb.length, k = 0; k < b; k++) {
                            var l = this.el(this.xb[k]);
                            l && (this.c = Math.max(this.c, l - a))
                        }
                    }
                    ;
                    b.prototype.jo = function(b, c) {
                        var k = this;
                        this.Tk().forEach(function(l) {
                            var f = l.url;
                            l = l.pc;
                            var n = k.dg(f);
                            a.utils.isDefined(n) && (n = n.duration * c + (n.startTime - (b - k.ya)),
                            k.Ka && (a.logInfo("M56", f, n),
                            k.w = Math.max(k.w, n)),
                            l && (a.logInfo("M57", f, n),
                            k.c = Math.max(k.c, n)))
                        })
                    }
                    ;
                    b.prototype.ko = function(b) {
                        b = this.nb - b;
                        this.Ka && 0 == this.w && (a.logInfo("M58"),
                        this.w = Math.max(this.w, b));
                        0 == this.c && (a.logInfo("M59"),
                        b = Math.max(this.c, b),
                        this.c = 0 < this.w ? Math.min(this.w, b) : b)
                    }
                    ;
                    b.prototype.oo = function(a) {
                        for (var b = this.Cb.length, k = 0; k < b; k++) {
                            var l = this.Cb[k]
                              , f = l.element
                              , n = l.Ba;
                            if (l.X || this.X(f))
                                this.c = Math.max(this.c, n - a)
                        }
                    }
                    ;
                    b.prototype.ld = function(b) {
                        var c = this;
                        this.tc = !1;
                        a.k.Xb.Sa && (this.ya = b);
                        a.logInfo("M60", b, this.ya);
                        var k = this.ol(this.ya);
                        a.logInfo("M61", k);
                        [].slice.call(document.getElementsByTagName("*")).forEach(function(l) {
                            var f = a.utils.Id(l);
                            delete l.isAdrumTrackedNode;
                            if (a.utils.isDefined(l.adrumNodeId))
                                c.mo(l, b);
                            else if (a.utils.isDefined(f) && 0 < f.length) {
                                a.logInfo("M62", f);
                                var n = c.O[f];
                                if (a.utils.isDefined(n)) {
                                    var q = n.Ba;
                                    a.logInfo("M63", f, q);
                                    a.utils.Ib(l, n.yd) && (c.Ka && (a.logInfo("M64", c.w, q, b),
                                    c.w = Math.max(c.w, q - b),
                                    a.logInfo("M65", f, c.w)),
                                    c.ug(l, n) || !n.X && !c.X(l) || (a.logInfo("M66", a.c, q, b),
                                    a.utils.isDefined(l.adrumConsiderForVCT) ? c.po(l, f, q, b) : (c.c = Math.max(c.c, q - b),
                                    a.logInfo("M67", f, a.c))))
                                } else
                                    a.utils.fb(l) && a.utils.Ib(l) && c.lo(l, f, b, k)
                            }
                        });
                        a.conf.considerCarouselForVCT && this.jb && this.jb.length && (this.ok(this.jb),
                        this.xb && this.no(b),
                        this.Cb && this.oo(b));
                        a.logInfo("M68", this.c, this.w);
                        this.jo(b, k);
                        a.conf.disableTextForTesting || this.ko(b);
                        this.c |= 0;
                        this.w |= 0;
                        a.logInfo("M69", b, this.ya);
                        a.logInfo("M70", window.location.href);
                        a.logInfo("M71", this.c, this.w);
                        return {
                            vct: this.c,
                            pct: this.w
                        }
                    }
                    ;
                    b.prototype.Fd = function(a) {
                        try {
                            var b = a.getBoundingClientRect()
                              , k = document.documentElement || document.body
                              , l = b.top + (window.pageYOffset || k.scrollTop) - (k.clientTop || 0)
                              , f = b.left + (window.pageXOffset || k.scrollLeft) - (k.clientLeft || 0);
                            return {
                                top: Math.round(l),
                                left: Math.round(f),
                                bottom: Math.round(l) + b.height,
                                right: Math.round(f) + b.width
                            }
                        } catch (n) {
                            return {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            }
                        }
                    }
                    ;
                    b.prototype.X = function(b) {
                        b = this.Fd(b);
                        if (this.Xl(b))
                            return a.logInfo("M72"),
                            !1;
                        var c = {
                            top: Math.max(this.viewport.top, b.top),
                            left: Math.max(this.viewport.left, b.left),
                            bottom: Math.min(this.viewport.bottom, b.bottom),
                            right: Math.min(this.viewport.right, b.right)
                        }
                          , c = a.utils.Xf(c);
                        b = a.utils.Xf(b);
                        if (0 != b && c / b >= this.Ul)
                            return !0;
                        a.logInfo("M73");
                        return !1
                    }
                    ;
                    b.prototype.Xl = function(a) {
                        return a.top > this.viewport.bottom || a.bottom < this.viewport.top || a.right < this.viewport.left || a.left > this.viewport.right ? !0 : !1
                    }
                    ;
                    b.prototype.yk = function() {
                        a.utils.isDefined(this.Bc) && this.Bc.disconnect();
                        a.logInfo("M74")
                    }
                    ;
                    b.prototype.ol = function(b) {
                        var c = this
                          , k = 0
                          , l = 0;
                        this.fg().forEach(function(f) {
                            var n = f.name;
                            if (a.utils.isDefined(c.O[n])) {
                                var q = c.O[n].Ba - b - f.startTime
                                  , s = f.duration;
                                a.logInfo("M75", n, b, f.startTime, c.O[n].Ba, s);
                                s && 0 < q && (k += q / s,
                                l++)
                            }
                        });
                        return 0 < l ? k / l : 1
                    }
                    ;
                    b.prototype.Tk = function() {
                        var b = this
                          , c = [];
                        [].slice.call(document.getElementsByTagName("*")).forEach(function(k) {
                            if (a.utils.Ib(k)) {
                                var l = b.Sk(k);
                                l && (b.X(k) ? c.push({
                                    url: l,
                                    pc: !0
                                }) : b.Ka && c.push({
                                    url: l,
                                    pc: !1
                                }))
                            }
                        });
                        return c
                    }
                    ;
                    b.prototype.Sk = function(b) {
                        if (b && b.style) {
                            var c = window.getComputedStyle(b).getPropertyValue("background-image");
                            c || (c = (b.currentStyle || b.style).backgroundImage);
                            b = this.tl(c);
                            return a.utils.isDefined(b) && a.utils.isDefined(b.substr) && "undefined" === b.substr(b.lastIndexOf("/") + 1) ? void 0 : b
                        }
                    }
                    ;
                    b.prototype.tl = function(a) {
                        if (a && a.match("url"))
                            return a.replace('url("', "").replace('")', "")
                    }
                    ;
                    b.prototype.dg = function(b) {
                        for (var c = 0, k = this.fg(); c < k.length; c++) {
                            var l = k[c];
                            if (a.utils.isDefined(l.name) && 0 <= l.name.indexOf(b))
                                return l
                        }
                    }
                    ;
                    b.prototype.fg = function() {
                        return a.k.Xb.Sa ? a.monitor.resourceMonitor.basePageResourceBuffer : a.monitor.resourceMonitor.resourceBuffer.concat(a.monitor.resourceMonitor.Fb())
                    }
                    ;
                    return b
                }();
                a.So = b;
                a.c = new b
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.Hb = !1;
                            this.rd = a.conf.spa2 ? 5E3 : 1E3;
                            this.ib = a.conf.userConf && a.conf.userConf.navComplete && a.conf.userConf.navComplete.maxResourceQuietTime ? a.conf.userConf.navComplete.maxResourceQuietTime : this.rd;
                            this.vk = 3E3;
                            this.Gm = Math.min(this.vk, this.ib)
                        }
                        e.prototype.Fh = function() {
                            a.S();
                            this.Gb(Element.prototype, "innerHTML", this.dh.bind(this));
                            this.Gb(HTMLElement.prototype, "innerHTML", this.dh.bind(this));
                            this.Gb(HTMLImageElement.prototype, "src", this.Kb.bind(this));
                            this.Gb(HTMLScriptElement.prototype, "src", this.Kb.bind(this));
                            this.Gb(HTMLLinkElement.prototype, "href", this.Kb.bind(this));
                            this.Ll();
                            this.Nd("append");
                            this.Nd("appendChild");
                            this.Nd("insertBefore");
                            a.T()
                        }
                        ;
                        e.prototype.setUp = function(b) {
                            a.S();
                            this.sd = this.Yd = this.j = 0;
                            this.ha = b;
                            this.wc = null;
                            this.Pd = this.qa = this.B = !1;
                            this.lb = {};
                            this.O = {};
                            this.$d = {};
                            a.T()
                        }
                        ;
                        e.prototype.start = function(b) {
                            this.setUp(b);
                            this.qa = !0;
                            a.logInfo("M76")
                        }
                        ;
                        e.prototype.reset = function() {
                            this.B = !1;
                            this.sd = this.j = 0;
                            this.wc = null;
                            this.Pd = this.qa = !1;
                            this.O = {};
                            this.$d = {};
                            a.logInfo("M77")
                        }
                        ;
                        e.prototype.Gb = function(a, b, l) {
                            this.Vm(a, b, Object.getOwnPropertyDescriptor(a, b), l)
                        }
                        ;
                        e.prototype.Vm = function(b, k, l, f) {
                            if (a.utils.isDefined(l) && a.utils.isDefined(l.set) && !a.utils.isDefined(l.K)) {
                                var n = this;
                                Object.defineProperty(b, k, {
                                    set: function(a) {
                                        var b;
                                        try {
                                            b = l.set.apply(this, arguments)
                                        } catch (c) {
                                            throw c;
                                        } finally {
                                            f.call(n, this)
                                        }
                                        return b
                                    }
                                })
                            }
                        }
                        ;
                        e.prototype.Kb = function(b) {
                            a.S();
                            this.ue(b);
                            a.T()
                        }
                        ;
                        e.prototype.Ll = function() {
                            var b = Element.prototype
                              , k = this;
                            a.utils.isDefined(b.setAttribute) && (b.setAttribute = a.aop.around(b.setAttribute, null, function() {
                                var a = d(arguments);
                                "src" != a[0] && "href" != a[0] || k.Kb.call(k, this)
                            }))
                        }
                        ;
                        e.prototype.Nd = function(b) {
                            var k = Element.prototype
                              , l = this;
                            a.utils.isDefined(k[b]) && (k[b] = a.aop.around(k[b], null, function() {
                                0 < arguments.length && l.Kb.call(l, arguments[0])
                            }))
                        }
                        ;
                        e.prototype.dh = function(b) {
                            a.S();
                            this.qa && a.utils.isDefined(b) && a.utils.isDefined(b.childNodes) && (this.ue(b),
                            this.Qh(b.childNodes));
                            a.T()
                        }
                        ;
                        e.prototype.Qh = function(b) {
                            for (var k = 0; k < b.length; k++) {
                                var l = b[k];
                                "script" != a.utils.il(l) && this.ue(l);
                                this.Qh(l.childNodes)
                            }
                        }
                        ;
                        e.prototype.ue = function(c) {
                            a.monitor.AnySpaMonitor.oc() || (this.Vl(c) ? this.Vj(c) : a.conf.M && this.Wj(c),
                            this.sd++,
                            1 != this.sd || this.B || (b.n.Nc(),
                            this.B = !0))
                        }
                        ;
                        e.prototype.Vj = function(b) {
                            var k = a.utils.cb(b)
                              , l = a.utils.mc(b);
                            a.utils.isDefined(l) && !a.utils.isDefined(this.lb[l]) && (this.j++,
                            this.lb[l] = !0,
                            a.logInfo("M78", l, k, this.j),
                            this.uf(b))
                        }
                        ;
                        e.prototype.Wj = function(b) {
                            var k = a.utils.now();
                            if (a.utils.km(b))
                                b.adrumNodeId || a.c.wb(b, k);
                            else if (a.utils.fb(b) && !b.isAdrumTrackedNode) {
                                var k = a.utils.cb(b)
                                  , l = a.utils.mc(b);
                                a.utils.isDefined(l) && !a.utils.isDefined(this.lb[l]) && (this.j++,
                                this.lb[l] = !0,
                                this.uf(b),
                                a.logInfo("M79", l, k, this.j))
                            } else
                                a.utils.tg(b) && !b.adrumNodeId ? (a.logInfo("M80", k),
                                a.c.wb(b, k)) : a.utils.zg(b) && (a.c.nb = Math.max(a.c.nb, k))
                        }
                        ;
                        e.prototype.uf = function(b) {
                            var k = a.utils.now();
                            this.Hb || (this.N = this.N.bind(this),
                            this.A = this.A.bind(this),
                            this.N.K = !0,
                            this.Hb = this.A.K = !0);
                            var l = a.utils.cb(b);
                            a.utils.fb(b) && (a.lifecycle.getPhaseName() === a.PageLifecycleTracker.ed ? this.Pd ? b.adrumConsiderForVCT = !1 : this.wc && k - this.wc > this.Gm ? (this.Pd = !0,
                            b.adrumConsiderForVCT = !1) : (b.adrumConsiderForVCT = !0,
                            this.wc = k) : b.adrumConsiderForVCT = !0);
                            a.utils.Bg(b) ? (b.addEventListener("loadeddata", this.N),
                            a.logInfo("M81", l)) : (b.addEventListener("load", this.N),
                            a.logInfo("M82", l, b.nodeName));
                            b.addEventListener("error", this.A)
                        }
                        ;
                        e.prototype.Vl = function(b) {
                            return a.utils.lm(b) || a.utils.bm(b) || a.utils.hm(b) || a.utils.pm(b)
                        }
                        ;
                        e.prototype.N = function(c) {
                            a.S();
                            var k = c.target
                              , l = a.utils.cb(k)
                              , f = a.utils.mc(k);
                            a.utils.isDefined(this.lb[f]) && !a.utils.isDefined(this.O[f]) && (this.j--,
                            this.O[f] = !0,
                            0 > this.j && a.logError("M83", this.j),
                            a.logInfo("M84", l, this.j));
                            this.ha = a.utils.now();
                            this.Yd += 1;
                            1 != this.Yd || this.B || (b.n.Nc(),
                            this.B = !0);
                            this.Mb(c.target);
                            a.conf.M && a.utils.fb(k) && !k.isAdrumTrackedNode && (a.logInfo("M85"),
                            a.c.N(c));
                            a.T()
                        }
                        ;
                        e.prototype.A = function(b) {
                            a.S();
                            var k = b.target
                              , l = a.utils.cb(k)
                              , f = a.utils.mc(k);
                            a.utils.isDefined(this.lb[f]) && !a.utils.isDefined(this.$d[f]) && (this.j--,
                            this.$d[f] = !0,
                            0 > this.j && a.logError("M86", this.j),
                            a.logInfo("M87", l, this.j));
                            a.conf.M && a.utils.fb(k) && !k.isAdrumTrackedNode && (a.logInfo("M88"),
                            a.c.A(b));
                            this.Mb(b.target);
                            a.T()
                        }
                        ;
                        e.prototype.Sj = function() {
                            return 0 < this.j && this.B
                        }
                        ;
                        e.prototype.Ld = function(b) {
                            var k = this.j
                              , l = 0;
                            a.conf.M && (k += a.c.j,
                            l = a.c.ha);
                            a.logInfo("M89", k);
                            return 0 >= k && this.B && (a.logInfo("M90"),
                            k = Math.max(this.ha, l),
                            b - k >= this.ib) ? (this.reset(),
                            k) : -1
                        }
                        ;
                        e.prototype.Mb = function(a) {
                            a.removeEventListener("load", this.N);
                            a.removeEventListener("error", this.A)
                        }
                        ;
                        return e
                    }();
                    b.xi = m
                }
                )(a.k || (a.k = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.rd = a.conf.spa2 ? 3E3 : 1E3;
                            this.ib = a.conf.userConf && a.conf.userConf.navComplete && a.conf.userConf.navComplete.maxXhrQuietTime ? a.conf.userConf.navComplete.maxXhrQuietTime : this.rd
                        }
                        e.prototype.setUp = function(a) {
                            this.kb = this.j = 0;
                            this.Aa = a;
                            this.qa = this.B = !1;
                            this.ja = {}
                        }
                        ;
                        e.prototype.start = function(a) {
                            this.setUp(a);
                            this.qa = !0
                        }
                        ;
                        e.prototype.kf = function(b) {
                            a.monitor.AnySpaMonitor.oc() || !this.qa || a.utils.isDefined(this.ja[b.guid()]) || this.ja[b.guid()] || (this.ja[b.guid()] = !0,
                            this.j += 1,
                            a.logInfo("M91", b.guid(), b.url(), this.j))
                        }
                        ;
                        e.prototype.Mj = function(c) {
                            !a.monitor.AnySpaMonitor.oc() && this.qa && a.utils.isDefined(this.ja[c.guid()]) && this.ja[c.guid()] && (delete this.ja[c.guid()],
                            this.Aa = a.utils.now(),
                            this.j -= 1,
                            a.logInfo("M92", c.guid(), c.url(), this.j),
                            this.kb += 1,
                            1 == this.kb && (b.n.Nc(),
                            this.B = !0))
                        }
                        ;
                        e.prototype.Lj = function(c) {
                            !a.monitor.AnySpaMonitor.oc() && this.qa && a.utils.isDefined(this.ja[c.guid()]) && this.ja[c.guid()] && (delete this.ja[c.guid()],
                            this.Aa = a.utils.now(),
                            this.j -= 1,
                            a.logInfo("M93", c.guid(), c.url(), this.j),
                            this.kb += 1,
                            1 == this.kb && (b.n.Nc(),
                            this.B = !0))
                        }
                        ;
                        e.prototype.Ld = function(a) {
                            return 0 == this.j && this.B && a - this.Aa >= this.ib ? (this.reset(),
                            this.Aa) : -1
                        }
                        ;
                        e.prototype.Tj = function() {
                            return 0 < this.j && this.B
                        }
                        ;
                        e.prototype.reset = function() {
                            this.ja = {};
                            this.B = !1;
                            this.j = 0;
                            this.qa = !1
                        }
                        ;
                        return e
                    }();
                    b.ni = m
                }
                )(a.k || (a.k = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.L = new b.xi;
                            this.H = new b.ni;
                            this.Hm = a.conf.spa2 ? 3E3 : 1E3;
                            this.maxInactiveTime = a.conf.userConf && a.conf.userConf.navComplete && a.conf.userConf.navComplete.maxInactiveTime ? a.conf.userConf.navComplete.maxInactiveTime : Math.max(this.L.ib, this.H.ib) + this.Hm;
                            this.ah = 1E3
                        }
                        e.prototype.setUp = function(a) {
                            this.currentTime = this.startTime = a;
                            this.B = this.gb = !1;
                            this.L.setUp(a);
                            this.H.setUp(a)
                        }
                        ;
                        e.prototype.start = function(a) {
                            this.setUp(a);
                            this.B = !0;
                            this.L.start(a);
                            this.H.start(a);
                            this.xf();
                            this.Pn()
                        }
                        ;
                        e.prototype.Pn = function() {
                            this.Ph = a.utils.refs.setInterval.call(window, function() {
                                a.S();
                                this.currentTime = a.utils.now();
                                var b = a.utils.max(this.L.ha, this.H.Aa);
                                if (this.currentTime - b >= this.maxInactiveTime) {
                                    if (a.conf.M && e.Sa && !a.utils.isDefined(a.monitor.DOMEventsMonitor.currentBasePage)) {
                                        a.logInfo("M94");
                                        e.$a = e.$a || this.gb ? this.currentTime : b;
                                        return
                                    }
                                    this.currentTime = e.$a || this.currentTime;
                                    a.logInfo("M95");
                                    this.navComplete(this.gb ? this.currentTime : b);
                                    this.reset()
                                }
                                a.T()
                            }
                            .bind(this), this.ah)
                        }
                        ;
                        e.prototype.Nc = function() {
                            this.gb || (this.Nn(),
                            this.gb = !0)
                        }
                        ;
                        e.prototype.xf = function() {
                            a.utils.isDefined(this.ih) && clearInterval(this.ih);
                            a.utils.isDefined(this.Ph) && clearInterval(this.Ph)
                        }
                        ;
                        e.prototype.reset = function() {
                            this.xf();
                            this.B = this.gb = !1;
                            this.L.reset();
                            this.H.reset()
                        }
                        ;
                        e.prototype.navComplete = function(b) {
                            a.S();
                            var k = a.utils.isDefined(a.monitor.AnySpaMonitor.vp && a.monitor.AnySpaMonitor.vp.startTime) ? a.monitor.AnySpaMonitor.vp.startTime : this.startTime;
                            a.logInfo("M96", b - k);
                            a.conf.M ? e.Sa ? (a.monitor.PerformanceWrapper.perf && (a.monitor.navMonitor.Df(),
                            a.monitor.resourceMonitor.Cf()),
                            a.logInfo("M97"),
                            b = a.c.ld(a.utils.bb()),
                            a.monitor.DOMEventsMonitor.currentBasePage.vct = b.vct,
                            a.conf.spa2 && (a.monitor.DOMEventsMonitor.currentBasePage.pct = b.pct),
                            a.b.Ia && (a.logInfo("M98", a.utils.now()),
                            a.b.P(a.b.Ia),
                            a.b.Ia = null),
                            a.command("reportOnload", a.monitor.DOMEventsMonitor.currentBasePage),
                            a.c.reset(),
                            a.c.Ka = !1,
                            e.Sa = !1) : a.monitor.AnySpaMonitor.Vd(k, b) : (a.monitor.resourceMonitor.basePageResourceBuffer = [],
                            a.monitor.AnySpaMonitor.Vd(k, b));
                            a.monitor.AnySpaMonitor.Oa || (a.monitor.AnySpaMonitor.Ig(k),
                            a.monitor.AnySpaMonitor.report());
                            a.b.Dn();
                            a.T()
                        }
                        ;
                        e.prototype.Nn = function() {
                            this.ih = a.utils.refs.setInterval.call(window, function() {
                                a.S();
                                this.currentTime = a.utils.now();
                                var b = this.L.Ld(this.currentTime);
                                0 <= b && a.logInfo("M99", b - this.startTime);
                                b = this.H.Ld(this.currentTime);
                                0 <= b && a.logInfo("M100", b - this.startTime);
                                if (!this.H.B && !this.L.B) {
                                    b = a.utils.max(this.H.Aa, this.L.ha);
                                    if (a.conf.M && e.Sa && !a.utils.isDefined(a.monitor.DOMEventsMonitor.currentBasePage)) {
                                        a.logInfo("M101");
                                        e.$a = e.$a || b;
                                        return
                                    }
                                    b = e.$a || b;
                                    a.logInfo("M102");
                                    this.navComplete(b);
                                    this.reset()
                                }
                                a.T()
                            }
                            .bind(this), this.ah)
                        }
                        ;
                        return e
                    }();
                    m.Sa = !0;
                    m.$a = 0;
                    b.Xb = m;
                    b.n = new b.Xb
                }
                )(a.k || (a.k = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = function() {
                    function b() {
                        this.Pc = [];
                        this.Ec(b.dd, 0)
                    }
                    b.prototype.Mm = function(a) {
                        this.Ec(b.lf, a)
                    }
                    ;
                    b.prototype.Om = function(a) {
                        this.Ec(b.sf, a)
                    }
                    ;
                    b.prototype.Nm = function(a) {
                        this.Ec(b.ed, a)
                    }
                    ;
                    b.prototype.Ec = function(a, b) {
                        this.Pc.push({
                            Lm: (new Date).getTime(),
                            Km: b,
                            Yg: a
                        });
                        this.rk = a
                    }
                    ;
                    b.prototype.getPhaseName = function() {
                        return this.rk
                    }
                    ;
                    b.prototype.getPhaseID = function(a) {
                        for (var c = 0; c < b.pf.length; c++)
                            if (b.pf[c] === a)
                                return c;
                        return null
                    }
                    ;
                    b.prototype.getPhaseCallbackTime = function(a) {
                        for (var b = this.Pc, k = 0; k < b.length; k++)
                            if (b[k].Yg === a)
                                return b[k].Lm;
                        return null
                    }
                    ;
                    b.prototype.findPhaseAtNominalTime = function(e) {
                        a.assert(0 <= e);
                        for (var c = this.Pc, k = c.length - 1; 0 <= k; k--)
                            if (e >= c[k].Km)
                                return c[k].Yg;
                        a.error("M103", e, a.utils.dumpObject(c));
                        return b.dd
                    }
                    ;
                    return b
                }();
                b.dd = "AFTER_FIRST_BYTE";
                b.lf = "AFTER_DOM_INTERACTIVE";
                b.sf = "AT_ONLOAD";
                b.ed = "AFTER_ONLOAD";
                b.pf = [b.dd, b.lf, b.sf, b.ed];
                a.PageLifecycleTracker = b;
                a.lifecycle = new b;
                a.lifecycle = a.lifecycle
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function(b) {
                        function c(c) {
                            c = b.call(this, c) || this;
                            c.isBeaconSent = !1;
                            c.backTimeGap = a.conf.backTimeGap;
                            return c
                        }
                        v(c, b);
                        c.prototype.type = function() {
                            return a.EventType.PageView
                        }
                        ;
                        return c
                    }(b.EventTracker);
                    b.PageView = m
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                a = a.events || (a.events = {});
                a = a.g || (a.g = {});
                a.navigationStart = "navigationStart";
                a.domainLookupStart = "domainLookupStart";
                a.domainLookupEnd = "domainLookupEnd";
                a.connectStart = "connectStart";
                a.secureConnectionStart = "secureConnectionStart";
                a.connectEnd = "connectEnd";
                a.requestStart = "requestStart";
                a.responseStart = "responseStart";
                a.responseEnd = "responseEnd";
                a.domContentLoadedEventStart = "domContentLoadedEventStart";
                a.loadEventEnd = "loadEventEnd";
                a.zh = "sendTime";
                a.Rf = "firstByteTime";
                a.sh = "respAvailTime";
                a.th = "respProcTime";
                a.Ae = "viewChangeStart";
                a.Xh = "viewChangeEnd";
                a.Be = "viewDOMLoaded";
                a.fi = "xhrRequestsCompleted";
                a.aq = "viewFragmentsLoaded";
                a.bq = "viewResourcesLoaded";
                a.Ce = "virtualPageStart";
                a.vo = "virtualPageEnd"
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.events || (a.events = {});
                b.metricSpec = {};
                b.metricSpec[a.EventType.PageView] = {
                    Ek: {
                        start: b.g.navigationStart,
                        end: b.g.loadEventEnd,
                        name: "PLT"
                    },
                    Nk: {
                        start: b.g.navigationStart,
                        end: b.g.responseStart,
                        name: "FBT"
                    },
                    Up: {
                        start: b.g.navigationStart,
                        end: b.g.requestStart,
                        name: "SCT"
                    },
                    Vp: {
                        start: b.g.secureConnectionStart,
                        end: b.g.connectEnd,
                        name: "SHT"
                    },
                    jp: {
                        start: b.g.domainLookupStart,
                        end: b.g.domainLookupEnd,
                        name: "DLT"
                    },
                    Yp: {
                        start: b.g.connectStart,
                        end: b.g.connectEnd,
                        name: "TCP"
                    },
                    Rp: {
                        start: b.g.requestStart,
                        end: b.g.responseStart,
                        name: "RAT"
                    },
                    lp: {
                        start: b.g.responseStart,
                        end: b.g.loadEventEnd,
                        name: "FET"
                    },
                    pp: {
                        start: b.g.responseStart,
                        end: b.g.domContentLoadedEventStart,
                        name: "DRT"
                    },
                    op: {
                        start: b.g.responseStart,
                        end: b.g.responseEnd,
                        name: "DDT"
                    },
                    gp: {
                        start: b.g.responseEnd,
                        end: b.g.domContentLoadedEventStart,
                        name: "DPT"
                    },
                    Qp: {
                        start: b.g.domContentLoadedEventStart,
                        end: b.g.loadEventEnd,
                        name: "PRT"
                    },
                    hp: {
                        start: b.g.navigationStart,
                        end: b.g.domContentLoadedEventStart,
                        name: "DOM"
                    }
                };
                b.metricSpec[a.EventType.Ajax] = {
                    Nk: {
                        start: b.g.zh,
                        end: b.g.Rf,
                        name: "FBT"
                    },
                    Vo: {
                        start: b.g.Rf,
                        end: b.g.sh,
                        name: "DDT"
                    },
                    Uo: {
                        start: b.g.sh,
                        end: b.g.th,
                        name: "DPT"
                    },
                    Ek: {
                        start: b.g.zh,
                        end: b.g.th,
                        name: "PLT"
                    }
                };
                b.metricSpec[a.EventType.VPageView] = {
                    Gp: {
                        start: b.g.Ce,
                        end: b.g.vo,
                        name: "PLT"
                    },
                    cp: {
                        start: b.g.Ae,
                        end: b.g.Xh,
                        name: "DDT"
                    },
                    Dp: {
                        start: b.g.Ae,
                        end: b.g.Be,
                        name: "DRT"
                    },
                    Lo: {
                        start: b.g.Xh,
                        end: b.g.Be,
                        name: "DPT"
                    },
                    Mo: {
                        start: b.g.Ae,
                        end: b.g.Be,
                        name: "DOM"
                    },
                    Pp: {
                        start: "viewChangeEnd",
                        end: "xhrRequestsCompleted",
                        name: null
                    },
                    Ep: {
                        start: "viewChangeEnd",
                        end: "viewPartialsLoaded",
                        name: null
                    },
                    Cp: {
                        start: "viewPartialsLoaded",
                        end: "viewFragmentsLoaded",
                        name: null
                    },
                    Fp: {
                        start: "viewPartialsLoaded",
                        end: "viewResourcesLoaded",
                        name: null
                    }
                };
                b.metricSpec[a.EventType.NG_VIRTUAL_PAGE] = b.metricSpec[a.EventType.VPageView]
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function(e) {
                        function c(k) {
                            k = e.call(this, k) || this;
                            k.constructor != c && k.constructor != b.AdrumAjax && a.reportAPIMessage(a.Y.ua, a.pb, "ADRUM.events.Ajax", []);
                            return k
                        }
                        v(c, e);
                        c.prototype.type = function() {
                            return a.EventType.Ajax
                        }
                        ;
                        return c
                    }(b.EventTracker);
                    b.Ajax = m;
                    b.Za(b.V[a.EventType.Ajax], m.prototype);
                    b.qf(b.metricSpec[a.EventType.Ajax], m.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function(b) {
                        function c(a) {
                            return b.call(this, a) || this
                        }
                        v(c, b);
                        c.prototype.type = function() {
                            return a.EventType.Ajax
                        }
                        ;
                        return c
                    }(b.Ajax);
                    b.AdrumAjax = m;
                    b.Za(b.V[a.EventType.ADRUM_XHR], m.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isDefined
                      , e = function() {
                        function c() {}
                        c.Hc = function(b, l) {
                            a.conf.spa2 ? c.mk(b, l) : c.xh(b, l)
                        }
                        ;
                        c.mk = function(k, l) {
                            if (m(k.status) && 0 == k.status || !m(k.status) && !m(l.response))
                                a.k.n.H.Lj(l),
                                delete k._adrumAjaxT;
                            else {
                                var f = a.b.kd(k.h);
                                if (m(a.monitor.AnySpaMonitor.vp) && !a.monitor.AnySpaMonitor.Oa && a.monitor.AnySpaMonitor.vp.yb == f) {
                                    l.parent(a.monitor.AnySpaMonitor.vp);
                                    if (++a.monitor.AnySpaMonitor.vp.rf > b.Fa.maxPerPageView)
                                        return;
                                    c.xh(k, l)
                                } else
                                    m(a.monitor.AnySpaMonitor.vp) && !a.monitor.AnySpaMonitor.Oa && l.parent(a.monitor.AnySpaMonitor.vp),
                                    c.fe(l, k),
                                    b.oSTO(c.ge, c.nj);
                                delete k._adrumAjaxT;
                                a.k.n.H.Mj(l)
                            }
                        }
                        ;
                        c.xh = function(k, l) {
                            delete k._adrumAjaxT;
                            var f = {};
                            if (k instanceof XMLHttpRequest)
                                try {
                                    if (f = {
                                        status: k.status,
                                        getAllResponseHeaders: k.getAllResponseHeaders()
                                    },
                                    400 <= k.status)
                                        if (b.isString(k.statusText))
                                            f.statusText = k.statusText;
                                        else
                                            try {
                                                f.responseText = k.responseText
                                            } catch (n) {
                                                f.responseType = k.responseType
                                            }
                                } catch (q) {
                                    a.error("M104", q)
                                }
                            m((l.response || k).status) && c.reportXhr(f, l)
                        }
                        ;
                        c.reportXhr = function(b, l) {
                            c.Th(b, l);
                            a.command("reportXhr", l)
                        }
                        ;
                        c.fe = function(b, l) {
                            if (m(l.h)) {
                                var f = a.b.kd(l.h).guid;
                                c.Th(l, b);
                                m(c.oa[f]) || (c.oa[f] = []);
                                -1 == c.oa[f].indexOf(b) && c.oa[f].push(b)
                            } else
                                a.logInfo("M105")
                        }
                        ;
                        c.Th = function(a, c) {
                            var f = c.response || a, n = f.status, q;
                            b.isNumber(n) && c.xhrStatus(n);
                            if (f.getAllResponseHeaders) {
                                var s = b.isFunction(f.getAllResponseHeaders) ? f.getAllResponseHeaders() : f.getAllResponseHeaders;
                                c.allResponseHeaders(s)
                            }
                            if (400 <= n) {
                                if (b.isString(f.statusText))
                                    q = f.statusText;
                                else
                                    try {
                                        b.isString(f.responseText) && (q = f.responseText)
                                    } catch (e) {
                                        b.isString(f.responseType) && (q = f.responseType)
                                    }
                                c.error({
                                    status: n,
                                    msg: q
                                })
                            }
                        }
                        ;
                        c.fo = function(a, c) {
                            var f = "";
                            b.isDefined(Response) && a instanceof Response && a.headers.forEach(function(a, b) {
                                f += b + ": " + a + "\r\n"
                            });
                            c.allResponseHeaders(f)
                        }
                        ;
                        c.lh = function(a) {
                            c.oa[a] = [];
                            delete c.oa[a]
                        }
                        ;
                        c.Dm = function(b, l) {
                            var f = c.oa[l];
                            m(f) && (f.forEach(function(c) {
                                c.parent(b);
                                a.command("reportXhr", c)
                            }),
                            c.lh(l))
                        }
                        ;
                        c.ge = function(k) {
                            for (var l in c.oa) {
                                for (var f = 0, n = c.oa[l]; f < n.length; f++) {
                                    var q = n[f];
                                    !m(a.monitor.AnySpaMonitor.vp) && ++c.Xj <= b.Fa.maxPerPageView ? a.command("reportXhr", q, k) : m(a.monitor.AnySpaMonitor.vp) && ++a.monitor.AnySpaMonitor.vp.rf <= b.Fa.maxPerPageView && a.command("reportXhr", q)
                                }
                                c.lh(l)
                            }
                        }
                        ;
                        return c
                    }();
                    e.nj = 2E3;
                    e.oa = {};
                    e.Xj = 0;
                    b.Vb = e
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.now
                      , e = a.utils.Vb
                      , c = function() {
                        function c() {}
                        c.prototype.setUp = function() {
                            var b = document.readyState;
                            if ("loading" === b)
                                a.logInfo("M106"),
                                c.Hn(),
                                c.Gh();
                            else {
                                var f = {
                                    timeStamp: m()
                                };
                                c.rb(f);
                                "interactive" === b ? (a.logInfo("M107"),
                                c.Gh()) : (a.logInfo("M108"),
                                c.Lb(f),
                                c.Vg(f))
                            }
                        }
                        ;
                        c.Gh = function() {
                            a.utils.addEventListener(window, "load", c.Lb);
                            a.utils.addEventListener(window, "load", c.Vg)
                        }
                        ;
                        c.prototype.setUpOnBeforeUnload = function() {
                            a.conf.sendBeaconOnUnload && a.utils.addEventListener(window, "beforeunload", c.Tm)
                        }
                        ;
                        c.Tm = function() {
                            var l = b.va.Ua;
                            if (l)
                                for (var f in l) {
                                    var n = l[f]
                                      , q = n.ajaxT;
                                    !q.getRespProcTime() && q.tempRespAvailAndProcTime && q.markRespProcTime(q.tempRespAvailAndProcTime);
                                    !q.getRespAvailTime() && q.tempRespAvailAndProcTime && q.markRespAvailTime(q.tempRespAvailAndProcTime);
                                    e.Hc(n.requestObj, n.ajaxT)
                                }
                            c.currentBasePage && !c.currentBasePage.isBeaconSent ? (a.conf.M && (l = a.c.ld(a.utils.bb()),
                            c.currentBasePage.vct = l.vct,
                            a.conf.spa2 && (c.currentBasePage.pct = l.pct)),
                            a.command("quickReportOnLoad", c.currentBasePage),
                            e.ge(!0)) : a.channel && a.channel.sendBeacon && (e.ge(!0),
                            a.k.n.navComplete(a.utils.now()),
                            a.channel.sendBeacon(!0))
                        }
                        ;
                        c.Vg = function(l) {
                            c.currentBasePage = new a.events.PageView;
                            a.lifecycle.Om(l && l.timeStamp);
                            a.utils.wh(function() {
                                var l = m();
                                a.lifecycle.Nm(l);
                                a.command("mark", "onload", l);
                                c.Ac = !0;
                                a.conf.M ? a.c.yk() : (b.PerformanceWrapper.perf && (b.navMonitor.Df(),
                                b.resourceMonitor.Cf()),
                                a.b.Ia && (a.b.P(a.b.Ia),
                                a.b.Ia = null),
                                a.command("reportOnload", c.currentBasePage));
                                !a.conf.M && a.conf.spa2 && a.conf.modernBrowserFeaturesAvailable && a.k.n.L.Fh();
                                a.utils.loadScriptAsync(a.conf.adrumExtUrl)
                            });
                            a.logInfo("M109")
                        }
                        ;
                        c.Hn = function() {
                            if (a.utils.isFunction(document.addEventListener))
                                document.addEventListener("DOMContentLoaded", c.rb, !1);
                            else if (a.utils.isObject(document.attachEvent)) {
                                document.attachEvent("onreadystatechange", c.rb);
                                var b = null;
                                try {
                                    b = null === window.frameElement ? document.documentElement : null
                                } catch (f) {}
                                null != b && b.doScroll && function q() {
                                    if (!c.isReady) {
                                        try {
                                            b.doScroll("left")
                                        } catch (f) {
                                            a.utils.oSTO(q, 10);
                                            return
                                        }
                                        c.Lb()
                                    }
                                }()
                            } else
                                a.error("M110");
                            a.logInfo("M111")
                        }
                        ;
                        c.Lb = function(b) {
                            c.Mg || (a.lifecycle.Mm(b && b.timeStamp),
                            a.command("mark", "onready", m()),
                            c.Mg = !0)
                        }
                        ;
                        c.rb = function(a) {
                            document.addEventListener ? (document.removeEventListener("DOMContentLoaded", c.rb, !1),
                            c.Lb(a)) : "complete" === document.readyState && (document.detachEvent("onreadystatechange", c.rb),
                            c.Lb(a))
                        }
                        ;
                        return c
                    }();
                    c.isReady = !1;
                    c.Mg = !1;
                    c.Ac = !1;
                    b.DOMEventsMonitor = c;
                    c.prototype.setUpOnBeforeUnload = c.prototype.setUpOnBeforeUnload;
                    b.domEventsMonitor = new b.DOMEventsMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.map
                      , e = a.utils.yo
                      , c = a.utils.isDefined
                      , k = a.utils.isString
                      , l = a.utils.xk
                      , f = a.utils.isFunction;
                    b.Ng = function(a, b) {
                        for (var c = !1, l = 0; l < b.length; l++) {
                            var f = b[l];
                            if (f && f.test(a)) {
                                c = !0;
                                break
                            }
                        }
                        return c
                    }
                    ;
                    b.uc = function(a, l, f) {
                        var k = !1;
                        if (l && f)
                            for (var e = 0; e < f.length; e++) {
                                var m = f[e];
                                if (!(c(m.method) && a !== m.method || c(m.urls) && !b.Ng(l, m.urls))) {
                                    k = !0;
                                    break
                                }
                            }
                        return k
                    }
                    ;
                    b.Sb = function(a, b) {
                        return l(m(e(b), a))
                    }
                    ;
                    b.Sc = function(a) {
                        var c = b.cl(a);
                        a = b.Zf(a);
                        return c || a
                    }
                    ;
                    b.cl = function(b) {
                        var l = b.method;
                        if (c(l)) {
                            if (k(l))
                                return b;
                            a.error("M112")
                        }
                    }
                    ;
                    b.ro = function(a) {
                        var c = b.Zf(a);
                        return b.fn(a) && c
                    }
                    ;
                    b.fn = function(b) {
                        if (f(b.getFromBody))
                            return b;
                        a.error("M113")
                    }
                    ;
                    b.qk = function(b) {
                        for (var c = [], l = 0; l < b.length; l++) {
                            var f = b[l].pattern;
                            if (k(f))
                                try {
                                    c.push(new RegExp(f))
                                } catch (e) {
                                    a.exception(e, "M114")
                                }
                            else
                                a.error("M115")
                        }
                        return c
                    }
                    ;
                    b.Zf = function(a) {
                        var c = a.urls;
                        if (c && 0 < c.length && (a.urls = b.qk(c),
                        0 < a.urls.length))
                            return a
                    }
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isDefined
                      , e = function() {
                        function c() {}
                        c.setUp = function() {
                            c.exclude = [{
                                urls: [new RegExp(a.conf.beaconUrlHttp + a.conf.corsEndpointPath), new RegExp(a.conf.beaconUrlHttps + a.conf.corsEndpointPath)]
                            }];
                            c.include = [];
                            c.maxPerPageView = c.en(a.conf.userConf && a.conf.userConf.xhr);
                            c.payloadParams = [];
                            c.parameter = {};
                            c.bh(a.conf.userConf && a.conf.userConf.xhr)
                        }
                        ;
                        c.bh = function(a) {
                            m(a) && (c.exclude = c.exclude.concat(b.Sb(b.Sc, a.exclude)),
                            c.include = c.include.concat(b.Sb(b.Sc, a.include)),
                            c.payloadParams = c.payloadParams.concat(b.Sb(b.Sc, a.payloadParams)),
                            c.parameter = b.Sb(b.ro, a.parameter))
                        }
                        ;
                        c.en = function(k) {
                            if (m(k)) {
                                k = k.maxPerPageView;
                                if (b.isNumber(k) && 0 < k)
                                    return k;
                                if ("UNLIMITED" === k)
                                    return Infinity;
                                a.reportAPIMessage(a.Y.ki, "Invalid maxPerPageView value: " + k, "xhr.maxPerPageView", [k])
                            }
                            return a.conf.spa2 ? c.ti : c.si
                        }
                        ;
                        c.Mc = function(a, l) {
                            var f = c.include
                              , n = c.exclude;
                            return m(f) && 0 < f.length && !b.uc(l, a, f) || m(n) && 0 < n.length && b.uc(l, a, n)
                        }
                        ;
                        c.ne = function(a, l) {
                            var f = c.payloadParams;
                            b.uc(a.method(), a.url(), f) && a.dataObject({
                                data: l
                            })
                        }
                        ;
                        return c
                    }();
                    e.si = 50;
                    e.ti = 250;
                    b.Fa = e
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    b.parseURI = function(a) {
                        var b = String(a).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
                        a = b && null != a.match(b[1] + "//");
                        return b && {
                            href: b[0] || "",
                            protocol: b[1] || "",
                            slash: a ? "//" : "",
                            username: b[2] || "",
                            password: b[3] || "",
                            host: b[4] || "",
                            hostname: b[5] || "",
                            port: b[6] || "",
                            pathname: b[7] || "",
                            search: b[8] || "",
                            hash: b[9] || ""
                        }
                    }
                    ;
                    b.absolutizeURI = function(a, e) {
                        function c(a) {
                            var b = [];
                            a.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(a) {
                                "/.." === a ? b.pop() : b.push(a)
                            });
                            return b.join("").replace(/^\//, "/" === a.charAt(0) ? "/" : "")
                        }
                        var k, l, f, n, q, s, t, r;
                        r = e ? b.parseURI(e) : {};
                        t = a ? b.parseURI(a) : {};
                        r.protocol ? (k = r.protocol,
                        l = r.slash,
                        f = r.username,
                        n = r.password,
                        q = r.host,
                        s = c(r.pathname),
                        t = r.search) : r.host ? (k = t.protocol,
                        l = t.slash,
                        f = r.username,
                        n = r.password,
                        q = r.host,
                        s = c(r.pathname),
                        t = r.search) : (k = t.protocol,
                        l = t.slash,
                        f = t.username,
                        n = t.password,
                        q = t.host,
                        r.pathname ? ("/" === r.pathname.charAt(0) ? s = c(r.pathname) : (s = t.pathname ? t.pathname.slice(0, t.pathname.lastIndexOf("/") + 1) + r.pathname : l ? "/" + r.pathname : r.pathname,
                        s = c(s)),
                        t = r.search) : (s = c(t.pathname),
                        t = r.search || t.search));
                        return k + l + (f ? f + (n ? ":" + n : "") + "@" : "") + q + s + t + (r.hash ? r.hash : "")
                    }
                    ;
                    b.getFullyQualifiedUrl = function(m) {
                        try {
                            var e, c = document.location.href, k;
                            a: {
                                for (var l = document.getElementsByTagName("base"), f = 0; f < l.length; f++) {
                                    var n = l[f].href;
                                    if (n) {
                                        k = n;
                                        break a
                                    }
                                }
                                k = void 0
                            }
                            e = k ? b.absolutizeURI(c, k) : c;
                            return b.absolutizeURI(e, m)
                        } catch (q) {
                            return a.exception(q, "M116", m, e),
                            m
                        }
                    }
                }
                )(a.utils || (a.utils = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isString
                      , e = function(c) {
                        function k() {
                            var a = c.call(this) || this;
                            a.ka = 0;
                            a.ka = 0;
                            return a
                        }
                        v(k, c);
                        k.prototype.Ic = function() {
                            this.ka = 0
                        }
                        ;
                        k.A = function(b) {
                            var c = b.message || b.description
                              , k = b.fileName || b.filename
                              , q = b.lineNumber
                              , s = b.columnNumber;
                            m(b.description) && 0 <= b.description.indexOf("Access is denied.") && (c += ": maybe you have CORS XHR error in IE");
                            a.monitor.fa.ta(c, k, q, s, b)
                        }
                        ;
                        k.yg = function(a) {
                            var c = document.createElement("a");
                            c.href = a;
                            a = document.location;
                            var n = a.protocol;
                            return c.protocol === n && c.hostname === a.hostname && k.Zm(b.XHRMonitor.wk[n], c.port, a.port)
                        }
                        ;
                        k.Zm = function(a, b, c) {
                            return (b || a) === (c || a)
                        }
                        ;
                        return k
                    }(b.Yc);
                    e.Ua = {};
                    e.wk = {
                        "http:": "80",
                        "https:": "443"
                    };
                    b.va = e
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.Fa
                      , e = a.utils.Vb
                      , c = a.utils.mergeJSON
                      , k = a.events.AdrumAjax
                      , l = a.utils.isString
                      , f = a.utils.isDefined
                      , n = a.utils.isNumber
                      , q = a.utils.getFullyQualifiedUrl
                      , s = a.conf.spa2
                      , t = a.conf.ga;
                    b.Xa = null;
                    b.bi = window.fetch;
                    var r = a.conf.isZonePromise
                      , u = null
                      , h = function(h) {
                        function p() {
                            return null !== h && h.apply(this, arguments) || this
                        }
                        v(p, h);
                        p.prototype.Ml = function() {
                            var c = this
                              , l = Object.getOwnPropertyDescriptor(window, "fetch");
                            if (!l || l.configurable) {
                                l && delete l.writable;
                                l && delete l.value;
                                l || (l = {
                                    configurable: !0,
                                    enumerable: !0
                                });
                                var k = l.set
                                  , n = l.get;
                                l.set = function(a) {
                                    !0 !== a.isAgentFetch && (f(k) && k.apply(this, arguments),
                                    f(b.Xa) || c.setUp(a))
                                }
                                ;
                                l.get = function() {
                                    var a = b.bi;
                                    f(n) && (a = n.apply(this, arguments));
                                    f(b.Xa) && (a = b.Xa);
                                    return a
                                }
                            }
                            Object.defineProperty(window, "fetch", l);
                            r && a.utils.Td() && (window.fetch = window.fetch)
                        }
                        ;
                        p.prototype.setUp = function(l) {
                            var n = this;
                            l = l || window.fetch || b.bi;
                            a.logInfo("M117");
                            if (f(l) && !l.isAgentFetch) {
                                var q = function(c) {
                                    return function(l, k) {
                                        var q = arguments;
                                        if (n._adrumAjaxT) {
                                            a.logInfo("M118", n._adrumAjaxT.url(), n._adrumAjaxT.method());
                                            var s = a.utils.now();
                                            b.va.yg(n._adrumAjaxT.url()) && (q = p.Fj(arguments));
                                            p.zn(n._adrumAjaxT, q);
                                            var m = c.apply(this, q)
                                              , B = new window.Promise(function(b, c) {
                                                m.then(function(c) {
                                                    a.logInfo("M119", n._adrumAjaxT.url());
                                                    a.logInfo("M120", s, n._adrumAjaxT.url());
                                                    e.fo(c, B._adrumAjaxT);
                                                    B._adrumAjaxT.markFirstByteTime(B._adrumAjaxT.getFirstByteTime() || a.utils.now());
                                                    B._adrumAjaxT.response = c;
                                                    g(c.clone) ? (a.logInfo("M121", n._adrumAjaxT.url()),
                                                    c.clone().text().then(function(a) {
                                                        p.wl(a, B)
                                                    })["catch"](function(a) {
                                                        p.Pf(B, a)
                                                    })) : (a.logInfo("M122", n._adrumAjaxT.url()),
                                                    p.Jn(B, c));
                                                    b(c)
                                                })["catch"](function(b) {
                                                    a.logInfo("M123", n._adrumAjaxT.url());
                                                    B._adrumAjaxT.markFirstByteTime(B._adrumAjaxT.getFirstByteTime() || a.utils.now());
                                                    p.Pf(B);
                                                    c(b)
                                                })
                                            }
                                            );
                                            B._adrumAjaxT = n._adrumAjaxT;
                                            B.K = !0;
                                            B._adrumAjaxT.timestamp(s);
                                            B._adrumAjaxT.markSendTime(s);
                                            B._adrumAjaxT.parentPhase(a.lifecycle.getPhaseName());
                                            a.conf.spa2 && f(b.AnySpaMonitor.vp) && f(b.AnySpaMonitor.vp.userPageName) && B._adrumAjaxT.parentPageName(b.AnySpaMonitor.vp.userPageName);
                                            p.Bn(B._adrumAjaxT, arguments);
                                            a.logInfo("M124", s, n._adrumAjaxT.url());
                                            B.h = new a.Wb(a.b.pa(),new a.Ga("window.fetch"),a.CauseType.FETCH);
                                            return B
                                        }
                                        return c.apply(this, q)
                                    }
                                };
                                q.isAgentFetch = !0;
                                b.Xa = a.aop.around(q(l), function() {
                                    var l = p.pl(arguments)
                                      , f = Array.prototype.slice.call(arguments);
                                    if (!s && ++n.ka + b.xhrMonitor.ka > m.maxPerPageView || m.Mc(l.url, l.method))
                                        a.logInfo("M125", l.url),
                                        delete n._adrumAjaxT;
                                    else
                                        return n._adrumAjaxT = new k(c(l, n.status)),
                                        n.h = a.b.La("window.fetch.send", void 0, a.b.pa(), a.CauseType.FETCH),
                                        t && (l = a.utils.Na("window.fetch.send") || "",
                                        n.h.la = l),
                                        f[f.length] = {
                                            adrumArgs: {
                                                cEventId: n.h.guid
                                            }
                                        },
                                        a.b.sa(n.h),
                                        f
                                }, function() {
                                    if (n._adrumAjaxT)
                                        if (!s && n.ka + b.xhrMonitor.ka > m.maxPerPageView)
                                            a.logInfo("M126", n._adrumAjaxT.url());
                                        else if (m.Mc(n._adrumAjaxT.url(), n._adrumAjaxT.method()))
                                            a.logInfo("M127", n._adrumAjaxT.url());
                                        else {
                                            var c = a.utils.Ed(arguments, "cEventId");
                                            a.k.n.H.kf(n._adrumAjaxT);
                                            a.b.P(c)
                                        }
                                }, "fetch", b.va.A);
                                b.Xa.isAgentFetch = !0;
                                window.fetch = b.Xa
                            }
                        }
                        ;
                        p.ag = function() {
                            u || (u = new p);
                            return u
                        }
                        ;
                        p.wl = function(b, c) {
                            var l = a.utils.now();
                            if (p.ba(c)) {
                                c._adrumAjaxT.response.responseText = b;
                                p.Jg(c._adrumAjaxT, l);
                                var n = c._adrumAjaxT.getRespProcTime();
                                f(n) || f(c._adrumAjaxT.C) && 0 !== c._adrumAjaxT.C || (a.logInfo("M128", l, c._adrumAjaxT.url()),
                                c._adrumAjaxT.markRespProcTime(l),
                                p.mb(c))
                            }
                        }
                        ;
                        p.Pf = function(b, c) {
                            if ((!c || c.code !== c.ABORT_ERR) && b && b._adrumAjaxT) {
                                a.logInfo("M129", b._adrumAjaxT.url());
                                var l = a.utils.now();
                                p.ba(b) && (p.Jg(b._adrumAjaxT, l),
                                p.Kg(b._adrumAjaxT, l),
                                p.mb(b))
                            }
                        }
                        ;
                        p.Jg = function(b, c) {
                            var l = b.getRespAvailTime();
                            f(l) || (a.logInfo("M130", c, b.url()),
                            b.markRespAvailTime(c))
                        }
                        ;
                        p.Kg = function(b, c) {
                            var l = b.getRespProcTime();
                            if (f(l))
                                return !1;
                            a.logInfo("M131", c, b.url());
                            b.markRespProcTime(c);
                            return !0
                        }
                        ;
                        p.Jn = function(a, b) {
                            b.Uj = p.Tb(a, b.Uj);
                            b.ak = p.Tb(a, b.ak);
                            b.Pk = p.Tb(a, b.Pk);
                            b.xm = p.Tb(a, b.xm);
                            b.text = p.Tb(a, b.text)
                        }
                        ;
                        p.Tb = function(b, c) {
                            return a.aop.around(c, function() {
                                p.ba(b) && b._adrumAjaxT.markRespAvailTime(a.utils.now())
                            }, function() {
                                p.ba(b) && (b._adrumAjaxT.markRespProcTime(a.utils.now()),
                                p.mb(b))
                            }, "wrapResponseReader", a.monitor.ErrorMonitor.A)
                        }
                        ;
                        p.Fj = function(a) {
                            1 == a.length ? l(a[0]) ? ([].push.call(a, {}),
                            p.gd(a[1])) : p.gd(a[0]) : 2 == a.length && p.gd(a[1]);
                            return a
                        }
                        ;
                        p.gd = function(b) {
                            f(b) && (f(b.headers) || (b.headers = new Headers,
                            a.logInfo("M132")),
                            b.headers instanceof Headers ? b.headers.has("ADRUM") ? b.headers.set("ADRUM", "isAjax:true") : b.headers.append("ADRUM", "isAjax:true") : b.headers.ADRUM = "isAjax:true")
                        }
                        ;
                        p.zn = function(b, c) {
                            1 == c.length && !a.utils.isString(c[0]) && c[0]instanceof Request && (b.oh = c[0].clone())
                        }
                        ;
                        p.Bn = function(b, c) {
                            2 <= c.length && a.utils.isObject(c[1]) && f(c[1].body) && m.ne(b, c[1].body)
                        }
                        ;
                        p.Cn = function(b) {
                            return a.utils.isDefined(b.oh) ? b.oh.text().then(function(a) {
                                m.ne(b, a)
                            }) : window.Promise.resolve()
                        }
                        ;
                        p.pl = function(b) {
                            var c = {
                                url: "",
                                method: ""
                            };
                            a.utils.isObject(b[0]) ? (c.url = b[0].url || (a.utils.isDefined(b[0].toString) ? b[0].toString() : void 0),
                            c.method = b[0].method || "GET") : l(b[0]) && (c.url = b[0],
                            c.method = b[1] && b[1].method || "GET");
                            c.url = f(c.url) ? c.url : "";
                            c.url = q(c.url);
                            c.method = c.method;
                            return c
                        }
                        ;
                        p.Gl = function(b) {
                            var c;
                            f(c) || (a.logInfo("M133", b._adrumAjaxT.url()),
                            c = 1);
                            f(b._adrumAjaxT.C) && n(b._adrumAjaxT.C) && (b._adrumAjaxT.C += c,
                            a.logInfo("M134", b._adrumAjaxT.C, b._adrumAjaxT.url()))
                        }
                        ;
                        p.fc = function(b) {
                            var c;
                            f(c) || (a.logInfo("M135", b._adrumAjaxT.url()),
                            c = 1);
                            f(b._adrumAjaxT.C) && n(b._adrumAjaxT.C) && (b._adrumAjaxT.C -= c,
                            a.logInfo("M136", b._adrumAjaxT.C, b._adrumAjaxT.url()))
                        }
                        ;
                        p.ba = function(a) {
                            return f(a._adrumAjaxT)
                        }
                        ;
                        p.nc = function(a) {
                            return f(a._adrumAjaxT) && f(a._adrumAjaxT.C)
                        }
                        ;
                        p.io = function(b, c) {
                            b._adrumAjaxT = c._adrumAjaxT;
                            b._adrumAjaxT.C += b.F;
                            a.logInfo("M137", b._adrumAjaxT.C, c._adrumAjaxT.url());
                            b.F = 0
                        }
                        ;
                        p.so = function(a) {
                            var b = !1;
                            p.ba(a) && f(a._adrumAjaxT.C) && (p.Gl(a),
                            b = !0);
                            return b
                        }
                        ;
                        p.mb = function(b) {
                            p.Cn(b._adrumAjaxT)["catch"](function(c) {
                                a.logInfo("M138", b._adrumAjaxT.url(), c)
                            })["finally"](function() {
                                e.Hc(b, b._adrumAjaxT)
                            })
                        }
                        ;
                        p.ze = function(b) {
                            var c = a.utils.now();
                            return 0 === b._adrumAjaxT.C && f(b._adrumAjaxT) ? p.Kg(b._adrumAjaxT, c) : !1
                        }
                        ;
                        p.ye = function(b) {
                            var c = !1
                              , l = a.utils.now()
                              , n = b._adrumAjaxT.getRespAvailTime();
                            f(n) || (b._adrumAjaxT.markRespAvailTime(l),
                            c = !0);
                            return c
                        }
                        ;
                        p.Il = function(b) {
                            a.logInfo("M139", b._adrumAjaxT.url());
                            b._adrumAjaxT.C = 0
                        }
                        ;
                        return p
                    }(b.va);
                    b.Ci = h;
                    b.Db = h.ag()
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isObject
                      , e = a.utils.map
                      , c = a.utils.reduce
                      , k = a.utils.filter
                      , l = a.utils.isDefined
                      , f = a.utils.isString
                      , n = a.utils.mergeJSON
                      , q = a.utils.Ha
                      , s = a.utils.Fa
                      , t = a.utils.Vb
                      , r = a.conf.spa2
                      , h = a.conf.ga
                      , x = function(x) {
                        function p() {
                            var b = x.call(this) || this;
                            b.se = !1;
                            if (!0 === window["adrum-xhr-disable"])
                                return a.logInfo("M140"),
                                b;
                            if (!window.XMLHttpRequest)
                                return a.logInfo("M141"),
                                b;
                            b.G = window.XMLHttpRequest.prototype;
                            if (!b.G)
                                return a.logInfo("M142"),
                                b;
                            if (!("open"in b.G && "send"in b.G))
                                return a.logInfo("M143"),
                                b;
                            b.se = a.aop.support(b.G.open) && a.aop.support(b.G.send);
                            b.se || a.logInfo("M144");
                            return b
                        }
                        v(p, x);
                        p.prototype.setUp = function() {
                            if (this.se) {
                                a.logInfo("M145");
                                a.xhrConstructor = window.XMLHttpRequest;
                                a.xhrOpen = this.xhrOpen = this.G.open;
                                a.xhrSend = this.xhrSend = this.G.send;
                                s.setUp();
                                var c = this;
                                this.G.open = a.aop.around(this.G.open, function() {
                                    p.jm(this) && (4 === this.readyState ? (a.logInfo("M146"),
                                    p.Gk(this._adrumAjaxT),
                                    delete this.To,
                                    t.reportXhr(this, this._adrumAjaxT)) : a.logInfo("M147", this._adrumAjaxT.url()));
                                    var f = 1 <= arguments.length ? String(arguments[0]) : ""
                                      , k = 2 <= arguments.length ? String(arguments[1]) : ""
                                      , k = a.utils.getFullyQualifiedUrl(k);
                                    !r && c.ka + b.Db.ka > s.maxPerPageView || s.Mc(k, f) || (this._adrumAjaxT = new a.events.AdrumAjax(n({
                                        method: f,
                                        url: k
                                    }, c.status)),
                                    a.conf.spa2 && l(b.AnySpaMonitor.vp) && l(b.AnySpaMonitor.vp.userPageName) && this._adrumAjaxT.parentPageName(b.AnySpaMonitor.vp.userPageName))
                                }, null, "XHR.open", b.va.A);
                                this.G.send = a.aop.around(this.G.send, function(l) {
                                    var k = this
                                      , n = this._adrumAjaxT
                                      , q = !1;
                                    if (!(!n || !r && ++c.ka + b.Db.ka > s.maxPerPageView)) {
                                        var e = a.utils.now()
                                          , m = n.getSendTime();
                                        a.assert(null === m, "M148");
                                        n.timestamp(e);
                                        n.markSendTime(m || e);
                                        n.parentPhase(a.lifecycle.getPhaseName());
                                        k.h = a.b.La("XHR.send", void 0, a.b.pa(), a.CauseType.XHR);
                                        h && (e = a.utils.Na("XHR.send") || "",
                                        k.h.la = e);
                                        b.va.yg(n.url()) ? k.setRequestHeader("ADRUM", "isAjax:true") : a.logInfo("M149", document.location.href, n.url());
                                        s.ne(n, l);
                                        l = p.ll(n.url(), s.parameter, l);
                                        n.parameter(l);
                                        var t = 0
                                          , x = function() {
                                            if (4 == k.readyState)
                                                q ? a.logInfo("M150") : (a.logInfo("M151"),
                                                c.Vc(k));
                                            else {
                                                var b = null;
                                                try {
                                                    a.conf.isAbapApp || (b = k.onreadystatechange)
                                                } catch (l) {
                                                    if (q) {
                                                        a.logInfo("M152", l);
                                                        return
                                                    }
                                                    a.logInfo("M153", l);
                                                    c.Vc(k);
                                                    return
                                                }
                                                t++;
                                                b ? a.aop.support(b) ? (k.onreadystatechange = p.Gf(b, "XHR.onReadyStateChange"),
                                                f && c.ei.call(k, "readystatechange", p.If),
                                                a.logInfo("M154", t)) : f || (a.logInfo("M155"),
                                                c.Vc(k)) : t < p.Cj ? setTimeout(x, 0) : q ? a.logInfo("M156") : (a.logInfo("M157"),
                                                c.Vc(k))
                                            }
                                        };
                                        if (f) {
                                            a.logInfo("M158");
                                            try {
                                                c.Eo.call(k, "readystatechange", p.If),
                                                q = !0
                                            } catch (w) {
                                                a.error("M159", w)
                                            }
                                        }
                                        x.usedByAgent = !0;
                                        x()
                                    }
                                }, function() {
                                    if (r) {
                                        var b = this._adrumAjaxT;
                                        b && a.k.n.H.kf(b)
                                    }
                                }, "XHR.send", b.va.A);
                                var f = "addEventListener"in this.G && "removeEventListener"in this.G && a.aop.support(this.G.addEventListener) && a.aop.support(this.G.removeEventListener);
                                if (f) {
                                    var k = a.utils.Wf(this.G, "addEventListener");
                                    this.Eo = k.addEventListener;
                                    k.addEventListener = a.aop.around(k.addEventListener, function(b, c, f) {
                                        if (l(c) && (c.K = !0,
                                        this instanceof XMLHttpRequest && /^(load|error|readystatechange)$/.test(b) && c)) {
                                            var k = p.ao(c);
                                            if (k) {
                                                var n = q(arguments);
                                                n[1] = k;
                                                a.logInfo("M160");
                                                return n
                                            }
                                            a.logInfo("M161", b, c)
                                        }
                                    }, null, "XHR.addEventListener");
                                    k = a.utils.Wf(this.G, "removeEventListener");
                                    this.ei = k.removeEventListener;
                                    k.removeEventListener = a.aop.around(k.removeEventListener, function(b, l, f) {
                                        if (this instanceof XMLHttpRequest && this._adrumAjaxT) {
                                            var k = q(arguments);
                                            l.__adrumInterceptor ? (k[1] = l.__adrumInterceptor,
                                            a.logInfo("M162"),
                                            c.ei.apply(this, k)) : a.logInfo("M163")
                                        }
                                    }, null, "XHR.removeEventListener")
                                } else
                                    a.logInfo("M164");
                                a.logInfo("M165")
                            }
                        }
                        ;
                        p.ll = function(b, l, f) {
                            if (l && (l = k(e(k(l, function(c) {
                                return a.utils.Ng(b, c.urls)
                            }), function(a) {
                                return a.getFromBody(f)
                            }), m),
                            0 < l.length))
                                return c(l, n, {})
                        }
                        ;
                        p.Kd = function(b) {
                            var c = b._adrumAjaxT;
                            if (c) {
                                var l = a.utils.now();
                                2 == b.readyState ? c.markFirstByteTime(c.getFirstByteTime() || l) : 4 == b.readyState && (c.markRespAvailTime(c.getRespAvailTime() || l),
                                c.markFirstByteTime(c.getFirstByteTime() || l),
                                c.markRespProcTime(c.getRespProcTime() || l),
                                this.Ua[c.guid()] = {
                                    requestObj: b,
                                    ajaxT: b._adrumAjaxT
                                },
                                l = b.h = a.b.La("XHR.load", void 0, b.h, a.CauseType.XHR),
                                h && (b = a.utils.Na("XHR.onreadystatechange." + b.readyState) || "",
                                l.la = b),
                                a.b.sa(l),
                                c.hh = l.guid)
                            }
                        }
                        ;
                        p.hg = function(b) {
                            var c = b._adrumAjaxT;
                            if (c && 4 == b.readyState) {
                                delete this.Ua[c.guid()];
                                var l = a.utils.now()
                                  , f = c.getRespProcTime();
                                c.markRespAvailTime(c.getRespAvailTime() || l);
                                l > f && c.markRespProcTime(l);
                                t.Hc(b, c);
                                a.b.P(c.hh)
                            }
                        }
                        ;
                        p.Gf = function(a, b) {
                            return p.Fo(a, function() {
                                p.Kd(this)
                            }, function() {
                                p.hg(this)
                            }, b)
                        }
                        ;
                        p.If = function() {
                            p.Kd(this);
                            p.hg(this)
                        }
                        ;
                        p.jm = function(a) {
                            return l(a._adrumAjaxT) && f(a._adrumAjaxT._url)
                        }
                        ;
                        p.Gk = function(b) {
                            var c = a.utils.now();
                            b.markRespAvailTime(b.getRespAvailTime() || c);
                            b.markFirstByteTime(b.getFirstByteTime() || c);
                            b.markRespProcTime(b.getRespProcTime() || c)
                        }
                        ;
                        p.prototype.Vc = function(b) {
                            if (b._adrumAjaxT) {
                                var c = a.utils.now() + 3E4
                                  , l = function() {
                                    p.Kd(b);
                                    var f = b._adrumAjaxT;
                                    if (f) {
                                        var k = a.utils.now();
                                        4 == b.readyState ? (a.assert(null === f.getRespProcTime(), "M166"),
                                        f.markRespProcTime(f.getRespProcTime() || k),
                                        a.logInfo("M167"),
                                        t.Hc(b, f),
                                        a.b.P(f.hh)) : k < c ? a.utils.oSTO(l, p.Ke) : (delete b._adrumAjaxT,
                                        a.logInfo("M168"))
                                    }
                                };
                                l()
                            }
                        }
                        ;
                        p.Fo = function(b, c, l, f) {
                            var k = b;
                            b && "object" === typeof b && "toString"in b && "[xpconnect wrapped nsIDOMEventListener]" === b.toString() && "handleEvent"in b && (k = function() {
                                b.handleEvent.apply(this, q(arguments))
                            }
                            );
                            return a.aop.around(k, c, l, f)
                        }
                        ;
                        p.ao = function(b) {
                            if (b.__adrumInterceptor)
                                return b.__adrumInterceptor;
                            if (a.aop.support(b)) {
                                var c = p.Gf(b, "XHR.invokeEventListener");
                                return b.__adrumInterceptor = c
                            }
                        }
                        ;
                        return p
                    }(b.va);
                    x.Cj = 5;
                    x.Ke = 50;
                    b.XHRMonitor = x;
                    b.xhrMonitor = new b.XHRMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.Vb
                      , e = function(c) {
                        function k(b) {
                            b = c.call(this, b) || this;
                            b.perf = new a.PerformanceTracker;
                            b.ec = !1;
                            b.rf = 0;
                            return b
                        }
                        v(k, c);
                        k.prototype.type = function() {
                            return a.EventType.VPageView
                        }
                        ;
                        k.prototype.Dd = function() {
                            return b.EventTracker.fd(this.guid(), this.url(), this.type())
                        }
                        ;
                        k.prototype.pe = function() {
                            var b = this.Dd();
                            a.monitor.fa.set("parent", b);
                            a.logInfo("M169", b.guid(), b.url())
                        }
                        ;
                        k.prototype.startCorrelatingXhrs = function() {
                            a.logInfo("M170");
                            a.utils.isDefined(this.yb) && !a.monitor.AnySpaMonitor.Oa && m.Dm(this, this.yb.guid)
                        }
                        ;
                        k.prototype.start = function() {
                            this.startCorrelatingXhrs();
                            this.pe()
                        }
                        ;
                        return k
                    }(b.EventTracker);
                    b.AnySpaVPageView = e;
                    b.Za(b.V[a.EventType.VPageView], e.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                a.report = function(b) {
                    a.utils.isObject(b) && a.utils.isFunction(b.type) ? -1 == [a.EventType.PageView, a.EventType.Ajax, a.EventType.VPageView, a.EventType.Error].indexOf(b.type()) ? a.reportAPIMessage(a.Y.ua, b.type() + "is not a valid external event type", "ADRUM.report", Array.prototype.slice.call(arguments)) : a.conf.spa2 && a.EventType.VPageView == b.type() ? a.logInfo("M171") : a.utils.wh(function() {
                        a.command("reportEvent", b)
                    }) : a.reportAPIMessage(a.Y.Ee, "", "ADRUM.report", Array.prototype.slice.call(arguments))
                }
                ;
                a.setVirtualPageName = function(b) {
                    a.utils.isString(b) && 0 < a.utils.trim(b).length && a.conf.spa2 && a.monitor.AnySpaMonitor.vp && a.monitor.AnySpaMonitor.Bh(b)
                }
                ;
                a.markVirtualPageBegin = function(b, m) {
                    a.conf.spa2 && (this.eb = a.utils.isDefined(m) ? m : !0,
                    a.logInfo("M172", document.URL),
                    a.monitor.AnySpaMonitor.me(document.URL, b, !0),
                    a.monitor.AnySpaMonitor.Dh())
                }
                ;
                a.markVirtualPageEnd = function() {
                    a.conf.spa2 && this.eb && (a.logInfo("M173", a.monitor.AnySpaMonitor.ia),
                    a.monitor.AnySpaMonitor.Lg(a.monitor.AnySpaMonitor.vp.startTime, a.utils.now()),
                    this.eb = !1)
                }
                ;
                a.pauseReporting = function(b) {
                    a.conf.isReportingPaused = b;
                    a.logInfo("M174", b)
                }
                ;
                a.setAppReleaseId = function(b) {
                    a.conf.releaseId = a.conf.releaseId || b
                }
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isDefined
                      , e = a.aop.after
                      , c = a.aop.before
                      , k = a.utils.getFullyQualifiedUrl
                      , l = a.conf.disableUsingCauseStart
                      , f = function() {
                        function f() {}
                        f.prototype.setUp = function() {
                            var b = !1;
                            f.ya = a.utils.bb();
                            f.Gn();
                            a.k.n.setUp(a.utils.now());
                            f.ia = document.URL;
                            f.Ad = [];
                            a.utils.isDefined(window.history) && a.utils.isFunction(window.history.pushState) && (b = !0,
                            f.jf("push"));
                            a.utils.isDefined(window.history) && a.utils.isFunction(window.history.replaceState) && (b = !0,
                            f.jf("replace"));
                            f.Ad = f.Ad.concat(a.utils.Sb(a.utils.Sc, a.conf.userConf && a.conf.userConf.spa && a.conf.userConf.spa.spa2 && a.utils.isObject(a.conf.userConf.spa.spa2) && a.conf.userConf.spa.spa2.vp && a.conf.userConf.spa.spa2.vp.exclude));
                            if (a.utils.isDefined(window.addEventListener)) {
                                var b = !0
                                  , c = function() {
                                    f.ia == document.URL || f.Sd || f.Eh()
                                };
                                c.K = !0;
                                window.addEventListener("popstate", c)
                            }
                            b || a.logInfo("M175")
                        }
                        ;
                        f.jf = function(a) {
                            switch (a) {
                            case "push":
                                window.history.pushState = f.Hh(window.history.pushState, a);
                                break;
                            case "replace":
                                window.history.replaceState = f.Hh(window.history.replaceState, a)
                            }
                        }
                        ;
                        f.Hh = function(c, l) {
                            var k = l[0].toUpperCase() + l.slice(1);
                            return a.aop.around(c, function(c, k, q) {
                                (f.vp && f.vp.ec || f.ig(q)) && b.DOMEventsMonitor.Ac && !a.eb && (a.logInfo("M176", l),
                                f.me(document.URL))
                            }, function(c, k, q) {
                                if (f.vp && f.vp.ec || f.ig(q))
                                    b.DOMEventsMonitor.Ac && (a.eb ? (a.logInfo("M177", l),
                                    f.vp.url(document.URL)) : (a.logInfo("M178", l),
                                    f.Dh())),
                                    f.ia = document.URL
                            }, "history" + k + "State")
                        }
                        ;
                        f.ig = function(a) {
                            return a && f.ia !== k(a)
                        }
                        ;
                        f.Eh = function() {
                            f.Sd = !0;
                            var c = document.URL;
                            a.logInfo("M179", f.ia, c);
                            b.DOMEventsMonitor.Ac && (a.eb ? (a.logInfo("M180"),
                            f.vp.url(document.URL)) : (f.me(f.ia),
                            f.qe(c)));
                            f.ia = c;
                            f.Sd = !1
                        }
                        ;
                        f.Gn = function() {
                            var b;
                            a.b.sa = e(a.b.sa, function() {
                                b = location.hash
                            });
                            a.b.P = c(a.b.P, function() {
                                b == location.hash || f.ia == document.URL || f.Sd || f.Eh()
                            })
                        }
                        ;
                        f.me = function(a, b, c) {
                            f.xn();
                            f.Oa = !1;
                            f.Ff(a, b, c)
                        }
                        ;
                        f.Dh = function() {
                            var a = document.URL;
                            f.qe(a);
                            f.ia = a
                        }
                        ;
                        f.fp = function() {
                            f.Oa = !0;
                            f.Ff(f.ia);
                            f.qe()
                        }
                        ;
                        f.xn = function() {
                            var c = a.k.n;
                            a.conf.M && a.k.Xb.Sa && a.utils.isDefined(b.DOMEventsMonitor.currentBasePage) && (a.logInfo("M181"),
                            c.H.B || c.L.B ? c.navComplete(a.utils.now()) : c.navComplete(a.utils.max(c.H.Aa, c.L.ha)),
                            c.reset());
                            f.Oa || !a.utils.isDefined(f.vp) || f.vp.nh || (a.logInfo("M182"),
                            c = f.$k(a.k.n.B),
                            f.Lg(f.vp.startTime, c))
                        }
                        ;
                        f.$k = function(b) {
                            var c = a.utils.now();
                            b ? (c = f.al(a.k.n.gb),
                            a.k.n.reset()) : c = f.vp.endTime;
                            return c
                        }
                        ;
                        f.Ln = function(b, c) {
                            return f.vp.ec ? !1 : m(c) && 0 < c.length && a.utils.uc(void 0, b, c)
                        }
                        ;
                        f.al = function(b) {
                            var c = a.utils.now();
                            b ? a.k.n.L.Sj() || a.k.n.H.Tj() || (c = a.utils.max(a.k.n.L.ha, a.k.n.H.Aa)) : c = a.k.n.startTime;
                            return c
                        }
                        ;
                        f.Lg = function(a, b) {
                            f.Vd(a, b);
                            f.Ig(a);
                            f.report()
                        }
                        ;
                        f.Bh = function(b) {
                            a.utils.isDefined(b) && (f.vp.userPageName = b)
                        }
                        ;
                        f.Ff = function(b, c, k) {
                            f.reset();
                            f.vp = new a.events.AnySpaVPageView;
                            f.vp.startUrl = b;
                            f.Bh(c);
                            a.utils.isBoolean(k) && (f.vp.ec = k);
                            b = a.b.jd();
                            f.Oa ? f.vp.startTime = a.utils.bb() : (c = a.utils.now(),
                            k = b ? b.start : c,
                            l || (c = k),
                            f.vp.startTime = c);
                            f.vp.endTime = f.vp.startTime;
                            f.vp.timestamp(f.vp.startTime);
                            f.vp.yb = b
                        }
                        ;
                        f.qe = function(b) {
                            a.utils.isDefined(b) && f.vp.url(b);
                            f.vp.start();
                            a.eb || a.k.n.start(a.utils.now())
                        }
                        ;
                        f.Vd = function(b, c) {
                            a.utils.isDefined(f.vp) && (a.conf.M && f.gk(b),
                            a.utils.isDefined(c) ? f.vp.endTime = a.conf.M ? c - b > f.vp.vct ? c : f.vp.vct + b : c : f.vp.endTime = b)
                        }
                        ;
                        f.gk = function(b) {
                            a.logInfo("M183");
                            b = a.c.ld(b);
                            f.vp.vct = b.vct;
                            a.c.reset()
                        }
                        ;
                        f.Ig = function(c) {
                            a.utils.isDefined(f.vp) && f.vp.resTiming(b.resourceMonitor.rl(f.ya, c))
                        }
                        ;
                        f.oc = function() {
                            var b = a.b.ul();
                            return a.utils.isDefined(b) && a.utils.isDefined(f.vp) && (!a.utils.isDefined(f.vp.yb) || f.vp.yb != b)
                        }
                        ;
                        f.report = function() {
                            if (a.utils.isDefined(f.vp))
                                if (f.Ln(f.vp.url(), f.Ad))
                                    a.logInfo("M185", f.vp.url());
                                else {
                                    a.logInfo("M186");
                                    var c = f.vp;
                                    if (c.nh)
                                        a.logInfo("M187");
                                    else {
                                        var l = a.utils.isDefined(b.DOMEventsMonitor.currentBasePage) ? b.DOMEventsMonitor.currentBasePage.url() : document.URL;
                                        c.parentUrl(l);
                                        a.command("call", function() {
                                            a.reporter.reportEvent(c)
                                        });
                                        c.nh = !0
                                    }
                                }
                            else
                                a.logInfo("M184")
                        }
                        ;
                        f.reset = function() {
                            f.vp = null
                        }
                        ;
                        return f
                    }();
                    b.AnySpaMonitor = f;
                    b.Rj = new b.AnySpaMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.isDefined
                      , e = function(c) {
                        function k() {
                            var b = null !== c && c.apply(this, arguments) || this;
                            b.ym = function(c) {
                                var n = c.message
                                  , e = c.filename
                                  , s = c.lineno
                                  , m = c.colno;
                                c = c.error;
                                a.logInfo("M188");
                                if (a.utils.isDefined(c) || k.xc)
                                    a.logInfo("M189"),
                                    k.xc = !0,
                                    b.ta(n, e, s, m, c)
                            }
                            ;
                            b.zm = function(c) {
                                var k = c.blockedURI
                                  , e = c.columnNumber
                                  , s = c.lineNumber
                                  , m = c.effectiveDirective
                                  , r = c.violatedDirective;
                                c = c.sourceFile;
                                a.logInfo("M190");
                                k = a.utils.isDefined(k) ? k : "";
                                m = a.utils.isDefined(m) ? m : "";
                                r = a.utils.isDefined(r) ? r : "";
                                c = a.utils.isDefined(c) ? c : "";
                                b.ta("SecurityPolicyViolation: blockedURI = " + k + " & effectiveDirective = " + m + " & violatedDirective = " + r + " & sourceFile = " + c, void 0, s, e, void 0)
                            }
                            ;
                            return b
                        }
                        v(k, c);
                        k.A = function(b) {
                            a.monitor.fa.ta(b.message || b.description, b.fileName || b.filename, b.lineNumber, b.columnNumber, b)
                        }
                        ;
                        k.Jo = function(b) {
                            var c = a.utils.isDefined(b.blockedURI) ? b.blockedURI : ""
                              , k = a.utils.isDefined(b.documentURI) ? b.documentURI : "";
                            b = a.utils.isDefined(b.effectiveDirective) ? b.effectiveDirective : "";
                            a.monitor.fa.ta("blockedURI = " + c + "& documentURI = " + k + "? effectiveDirective = " + b, void 0, void 0, void 0, void 0)
                        }
                        ;
                        k.prototype.setUp = function() {
                            var b = this;
                            c.prototype.setUp.call(this);
                            a.utils.addEventListener(window, "error", this.ym, !0);
                            a.utils.addEventListener(window, "securitypolicyviolation", this.zm, !0);
                            a.listenForErrors = function() {
                                b.Fg()
                            }
                            ;
                            this.Fg()
                        }
                        ;
                        k.prototype.on = function() {
                            k.zd = 0
                        }
                        ;
                        k.prototype.ta = function(c, f, n, e, s) {
                            k.zd >= a.conf.Zi ? a.logInfo("M191") : (s = a.utils.tryExtractingErrorStack(s),
                            c = new a.events.Error(a.utils.mergeJSON({
                                msg: c + "",
                                url: a.utils.isString(f) ? f : void 0,
                                line: a.utils.isNumber(n) ? n : void 0,
                                col: a.utils.isNumber(e) ? e : void 0,
                                stack: s
                            }, this.status)),
                            a.conf.spa2 && m(b.AnySpaMonitor.vp) && m(b.AnySpaMonitor.vp.userPageName) && c.parentPageName(b.AnySpaMonitor.vp.userPageName),
                            a.command("reportPageError", c),
                            k.zd++,
                            k.hadErrors = !0)
                        }
                        ;
                        k.prototype.Fg = function() {
                            var b = this;
                            k.xc = !1;
                            a.aop.support(window.onerror) ? (window.onerror = a.aop.around(window.onerror, function(c, n, e, s, m) {
                                k.xc ? a.logInfo("M192") : k.Qd ? a.logInfo("M194") : (a.logInfo("M193"),
                                b.ta(c, n, e, s, m),
                                k.Qd = !0)
                            }, function() {
                                a.logInfo("M195");
                                k.Qd = !1
                            }, "onerror"),
                            a.logInfo("M196")) : a.logInfo("M197")
                        }
                        ;
                        return k
                    }(b.Yc);
                    e.Qd = !1;
                    e.zd = 0;
                    e.hadErrors = !1;
                    e.xc = !1;
                    b.ErrorMonitor = e;
                    b.fa = new b.ErrorMonitor
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.logInfo
                      , e = a.aop.after
                      , c = function(c) {
                        function l() {
                            return null !== c && c.apply(this, arguments) || this
                        }
                        v(l, c);
                        l.prototype.setUp = function() {
                            a.utils.map(["error", "exception"], function(b) {
                                var c = A[b];
                                a.utils.isFunction(c) && a.aop.support(c) ? (m("M198", b),
                                A[b] = e(c, function(a) {
                                    m("M199", b, a);
                                    l.Hj(a)
                                })) : m("M200", b)
                            });
                            b.fa.ta = e(b.fa.ta, function() {
                                0 < l.za.length ? (m("M201"),
                                l.za = []) : m("M202")
                            })
                        }
                        ;
                        l.Hj = function(b) {
                            l.za.length >= a.conf.Ti ? m("M203") : a.utils.isString(b) ? (m("M204", b),
                            l.za.push(b),
                            a.utils.oSTO(l.mh)) : a.utils.isObject(b) ? (b = a.utils.toJSONString(b),
                            null !== b ? (m("M205", b),
                            l.za.push(b),
                            a.utils.oSTO(l.mh)) : a.error("M206")) : m("M207", typeof b)
                        }
                        ;
                        l.mh = function() {
                            0 < l.za.length ? (m("M208"),
                            l.za.forEach(function(a) {
                                b.fa.ta(a)
                            }),
                            l.za = []) : m("M209")
                        }
                        ;
                        return l
                    }(b.Yc);
                    c.za = [];
                    b.Ko = c;
                    b.lk = new c
                }
                )(a.monitor || (a.monitor = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.utils.isDefined
                  , m = a.utils.$l
                  , e = a.utils.isNumber
                  , c = a.monitor.Ci
                  , k = a.conf.ga;
                a.ai = window.Promise;
                a.bc = null;
                a.Zp = null;
                a.bf = Object.defineProperty;
                var l = a.conf.spa2 && a.conf.modernBrowserFeaturesAvailable
                  , f = a.conf.isZonePromise
                  , n = a.conf.fetch
                  , q = function() {
                    function n() {}
                    n.Ol = function() {
                        Object.defineProperty = a.aop.around(a.bf, function(a, c, f) {
                            "Promise" === c && b(f) && n.rg(f)
                        });
                        if (f && a.utils.Td()) {
                            a.logInfo("M210");
                            var c = Object.getOwnPropertyDescriptor(window, "Promise");
                            n.rg(c);
                            a.bf(window, "Promise", c);
                            window.Promise = window.Promise
                        }
                    }
                    ;
                    n.rg = function(c) {
                        b(window.Zone) && b(window.Zone.assertZonePatched) && (window.Zone.assertZonePatched = function() {}
                        );
                        c = c || Object.getOwnPropertyDescriptor(window, "Promise");
                        var f = c.set
                          , l = c.get;
                        g(f) && (c.set = function(c) {
                            !0 === c.agentPromise ? a.logInfo("M211") : (f.apply(this, arguments),
                            b(a.bc) ? f.apply(this, arguments) : (a.logInfo("M212"),
                            n.setUp()))
                        }
                        );
                        g(l) && (c.get = function() {
                            var c = l.apply(this, arguments);
                            b(a.bc) && (a.logInfo("M213"),
                            c = a.bc);
                            return c
                        }
                        )
                    }
                    ;
                    n.setUp = function() {
                        if (b(a.ai)) {
                            n.Rl();
                            n.Ql();
                            var c = function(c) {
                                function f(k) {
                                    var e = this.constructor
                                      , m = k;
                                    this.$ = a.utils.generateGUID();
                                    b(k) && (m = n.Pl(k, this));
                                    k = a.utils.Ej(this, c, [m], e);
                                    l && (b(this.h) && (k.h = this.h),
                                    b(this.Ta) ? k.h = this.Ta.h : k.h = a.b.pa());
                                    k.$ = this.$;
                                    this.Ta = k;
                                    a.logInfo("M214", k.$);
                                    l && b(k.h) && a.logInfo("M215", k.h.guid);
                                    return k
                                }
                                a.utils.bd(f, c);
                                return f
                            }(window.Promise);
                            c.agentPromise = !0;
                            a.bc = c;
                            window.Promise = c;
                            b(window.addEventListener) ? window.addEventListener("unhandledrejection", this.Sh) : window.Kp = this.Sh
                        }
                    }
                    ;
                    n.Ja = function(c, f) {
                        return function() {
                            if (l) {
                                var e, m = void 0;
                                e = void 0;
                                a.logInfo("M216", c);
                                switch (c) {
                                case n.J.Te:
                                case n.J.Se:
                                case n.J.Ie:
                                case n.J.He:
                                    a.utils.isDefined(f) && a.utils.isDefined(f.Ta) && (m = f.Ta.h);
                                    e = a.b.pa() || m;
                                    e = new a.Wb(e,new a.Ga(c),a.CauseType.PROMISE);
                                    break;
                                case n.J.Qe:
                                case n.J.Re:
                                case n.J.Oe:
                                    e = f.h,
                                    e = new a.Wb(e,new a.Ga(c),a.CauseType.PROMISE),
                                    a.b.sa(e)
                                }
                                k && (m = a.utils.Na(c) || "",
                                e.la = m);
                                b(f) && (b(f.Ta) ? (f.Ta.h = e,
                                a.logInfo("M217", f.Ta.$)) : (a.logInfo("M218", f.$),
                                f.h = e))
                            }
                        }
                    }
                    ;
                    n.Pl = function(c, f) {
                        l && (c = a.aop.around(c, function() {
                            f.h = new a.Wb(a.b.pa(),new a.Ga(n.J.Pe),a.CauseType.PROMISE);
                            if (k) {
                                var c = a.utils.Na(n.J.Pe) || "";
                                f.h.la = c
                            }
                            a.b.sa(f.h);
                            a.logInfo("M219", f.h.guid, f.$);
                            b(arguments[0]) && (a.logInfo("M220"),
                            c = a.aop.around(arguments[0], n.Ja(n.J.Te, f)),
                            arguments[0] = c);
                            b(arguments[1]) && (a.logInfo("M221"),
                            c = a.aop.around(arguments[1], n.Ja(n.J.Se, f)),
                            arguments[1] = c);
                            return a.utils.Ha(arguments)
                        }, function() {
                            a.logInfo("M222");
                            a.b.P(f.h ? f.h.guid : null)
                        }, "interceptPromiseExecutor", n.Fc));
                        return c
                    }
                    ;
                    n.Ql = function() {
                        a.utils.refs.promiseThen = window.Promise.prototype.then;
                        var b = n.fh()
                          , c = {
                            parentObject: window.Promise.prototype,
                            property: "then",
                            propertyWrappedFunctionName: "promiseThen",
                            wrapNewFunctionAgain: !0
                        };
                        c.setUpFunc = function(b) {
                            return function(c) {
                                a.utils.Td() || n.ln(c, b)
                            }
                        }
                        .call(this, c);
                        c.Ya = b;
                        a.aop.forceWrap(c);
                        a.utils.refs.promiseFinally = window.Promise.prototype["finally"];
                        b = n.eh();
                        c = {
                            parentObject: window.Promise.prototype,
                            property: "finally",
                            propertyWrappedFunctionName: "promiseFinally",
                            wrapNewFunctionAgain: !0
                        };
                        c.setUpFunc = function(a) {
                            return function(b) {
                                n.kn(b, a)
                            }
                        }
                        .call(this, c);
                        c.Ya = b;
                        a.aop.forceWrap(c)
                    }
                    ;
                    n.ln = function(a, b) {
                        b.Ya = n.fh(a)
                    }
                    ;
                    n.kn = function(a, b) {
                        b.Ya = n.eh(a)
                    }
                    ;
                    n.Rl = function() {
                        n.hn();
                        n.gn()
                    }
                    ;
                    n.im = function(b) {
                        return b instanceof n || b instanceof a.ai
                    }
                    ;
                    n.Fl = function(c) {
                        var f;
                        b(f) || (a.logInfo("M223"),
                        f = 1);
                        b(c.F) && e(c.F) && (c.F += f,
                        a.logInfo("M224", c.F))
                    }
                    ;
                    n.uk = function(a) {
                        var c;
                        b(c) || (c = 1);
                        b(a.F) && e(a.F) && (a.F -= c)
                    }
                    ;
                    n.Hl = function(c) {
                        b(c.F) && a.utils.dm(c.F) ? (a.logInfo("M225"),
                        n.Fl(c)) : c.F = 1
                    }
                    ;
                    n.ho = function(b) {
                        c.so(b) || (a.logInfo("M226"),
                        n.Hl(b))
                    }
                    ;
                    n.pn = function(a) {
                        a.F = 0
                    }
                    ;
                    n.Rd = function(a) {
                        return b(a.K)
                    }
                    ;
                    n.fh = function(f) {
                        var k = null;
                        f = f || window.Promise.prototype.then;
                        f = a.aop.around(f, function() {
                            var f = this;
                            k = f;
                            a.logInfo("M227", f.$);
                            if (b(arguments[0]) && a.utils.isFunction(arguments[0])) {
                                n.ho(f);
                                a.logInfo("M228", f.$);
                                var e = a.aop.around(arguments[0], function() {
                                    n.Ja(n.J.Qe, f)();
                                    f && !f.F && c.ba(f) && !n.Rd(f) && (f._adrumAjaxT.tempRespAvailAndProcTime = a.utils.now(),
                                    c.Ua[f._adrumAjaxT.guid()] = {
                                        requestObj: f,
                                        ajaxT: f._adrumAjaxT
                                    })
                                }, function() {
                                    var k = a.utils.Ed(arguments, "origFuncResult");
                                    b(k) && b(k.F) && n.im(k) && c.ba(f) ? (c.io(k, f),
                                    n.pn(k)) : (c.ba(f) && !n.Rd(f) && c.nc(f) && (c.ye(f),
                                    c.fc(f),
                                    !0 === c.ze(f) && (a.logInfo("M229"),
                                    a.logInfo("M230"),
                                    delete c.Ua[f._adrumAjaxT.guid()],
                                    c.mb(f))),
                                    l && (a.logInfo("M231"),
                                    a.b.P(f.h ? f.h.guid : null)))
                                }, "interceptPromiseThenFulfil", function() {
                                    c.ba(f) && c.nc(f) && (c.ye(f) && c.fc(f),
                                    !0 === c.ze(f) && (a.logInfo("M232"),
                                    a.logInfo("M233"),
                                    delete c.Ua[f._adrumAjaxT.guid()],
                                    c.mb(f)))
                                });
                                arguments[0] = e
                            }
                            b(arguments[1]) && a.utils.isFunction(arguments[1]) && (a.logInfo("M234", f.$),
                            e = a.aop.around(arguments[1], n.Ja(n.J.Re, f), function() {
                                l && (a.logInfo("M235"),
                                a.b.P(f.h ? f.h.guid : null))
                            }, null, n.Fc),
                            arguments[1] = e);
                            return a.utils.Ha(arguments)
                        }, function() {
                            var f = a.utils.Ed(arguments, "origFuncResult");
                            !b(f) || b(arguments[0]) && !a.utils.isFunction(arguments[0]) || (l && (f.h = this.h),
                            n.Rd(this) && c.ba(this) && (f._adrumAjaxT = this._adrumAjaxT,
                            c.nc(this) || c.Il(f)))
                        }, "interceptPromiseThenInterceptor", function() {
                            var b = k;
                            c.ba(b) && c.nc(b) && (c.ye(b) && c.fc(b),
                            !0 === c.ze(b) && (a.logInfo("M236"),
                            a.logInfo("M237"),
                            delete c.Ua[b._adrumAjaxT.guid()],
                            c.mb(b)))
                        });
                        f.usedByAgent = !0;
                        return window.Promise.prototype.then = f
                    }
                    ;
                    n.eh = function(f) {
                        if (b(window.Promise.prototype["finally"]))
                            return f = f || window.Promise.prototype["finally"],
                            f = a.aop.around(f, function() {
                                var f = this;
                                b(f._adrumAjaxT) && b(f._adrumAjaxT.C) ? c.fc(f) : b(f.F) && n.uk(f);
                                if (b(arguments[0])) {
                                    a.logInfo("M238", f.$);
                                    var k = a.aop.around(arguments[0], n.Ja(n.J.Oe, f), function() {
                                        l && (a.logInfo("M239"),
                                        a.b.P(f.h ? f.h.guid : null))
                                    });
                                    arguments[0] = k;
                                    return a.utils.Ha(arguments)
                                }
                            }, function() {
                                a.logInfo("M240");
                                a.b.P(this.h ? this.h.guid : null)
                            }, "interceptPromiseFinally"),
                            f.usedByAgent = !0,
                            window.Promise.prototype["finally"] = f
                    }
                    ;
                    n.hn = function() {
                        window.Promise.resolve = a.aop.around(window.Promise.resolve, n.Ja(n.J.Ie, null), null, "interceptPromiseResolve", n.Fc)
                    }
                    ;
                    n.gn = function() {
                        window.Promise.reject = a.aop.around(window.Promise.reject, n.Ja(n.J.He, null), null, "interceptPromiseReject", n.Fc)
                    }
                    ;
                    n.Sh = function(b) {
                        var c = b.detail ? b.detail.reason : b.reason;
                        if (b.promise && !b.promise.$)
                            b.preventDefault();
                        else {
                            if (!m(c))
                                try {
                                    c = new window.Error(c)
                                } catch (f) {
                                    c = f
                                }
                            a.monitor.ErrorMonitor.A(c)
                        }
                    }
                    ;
                    return n
                }();
                q.J = {
                    Pe: "PromiseInstance.init",
                    Te: "PromiseInstance.resolve",
                    Se: "PromiseInstance.reject",
                    Qe: "PromiseInstance.onFulfilled",
                    Re: "PromiseInstance.onRejected",
                    Oe: "PromiseInstance.finally",
                    Ie: "PromiseConstructor.resolve",
                    He: "PromiseConstructor.reject"
                };
                q.Fc = function() {}
                ;
                a.qj = q;
                f && n && (q.Ol(),
                c.ag().Ml())
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    function m(a, b) {
                        var c = []
                          , e = /^\s*(ADRUM_BT\w*)=(.*)\s*$/i.exec(a);
                        if (e) {
                            var m = e[1]
                              , e = e[2].replace(/^"|"$/g, "")
                              , e = decodeURIComponent(e).split("|")
                              , h = e[0].split(":");
                            if ("R" === h[0] && Number(h[1]) === b)
                                for (k(m),
                                m = 1; m < e.length; m++)
                                    c.push(e[m])
                        }
                        return c
                    }
                    function e(a, b) {
                        var c = /^\s*(ADRUM_(\d+)_(\d+)_(\d+))=(.*)\s*$/i.exec(a);
                        if (c) {
                            var e = c[1]
                              , m = c[4]
                              , h = c[5];
                            if (Number(c[3]) === b)
                                return k(e),
                                {
                                    index: Number(m),
                                    value: h
                                }
                        }
                        return null
                    }
                    function c(b) {
                        var c = /^\s*ADRUM=s=([\d]+)&r=(.*)\s*/.exec(b);
                        if (c) {
                            a.logInfo("M243", b);
                            if (3 === c.length)
                                return k("ADRUM", "samesite=lax"),
                                {
                                    startTime: Number(c[1]),
                                    startPage: c[2]
                                };
                            a.error("M244", b);
                            return null
                        }
                    }
                    function k(b, c) {
                        a.logInfo("M242", b);
                        var k = new Date;
                        k.setTime(k.getTime() - 1E3);
                        document.cookie = b + "=;Expires=" + k.toUTCString() + ";" + (c || "")
                    }
                    b.startTimeCookie = null;
                    b.cookieMetadataChunks = null;
                    b.Jf = function(l, f) {
                        a.logInfo("M241");
                        for (var k = f ? f.length : 0, q = [], s = l.split(";"), h = 0; h < s.length; h++) {
                            var r = s[h]
                              , u = e(r, k);
                            u ? q.push(u) : (r = c(r),
                            null != r && (b.startTimeCookie = r))
                        }
                        Array.prototype.sort.call(q, function(a, b) {
                            return a.index - b.index
                        });
                        r = [];
                        for (h = 0; h < q.length; h++)
                            r.push(q[h].value);
                        for (h = 0; h < s.length; h++)
                            (q = m(s[h], k)) && 0 < q.length && (r = r.concat(q));
                        b.cookieMetadataChunks = r
                    }
                    ;
                    a.correlation.eck = b.Jf
                }
                )(a.correlation || (a.correlation = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = window.addEventListener
                  , m = a.utils.isDefined(window.EventTarget) ? window.EventTarget.prototype.addEventListener : function() {}
                  , e = a.utils.isDefined(window.EventTarget) ? window.EventTarget.prototype.removeEventListener : function() {}
                  , c = function() {
                    function c() {}
                    c.setUp = function() {
                        Array.prototype.push.apply(c.td, []);
                        c.zo();
                        a.utils.isDefined(window.EventTarget) ? (c.Ao(),
                        c.Bo()) : c.Kj();
                        c.sg("onload");
                        c.sg("onerror")
                    }
                    ;
                    c.Op = function() {
                        return []
                    }
                    ;
                    c.Zk = function(b, f) {
                        var n = "";
                        if (a.utils.isDefined(b))
                            if ("string" === typeof b.textContent)
                                n = a.utils.isDefined(String.prototype.trim) ? b.textContent.trim() : b.textContent,
                                n = a.utils.isDefined(f) ? n.substring(0, f) : n;
                            else
                                for (b = b.firstChild; a.utils.isDefined(b) && !(n += c.Zk(b, f),
                                a.utils.isDefined(f) && n.length >= f); b = b.nextSibling)
                                    ;
                        return n
                    }
                    ;
                    c.zo = function() {
                        a.utils.forEach(c.td, function(c) {
                            b(c, function(b) {
                                b = b.target || b.srcElement;
                                (b === document || b === window || b instanceof XMLHttpRequest || b instanceof HTMLElement) && null != b && b["on" + c] && (b["on" + c] = a.b.Wc(c, b["on" + c], a.CauseType.USER, !0),
                                b["on" + c].K = !0)
                            }, !0)
                        })
                    }
                    ;
                    c.Kj = function() {
                        a.utils.forEach(c.td, function(c) {
                            b(c, function(b) {
                                b = a.b.La(c, b, null, a.CauseType.USER);
                                a.b.sa(b)
                            }, !0);
                            b(c, function() {
                                a.b.P()
                            }, !1)
                        })
                    }
                    ;
                    c.Vh = function(b) {
                        var c = !1;
                        a.utils.isBoolean(b) ? c = b : a.utils.isObject(b) && a.utils.isDefined(b.capture) && (c = !!b.capture);
                        return c
                    }
                    ;
                    c.yh = function(b, c, k, e) {
                        if (!a.utils.isDefined(b.eventListenerMap) || !a.utils.isDefined(b.eventListenerMap[c]) || !a.utils.isDefined(k))
                            return -1;
                        b = b.eventListenerMap[c];
                        for (c = 0; c < b.length; c++)
                            if (b[c][0] == k && b[c][1] == e)
                                return c;
                        return -1
                    }
                    ;
                    c.qg = function(b, c, k, e, m) {
                        a.utils.isDefined(b) && a.utils.isDefined(m) && (a.utils.isDefined(b.eventListenerMap) || (b.eventListenerMap = {}),
                        a.utils.isDefined(b.eventListenerMap[c]) || (b.eventListenerMap[c] = []),
                        b.eventListenerMap[c].push([k, e, m]))
                    }
                    ;
                    c.mn = function(a, b, c) {
                        if (-1 < c) {
                            var k = a.eventListenerMap[b];
                            delete k[c];
                            k.splice(c, 1);
                            0 == k.length && delete a.eventListenerMap[b]
                        }
                    }
                    ;
                    c.Ao = function() {
                        EventTarget.prototype.addEventListener = function(b, f, n) {
                            if (a.utils.isDefined(f) && f.K || !a.b.vg(f) && !g(f))
                                return m.call(this, b, f, n);
                            var e = c.Vh(n)
                              , h = a.utils.isDefined(this) ? this : window;
                            if (!(-1 < c.yh(h, b, f, e))) {
                                var t = f;
                                switch (b) {
                                case "click":
                                case "dblclick":
                                case "auxclick":
                                case "mousedown":
                                case "mouseup":
                                case "drop":
                                case "keyup":
                                case "keydown":
                                case "keypress":
                                case "contextmenu":
                                case "pageChanged":
                                case "close":
                                    t = a.b.Wc(b, f, a.CauseType.USER, !0);
                                    c.qg(h, b, f, e, t);
                                    break;
                                case "load":
                                case "error":
                                    t = a.b.Wc(b, f, a.CauseType.USER, !1),
                                    c.qg(h, b, f, e, t)
                                }
                                m.call(h, b, t, n)
                            }
                        }
                    }
                    ;
                    c.Bo = function() {
                        EventTarget.prototype.removeEventListener = function(b, f, n) {
                            if (a.utils.isDefined(f) && f.K)
                                return e.call(this, b, f, n);
                            var m = c.Vh(n)
                              , h = a.utils.isDefined(this) ? this : window
                              , m = c.yh(h, b, f, m);
                            0 <= m ? (e.call(h, b, this.eventListenerMap[b][m][2], n),
                            c.mn(h, b, m)) : e.call(h, b, f, n)
                        }
                    }
                    ;
                    c.sg = function(b) {
                        var c = HTMLElement.prototype
                          , k = Object.getOwnPropertyDescriptor(c, b);
                        a.utils.isDefined(k) && a.utils.isDefined(k.set) && Object.defineProperty(c, b, {
                            set: function(c) {
                                var f = c;
                                a.utils.isDefined(c) && (f = a.b.Wc(b, c, a.CauseType.RESOURCE, !1));
                                var e;
                                try {
                                    e = k.set.call(this, f)
                                } catch (m) {
                                    throw m;
                                }
                                return e
                            }
                        })
                    }
                    ;
                    return c
                }();
                c.td = "click dblclick mousedown mouseup change select submit keydown keypress keyup load unload".split(" ");
                a.Ai = c
            }
            )(h || (h = {}));
            (function(a) {
                "APP_KEY_NOT_SET" !== a.conf.appKey || a.utils.isDefined(window.ADEUM_js_handler) || a.utils.isDefined(window.webkit) || A.log("AppDynamics EUM cloud application key missing. Please specify window['adrum-app-key']");
                a.correlation.Jf(document.cookie, document.referrer);
                a.b.setUp();
                a.command("mark", "firstbyte", window["adrum-start-time"]);
                a.monitor.setUpMonitors(a.monitor.fa, a.monitor.lk, a.monitor.domEventsMonitor, a.monitor.navMonitor, a.monitor.xhrMonitor, a.monitor.resourceMonitor);
                a.conf.disableWrappingEventListeners || a.Ai.setUp();
                a.conf.fetch && !a.conf.isZonePromise && (a.qj.setUp(),
                a.monitor.setUpMonitors(a.monitor.Db));
                a.conf.spa2 && a.conf.modernBrowserFeaturesAvailable && a.monitor.setUpMonitors(a.monitor.Rj);
                a.conf.enablePrimaryMetrics && a.utils.isDefined(window.MutationObserver) && (a.conf.M = !0,
                a.k.n.L.Fh(),
                a.k.n.start(a.utils.bb()),
                a.c.start())
            }
            )(h || (h = {}));
            (function(a) {
                a = a.ng || (a.ng = {});
                a = a.l || (a.l = {});
                a.Gg = "locationChangeStart";
                a.Am = "locationChangeSuccess";
                a.uh = "routeChangeStart";
                a.vh = "routeChangeSuccess";
                a.Jh = "stateChangeStart";
                a.Kh = "stateChangeSuccess";
                a.Yh = "viewContentLoaded";
                a.Bl = "includeContentRequested";
                a.Al = "includeContentLoaded";
                a.Hf = "digest";
                a.Lp = "outstandingRequestsComplete";
                a.vf = "beforeNgXhrRequested";
                a.mf = "afterNgXhrRequested";
                a.Ip = "ngXhrLoaded";
                a.zf = "$$completeOutstandingRequest"
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    function m(a, c, f, n, e, m) {
                        if (c)
                            try {
                                return c.apply(a, [f, n, e].concat(m))
                            } catch (h) {
                                return a.error(f, n, e, m, b.Error.Ki, "M245", h)
                            }
                    }
                    function e(a, c) {
                        return function() {
                            var f = this.current
                              , n = c[f] || c[b.Zb] || f
                              , e = Array.prototype.slice.call(arguments);
                            if (this.ik(a))
                                return this.error(a, f, n, e, b.Error.Li, "event " + a + "M246" + this.current);
                            if (!1 === m(this, this["onbefore" + a], a, f, n, e))
                                return b.Yb.Ge;
                            n === b.Zb && (n = f);
                            if (f === n)
                                return m(this, this["onafter" + a] || this["on" + a], a, f, n, e),
                                b.Yb.kj;
                            var h = this;
                            this.transition = function() {
                                h.transition = null;
                                h.current = n;
                                m(h, h["onenter" + n] || h["on" + n], a, f, n, e);
                                m(h, h["onafter" + a] || h["on" + a], a, f, n, e);
                                return b.Yb.vj
                            }
                            ;
                            if (!1 === m(this, this["onleave" + f], a, f, n, e))
                                return this.transition = null,
                                b.Yb.Ge;
                            if (this.transition)
                                return this.transition()
                        }
                    }
                    var c = a.utils.hasOwnPropertyDefined;
                    b.VERSION = "2.3.5";
                    b.Yb = {
                        vj: 1,
                        kj: 2,
                        Ge: 3,
                        Oo: 4
                    };
                    b.Error = {
                        Li: 100,
                        Po: 200,
                        Ki: 300
                    };
                    b.Zb = "*";
                    b.create = function(a, l) {
                        function f(a) {
                            var c = a.from instanceof Array ? a.from : a.from ? [a.from] : [b.Zb];
                            r[a.name] = r[a.name] || {};
                            for (var f = 0; f < c.length; f++)
                                u[c[f]] = u[c[f]] || [],
                                u[c[f]].push(a.name),
                                r[a.name][c[f]] = a.to || c[f]
                        }
                        var n = "string" == typeof a.initial ? {
                            state: a.initial
                        } : a.initial
                          , m = l || a.target || {}
                          , h = a.events || []
                          , t = a.callbacks || {}
                          , r = {}
                          , u = {};
                        n && (n.event = n.event || "startup",
                        f({
                            name: n.event,
                            from: "none",
                            to: n.state
                        }));
                        for (var v = 0; v < h.length; v++)
                            f(h[v]);
                        for (var w in r)
                            c(r, w) && (m[w] = e(w, r[w]));
                        for (w in t)
                            c(t, w) && (m[w] = t[w]);
                        m.current = "none";
                        m.qp = function(a) {
                            return a instanceof Array ? 0 <= a.indexOf(this.current) : this.current === a
                        }
                        ;
                        m.hk = function(a) {
                            return !this.transition && (c(r[a], this.current) || c(r[a], b.Zb))
                        }
                        ;
                        m.ik = function(a) {
                            return !this.hk(a)
                        }
                        ;
                        m.Pc = function() {
                            return u[this.current]
                        }
                        ;
                        m.error = a.error || function(a, b, c, f, k, l, n) {
                            throw n || l;
                        }
                        ;
                        if (n && !n.defer)
                            m[n.event]();
                        return m
                    }
                }
                )(a.ef || (a.ef = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function(e) {
                        function c(b) {
                            b = e.call(this, b) || this;
                            a.utils.isDefined(a.ng) && b.constructor != a.ng.NgVPageView && b.constructor != c && a.reportAPIMessage(a.Y.ua, a.pb, "ADRUM.events.VPageView", []);
                            if (a.conf.spa2)
                                return b;
                            b.perf = new a.PerformanceTracker;
                            b.start();
                            a.monitor.xhrMonitor.Ic();
                            a.monitor.Db.Ic();
                            a.monitor.fa.on();
                            return b
                        }
                        v(c, e);
                        c.prototype.type = function() {
                            return a.EventType.VPageView
                        }
                        ;
                        c.prototype.Dd = function() {
                            return b.EventTracker.fd(this.guid(), this.url(), this.type())
                        }
                        ;
                        c.prototype.Ih = function(b) {
                            var c = this.Dd();
                            b.set("parent", c);
                            a.logInfo("M247", c.guid(), c.url())
                        }
                        ;
                        c.prototype.startCorrelatingXhrs = function() {
                            a.conf.spa2 || (a.logInfo("M248"),
                            this.Ih(a.monitor.xhrMonitor))
                        }
                        ;
                        c.prototype.stopCorrelatingXhrs = function() {
                            a.conf.spa2 || (a.monitor.xhrMonitor.set("parent", null),
                            a.logInfo("M249"))
                        }
                        ;
                        c.prototype.pe = function() {
                            a.conf.spa2 || (a.logInfo("M250"),
                            this.Ih(a.monitor.fa))
                        }
                        ;
                        c.prototype.start = function() {
                            a.conf.spa2 || (this.markVirtualPageStart(),
                            this.startCorrelatingXhrs())
                        }
                        ;
                        c.prototype.end = function() {
                            a.conf.spa2 || (this.markVirtualPageEnd(),
                            this.stopCorrelatingXhrs())
                        }
                        ;
                        return c
                    }(b.EventTracker);
                    b.VPageView = m;
                    b.Za(b.V[a.EventType.VPageView], m.prototype);
                    b.qf(b.metricSpec[a.EventType.VPageView], m.prototype)
                }
                )(a.events || (a.events = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.ng || (a.ng = {})
                  , b = b.conf || (b.conf = {});
                b.disabled = a.conf.userConf && a.conf.userConf.spa && a.conf.userConf.spa.angular && a.conf.userConf.spa.angular.disable;
                b.distinguishVPwithItsTemplateUrl = a.conf.userConf && a.conf.userConf.spa && a.conf.userConf.spa.angular && !0 === a.conf.userConf.spa.angular.distinguishVPwithItsTemplateUrl ? !0 : !1;
                b.xhr = {};
                b.metrics = {
                    includeResTimingInEndUserResponseTiming: !0
                };
                a.conf.userConf && a.conf.userConf.spa && a.conf.userConf.spa.angular && a.conf.userConf.spa.angular.vp && (a.conf.userConf.spa.angular.vp.xhr && a.utils.Fa.bh(a.conf.userConf.spa.angular.vp.xhr),
                a.conf.userConf.spa.angular.vp.metrics && a.utils.mergeJSON(b.metrics, a.conf.userConf.spa.angular.vp.metrics))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.map
                      , e = a.utils.reduce
                      , c = a.utils.filter
                      , k = function(k) {
                        function f(b) {
                            b = k.call(this, b) || this;
                            b.xg = !0;
                            b.Nb = {};
                            b.ob = 0;
                            b.dq = [];
                            b.digestCount(0);
                            if (b.constructor != f)
                                return a.reportAPIMessage(a.Y.ua, a.pb, "ADRUM.events.Ajax", []),
                                b;
                            b.stopCorrelatingXhrs();
                            return b
                        }
                        v(f, k);
                        f.prototype.type = function() {
                            return a.EventType.VPageView
                        }
                        ;
                        f.prototype.Ce = function() {
                            this.markViewChangeStart();
                            this.markVirtualPageStart(this.getViewChangeStart());
                            this.timestamp(this.getViewChangeStart())
                        }
                        ;
                        f.prototype.Cl = function() {
                            this.digestCount(this.digestCount() + 1)
                        }
                        ;
                        f.prototype.Dl = function() {
                            this.ob++;
                            a.logInfo("M251", this.ob)
                        }
                        ;
                        f.prototype.tk = function() {
                            this.ob--;
                            a.logInfo("M252", this.ob)
                        }
                        ;
                        f.prototype.xl = function() {
                            var b = this.perf.getEntryByName(a.events.g.fi);
                            a.logInfo("M253", this.ob, b);
                            return 0 < this.ob
                        }
                        ;
                        f.prototype.dk = function() {
                            var a = {
                                Oc: 0
                            }, b = document.querySelectorAll("ng-view, [ng-view], .ng-view, [ui-view]"), b = m(b, angular.element), c;
                            for (c in f.rh) {
                                var k = f.rh[c];
                                m(b, function(b) {
                                    b = b.find(c);
                                    m(b, function(b) {
                                        if (b = b[k])
                                            b = decodeURIComponent(b),
                                            a[b] || (a[b] = c,
                                            a.Oc++)
                                    })
                                })
                            }
                            this.Nb = a
                        }
                        ;
                        f.prototype.$j = function(a) {
                            return !!this.Nb[decodeURIComponent(a.name)]
                        }
                        ;
                        f.prototype.ek = function() {
                            var b = []
                              , c = this;
                            0 < this.Nb.Oc && (b = a.monitor.resourceMonitor.Fb().filter(function(a) {
                                return c.$j(a)
                            }));
                            this.resTiming(b)
                        }
                        ;
                        f.Kk = function(b) {
                            return c(b, function(b) {
                                return (b.eventType === a.EventType.Ajax || b.eventType === a.EventType.ADRUM_XHR) && !a.utils.Fa.Mc(b.eventUrl, b.method)
                            })
                        }
                        ;
                        f.fl = function(a) {
                            return e(a, function(a, b) {
                                return Math.max(a, b.timestamp + b.metrics.PLT)
                            }, -1)
                        }
                        ;
                        f.prototype.Oj = function() {
                            if (b.conf.xhr) {
                                var c = f.Kk(a.channel.getEventsWithParentGUID(this.guid()))
                                  , c = f.fl(c);
                                if (0 < c) {
                                    var k = this.perf.getEntryByName(a.events.g.fi);
                                    this.markXhrRequestsCompleted(Math.min(k && k.startTime || Number.MAX_VALUE, c))
                                }
                            }
                        }
                        ;
                        f.prototype.adjustTimings = function() {
                            this.Oj();
                            var c = this.getViewDOMLoaded()
                              , f = this.getXhrRequestsCompleted()
                              , c = Math.max(c, f);
                            b.conf.metrics.includeResTimingInEndUserResponseTiming && (this.Nj(),
                            f = this.getViewResourcesLoaded(),
                            f = Math.max(c, f),
                            a.logInfo("M254", c, f),
                            c = f);
                            this.markVirtualPageEnd(c)
                        }
                        ;
                        f.prototype.Nj = function() {
                            if (0 < this.Nb.Oc) {
                                this.ek();
                                var b = this.resTiming();
                                b && b.length >= this.Nb.Oc && (b = e(b, function(a, b) {
                                    return Math.max(a, b.responseEnd)
                                }, 0),
                                this.markViewResourcesLoaded(a.PerformanceTracker.nd(b)))
                            }
                        }
                        ;
                        f.prototype.identifier = function(b) {
                            var c = this.$h;
                            a.utils.isDefined(b) && (this.$h = f.Ik(b),
                            this.url(this.$h.url));
                            return c
                        }
                        ;
                        f.Ik = function(b) {
                            var c = {};
                            b && b.Q ? (c.Q = {
                                de: ""
                            },
                            a.utils.mergeJSON(c.Q, {
                                de: b.Q.originalPath,
                                Ob: b.Q.template,
                                Pb: b.Q.templateUrl
                            })) : b && b.state && (c.state = {
                                url: ""
                            },
                            a.utils.mergeJSON(c.state, {
                                url: b.state.url,
                                name: b.state.name,
                                Ob: b.state.template,
                                Pb: b.state.templateUrl
                            }));
                            return c
                        }
                        ;
                        return f
                    }(a.events.VPageView);
                    k.rh = {
                        img: "src",
                        script: "src",
                        link: "href"
                    };
                    b.NgVPageView = k;
                    a.events.Za(a.events.V[a.EventType.NG_VIRTUAL_PAGE], k.prototype)
                }
                )(a.ng || (a.ng = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.D = new b.NgVPageView
                        }
                        e.prototype.wn = function() {
                            var c = this
                              , k = this.D;
                            b.conf.metrics.includeResTimingInEndUserResponseTiming ? (a.logInfo("M255"),
                            a.utils.oSTO(function() {
                                c.he(k)
                            }, e.xj)) : a.utils.oSTO(function() {
                                c.he(k)
                            }, e.yj)
                        }
                        ;
                        e.prototype.he = function(b) {
                            a.logInfo("M256");
                            b.parent(a.monitor.DOMEventsMonitor.currentBasePage);
                            a.command("call", function() {
                                b.adjustTimings();
                                a.reporter.reportEvent(b)
                            })
                        }
                        ;
                        e.prototype.Fn = function(a) {
                            this.D = a
                        }
                        ;
                        return e
                    }();
                    m.xj = 5E3;
                    m.yj = 2 * a.monitor.XHRMonitor.Ke;
                    b.VirtualPageStateMachine = m;
                    a.ef.create({
                        events: [{
                            name: "start",
                            from: "none",
                            to: "ChangeView"
                        }, {
                            name: "viewLoaded",
                            from: "ChangeView",
                            to: "XhrPending"
                        }, {
                            name: "xhrCompleted",
                            from: "XhrPending",
                            to: "End"
                        }, {
                            name: "abort",
                            from: "*",
                            to: "none"
                        }, {
                            name: "init",
                            from: "*",
                            to: "none"
                        }, {
                            name: "locChange",
                            from: "*",
                            to: "*"
                        }, {
                            name: "beforeXhrReq",
                            from: "*",
                            to: "*"
                        }, {
                            name: "afterXhrReq",
                            from: "*",
                            to: "*"
                        }],
                        error: function(b) {
                            a.logError("M257", b)
                        },
                        callbacks: {
                            onChangeView: function() {
                                this.D.Ce();
                                this.D.pe()
                            },
                            onviewLoaded: function() {
                                this.D.markViewDOMLoaded()
                            },
                            onXhrPending: function() {
                                this.D.xg && this.xhrCompleted()
                            },
                            onleaveXhrPending: function(a, b, k) {
                                if ("abort" === a)
                                    return this.he(),
                                    !0;
                                if ("xhrCompleted" === a && "End" === k) {
                                    if (this.D.xl())
                                        return !1;
                                    this.D.markXhrRequestsCompleted();
                                    return !0
                                }
                            },
                            onEnd: function() {
                                this.D.dk();
                                this.wn()
                            },
                            oninit: function(b, c, k, l) {
                                this.Fn(l);
                                a.monitor.xhrMonitor.Ic();
                                a.monitor.Db.Ic()
                            },
                            onlocChange: function(a, b, k, l) {
                                this.D.identifier.url = l;
                                this.D.Lc({
                                    url: l
                                })
                            },
                            onbeforeXhrReq: function(b, c, k, l) {
                                var f = this.D;
                                f.xg = !1;
                                a.logInfo("M258", l && l[1] || "", f.guid());
                                f.Dl();
                                f.startCorrelatingXhrs();
                                l[3] && (l[3] = a.aop.before(l[3], function(b, c, k) {
                                    a.logInfo("M259");
                                    f.tk();
                                    k && (b = a.utils.Xm(k)["content-type"]) && 0 <= b.indexOf("text/html") && f.markViewFragmentsLoaded()
                                }));
                                return l
                            },
                            onafterXhrReq: function() {
                                this.D.stopCorrelatingXhrs()
                            }
                        }
                    }, m.prototype)
                }
                )(a.ng || (a.ng = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = function() {
                        function e() {
                            this.R = new b.VirtualPageStateMachine;
                            this.distinguishVPwithItsTemplateUrl = a.ng.conf.distinguishVPwithItsTemplateUrl
                        }
                        e.prototype.U = function(c, k) {
                            a.logInfo("M260", c);
                            switch (c) {
                            case b.l.uh:
                            case b.l.Jh:
                                this.R.start();
                                var l = k.next.url || document.URL
                                  , f = new b.NgVPageView({
                                    url: l,
                                    identifier: k.next
                                });
                                this.distinguishVPwithItsTemplateUrl && e.Zl(this.R.D, f) ? this.R.D.Lc({
                                    url: l,
                                    identifier: k.next
                                }) : this.Tn(f);
                                break;
                            case b.l.vh:
                            case b.l.Kh:
                                this.R.D.markViewChangeEnd();
                                break;
                            case b.l.Yh:
                                this.R.viewLoaded();
                                break;
                            case b.l.vf:
                                this.R.beforeXhrReq(k);
                                break;
                            case b.l.mf:
                                this.R.afterXhrReq();
                                break;
                            case b.l.zf:
                                this.R.xhrCompleted();
                                break;
                            case b.l.Gg:
                                this.R.D.Lc({
                                    url: k.next.url
                                });
                                this.R.locChange(k.next.url);
                                break;
                            case b.l.Hf:
                                this.R.D.Cl()
                            }
                        }
                        ;
                        e.prototype.Tn = function(a) {
                            this.R.abort();
                            this.R.init(a);
                            this.R.start()
                        }
                        ;
                        e.Zl = function(b, k) {
                            var l = b.identifier()
                              , f = k.identifier()
                              , n = !1;
                            return n = !a.utils.isDefined(l) && !a.utils.isDefined(f) || l === f ? !0 : a.utils.isDefined(l) && a.utils.isDefined(f) ? l.state || f.state ? a.utils.isDefined(l.state) && a.utils.isDefined(f.state) ? l.state.name === f.state.name && l.state.Ob === f.state.Ob && l.state.Pb === f.state.Pb && l.state.url === f.state.url : !1 : l.Q && f.Q ? l.Q.de === f.Q.de && l.Q.Ob === f.Q.Ob && l.Q.Pb === f.Q.Pb : l.url === f.url : !1
                        }
                        ;
                        return e
                    }();
                    b.Aj = m
                }
                )(a.ng || (a.ng = {}))
            }
            )(h || (h = {}));
            (function(a) {
                (function(b) {
                    var m = a.utils.addEventListener
                      , e = function() {
                        function c() {
                            this.W = new b.Aj;
                            this.pg = !1
                        }
                        c.prototype.setUp = function() {
                            function b(f) {
                                return function() {
                                    a.logInfo(f);
                                    c.init()
                                }
                            }
                            var c = this;
                            b("M261")();
                            m(document, "DOMContentLoaded", b("M262"));
                            m(window, "load", b("M263"))
                        }
                        ;
                        c.prototype.init = function() {
                            if ("loading" === document.readyState)
                                a.logInfo("M264");
                            else if ("undefined" != typeof angular && !this.pg) {
                                this.pg = !0;
                                a.logInfo("M265");
                                var b = this
                                  , c = angular.module("ng");
                                c.config(["$provide", function(a) {
                                    b.Sl(a);
                                    b.Nl(a)
                                }
                                ]);
                                c.run(["$browser", function(a) {
                                    b.Kl(a)
                                }
                                ]);
                                a.logInfo("M266")
                            }
                        }
                        ;
                        c.prototype.Nl = function(c) {
                            var l = a.aop
                              , f = this;
                            c.decorator("$httpBackend", ["$delegate", function(a) {
                                return a = l.around(a, function() {
                                    var a = Array.prototype.slice.call(arguments);
                                    f.W.U(b.l.vf, a);
                                    return a
                                }, function() {
                                    f.W.U(b.l.mf)
                                }, "ng.httpBackend")
                            }
                            ])
                        }
                        ;
                        c.prototype.Sl = function(c) {
                            var l = a.aop
                              , f = this;
                            c.decorator("$rootScope", ["$delegate", function(a) {
                                a.$digest = l.after(a.$digest, function() {
                                    f.W.U(b.l.Hf)
                                }, "ngevents.digest");
                                a.$on("$locationChangeStart", function(a, c) {
                                    var k = {
                                        url: c
                                    }
                                      , l = a && a.Ab && a.Ab.$state && a.Ab.$state.current;
                                    l && (k.state = l);
                                    f.W.U(b.l.Gg, {
                                        next: k
                                    })
                                });
                                a.$on("$locationChangeSuccess", function() {
                                    f.W.U(b.l.Am)
                                });
                                a.$on("$routeChangeStart", function(a, c) {
                                    var k = {
                                        url: location.href
                                    }
                                      , l = c && c.$$route;
                                    l && (k.Q = l);
                                    f.W.U(b.l.uh, {
                                        next: k
                                    })
                                });
                                a.$on("$routeChangeSuccess", function() {
                                    f.W.U(b.l.vh)
                                });
                                a.$on("$stateChangeStart", function(a, c) {
                                    f.W.U(b.l.Jh, {
                                        next: {
                                            state: c
                                        }
                                    })
                                });
                                a.$on("$stateChangeSuccess", function() {
                                    f.W.U(b.l.Kh)
                                });
                                a.$on("$viewContentLoaded", function(a) {
                                    var c = {
                                        url: location.href
                                    };
                                    if (a = a && a.Ab && a.Ab.$state && a.Ab.$state.current)
                                        c.state = a;
                                    f.W.U(b.l.Yh, {
                                        next: c
                                    })
                                });
                                a.$on("$includeContentRequested", function() {
                                    f.W.U(b.l.Bl)
                                });
                                a.$on("$includeContentLoaded", function() {
                                    f.W.U(b.l.Al)
                                });
                                return a
                            }
                            ])
                        }
                        ;
                        c.prototype.Kl = function(c) {
                            var l = this;
                            c.$$completeOutstandingRequest = a.aop.before(c.$$completeOutstandingRequest, function() {
                                l.W.U(b.l.zf)
                            })
                        }
                        ;
                        return c
                    }();
                    b.Io = e;
                    b.ngMonitor = new e
                }
                )(a.ng || (a.ng = {}))
            }
            )(h || (h = {}));
            (function(a) {
                var b = a.ng || (a.ng = {});
                b.conf.disabled || a.conf.spa2 || a.monitor.setUpMonitors(b.ngMonitor)
            }
            )(h || (h = {}))
        }
    }
    ;
}
)();


/** END: AppDynamics adrum.js **/


/** START: Accertify **/

(function () {
    const CONFIG = {
        DATA_COLLECTOR_URL: "/di/swadc/cdn/cs/pXS4eU1UtrsWT1A6lR5H5EQACPk.js",
        INTERCEPT_ENDPOINTS: [
            "/account/",
            "/accounts/",
            "api/security",
            "api/loyalty-management",
            "api/travel-funds/",
            "enroll",
            "loyalty-quick-enroll",
            "transfer-fund",
            "gift-card-confirmation",
            "calculate-funds",
            "login",
            "password",
            "security-questions-secure",
            "contact-details-secure"
        ],
        INTERCEPT_IGNORE_ENDPOINTS: [
            "/bundled-wifi"
        ],
        INTERCEPT_GET_ENDPOINTS: [
            "checkAvailability",
            "resetPassQuestions"
        ],
        INTERCEPT_FORM_POST: [
            "/flight/login",
            "/flight/account",
            "/account/setup",
            "/account/enroll",
            "changeEmail",
            "changeEmailSecQuestion",
            "needUsername",
            "answerSecurityUsername",
            "answerSecurityChangeEmail",
            "recovery",
            "enroll-member",
            "enroll-from-swabiz",
            "resetPassQuestions",
            "checkAvailability",
            "SecurityZip",
            "selectAccount",
            "SecurityDoB"
        ],
        MAX_EVENT_SIZE: 10000,
        SWA_TID_STORAGE_KEY: 'SWA_TID'
    };

    function loadDataCollector() {
        try {
            const script = document.createElement( 'script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', CONFIG.DATA_COLLECTOR_URL);
            script.setAttribute('dvct', '500');
            script.setAttribute('id', 'bcn');
            script.setAttribute('dvc', 'l');

            script.onload = function () {
                if (!sessionStorage.getItem(CONFIG.SWA_TID_STORAGE_KEY)) {
                    if(window.hasOwnProperty('_bcn') && window._bcn.hasOwnProperty('dvc')) {
                        const args = {};
                        args.callback = function(){window._bcn.dvc.submit(registeredCallBackMethod)};
                        window._bcn.dvc.collect(args);
                    }
                }
            }

            document.head.appendChild(script);

        } catch (err) { }
    }

    function registeredCallBackMethod() {
        try {
            if (window.hasOwnProperty('_bcn') && window._bcn.hasOwnProperty('dvc')) {
                const transactionId = window._bcn.dvc?.getTID();

                sessionStorage.setItem(CONFIG.SWA_TID_STORAGE_KEY, transactionId);
            }
        } catch (err) { }
    }

    function getDeviceTransactionId() {
        return sessionStorage.getItem(CONFIG.SWA_TID_STORAGE_KEY);
    }


    function collectEvents() {
        try {
            const events = window?._bcn?.getEvents();

            return events?.length < CONFIG.MAX_EVENT_SIZE ? events : '';
        } catch (err) { }
    }

    function interceptXHR() {
        try {
            const oldXHROpen = XMLHttpRequest.prototype.open;

            XMLHttpRequest.prototype.open = function (method, url) {
                oldXHROpen.apply(this, arguments);

                if (shouldInterceptCurrentApi(method, url)) {
                    this.setRequestHeader('x-swa-di-uid', window?._bcn?.getToken());
                    this.setRequestHeader('x-swa-di-usid', window?._bcn?.getUbaSessionId());
                    this.setRequestHeader('x-swa-di-pid', window?._bcn?.getPageId());
                    this.setRequestHeader('x-swa-di-dtid', getDeviceTransactionId());
                    this.setRequestHeader('x-swa-di-ue', collectEvents());
                }
            }
        } catch (err) { }
    }

    function interceptFetch() {
        try {
            const originalFetch = window.fetch;

            window.fetch = function (url, options = {}) {
                options.headers = options.headers || {};

                if (shouldInterceptCurrentApi(options?.method, url)) {
                    options.headers['x-swa-di-uid'] = window?._bcn?.getToken();
                    options.headers['x-swa-di-usid'] = window?._bcn?.getUbaSessionId();
                    options.headers['x-swa-di-pid'] = window?._bcn?.getPageId();
                    options.headers['x-swa-di-dtid'] = getDeviceTransactionId();
                    options.headers['x-swa-di-ue'] = collectEvents();
                }

                return originalFetch(url, options);
            };
        } catch (err) { }
    }

    function interceptFormPOST() {
        try {
            if (shouldInterceptFormPost()) {
                document.addEventListener('DOMContentLoaded', function () {
                    var forms = document.getElementsByTagName('form');
                    for (var i = 0; i < forms.length; i++) {
                        forms[i].addEventListener('submit', function (event) {
                            if (event.target.method.toLowerCase() === 'post') {
                                if (window.hasOwnProperty('_bcn')) {
                                    window._bcn.flush();
                                }
                                this.appendChild(createInputElement('x-swa-di-uid', window?._bcn?.getToken()));
                                this.appendChild(createInputElement('x-swa-di-usid', window?._bcn?.getUbaSessionId()));
                                this.appendChild(createInputElement('x-swa-di-pid', window?._bcn?.getPageId()));
                                this.appendChild(createInputElement('x-swa-di-dtid', getDeviceTransactionId()));
                                this.appendChild(createInputElement('x-swa-di-ue', collectEvents()));
                            }
                        });
                    }
                });
            }
        } catch (err) { }
    }

    function createInputElement(paramName, paramValue) {
        if (document.getElementsByName(paramName)?.length === 0 ) {
            const element = document.createElement('input');

            element.setAttribute('type', 'hidden');
            element.setAttribute('name', paramName);
            element.setAttribute('value', paramValue);

            return element;
        }
    }

    function shouldInterceptCurrentApi(method, currentApiUrl) {
        try {
            return (
                method?.toLowerCase() !== 'get'
                && CONFIG.INTERCEPT_ENDPOINTS.some(endpoint => currentApiUrl.includes(endpoint))
                && !CONFIG.INTERCEPT_IGNORE_ENDPOINTS.some(endpoint => currentApiUrl.includes(endpoint))
            ) || (
                method?.toLowerCase() === 'get' && CONFIG.INTERCEPT_GET_ENDPOINTS.some(endpoint => currentApiUrl.includes(endpoint))
            );
        } catch (err) { }
    }

    function shouldInterceptFormPost() {
        try {
            const currentPageUrl = window.location.href.split("?")[0];

            return CONFIG.INTERCEPT_FORM_POST.some(pageUrl => currentPageUrl.includes(pageUrl));
        } catch (err) { }
    }

    function init() {
        try {
            loadDataCollector();
            interceptXHR();
            interceptFetch();
            interceptFormPOST();
        } catch (err) { }
    }

    init();
})();

/** END: Accertify  **/
