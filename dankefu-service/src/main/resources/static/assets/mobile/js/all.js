function __find(a) {
    return -1 !== _userAgent.indexOf(a)
}

!function (a) {
    function b(a, b) {
        this.idx = 0, this.$ele = a, this.setOpts = b, this.timer = null, this.$widthorheight = b.vertical ? a.height() : a.width(), this.effect = this.EFFECT[b.effect] || null, this.generate(b), this.readyCss()
    }

    a.fn.advs = function (c) {
        return a.fn.advs.defaults = a.extend({}, {
            advs: [],
            vertical: !1,
            button: !0,
            auto: !0,
            effect: "scroll",
            onMouse: "mouseover",
            delay: 5e3
        }), this.each(function () {
            var d = c ? a.extend(a.fn.advs.defaults, c) : a.fn.advs.defaults, e = new b(a(this), d);
            d.auto && e.auto()
        }), this
    }, b.prototype = {
        generate: function (b) {
            if (b.advs.length) {
                var c = this, d = this.$ele, e = a("<ul></ul>").appendTo(d), f = {height: d.height(), width: d.width()};
                a("<span class='adv-close'>广告 X</span>").css({
                    position: "absolute",
                    right: "0",
                    top: "0",
                    color: "#fff",
                    padding: "2px",
                    background: "rgba(0,0,0,0.6)",
                    textAlign: "center",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    zIndex: 3,
                    cursor: "pointer"
                }).on("click touchstart", function () {
                    clearInterval(c.timer), d.remove(), b.events.close && b.events.close(c.idx)
                }).appendTo(d), b.vertical ? e.css({width: this.$ele.width()}) : e.css({width: "5000px"}), a.each(b.advs, function (b, c) {
                    f.background = "url(" + c.url + ") no-repeat", f.backgroundSize = "100% 100%", a("<li>" + (b + 1) + "</li>").css(f).appendTo(e)
                }), this.$lis = d.find("ul li"), d.delegate("ul li", "click touchstart", function () {
                    b.events.click && b.events.click(a(this).index())
                }), b.button && (a.each(this.$lis, function (b) {
                    a("<li>" + (b + 1) + "</li>").appendTo(a("<ol></ol>").appendTo(d))
                }), this.$buttons = d.find("ol li"), this.$buttons.eq(0).attr("class", "on"), d.delegate("ol li", this.setOpts.onMouse, function () {
                    c.$ul.is(":animated") || c.start(a(this).index()), c.stop()
                }).delegate("ol li", "mouseout", function () {
                    c.auto()
                }))
            }
        }, readyCss: function () {
            var a = this.$ele;
            switch (this.setOpts.effect) {
                case"scroll":
                    this.fly = this.setOpts.vertical ? "top" : "left", this.css = {}, this.$ul = a.find("ul"), a.find("ul").css({
                        position: "absolute",
                        left: 0,
                        top: 0
                    }).find("li").css({"float": this.setOpts.vertical ? "none" : ""});
                    break;
                case"flip":
                case"fade":
                    this.$lis.css({position: "absolute", left: 0, top: 0, "float": "none"}).eq(0).css("zIndex", "2");
                    break;
                case"in":
                    this.$lis.css({display: "none"}).eq(0).css("display", "block")
            }
        }, start: function (a) {
            this.idx = a, this.idx != this.from && (this.effect(this), this.reset())
        }, EFFECT: {
            scroll: function (a) {
                a.css[a.fly] = -(a.idx * this.$widthorheight), a.$ul.stop(!0, !1).animate(a.css)
            }, fade: function (a) {
            }, flip: function (a) {
            }, "in": function (a) {
            }
        }, reset: function () {
            this.setOpts.button && this.$buttons.eq(this.from || 0).attr("class", ""), this.setOpts.button && this.$buttons.eq(this.idx).attr("class", "on"), this.from = this.idx || 0
        }, stop: function () {
            clearInterval(this.timer)
        }, auto: function () {
            var b = this.$lis.length;
            this.timer = setInterval(a.proxy(function () {
                this.idx = this.idx >= b - 1 ? 0 : ++this.idx, this.start(this.idx)
            }, this), this.setOpts.delay)
        }
    }
}(jQuery), !function (a, b) {
    function c() {
        var b = f.getBoundingClientRect().width;
        b / i > 540 && (b = 540 * i);
        var c = b / 10;
        f.style.fontSize = c + "px", k.rem = a.rem = c
    }

    var d, e = a.document, f = e.documentElement, g = e.querySelector('meta[name="viewport"]'),
        h = e.querySelector('meta[name="flexible"]'), i = 0, j = 0, k = b.flexible || (b.flexible = {});
    if (g) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        l && (j = parseFloat(l[1]), i = parseInt(1 / j))
    } else if (h) {
        var m = h.getAttribute("content");
        if (m) {
            var n = m.match(/initial\-dpr=([\d\.]+)/), o = m.match(/maximum\-dpr=([\d\.]+)/);
            n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
        }
    }
    if (!i && !j) {
        var p = a.navigator.userAgent, q = (!!p.match(/android/gi), !!p.match(/iphone/gi)),
            r = q && !!p.match(/OS 9_3/), s = a.devicePixelRatio;
        i = q && !r ? s >= 3 && (!i || i >= 3) ? 3 : s >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i
    }
    if (f.setAttribute("data-dpr", i), !g) if (g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g); else {
        var t = e.createElement("div");
        t.appendChild(g), e.write(t.innerHTML)
    }
    a.addEventListener("resize", function () {
        clearTimeout(d), d = setTimeout(c, 300)
    }, !1), a.addEventListener("pageshow", function (a) {
        a.persisted && (clearTimeout(d), d = setTimeout(c, 300))
    }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function () {
        e.body.style.fontSize = 12 * i + "px"
    }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function (a) {
        var b = parseFloat(a) * this.rem;
        return "string" == typeof a && a.match(/rem$/) && (b += "px"), b
    }, k.px2rem = function (a) {
        var b = parseFloat(a) / this.rem;
        return "string" == typeof a && a.match(/px$/) && (b += "rem"), b
    }
}(window, window.lib || (window.lib = {})), function (a) {
    function b(b) {
        var c = a(b), d = c.clone(!0).val("");
        c.after(d), c.remove()
    }

    function c(b) {
        var c = f.options, d = b[0].files[0], e = new FormData;
        for (key in c.params) e.append(key, c.params[key]);
        var g = b.attr("name");
        "" != g && void 0 != g || (g = "file"), e.append(g, d), a.ajax({
            url: c.url,
            type: "POST",
            data: e,
            async: !0,
            cache: !1,
            contentType: !1,
            processData: !1,
            success: c.onComplate,
            error: c.onError
        })
    }

    function d(b) {
        var d = f.options;
        if ("" == d.url || null == d.url) return void alert("无上传地址");
        if ("" == a(b).val() || null == a(b).val()) return void alert("请选择文件");
        if (window.FormData) console.log("h5Submit"), c(b); else {
            var g = a(b)[0].id.replace(/[^0-9]/gi, ""), h = "uploadframe_" + g,
                i = a('<iframe style="position:absolute;top:-9999px" ><script type="text/javascript"></script></iframe>').attr("name", h);
            i.attr("id", h), e = "form_" + g;
            var j = a('<form method="post" style="display:none;" enctype="multipart/form-data" />').attr("name", e);
            j.attr("id", e), j.attr("target", h).attr("action", d.url);
            var k = (a(b).prop("outerHTML"), "");
            for (key in d.params) k += '<input type="hidden" name="' + key + '" value="' + d.params[key] + '">';
            j.append(k), j.append(b), i.appendTo("body"), j.appendTo("body");
            var j = a("form[name=" + e + "]");
            a(document).on("load", "#" + h, function () {
                a("#" + e).remove(), a("#" + h).remove()
            });
            try {
                j.submit()
            } catch (l) {
                console.log(l)
            }
        }
    }

    var e = "", f = {};
    a.fn.upload = function (b) {
        return "string" == typeof b ? a.fn.upload.methods[b](this) : (b = b || {}, f = a.data(this, "upload"), void(f ? a.extend(f.options, b) : f = a.data(this, "upload", {options: a.extend({}, a.fn.upload.defaults, b)})))
    }, a.fn.upload.methods = {
        clean: function (a) {
            return a.each(function () {
                b(a)
            })
        }, ajaxSubmit: function (a) {
            return a.each(function () {
                d(a)
            })
        }, getFileVal: function (a) {
            return a.val()
        }
    }, a.fn.upload.defaults = a.extend({}, {
        url: "",
        dataType: "json",
        params: {},
        enterpriseId: "",
        onComplate: function (a) {
        },
        onError: function (a) {
        },
        onProgress: function (a) {
        }
    })
}(jQuery);
var _userAgent = window.navigator.userAgent.toLowerCase();
(function () {
    function a(a) {
        return a = String(a), a.charAt(0).toUpperCase() + a.slice(1)
    }

    function b(a, b, c) {
        var e = {
            "10.0": "10",
            6.4: "10 Technical Preview",
            6.3: "8.1",
            6.2: "8",
            6.1: "7 / Server 2008 R2",
            "6.0": "Vista / Server 2008",
            5.2: "XP 64-bit / Server 2003",
            5.1: "XP",
            5.01: "2000 SP1",
            "5.0": "2000",
            "4.0": "NT",
            "4.90": "ME"
        };
        return b && c && /^Win/i.test(a) && !/^Windows Phone /i.test(a) && (e = e[/[\d.]+$/.exec(a)]) && (a = "Windows " + e), a = String(a), b && c && (a = a.replace(RegExp(b, "i"), c)), a = d(a.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
    }

    function c(a, b) {
        var c = -1, d = a ? a.length : 0;
        if ("number" == typeof d && d > -1 && r >= d) for (; ++c < d;) b(a[c], c, a); else e(a, b)
    }

    function d(b) {
        return b = j(b), /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }

    function e(a, b) {
        for (var c in a) v.call(a, c) && b(a[c], c, a)
    }

    function f(b) {
        return null == b ? a(b) : w.call(b).slice(8, -1)
    }

    function g(a, b) {
        var c = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) && ("object" == c ? !!a[b] : !0)
    }

    function h(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }

    function i(a, b) {
        var d = null;
        return c(a, function (c, e) {
            d = b(d, c, e, a)
        }), d
    }

    function j(a) {
        return String(a).replace(/^ +| +$/g, "")
    }

    function k(a) {
        function c(b) {
            return i(b, function (b, c) {
                return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
            })
        }

        function l(b) {
            return i(b, function (b, c, d) {
                return b || (c[X] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(X)] || RegExp("\\b" + h(d) + "(?:\\b|\\w*\\d)", "i").exec(a)) && d
            })
        }

        function o(b) {
            return i(b, function (b, c) {
                return b || RegExp("\\b" + (c.pattern || h(c)) + "\\b", "i").exec(a) && (c.label || c)
            })
        }

        function p(c) {
            return i(c, function (c, d) {
                var e = d.pattern || h(d);
                return !c && (c = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a)) && (c = b(c, e, d.label || d)), c
            })
        }

        function q(b) {
            return i(b, function (b, c) {
                var e = c.pattern || h(c);
                return !b && (b = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((b = String(c.label && !RegExp(e, "i").test(c.label) ? c.label : b).split("/"))[1] && !/[\d.]+/.test(b[0]) && (b[0] += " " + b[1]), c = c.label || c, b = d(b[0].replace(RegExp(e, "i"), c).replace(RegExp("; *(?:" + c + "[_-])?", "i"), " ").replace(RegExp("(" + c + ")[-_.]?(\\w)", "i"), "$1 $2"))), b
            })
        }

        function r(b) {
            return i(b, function (b, c) {
                return b || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }

        function u() {
            return this.description || ""
        }

        var v = m, x = a && "object" == typeof a && "String" != f(a);
        x && (v = a, a = null);
        var y = v.navigator || {}, z = y.userAgent || "";
        a || (a = z);
        var A, B, C = x || t == n, D = x ? !!y.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(w.toString()),
            E = "Object", F = x ? E : "ScriptBridgingProxyObject", G = x ? E : "Environment",
            H = x && v.java ? "JavaPackage" : f(v.java), I = x ? E : "RuntimeObject", J = /\bJava/.test(H) && v.java,
            K = J && f(v.environment) == G, L = J ? "a" : "α", M = J ? "b" : "β", N = v.document || {},
            O = v.operamini || v.opera, P = s.test(P = x && O ? O["[[Class]]"] : f(O)) ? P : O = null, Q = a, R = [],
            S = null, T = a == z, U = T && O && "function" == typeof O.version && O.version(),
            V = c([{label: "EdgeHTML", pattern: "Edge"}, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            W = o(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "Edge"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
                label: "Silk",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Sleipnir", "SlimBrowser", {
                label: "SRWare Iron",
                pattern: "Iron"
            }, "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", {
                label: "Opera Mini",
                pattern: "OPiOS"
            }, "Opera", {label: "Opera", pattern: "OPR"}, "Chrome", {
                label: "Chrome Mobile",
                pattern: "(?:CriOS|CrMo)"
            }, {label: "Firefox", pattern: "(?:Firefox|Minefield)"}, {
                label: "Firefox Mobile",
                pattern: "FxiOS"
            }, {label: "IE", pattern: "IEMobile"}, {label: "IE", pattern: "MSIE"}, "Safari"]),
            X = q([{label: "BlackBerry", pattern: "BB10"}, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {label: "Galaxy S2", pattern: "GT-I9100"}, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation 3", "PlayStation 4", "PlayStation Vita", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {label: "Xbox 360", pattern: "Xbox"}, "Xoom"]), Y = l({
                Apple: {iPad: 1, iPhone: 1, iPod: 1},
                Amazon: {Kindle: 1, "Kindle Fire": 1},
                Asus: {Transformer: 1},
                "Barnes & Noble": {Nook: 1},
                BlackBerry: {PlayBook: 1},
                Google: {"Google TV": 1, Nexus: 1},
                HP: {TouchPad: 1},
                HTC: {},
                LG: {},
                Microsoft: {Xbox: 1, "Xbox One": 1},
                Motorola: {Xoom: 1},
                Nintendo: {"Wii U": 1, Wii: 1},
                Nokia: {Lumia: 1},
                Samsung: {"Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1},
                Sony: {"PlayStation 4": 1, "PlayStation 3": 1, "PlayStation Vita": 1}
            }), Z = p(["Windows Phone ", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (V && (V = [V]), Y && !X && (X = q([Y])), (A = /\bGoogle TV\b/.exec(X)) && (X = A[0]), /\bSimulator\b/i.test(a) && (X = (X ? X + " " : "") + "Simulator"), "Opera Mini" == W && /\bOPiOS\b/.test(a) && R.push("running in Turbo/Uncompressed mode"), /^iP/.test(X) ? (W || (W = "Safari"), Z = "iOS" + ((A = / OS ([\d_]+)/i.exec(a)) ? " " + A[1].replace(/_/g, ".") : "")) : "Konqueror" != W || /buntu/i.test(Z) ? Y && "Google" != Y && (/Chrome/.test(W) && !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(X)) ? (W = "Android Browser", Z = /\bAndroid\b/.test(Z) ? Z : "Android") : "Silk" == W ? (/\bMobi/i.test(a) || (Z = "Android", R.unshift("desktop mode")), /Accelerated *= *true/i.test(a) && R.unshift("accelerated")) : "PaleMoon" == W && (A = /\bFirefox\/([\d.]+)\b/.exec(a)) ? R.push("identifying as Firefox " + A[1]) : "Firefox" == W && (A = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (Z || (Z = "Firefox OS"), X || (X = A[1])) : W && !(A = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(W)) || (W && !X && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(A + "/") + 8)) && (W = null), (A = X || Y || Z) && (X || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(Z)) && (W = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(Z) ? Z : A) + " Browser")) : Z = "Kubuntu", U || (U = r(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", h(W), "(?:Firefox|Minefield|NetFront)"])), (A = "iCab" == V && parseFloat(U) > 3 && "WebKit" || /\bOpera\b/.test(W) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(V) && "WebKit" || !V && /\bMSIE\b/i.test(a) && ("Mac OS" == Z ? "Tasman" : "Trident") || "WebKit" == V && /\bPlayStation\b(?! Vita\b)/i.test(W) && "NetFront") && (V = [A]), "IE" == W && (A = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (W += " Mobile", Z = "Windows Phone " + (/\+$/.test(A) ? A : A + ".x"), R.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (W = "IE Mobile", Z = "Windows Phone 8.x", R.unshift("desktop mode"), U || (U = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != W && "Trident" == V && (A = /\brv:([\d.]+)/.exec(a)) && (W && R.push("identifying as " + W + (U ? " " + U : "")), W = "IE", U = A[1]), T) {
            if (g(v, "global")) if (J && (A = J.lang.System, Q = A.getProperty("os.arch"), Z = Z || A.getProperty("os.name") + " " + A.getProperty("os.version")), C && g(v, "system") && (A = [v.system])[0]) {
                Z || (Z = A[0].os || null);
                try {
                    A[1] = v.require("ringo/engine").version, U = A[1].join("."), W = "RingoJS"
                } catch ($) {
                    A[0].global.system == v.system && (W = "Narwhal")
                }
            } else "object" == typeof v.process && (A = v.process) ? (W = "Node.js", Q = A.arch, Z = A.platform, U = /[\d.]+/.exec(A.version)[0]) : K && (W = "Rhino"); else f(A = v.runtime) == F ? (W = "Adobe AIR", Z = A.flash.system.Capabilities.os) : f(A = v.phantom) == I ? (W = "PhantomJS", U = (A = A.version || null) && A.major + "." + A.minor + "." + A.patch) : "number" == typeof N.documentMode && (A = /\bTrident\/(\d+)/i.exec(a)) && (U = [U, N.documentMode], (A = +A[1] + 4) != U[1] && (R.push("IE " + U[1] + " mode"), V && (V[1] = ""), U[1] = A), U = "IE" == W ? String(U[1].toFixed(1)) : U[0]);
            Z = Z && d(Z)
        }
        U && (A = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(U) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (T && y.appMinorVersion)) || /\bMinefield\b/i.test(a) && "a") && (S = /b/i.test(A) ? "beta" : "alpha", U = U.replace(RegExp(A + "\\+?$"), "") + ("beta" == S ? M : L) + (/\d+\+?/.exec(A) || "")), "Fennec" == W || "Firefox" == W && /\b(?:Android|Firefox OS)\b/.test(Z) ? W = "Firefox Mobile" : "Maxthon" == W && U ? U = U.replace(/\.[\d.]+/, ".x") : /\bXbox\b/i.test(X) ? (Z = null, "Xbox 360" == X && /\bIEMobile\b/.test(a) && R.unshift("mobile mode")) : !/^(?:Chrome|IE|Opera)$/.test(W) && (!W || X || /Browser|Mobi/.test(W)) || "Windows CE" != Z && !/Mobi/i.test(a) ? "IE" == W && T && null === v.external ? R.unshift("platform preview") : (/\bBlackBerry\b/.test(X) || /\bBB10\b/.test(a)) && (A = (RegExp(X.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || U) ? (A = [A, /BB10/.test(a)], Z = (A[1] ? (X = null, Y = "BlackBerry") : "Device Software") + " " + A[0], U = null) : this != e && "Wii" != X && (T && O || /Opera/.test(W) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == W && /\bOS X (?:\d+\.){2,}/.test(Z) || "IE" == W && (Z && !/^Win/.test(Z) && U > 5.5 || /\bWindows XP\b/.test(Z) && U > 8 || 8 == U && !/\bTrident\b/.test(a))) && !s.test(A = k.call(e, a.replace(s, "") + ";")) && A.name && (A = "ing as " + A.name + ((A = A.version) ? " " + A : ""), s.test(W) ? (/\bIE\b/.test(A) && "Mac OS" == Z && (Z = null), A = "identify" + A) : (A = "mask" + A, W = P ? d(P.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(A) && (Z = null), T || (U = null)), V = ["Presto"], R.push(A)) : W += " Mobile", (A = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) && (A = [parseFloat(A.replace(/\.(\d)$/, ".0$1")), A], "Safari" == W && "+" == A[1].slice(-1) ? (W = "WebKit Nightly", S = "alpha", U = A[1].slice(0, -1)) : U != A[1] && U != (A[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1]) || (U = null), A[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1], 537.36 == A[0] && 537.36 == A[2] && parseFloat(A[1]) >= 28 && "WebKit" == V && (V = ["Blink"]), T && (D || A[1]) ? (V && (V[1] = "like Chrome"), A = A[1] || (A = A[0], 530 > A ? 1 : 532 > A ? 2 : 532.05 > A ? 3 : 533 > A ? 4 : 534.03 > A ? 5 : 534.07 > A ? 6 : 534.1 > A ? 7 : 534.13 > A ? 8 : 534.16 > A ? 9 : 534.24 > A ? 10 : 534.3 > A ? 11 : 535.01 > A ? 12 : 535.02 > A ? "13+" : 535.07 > A ? 15 : 535.11 > A ? 16 : 535.19 > A ? 17 : 536.05 > A ? 18 : 536.1 > A ? 19 : 537.01 > A ? 20 : 537.11 > A ? "21+" : 537.13 > A ? 23 : 537.18 > A ? 24 : 537.24 > A ? 25 : 537.36 > A ? 26 : "Blink" != V ? "27" : "28")) : (V && (V[1] = "like Safari"), A = A[0], A = 400 > A ? 1 : 500 > A ? 2 : 526 > A ? 3 : 533 > A ? 4 : 534 > A ? "4+" : 535 > A ? 5 : 537 > A ? 6 : 538 > A ? 7 : 601 > A ? 8 : "8"), V && (V[1] += " " + (A += "number" == typeof A ? ".x" : /[.+]/.test(A) ? "" : "+")), "Safari" == W && (!U || parseInt(U) > 45) && (U = A)), "Opera" == W && (A = /\bzbov|zvav$/.exec(Z)) ? (W += " ", R.unshift("desktop mode"), "zvav" == A ? (W += "Mini", U = null) : W += "Mobile", Z = Z.replace(RegExp(" *" + A + "$"), "")) : "Safari" == W && /\bChrome\b/.exec(V && V[1]) && (R.unshift("desktop mode"), W = "Chrome Mobile", U = null, /\bOS X\b/.test(Z) ? (Y = "Apple", Z = "iOS 4.3+") : Z = null), U && 0 == U.indexOf(A = /[\d.]+$/.exec(Z)) && a.indexOf("/" + A + "-") > -1 && (Z = j(Z.replace(A, ""))), V && !/\b(?:Avant|Nook)\b/.test(W) && (/Browser|Lunascape|Maxthon/.test(W) || "Safari" != W && /^iOS/.test(Z) && /\bSafari\b/.test(V[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(W) && V[1]) && (A = V[V.length - 1]) && R.push(A), R.length && (R = ["(" + R.join("; ") + ")"]), Y && X && X.indexOf(Y) < 0 && R.push("on " + Y), X && R.push((/^on /.test(R[R.length - 1]) ? "" : "on ") + X), Z && (A = / ([\d.+]+)$/.exec(Z) || (B = /^[a-z]+ ([\d.+]+) \//i.exec(Z)), Z = {
            architecture: 32,
            family: A && !B ? Z.replace(A[0], "") : Z,
            version: A ? A[1] : null,
            toString: function () {
                var a = this.version;
                return this.family + (a && !B ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }), (A = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Q)) && !/\bi686\b/i.test(Q) && (Z && (Z.architecture = 64, Z.family = Z.family.replace(RegExp(" *" + A), "")), W && (/\bWOW64\b/i.test(a) || T && /\w(?:86|32)$/.test(y.cpuClass || y.platform) && !/\bWin64; x64\b/i.test(a)) && R.unshift("32-bit")), a || (a = null);
        var _ = {};
        return _.description = a, _.layout = V && V[0], _.manufacturer = Y, _.name = W, _.prerelease = S, _.product = X, _.ua = a, _.version = W && U, _.os = Z || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null"
            }
        }, _.parse = k, _.toString = u, _.version && R.unshift(U), _.name && R.unshift(W), Z && W && (Z != String(Z).split(" ")[0] || Z != W.split(" ")[0] && !X) && R.push(X ? "(" + Z + ")" : "on " + Z), R.length && (_.description = R.join(" ")), _
    }

    var l = {"function": !0, object: !0}, m = l[typeof window] && window || this, n = m,
        o = l[typeof exports] && exports, p = l[typeof module] && module && !module.nodeType && module,
        q = o && p && "object" == typeof global && global;
    !q || q.global !== q && q.window !== q && q.self !== q || (m = q);
    var r = Math.pow(2, 53) - 1, s = /\bOpera/, t = this, u = Object.prototype, v = u.hasOwnProperty, w = u.toString;
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return k()
    }) : o && p ? e(k(), function (a, b) {
        o[b] = a
    }) : m.platform = k()
}).call(this), platform && (platform.table = function () {
    return __find("Windows NT 5.1") ? "Windows XP" : __find("Windows NT 6.0") ? "Windows Vista" : __find("Windows NT 6.1") ? "Windows 7" : __find("iphone") ? "iphone" : __find("android") ? "android" : __find("mac") ? "Mac" : "未知系统"
}, platform.otherBrowser = function () {
    return __find("micromessenger") ? "微信" : __find("360se") ? "360浏览器" : __find("lbbrowser") ? "猎豹浏览器" : __find("qqbrowser") ? "qq浏览器" : void 0
}), !function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.io = a()
    }
}(function () {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {exports: {}};
                a[g][0].call(j.exports, function (b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, j, j.exports, b, a, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            b.exports = a("./lib/")
        }, {"./lib/": 2}],
        2: [function (a, b, c) {
            function d(a, b) {
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var c, d = e(a), f = d.source, j = d.id;
                return b.forceNew || b["force new connection"] || !1 === b.multiplex ? (h("ignoring socket cache for %s", f), c = g(f, b)) : (i[j] || (h("new io instance for %s", f), i[j] = g(f, b)), c = i[j]), c.socket(d.path)
            }

            var e = a("./url"), f = a("socket.io-parser"), g = a("./manager"), h = a("debug")("socket.io-client");
            b.exports = c = d;
            var i = c.managers = {};
            c.protocol = f.protocol, c.connect = d, c.Manager = a("./manager"), c.Socket = a("./socket")
        }, {"./manager": 3, "./socket": 5, "./url": 6, debug: 10, "socket.io-parser": 44}],
        3: [function (a, b, c) {
            function d(a, b) {
                return this instanceof d ? (a && "object" == typeof a && (b = a, a = void 0), b = b || {}, b.path = b.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = b, this.reconnection(b.reconnection !== !1), this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0), this.reconnectionDelay(b.reconnectionDelay || 1e3), this.reconnectionDelayMax(b.reconnectionDelayMax || 5e3), this.randomizationFactor(b.randomizationFactor || .5), this.backoff = new m({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == b.timeout ? 2e4 : b.timeout), this.readyState = "closed", this.uri = a, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new h.Encoder, this.decoder = new h.Decoder, this.autoConnect = b.autoConnect !== !1, void(this.autoConnect && this.open())) : new d(a, b)
            }

            var e = (a("./url"), a("engine.io-client")), f = a("./socket"), g = a("component-emitter"),
                h = a("socket.io-parser"), i = a("./on"), j = a("component-bind"),
                k = (a("object-component"), a("debug")("socket.io-client:manager")), l = a("indexof"), m = a("backo2");
            b.exports = d, d.prototype.emitAll = function () {
                this.emit.apply(this, arguments);
                for (var a in this.nsps) this.nsps[a].emit.apply(this.nsps[a], arguments)
            }, d.prototype.updateSocketIds = function () {
                for (var a in this.nsps) this.nsps[a].id = this.engine.id
            }, g(d.prototype), d.prototype.reconnection = function (a) {
                return arguments.length ? (this._reconnection = !!a, this) : this._reconnection
            }, d.prototype.reconnectionAttempts = function (a) {
                return arguments.length ? (this._reconnectionAttempts = a, this) : this._reconnectionAttempts
            }, d.prototype.reconnectionDelay = function (a) {
                return arguments.length ? (this._reconnectionDelay = a, this.backoff && this.backoff.setMin(a), this) : this._reconnectionDelay
            }, d.prototype.randomizationFactor = function (a) {
                return arguments.length ? (this._randomizationFactor = a, this.backoff && this.backoff.setJitter(a), this) : this._randomizationFactor
            }, d.prototype.reconnectionDelayMax = function (a) {
                return arguments.length ? (this._reconnectionDelayMax = a, this.backoff && this.backoff.setMax(a), this) : this._reconnectionDelayMax
            }, d.prototype.timeout = function (a) {
                return arguments.length ? (this._timeout = a, this) : this._timeout
            }, d.prototype.maybeReconnectOnOpen = function () {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, d.prototype.open = d.prototype.connect = function (a) {
                if (k("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                k("opening %s", this.uri), this.engine = e(this.uri, this.opts);
                var b = this.engine, c = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var d = i(b, "open", function () {
                    c.onopen(), a && a()
                }), f = i(b, "error", function (b) {
                    if (k("connect_error"), c.cleanup(), c.readyState = "closed", c.emitAll("connect_error", b), a) {
                        var d = new Error("Connection error");
                        d.data = b, a(d)
                    } else c.maybeReconnectOnOpen()
                });
                if (!1 !== this._timeout) {
                    var g = this._timeout;
                    k("connect attempt will timeout after %d", g);
                    var h = setTimeout(function () {
                        k("connect attempt timed out after %d", g), d.destroy(), b.close(), b.emit("error", "timeout"), c.emitAll("connect_timeout", g)
                    }, g);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(h)
                        }
                    })
                }
                return this.subs.push(d), this.subs.push(f), this
            }, d.prototype.onopen = function () {
                k("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var a = this.engine;
                this.subs.push(i(a, "data", j(this, "ondata"))), this.subs.push(i(this.decoder, "decoded", j(this, "ondecoded"))), this.subs.push(i(a, "error", j(this, "onerror"))), this.subs.push(i(a, "close", j(this, "onclose")))
            }, d.prototype.ondata = function (a) {
                this.decoder.add(a)
            }, d.prototype.ondecoded = function (a) {
                this.emit("packet", a)
            }, d.prototype.onerror = function (a) {
                k("error", a), this.emitAll("error", a)
            }, d.prototype.socket = function (a) {
                var b = this.nsps[a];
                if (!b) {
                    b = new f(this, a), this.nsps[a] = b;
                    var c = this;
                    b.on("connect", function () {
                        b.id = c.engine.id, ~l(c.connected, b) || c.connected.push(b)
                    })
                }
                return b
            }, d.prototype.destroy = function (a) {
                var b = l(this.connected, a);
                ~b && this.connected.splice(b, 1), this.connected.length || this.close()
            }, d.prototype.packet = function (a) {
                k("writing packet %j", a);
                var b = this;
                b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0, this.encoder.encode(a, function (a) {
                    for (var c = 0; c < a.length; c++) b.engine.write(a[c]);
                    b.encoding = !1, b.processPacketQueue()
                }))
            }, d.prototype.processPacketQueue = function () {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var a = this.packetBuffer.shift();
                    this.packet(a)
                }
            }, d.prototype.cleanup = function () {
                for (var a; a = this.subs.shift();) a.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
            }, d.prototype.close = d.prototype.disconnect = function () {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, d.prototype.onclose = function (a) {
                k("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", a), this._reconnection && !this.skipReconnect && this.reconnect()
            }, d.prototype.reconnect = function () {
                if (this.reconnecting || this.skipReconnect) return this;
                var a = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) k("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                    var b = this.backoff.duration();
                    k("will wait %dms before reconnect attempt", b), this.reconnecting = !0;
                    var c = setTimeout(function () {
                        a.skipReconnect || (k("attempting reconnect"), a.emitAll("reconnect_attempt", a.backoff.attempts), a.emitAll("reconnecting", a.backoff.attempts), a.skipReconnect || a.open(function (b) {
                            b ? (k("reconnect attempt error"), a.reconnecting = !1, a.reconnect(), a.emitAll("reconnect_error", b.data)) : (k("reconnect success"), a.onreconnect())
                        }))
                    }, b);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(c)
                        }
                    })
                }
            }, d.prototype.onreconnect = function () {
                var a = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", a)
            }
        }, {
            "./on": 4,
            "./socket": 5,
            "./url": 6,
            backo2: 7,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "engine.io-client": 11,
            indexof: 40,
            "object-component": 41,
            "socket.io-parser": 44
        }],
        4: [function (a, b, c) {
            function d(a, b, c) {
                return a.on(b, c), {
                    destroy: function () {
                        a.removeListener(b, c)
                    }
                }
            }

            b.exports = d
        }, {}],
        5: [function (a, b, c) {
            function d(a, b) {
                this.io = a, this.nsp = b, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
            }

            var e = a("socket.io-parser"), f = a("component-emitter"), g = a("to-array"), h = a("./on"),
                i = a("component-bind"), j = a("debug")("socket.io-client:socket"), k = a("has-binary");
            b.exports = c = d;
            var l = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1
            }, m = f.prototype.emit;
            f(d.prototype), d.prototype.subEvents = function () {
                if (!this.subs) {
                    var a = this.io;
                    this.subs = [h(a, "open", i(this, "onopen")), h(a, "packet", i(this, "onpacket")), h(a, "close", i(this, "onclose"))]
                }
            }, d.prototype.open = d.prototype.connect = function () {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
            }, d.prototype.send = function () {
                var a = g(arguments);
                return a.unshift("message"), this.emit.apply(this, a), this
            }, d.prototype.emit = function (a) {
                if (l.hasOwnProperty(a)) return m.apply(this, arguments), this;
                var b = g(arguments), c = e.EVENT;
                k(b) && (c = e.BINARY_EVENT);
                var d = {type: c, data: b};
                return "function" == typeof b[b.length - 1] && (j("emitting packet with ack id %d", this.ids), this.acks[this.ids] = b.pop(), d.id = this.ids++), this.connected ? this.packet(d) : this.sendBuffer.push(d), this
            }, d.prototype.packet = function (a) {
                a.nsp = this.nsp, this.io.packet(a)
            }, d.prototype.onopen = function () {
                j("transport is open - connecting"), "/" != this.nsp && this.packet({type: e.CONNECT})
            }, d.prototype.onclose = function (a) {
                j("close (%s)", a), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", a)
            }, d.prototype.onpacket = function (a) {
                if (a.nsp == this.nsp) switch (a.type) {
                    case e.CONNECT:
                        this.onconnect();
                        break;
                    case e.EVENT:
                        this.onevent(a);
                        break;
                    case e.BINARY_EVENT:
                        this.onevent(a);
                        break;
                    case e.ACK:
                        this.onack(a);
                        break;
                    case e.BINARY_ACK:
                        this.onack(a);
                        break;
                    case e.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case e.ERROR:
                        this.emit("error", a.data)
                }
            }, d.prototype.onevent = function (a) {
                var b = a.data || [];
                j("emitting event %j", b), null != a.id && (j("attaching ack callback to event"), b.push(this.ack(a.id))), this.connected ? m.apply(this, b) : this.receiveBuffer.push(b)
            }, d.prototype.ack = function (a) {
                var b = this, c = !1;
                return function () {
                    if (!c) {
                        c = !0;
                        var d = g(arguments);
                        j("sending ack %j", d);
                        var f = k(d) ? e.BINARY_ACK : e.ACK;
                        b.packet({type: f, id: a, data: d})
                    }
                }
            }, d.prototype.onack = function (a) {
                j("calling ack %s with %j", a.id, a.data);
                var b = this.acks[a.id];
                b.apply(this, a.data), delete this.acks[a.id]
            }, d.prototype.onconnect = function () {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, d.prototype.emitBuffered = function () {
                var a;
                for (a = 0; a < this.receiveBuffer.length; a++) m.apply(this, this.receiveBuffer[a]);
                for (this.receiveBuffer = [], a = 0; a < this.sendBuffer.length; a++) this.packet(this.sendBuffer[a]);
                this.sendBuffer = []
            }, d.prototype.ondisconnect = function () {
                j("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, d.prototype.destroy = function () {
                if (this.subs) {
                    for (var a = 0; a < this.subs.length; a++) this.subs[a].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, d.prototype.close = d.prototype.disconnect = function () {
                return this.connected && (j("performing disconnect (%s)", this.nsp), this.packet({type: e.DISCONNECT})), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }
        }, {
            "./on": 4,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "has-binary": 36,
            "socket.io-parser": 44,
            "to-array": 48
        }],
        6: [function (a, b, c) {
            (function (c) {
                function d(a, b) {
                    var d = a, b = b || c.location;
                    return null == a && (a = b.protocol + "//" + b.host), "string" == typeof a && ("/" == a.charAt(0) && (a = "/" == a.charAt(1) ? b.protocol + a : b.hostname + a), /^(https?|wss?):\/\//.test(a) || (f("protocol-less url %s", a), a = "undefined" != typeof b ? b.protocol + "//" + a : "https://" + a), f("parse %s", a), d = e(a)), d.port || (/^(http|ws)$/.test(d.protocol) ? d.port = "80" : /^(http|ws)s$/.test(d.protocol) && (d.port = "443")), d.path = d.path || "/", d.id = d.protocol + "://" + d.host + ":" + d.port, d.href = d.protocol + "://" + d.host + (b && b.port == d.port ? "" : ":" + d.port), d
                }

                var e = a("parseuri"), f = a("debug")("socket.io-client:url");
                b.exports = d
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {debug: 10, parseuri: 42}],
        7: [function (a, b, c) {
            function d(a) {
                a = a || {}, this.ms = a.min || 100, this.max = a.max || 1e4, this.factor = a.factor || 2, this.jitter = a.jitter > 0 && a.jitter <= 1 ? a.jitter : 0, this.attempts = 0
            }

            b.exports = d, d.prototype.duration = function () {
                var a = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var b = Math.random(), c = Math.floor(b * this.jitter * a);
                    a = 0 == (1 & Math.floor(10 * b)) ? a - c : a + c
                }
                return 0 | Math.min(a, this.max)
            }, d.prototype.reset = function () {
                this.attempts = 0
            }, d.prototype.setMin = function (a) {
                this.ms = a
            }, d.prototype.setMax = function (a) {
                this.max = a
            }, d.prototype.setJitter = function (a) {
                this.jitter = a
            }
        }, {}],
        8: [function (a, b, c) {
            var d = [].slice;
            b.exports = function (a, b) {
                if ("string" == typeof b && (b = a[b]), "function" != typeof b) throw new Error("bind() requires a function");
                var c = d.call(arguments, 2);
                return function () {
                    return b.apply(a, c.concat(d.call(arguments)))
                }
            }
        }, {}],
        9: [function (a, b, c) {
            function d(a) {
                return a ? e(a) : void 0
            }

            function e(a) {
                for (var b in d.prototype) a[b] = d.prototype[b];
                return a
            }

            b.exports = d,
                d.prototype.on = d.prototype.addEventListener = function (a, b) {
                    return this._callbacks = this._callbacks || {}, (this._callbacks[a] = this._callbacks[a] || []).push(b), this
                }, d.prototype.once = function (a, b) {
                function c() {
                    d.off(a, c), b.apply(this, arguments)
                }

                var d = this;
                return this._callbacks = this._callbacks || {}, c.fn = b, this.on(a, c), this
            }, d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function (a, b) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var c = this._callbacks[a];
                if (!c) return this;
                if (1 == arguments.length) return delete this._callbacks[a], this;
                for (var d, e = 0; e < c.length; e++) if (d = c[e], d === b || d.fn === b) {
                    c.splice(e, 1);
                    break
                }
                return this
            }, d.prototype.emit = function (a) {
                this._callbacks = this._callbacks || {};
                var b = [].slice.call(arguments, 1), c = this._callbacks[a];
                if (c) {
                    c = c.slice(0);
                    for (var d = 0, e = c.length; e > d; ++d) c[d].apply(this, b)
                }
                return this
            }, d.prototype.listeners = function (a) {
                return this._callbacks = this._callbacks || {}, this._callbacks[a] || []
            }, d.prototype.hasListeners = function (a) {
                return !!this.listeners(a).length
            }
        }, {}],
        10: [function (a, b, c) {
            function d(a) {
                return d.enabled(a) ? function (b) {
                    b = e(b);
                    var c = new Date, f = c - (d[a] || c);
                    d[a] = c, b = a + " " + b + " +" + d.humanize(f), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                } : function () {
                }
            }

            function e(a) {
                return a instanceof Error ? a.stack || a.message : a
            }

            b.exports = d, d.names = [], d.skips = [], d.enable = function (a) {
                try {
                    localStorage.debug = a
                } catch (b) {
                }
                for (var c = (a || "").split(/[\s,]+/), e = c.length, f = 0; e > f; f++) a = c[f].replace("*", ".*?"), "-" === a[0] ? d.skips.push(new RegExp("^" + a.substr(1) + "$")) : d.names.push(new RegExp("^" + a + "$"))
            }, d.disable = function () {
                d.enable("")
            }, d.humanize = function (a) {
                var b = 1e3, c = 6e4, d = 60 * c;
                return a >= d ? (a / d).toFixed(1) + "h" : a >= c ? (a / c).toFixed(1) + "m" : a >= b ? (a / b | 0) + "s" : a + "ms"
            }, d.enabled = function (a) {
                for (var b = 0, c = d.skips.length; c > b; b++) if (d.skips[b].test(a)) return !1;
                for (var b = 0, c = d.names.length; c > b; b++) if (d.names[b].test(a)) return !0;
                return !1
            };
            try {
                window.localStorage && d.enable(localStorage.debug)
            } catch (f) {
            }
        }, {}],
        11: [function (a, b, c) {
            b.exports = a("./lib/")
        }, {"./lib/": 12}],
        12: [function (a, b, c) {
            b.exports = a("./socket"), b.exports.parser = a("engine.io-parser")
        }, {"./socket": 13, "engine.io-parser": 25}],
        13: [function (a, b, c) {
            (function (c) {
                function d(a, b) {
                    if (!(this instanceof d)) return new d(a, b);
                    if (b = b || {}, a && "object" == typeof a && (b = a, a = null), a && (a = k(a), b.host = a.host, b.secure = "https" == a.protocol || "wss" == a.protocol, b.port = a.port, a.query && (b.query = a.query)), this.secure = null != b.secure ? b.secure : c.location && "https:" == location.protocol, b.host) {
                        var e = b.host.split(":");
                        b.hostname = e.shift(), e.length ? b.port = e.pop() : b.port || (b.port = this.secure ? "443" : "80")
                    }
                    this.agent = b.agent || !1, this.hostname = b.hostname || (c.location ? location.hostname : "localhost"), this.port = b.port || (c.location && location.port ? location.port : this.secure ? 443 : 80), this.query = b.query || {}, "string" == typeof this.query && (this.query = m.decode(this.query)), this.upgrade = !1 !== b.upgrade, this.path = (b.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!b.forceJSONP, this.jsonp = !1 !== b.jsonp, this.forceBase64 = !!b.forceBase64, this.enablesXDR = !!b.enablesXDR, this.timestampParam = b.timestampParam || "t", this.timestampRequests = b.timestampRequests, this.transports = b.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = b.policyPort || 843, this.rememberUpgrade = b.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = b.onlyBinaryUpgrades, this.pfx = b.pfx || null, this.key = b.key || null, this.passphrase = b.passphrase || null, this.cert = b.cert || null, this.ca = b.ca || null, this.ciphers = b.ciphers || null, this.rejectUnauthorized = b.rejectUnauthorized || null, this.open()
                }

                function e(a) {
                    var b = {};
                    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                }

                var f = a("./transports"), g = a("component-emitter"), h = a("debug")("engine.io-client:socket"),
                    i = a("indexof"), j = a("engine.io-parser"), k = a("parseuri"), l = a("parsejson"),
                    m = a("parseqs");
                b.exports = d, d.priorWebsocketSuccess = !1, g(d.prototype), d.protocol = j.protocol, d.Socket = d, d.Transport = a("./transport"), d.transports = a("./transports"), d.parser = a("engine.io-parser"), d.prototype.createTransport = function (a) {
                    h('creating transport "%s"', a);
                    var b = e(this.query);
                    b.EIO = j.protocol, b.transport = a, this.id && (b.sid = this.id);
                    var c = new f[a]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: b,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized
                    });
                    return c
                }, d.prototype.open = function () {
                    var a;
                    if (this.rememberUpgrade && d.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) a = "websocket"; else {
                        if (0 == this.transports.length) {
                            var b = this;
                            return void setTimeout(function () {
                                b.emit("error", "No transports available")
                            }, 0)
                        }
                        a = this.transports[0]
                    }
                    this.readyState = "opening";
                    var a;
                    try {
                        a = this.createTransport(a)
                    } catch (c) {
                        return this.transports.shift(), void this.open()
                    }
                    a.open(), this.setTransport(a)
                }, d.prototype.setTransport = function (a) {
                    h("setting transport %s", a.name);
                    var b = this;
                    this.transport && (h("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = a, a.on("drain", function () {
                        b.onDrain()
                    }).on("packet", function (a) {
                        b.onPacket(a)
                    }).on("error", function (a) {
                        b.onError(a)
                    }).on("close", function () {
                        b.onClose("transport close")
                    })
                }, d.prototype.probe = function (a) {
                    function b() {
                        if (m.onlyBinaryUpgrades) {
                            var b = !this.supportsBinary && m.transport.supportsBinary;
                            l = l || b
                        }
                        l || (h('probe transport "%s" opened', a), k.send([{
                            type: "ping",
                            data: "probe"
                        }]), k.once("packet", function (b) {
                            if (!l) if ("pong" == b.type && "probe" == b.data) {
                                if (h('probe transport "%s" pong', a), m.upgrading = !0, m.emit("upgrading", k), !k) return;
                                d.priorWebsocketSuccess = "websocket" == k.name, h('pausing current transport "%s"', m.transport.name), m.transport.pause(function () {
                                    l || "closed" != m.readyState && (h("changing transport and sending upgrade packet"), j(), m.setTransport(k), k.send([{type: "upgrade"}]), m.emit("upgrade", k), k = null, m.upgrading = !1, m.flush())
                                })
                            } else {
                                h('probe transport "%s" failed', a);
                                var c = new Error("probe error");
                                c.transport = k.name, m.emit("upgradeError", c)
                            }
                        }))
                    }

                    function c() {
                        l || (l = !0, j(), k.close(), k = null)
                    }

                    function e(b) {
                        var d = new Error("probe error: " + b);
                        d.transport = k.name, c(), h('probe transport "%s" failed because of error: %s', a, b), m.emit("upgradeError", d)
                    }

                    function f() {
                        e("transport closed")
                    }

                    function g() {
                        e("socket closed")
                    }

                    function i(a) {
                        k && a.name != k.name && (h('"%s" works - aborting "%s"', a.name, k.name), c())
                    }

                    function j() {
                        k.removeListener("open", b), k.removeListener("error", e), k.removeListener("close", f), m.removeListener("close", g), m.removeListener("upgrading", i)
                    }

                    h('probing transport "%s"', a);
                    var k = this.createTransport(a, {probe: 1}), l = !1, m = this;
                    d.priorWebsocketSuccess = !1, k.once("open", b), k.once("error", e), k.once("close", f), this.once("close", g), this.once("upgrading", i), k.open()
                }, d.prototype.onOpen = function () {
                    if (h("socket open"), this.readyState = "open", d.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        h("starting upgrade probes");
                        for (var a = 0, b = this.upgrades.length; b > a; a++) this.probe(this.upgrades[a])
                    }
                }, d.prototype.onPacket = function (a) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (h('socket receive: type "%s", data "%s"', a.type, a.data), this.emit("packet", a), this.emit("heartbeat"), a.type) {
                        case"open":
                            this.onHandshake(l(a.data));
                            break;
                        case"pong":
                            this.setPing();
                            break;
                        case"error":
                            var b = new Error("server error");
                            b.code = a.data, this.emit("error", b);
                            break;
                        case"message":
                            this.emit("data", a.data), this.emit("message", a.data)
                    } else h('packet received with socket readyState "%s"', this.readyState)
                }, d.prototype.onHandshake = function (a) {
                    this.emit("handshake", a), this.id = a.sid, this.transport.query.sid = a.sid, this.upgrades = this.filterUpgrades(a.upgrades), this.pingInterval = a.pingInterval, this.pingTimeout = a.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, d.prototype.onHeartbeat = function (a) {
                    clearTimeout(this.pingTimeoutTimer);
                    var b = this;
                    b.pingTimeoutTimer = setTimeout(function () {
                        "closed" != b.readyState && b.onClose("ping timeout")
                    }, a || b.pingInterval + b.pingTimeout)
                }, d.prototype.setPing = function () {
                    var a = this;
                    clearTimeout(a.pingIntervalTimer), a.pingIntervalTimer = setTimeout(function () {
                        h("writing ping packet - expecting pong within %sms", a.pingTimeout), a.ping(), a.onHeartbeat(a.pingTimeout)
                    }, a.pingInterval)
                }, d.prototype.ping = function () {
                    this.sendPacket("ping")
                }, d.prototype.onDrain = function () {
                    for (var a = 0; a < this.prevBufferLen; a++) this.callbackBuffer[a] && this.callbackBuffer[a]();
                    this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, d.prototype.flush = function () {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (h("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, d.prototype.write = d.prototype.send = function (a, b) {
                    return this.sendPacket("message", a, b), this
                }, d.prototype.sendPacket = function (a, b, c) {
                    if ("closing" != this.readyState && "closed" != this.readyState) {
                        var d = {type: a, data: b};
                        this.emit("packetCreate", d), this.writeBuffer.push(d), this.callbackBuffer.push(c), this.flush()
                    }
                }, d.prototype.close = function () {
                    function a() {
                        d.onClose("forced close"), h("socket closing - telling transport to close"), d.transport.close()
                    }

                    function b() {
                        d.removeListener("upgrade", b), d.removeListener("upgradeError", b), a()
                    }

                    function c() {
                        d.once("upgrade", b), d.once("upgradeError", b)
                    }

                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var d = this;
                        this.writeBuffer.length ? this.once("drain", function () {
                            this.upgrading ? c() : a()
                        }) : this.upgrading ? c() : a()
                    }
                    return this
                }, d.prototype.onError = function (a) {
                    h("socket error %j", a), d.priorWebsocketSuccess = !1, this.emit("error", a), this.onClose("transport error", a)
                }, d.prototype.onClose = function (a, b) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        h('socket close with reason: "%s"', a);
                        var c = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function () {
                            c.writeBuffer = [], c.callbackBuffer = [], c.prevBufferLen = 0
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", a, b)
                    }
                }, d.prototype.filterUpgrades = function (a) {
                    for (var b = [], c = 0, d = a.length; d > c; c++) ~i(this.transports, a[c]) && b.push(a[c]);
                    return b
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./transport": 14,
            "./transports": 15,
            "component-emitter": 9,
            debug: 22,
            "engine.io-parser": 25,
            indexof: 40,
            parsejson: 32,
            parseqs: 33,
            parseuri: 34
        }],
        14: [function (a, b, c) {
            function d(a) {
                this.path = a.path, this.hostname = a.hostname, this.port = a.port, this.secure = a.secure, this.query = a.query, this.timestampParam = a.timestampParam, this.timestampRequests = a.timestampRequests, this.readyState = "", this.agent = a.agent || !1, this.socket = a.socket, this.enablesXDR = a.enablesXDR, this.pfx = a.pfx, this.key = a.key, this.passphrase = a.passphrase, this.cert = a.cert, this.ca = a.ca, this.ciphers = a.ciphers, this.rejectUnauthorized = a.rejectUnauthorized
            }

            var e = a("engine.io-parser"), f = a("component-emitter");
            b.exports = d, f(d.prototype), d.timestamps = 0, d.prototype.onError = function (a, b) {
                var c = new Error(a);
                return c.type = "TransportError", c.description = b, this.emit("error", c), this
            }, d.prototype.open = function () {
                return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()), this
            }, d.prototype.close = function () {
                return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()), this
            }, d.prototype.send = function (a) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(a)
            }, d.prototype.onOpen = function () {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, d.prototype.onData = function (a) {
                var b = e.decodePacket(a, this.socket.binaryType);
                this.onPacket(b)
            }, d.prototype.onPacket = function (a) {
                this.emit("packet", a)
            }, d.prototype.onClose = function () {
                this.readyState = "closed", this.emit("close")
            }
        }, {"component-emitter": 9, "engine.io-parser": 25}],
        15: [function (a, b, c) {
            (function (b) {
                function d(a) {
                    var c, d = !1, h = !1, i = !1 !== a.jsonp;
                    if (b.location) {
                        var j = "https:" == location.protocol, k = location.port;
                        k || (k = j ? 443 : 80), d = a.hostname != location.hostname || k != a.port, h = a.secure != j
                    }
                    if (a.xdomain = d, a.xscheme = h, c = new e(a), "open" in c && !a.forceJSONP) return new f(a);
                    if (!i) throw new Error("JSONP disabled");
                    return new g(a)
                }

                var e = a("xmlhttprequest"), f = a("./polling-xhr"), g = a("./polling-jsonp"), h = a("./websocket");
                c.polling = d, c.websocket = h
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"./polling-jsonp": 16, "./polling-xhr": 17, "./websocket": 19, xmlhttprequest: 20}],
        16: [function (a, b, c) {
            (function (c) {
                function d() {
                }

                function e(a) {
                    f.call(this, a), this.query = this.query || {}, h || (c.___eio || (c.___eio = []), h = c.___eio), this.index = h.length;
                    var b = this;
                    h.push(function (a) {
                        b.onData(a)
                    }), this.query.j = this.index, c.document && c.addEventListener && c.addEventListener("beforeunload", function () {
                        b.script && (b.script.onerror = d)
                    }, !1)
                }

                var f = a("./polling"), g = a("component-inherit");
                b.exports = e;
                var h, i = /\n/g, j = /\\n/g;
                g(e, f), e.prototype.supportsBinary = !1, e.prototype.doClose = function () {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), f.prototype.doClose.call(this)
                }, e.prototype.doPoll = function () {
                    var a = this, b = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), b.async = !0, b.src = this.uri(), b.onerror = function (b) {
                        a.onError("jsonp poll error", b)
                    };
                    var c = document.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(b, c), this.script = b;
                    var d = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    d && setTimeout(function () {
                        var a = document.createElement("iframe");
                        document.body.appendChild(a), document.body.removeChild(a)
                    }, 100)
                }, e.prototype.doWrite = function (a, b) {
                    function c() {
                        d(), b()
                    }

                    function d() {
                        if (e.iframe) try {
                            e.form.removeChild(e.iframe)
                        } catch (a) {
                            e.onError("jsonp polling iframe removal error", a)
                        }
                        try {
                            var b = '<iframe src="javascript:0" name="' + e.iframeId + '">';
                            f = document.createElement(b)
                        } catch (a) {
                            f = document.createElement("iframe"), f.name = e.iframeId, f.src = "javascript:0"
                        }
                        f.id = e.iframeId, e.form.appendChild(f), e.iframe = f
                    }

                    var e = this;
                    if (!this.form) {
                        var f, g = document.createElement("form"), h = document.createElement("textarea"),
                            k = this.iframeId = "eio_iframe_" + this.index;
                        g.className = "socketio", g.style.position = "absolute", g.style.top = "-1000px", g.style.left = "-1000px", g.target = k, g.method = "POST", g.setAttribute("accept-charset", "utf-8"), h.name = "d", g.appendChild(h), document.body.appendChild(g), this.form = g, this.area = h
                    }
                    this.form.action = this.uri(), d(), a = a.replace(j, "\\\n"), this.area.value = a.replace(i, "\\n");
                    try {
                        this.form.submit()
                    } catch (l) {
                    }
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                        "complete" == e.iframe.readyState && c()
                    } : this.iframe.onload = c
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"./polling": 18, "component-inherit": 21}],
        17: [function (a, b, c) {
            (function (c) {
                function d() {
                }

                function e(a) {
                    if (i.call(this, a), c.location) {
                        var b = "https:" == location.protocol, d = location.port;
                        d || (d = b ? 443 : 80), this.xd = a.hostname != c.location.hostname || d != a.port, this.xs = a.secure != b
                    }
                }

                function f(a) {
                    this.method = a.method || "GET", this.uri = a.uri, this.xd = !!a.xd, this.xs = !!a.xs, this.async = !1 !== a.async, this.data = void 0 != a.data ? a.data : null, this.agent = a.agent, this.isBinary = a.isBinary, this.supportsBinary = a.supportsBinary, this.enablesXDR = a.enablesXDR, this.pfx = a.pfx, this.key = a.key, this.passphrase = a.passphrase, this.cert = a.cert, this.ca = a.ca, this.ciphers = a.ciphers, this.rejectUnauthorized = a.rejectUnauthorized, this.create()
                }

                function g() {
                    for (var a in f.requests) f.requests.hasOwnProperty(a) && f.requests[a].abort()
                }

                var h = a("xmlhttprequest"), i = a("./polling"), j = a("component-emitter"), k = a("component-inherit"),
                    l = a("debug")("engine.io-client:polling-xhr");
                b.exports = e, b.exports.Request = f, k(e, i), e.prototype.supportsBinary = !0, e.prototype.request = function (a) {
                    return a = a || {}, a.uri = this.uri(), a.xd = this.xd, a.xs = this.xs, a.agent = this.agent || !1, a.supportsBinary = this.supportsBinary, a.enablesXDR = this.enablesXDR, a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized, new f(a)
                }, e.prototype.doWrite = function (a, b) {
                    var c = "string" != typeof a && void 0 !== a,
                        d = this.request({method: "POST", data: a, isBinary: c}), e = this;
                    d.on("success", b), d.on("error", function (a) {
                        e.onError("xhr post error", a)
                    }), this.sendXhr = d
                }, e.prototype.doPoll = function () {
                    l("xhr poll");
                    var a = this.request(), b = this;
                    a.on("data", function (a) {
                        b.onData(a)
                    }), a.on("error", function (a) {
                        b.onError("xhr poll error", a)
                    }), this.pollXhr = a
                }, j(f.prototype), f.prototype.create = function () {
                    var a = {agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR};
                    a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized;
                    var b = this.xhr = new h(a), d = this;
                    try {
                        if (l("xhr open %s: %s", this.method, this.uri), b.open(this.method, this.uri, this.async), this.supportsBinary && (b.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? b.setRequestHeader("Content-type", "application/octet-stream") : b.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (e) {
                        }
                        "withCredentials" in b && (b.withCredentials = !0), this.hasXDR() ? (b.onload = function () {
                            d.onLoad()
                        }, b.onerror = function () {
                            d.onError(b.responseText)
                        }) : b.onreadystatechange = function () {
                            4 == b.readyState && (200 == b.status || 1223 == b.status ? d.onLoad() : setTimeout(function () {
                                d.onError(b.status)
                            }, 0))
                        }, l("xhr data %s", this.data), b.send(this.data)
                    } catch (e) {
                        return void setTimeout(function () {
                            d.onError(e)
                        }, 0)
                    }
                    c.document && (this.index = f.requestsCount++, f.requests[this.index] = this)
                }, f.prototype.onSuccess = function () {
                    this.emit("success"), this.cleanup()
                }, f.prototype.onData = function (a) {
                    this.emit("data", a), this.onSuccess()
                }, f.prototype.onError = function (a) {
                    this.emit("error", a), this.cleanup(!0)
                }, f.prototype.cleanup = function (a) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = d : this.xhr.onreadystatechange = d, a) try {
                            this.xhr.abort()
                        } catch (b) {
                        }
                        c.document && delete f.requests[this.index], this.xhr = null
                    }
                }, f.prototype.onLoad = function () {
                    var a;
                    try {
                        var b;
                        try {
                            b = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (c) {
                        }
                        a = "application/octet-stream" === b ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                    } catch (c) {
                        this.onError(c)
                    }
                    null != a && this.onData(a)
                }, f.prototype.hasXDR = function () {
                    return "undefined" != typeof c.XDomainRequest && !this.xs && this.enablesXDR
                }, f.prototype.abort = function () {
                    this.cleanup()
                }, c.document && (f.requestsCount = 0, f.requests = {}, c.attachEvent ? c.attachEvent("onunload", g) : c.addEventListener && c.addEventListener("beforeunload", g, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"./polling": 18, "component-emitter": 9, "component-inherit": 21, debug: 22, xmlhttprequest: 20}],
        18: [function (a, b, c) {
            function d(a) {
                var b = a && a.forceBase64;
                j && !b || (this.supportsBinary = !1), e.call(this, a)
            }

            var e = a("../transport"), f = a("parseqs"), g = a("engine.io-parser"), h = a("component-inherit"),
                i = a("debug")("engine.io-client:polling");
            b.exports = d;
            var j = function () {
                var b = a("xmlhttprequest"), c = new b({xdomain: !1});
                return null != c.responseType
            }();
            h(d, e), d.prototype.name = "polling", d.prototype.doOpen = function () {
                this.poll()
            }, d.prototype.pause = function (a) {
                function b() {
                    i("paused"), c.readyState = "paused", a()
                }

                var c = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var d = 0;
                    this.polling && (i("we are currently polling - waiting to pause"), d++, this.once("pollComplete", function () {
                        i("pre-pause polling complete"), --d || b()
                    })), this.writable || (i("we are currently writing - waiting to pause"), d++, this.once("drain", function () {
                        i("pre-pause writing complete"), --d || b()
                    }))
                } else b()
            }, d.prototype.poll = function () {
                i("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, d.prototype.onData = function (a) {
                var b = this;
                i("polling got data %s", a);
                var c = function (a, c, d) {
                    return "opening" == b.readyState && b.onOpen(), "close" == a.type ? (b.onClose(), !1) : void b.onPacket(a)
                };
                g.decodePayload(a, this.socket.binaryType, c), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : i('ignoring poll - transport state "%s"', this.readyState))
            }, d.prototype.doClose = function () {
                function a() {
                    i("writing close packet"), b.write([{type: "close"}])
                }

                var b = this;
                "open" == this.readyState ? (i("transport open - closing"), a()) : (i("transport not open - deferring close"), this.once("open", a))
            }, d.prototype.write = function (a) {
                var b = this;
                this.writable = !1;
                var c = function () {
                    b.writable = !0, b.emit("drain")
                }, b = this;
                g.encodePayload(a, this.supportsBinary, function (a) {
                    b.doWrite(a, c)
                })
            }, d.prototype.uri = function () {
                var a = this.query || {}, b = this.secure ? "https" : "http", c = "";
                return !1 !== this.timestampRequests && (a[this.timestampParam] = +new Date + "-" + e.timestamps++), this.supportsBinary || a.sid || (a.b64 = 1), a = f.encode(a), this.port && ("https" == b && 443 != this.port || "http" == b && 80 != this.port) && (c = ":" + this.port), a.length && (a = "?" + a), b + "://" + this.hostname + c + this.path + a
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 33,
            xmlhttprequest: 20
        }],
        19: [function (a, b, c) {
            function d(a) {
                var b = a && a.forceBase64;
                b && (this.supportsBinary = !1), e.call(this, a)
            }

            var e = a("../transport"), f = a("engine.io-parser"), g = a("parseqs"), h = a("component-inherit"),
                i = a("debug")("engine.io-client:websocket"), j = a("ws");
            b.exports = d, h(d, e), d.prototype.name = "websocket", d.prototype.supportsBinary = !0, d.prototype.doOpen = function () {
                if (this.check()) {
                    var a = this.uri(), b = void 0, c = {agent: this.agent};
                    c.pfx = this.pfx, c.key = this.key, c.passphrase = this.passphrase, c.cert = this.cert, c.ca = this.ca, c.ciphers = this.ciphers, c.rejectUnauthorized = this.rejectUnauthorized, this.ws = new j(a, b, c), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, d.prototype.addEventListeners = function () {
                var a = this;
                this.ws.onopen = function () {
                    a.onOpen()
                }, this.ws.onclose = function () {
                    a.onClose()
                }, this.ws.onmessage = function (b) {
                    a.onData(b.data)
                }, this.ws.onerror = function (b) {
                    a.onError("websocket error", b)
                }
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (d.prototype.onData = function (a) {
                var b = this;
                setTimeout(function () {
                    e.prototype.onData.call(b, a)
                }, 0)
            }), d.prototype.write = function (a) {
                function b() {
                    c.writable = !0, c.emit("drain")
                }

                var c = this;
                this.writable = !1;
                for (var d = 0, e = a.length; e > d; d++) f.encodePacket(a[d], this.supportsBinary, function (a) {
                    try {
                        c.ws.send(a)
                    } catch (b) {
                        i("websocket closed before onclose event")
                    }
                });
                setTimeout(b, 0)
            }, d.prototype.onClose = function () {
                e.prototype.onClose.call(this)
            }, d.prototype.doClose = function () {
                "undefined" != typeof this.ws && this.ws.close()
            }, d.prototype.uri = function () {
                var a = this.query || {}, b = this.secure ? "wss" : "ws", c = "";
                return this.port && ("wss" == b && 443 != this.port || "ws" == b && 80 != this.port) && (c = ":" + this.port), this.timestampRequests && (a[this.timestampParam] = +new Date), this.supportsBinary || (a.b64 = 1), a = g.encode(a), a.length && (a = "?" + a), b + "://" + this.hostname + c + this.path + a
            }, d.prototype.check = function () {
                return !(!j || "__initialize" in j && this.name === d.prototype.name)
            }
        }, {"../transport": 14, "component-inherit": 21, debug: 22, "engine.io-parser": 25, parseqs: 33, ws: 35}],
        20: [function (a, b, c) {
            var d = a("has-cors");
            b.exports = function (a) {
                var b = a.xdomain, c = a.xscheme, e = a.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!b || d)) return new XMLHttpRequest
                } catch (f) {
                }
                try {
                    if ("undefined" != typeof XDomainRequest && !c && e) return new XDomainRequest
                } catch (f) {
                }
                if (!b) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (f) {
                }
            }
        }, {"has-cors": 38}],
        21: [function (a, b, c) {
            b.exports = function (a, b) {
                var c = function () {
                };
                c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a
            }
        }, {}],
        22: [function (a, b, c) {
            function d() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function e() {
                var a = arguments, b = this.useColors;
                if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + c.humanize(this.diff), !b) return a;
                var d = "color: " + this.color;
                a = [a[0], d, "color: inherit"].concat(Array.prototype.slice.call(a, 1));
                var e = 0, f = 0;
                return a[0].replace(/%[a-z%]/g, function (a) {
                    "%%" !== a && (e++, "%c" === a && (f = e))
                }), a.splice(f, 0, d), a
            }

            function f() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function g(a) {
                try {
                    null == a ? localStorage.removeItem("debug") : localStorage.debug = a
                } catch (b) {
                }
            }

            function h() {
                var a;
                try {
                    a = localStorage.debug
                } catch (b) {
                }
                return a
            }

            c = b.exports = a("./debug"), c.log = f, c.formatArgs = e, c.save = g, c.load = h, c.useColors = d, c.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], c.formatters.j = function (a) {
                return JSON.stringify(a)
            }, c.enable(h())
        }, {"./debug": 23}],
        23: [function (a, b, c) {
            function d() {
                return c.colors[k++ % c.colors.length]
            }

            function e(a) {
                function b() {
                }

                function e() {
                    var a = e, b = +new Date, f = b - (j || b);
                    a.diff = f, a.prev = j, a.curr = b, j = b, null == a.useColors && (a.useColors = c.useColors()), null == a.color && a.useColors && (a.color = d());
                    var g = Array.prototype.slice.call(arguments);
                    g[0] = c.coerce(g[0]), "string" != typeof g[0] && (g = ["%o"].concat(g));
                    var h = 0;
                    g[0] = g[0].replace(/%([a-z%])/g, function (b, d) {
                        if ("%%" === b) return b;
                        h++;
                        var e = c.formatters[d];
                        if ("function" == typeof e) {
                            var f = g[h];
                            b = e.call(a, f), g.splice(h, 1), h--
                        }
                        return b
                    }), "function" == typeof c.formatArgs && (g = c.formatArgs.apply(a, g));
                    var i = e.log || c.log || console.log.bind(console);
                    i.apply(a, g)
                }

                b.enabled = !1, e.enabled = !0;
                var f = c.enabled(a) ? e : b;
                return f.namespace = a, f
            }

            function f(a) {
                c.save(a);
                for (var b = (a || "").split(/[\s,]+/), d = b.length, e = 0; d > e; e++) b[e] && (a = b[e].replace(/\*/g, ".*?"), "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$")))
            }

            function g() {
                c.enable("")
            }

            function h(a) {
                var b, d;
                for (b = 0, d = c.skips.length; d > b; b++) if (c.skips[b].test(a)) return !1;
                for (b = 0, d = c.names.length; d > b; b++) if (c.names[b].test(a)) return !0;
                return !1
            }

            function i(a) {
                return a instanceof Error ? a.stack || a.message : a
            }

            c = b.exports = e, c.coerce = i, c.disable = g, c.enable = f, c.enabled = h, c.humanize = a("ms"), c.names = [], c.skips = [], c.formatters = {};
            var j, k = 0
        }, {ms: 24}],
        24: [function (a, b, c) {
            function d(a) {
                var b = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(a);
                if (b) {
                    var c = parseFloat(b[1]), d = (b[2] || "ms").toLowerCase();
                    switch (d) {
                        case"years":
                        case"year":
                        case"y":
                            return c * l;
                        case"days":
                        case"day":
                        case"d":
                            return c * k;
                        case"hours":
                        case"hour":
                        case"h":
                            return c * j;
                        case"minutes":
                        case"minute":
                        case"m":
                            return c * i;
                        case"seconds":
                        case"second":
                        case"s":
                            return c * h;
                        case"ms":
                            return c
                    }
                }
            }

            function e(a) {
                return a >= k ? Math.round(a / k) + "d" : a >= j ? Math.round(a / j) + "h" : a >= i ? Math.round(a / i) + "m" : a >= h ? Math.round(a / h) + "s" : a + "ms"
            }

            function f(a) {
                return g(a, k, "day") || g(a, j, "hour") || g(a, i, "minute") || g(a, h, "second") || a + " ms"
            }

            function g(a, b, c) {
                return b > a ? void 0 : 1.5 * b > a ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
            }

            var h = 1e3, i = 60 * h, j = 60 * i, k = 24 * j, l = 365.25 * k;
            b.exports = function (a, b) {
                return b = b || {}, "string" == typeof a ? d(a) : b["long"] ? f(a) : e(a)
            }
        }, {}],
        25: [function (a, b, c) {
            (function (b) {
                function d(a, b) {
                    var d = "b" + c.packets[a.type] + a.data.data;
                    return b(d)
                }

                function e(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    var e = a.data, f = new Uint8Array(e), g = new Uint8Array(1 + e.byteLength);
                    g[0] = r[a.type];
                    for (var h = 0; h < f.length; h++) g[h + 1] = f[h];
                    return d(g.buffer)
                }

                function f(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    var e = new FileReader;
                    return e.onload = function () {
                        a.data = e.result, c.encodePacket(a, b, !0, d)
                    }, e.readAsArrayBuffer(a.data)
                }

                function g(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    if (q) return f(a, b, d);
                    var e = new Uint8Array(1);
                    e[0] = r[a.type];
                    var g = new u([e.buffer, a.data]);
                    return d(g)
                }

                function h(a, b, c) {
                    for (var d = new Array(a.length), e = m(a.length, c), f = function (a, c, e) {
                        b(c, function (b, c) {
                            d[a] = c, e(b, d)
                        })
                    }, g = 0; g < a.length; g++) f(g, a[g], e)
                }

                var i = a("./keys"), j = a("has-binary"), k = a("arraybuffer.slice"), l = a("base64-arraybuffer"),
                    m = a("after"), n = a("utf8"), o = navigator.userAgent.match(/Android/i),
                    p = /PhantomJS/i.test(navigator.userAgent), q = o || p;
                c.protocol = 3;
                var r = c.packets = {open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6}, s = i(r),
                    t = {type: "error", data: "parser error"}, u = a("blob");
                c.encodePacket = function (a, c, f, h) {
                    "function" == typeof c && (h = c, c = !1), "function" == typeof f && (h = f, f = null);
                    var i = void 0 === a.data ? void 0 : a.data.buffer || a.data;
                    if (b.ArrayBuffer && i instanceof ArrayBuffer) return e(a, c, h);
                    if (u && i instanceof b.Blob) return g(a, c, h);
                    if (i && i.base64) return d(a, h);
                    var j = r[a.type];
                    return void 0 !== a.data && (j += f ? n.encode(String(a.data)) : String(a.data)), h("" + j)
                }, c.encodeBase64Packet = function (a, d) {
                    var e = "b" + c.packets[a.type];
                    if (u && a.data instanceof u) {
                        var f = new FileReader;
                        return f.onload = function () {
                            var a = f.result.split(",")[1];
                            d(e + a)
                        }, f.readAsDataURL(a.data)
                    }
                    var g;
                    try {
                        g = String.fromCharCode.apply(null, new Uint8Array(a.data))
                    } catch (h) {
                        for (var i = new Uint8Array(a.data), j = new Array(i.length), k = 0; k < i.length; k++) j[k] = i[k];
                        g = String.fromCharCode.apply(null, j)
                    }
                    return e += b.btoa(g), d(e)
                }, c.decodePacket = function (a, b, d) {
                    if ("string" == typeof a || void 0 === a) {
                        if ("b" == a.charAt(0)) return c.decodeBase64Packet(a.substr(1), b);
                        if (d) try {
                            a = n.decode(a)
                        } catch (e) {
                            return t
                        }
                        var f = a.charAt(0);
                        return Number(f) == f && s[f] ? a.length > 1 ? {
                            type: s[f],
                            data: a.substring(1)
                        } : {type: s[f]} : t
                    }
                    var g = new Uint8Array(a), f = g[0], h = k(a, 1);
                    return u && "blob" === b && (h = new u([h])), {type: s[f], data: h}
                }, c.decodeBase64Packet = function (a, c) {
                    var d = s[a.charAt(0)];
                    if (!b.ArrayBuffer) return {type: d, data: {base64: !0, data: a.substr(1)}};
                    var e = l.decode(a.substr(1));
                    return "blob" === c && u && (e = new u([e])), {type: d, data: e}
                }, c.encodePayload = function (a, b, d) {
                    function e(a) {
                        return a.length + ":" + a
                    }

                    function f(a, d) {
                        c.encodePacket(a, g ? b : !1, !0, function (a) {
                            d(null, e(a))
                        })
                    }

                    "function" == typeof b && (d = b, b = null);
                    var g = j(a);
                    return b && g ? u && !q ? c.encodePayloadAsBlob(a, d) : c.encodePayloadAsArrayBuffer(a, d) : a.length ? void h(a, f, function (a, b) {
                        return d(b.join(""))
                    }) : d("0:")
                }, c.decodePayload = function (a, b, d) {
                    if ("string" != typeof a) return c.decodePayloadAsBinary(a, b, d);
                    "function" == typeof b && (d = b, b = null);
                    var e;
                    if ("" == a) return d(t, 0, 1);
                    for (var f, g, h = "", i = 0, j = a.length; j > i; i++) {
                        var k = a.charAt(i);
                        if (":" != k) h += k; else {
                            if ("" == h || h != (f = Number(h))) return d(t, 0, 1);
                            if (g = a.substr(i + 1, f), h != g.length) return d(t, 0, 1);
                            if (g.length) {
                                if (e = c.decodePacket(g, b, !0), t.type == e.type && t.data == e.data) return d(t, 0, 1);
                                var l = d(e, i + f, j);
                                if (!1 === l) return
                            }
                            i += f, h = ""
                        }
                    }
                    return "" != h ? d(t, 0, 1) : void 0
                }, c.encodePayloadAsArrayBuffer = function (a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function (a) {
                            return b(null, a)
                        })
                    }

                    return a.length ? void h(a, d, function (a, c) {
                        var d = c.reduce(function (a, b) {
                            var c;
                            return c = "string" == typeof b ? b.length : b.byteLength, a + c.toString().length + c + 2
                        }, 0), e = new Uint8Array(d), f = 0;
                        return c.forEach(function (a) {
                            var b = "string" == typeof a, c = a;
                            if (b) {
                                for (var d = new Uint8Array(a.length), g = 0; g < a.length; g++) d[g] = a.charCodeAt(g);
                                c = d.buffer
                            }
                            b ? e[f++] = 0 : e[f++] = 1;
                            for (var h = c.byteLength.toString(), g = 0; g < h.length; g++) e[f++] = parseInt(h[g]);
                            e[f++] = 255;
                            for (var d = new Uint8Array(c), g = 0; g < d.length; g++) e[f++] = d[g]
                        }), b(e.buffer)
                    }) : b(new ArrayBuffer(0))
                }, c.encodePayloadAsBlob = function (a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function (a) {
                            var c = new Uint8Array(1);
                            if (c[0] = 1, "string" == typeof a) {
                                for (var d = new Uint8Array(a.length), e = 0; e < a.length; e++) d[e] = a.charCodeAt(e);
                                a = d.buffer, c[0] = 0
                            }
                            for (var f = a instanceof ArrayBuffer ? a.byteLength : a.size, g = f.toString(), h = new Uint8Array(g.length + 1), e = 0; e < g.length; e++) h[e] = parseInt(g[e]);
                            if (h[g.length] = 255, u) {
                                var i = new u([c.buffer, h.buffer, a]);
                                b(null, i)
                            }
                        })
                    }

                    h(a, d, function (a, c) {
                        return b(new u(c))
                    })
                }, c.decodePayloadAsBinary = function (a, b, d) {
                    "function" == typeof b && (d = b, b = null);
                    for (var e = a, f = [], g = !1; e.byteLength > 0;) {
                        for (var h = new Uint8Array(e), i = 0 === h[0], j = "", l = 1; 255 != h[l]; l++) {
                            if (j.length > 310) {
                                g = !0;
                                break
                            }
                            j += h[l]
                        }
                        if (g) return d(t, 0, 1);
                        e = k(e, 2 + j.length), j = parseInt(j);
                        var m = k(e, 0, j);
                        if (i) try {
                            m = String.fromCharCode.apply(null, new Uint8Array(m))
                        } catch (n) {
                            var o = new Uint8Array(m);
                            m = "";
                            for (var l = 0; l < o.length; l++) m += String.fromCharCode(o[l])
                        }
                        f.push(m), e = k(e, j)
                    }
                    var p = f.length;
                    f.forEach(function (a, e) {
                        d(c.decodePacket(a, b, !0), e, p)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./keys": 26,
            after: 27,
            "arraybuffer.slice": 28,
            "base64-arraybuffer": 29,
            blob: 30,
            "has-binary": 36,
            utf8: 31
        }],
        26: [function (a, b, c) {
            b.exports = Object.keys || function (a) {
                var b = [], c = Object.prototype.hasOwnProperty;
                for (var d in a) c.call(a, d) && b.push(d);
                return b
            }
        }, {}],
        27: [function (a, b, c) {
            function d(a, b, c) {
                function d(a, e) {
                    if (d.count <= 0) throw new Error("after called too many times");
                    --d.count, a ? (f = !0, b(a), b = c) : 0 !== d.count || f || b(null, e)
                }

                var f = !1;
                return c = c || e, d.count = a, 0 === a ? b() : d
            }

            function e() {
            }

            b.exports = d
        }, {}],
        28: [function (a, b, c) {
            b.exports = function (a, b, c) {
                var d = a.byteLength;
                if (b = b || 0, c = c || d, a.slice) return a.slice(b, c);
                if (0 > b && (b += d), 0 > c && (c += d), c > d && (c = d), b >= d || b >= c || 0 === d) return new ArrayBuffer(0);
                for (var e = new Uint8Array(a), f = new Uint8Array(c - b), g = b, h = 0; c > g; g++, h++) f[h] = e[g];
                return f.buffer
            }
        }, {}],
        29: [function (a, b, c) {
            !function (a) {
                "use strict";
                c.encode = function (b) {
                    var c, d = new Uint8Array(b), e = d.length, f = "";
                    for (c = 0; e > c; c += 3) f += a[d[c] >> 2], f += a[(3 & d[c]) << 4 | d[c + 1] >> 4], f += a[(15 & d[c + 1]) << 2 | d[c + 2] >> 6], f += a[63 & d[c + 2]];
                    return e % 3 === 2 ? f = f.substring(0, f.length - 1) + "=" : e % 3 === 1 && (f = f.substring(0, f.length - 2) + "=="), f
                }, c.decode = function (b) {
                    var c, d, e, f, g, h = .75 * b.length, i = b.length, j = 0;
                    "=" === b[b.length - 1] && (h--, "=" === b[b.length - 2] && h--);
                    var k = new ArrayBuffer(h), l = new Uint8Array(k);
                    for (c = 0; i > c; c += 4) d = a.indexOf(b[c]), e = a.indexOf(b[c + 1]), f = a.indexOf(b[c + 2]), g = a.indexOf(b[c + 3]), l[j++] = d << 2 | e >> 4, l[j++] = (15 & e) << 4 | f >> 2, l[j++] = (3 & f) << 6 | 63 & g;
                    return k
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        30: [function (a, b, c) {
            (function (a) {
                function c(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        if (c.buffer instanceof ArrayBuffer) {
                            var d = c.buffer;
                            if (c.byteLength !== d.byteLength) {
                                var e = new Uint8Array(c.byteLength);
                                e.set(new Uint8Array(d, c.byteOffset, c.byteLength)), d = e.buffer
                            }
                            a[b] = d
                        }
                    }
                }

                function d(a, b) {
                    b = b || {};
                    var d = new f;
                    c(a);
                    for (var e = 0; e < a.length; e++) d.append(a[e]);
                    return b.type ? d.getBlob(b.type) : d.getBlob()
                }

                function e(a, b) {
                    return c(a), new Blob(a, b || {})
                }

                var f = a.BlobBuilder || a.WebKitBlobBuilder || a.MSBlobBuilder || a.MozBlobBuilder, g = function () {
                    try {
                        var a = new Blob(["hi"]);
                        return 2 === a.size
                    } catch (b) {
                        return !1
                    }
                }(), h = g && function () {
                    try {
                        var a = new Blob([new Uint8Array([1, 2])]);
                        return 2 === a.size
                    } catch (b) {
                        return !1
                    }
                }(), i = f && f.prototype.append && f.prototype.getBlob;
                b.exports = function () {
                    return g ? h ? a.Blob : e : i ? d : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        31: [function (b, c, d) {
            (function (b) {
                !function (e) {
                    function f(a) {
                        for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), b >= 55296 && 56319 >= b && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
                        return d
                    }

                    function g(a) {
                        for (var b, c = a.length, d = -1, e = ""; ++d < c;) b = a[d], b > 65535 && (b -= 65536, e += u(b >>> 10 & 1023 | 55296), b = 56320 | 1023 & b), e += u(b);
                        return e
                    }

                    function h(a) {
                        if (a >= 55296 && 57343 >= a) throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value")
                    }

                    function i(a, b) {
                        return u(a >> b & 63 | 128)
                    }

                    function j(a) {
                        if (0 == (4294967168 & a)) return u(a);
                        var b = "";
                        return 0 == (4294965248 & a) ? b = u(a >> 6 & 31 | 192) : 0 == (4294901760 & a) ? (h(a), b = u(a >> 12 & 15 | 224), b += i(a, 6)) : 0 == (4292870144 & a) && (b = u(a >> 18 & 7 | 240), b += i(a, 12), b += i(a, 6)), b += u(63 & a | 128)
                    }

                    function k(a) {
                        for (var b, c = f(a), d = c.length, e = -1, g = ""; ++e < d;) b = c[e], g += j(b);
                        return g
                    }

                    function l() {
                        if (t >= s) throw Error("Invalid byte index");
                        var a = 255 & r[t];
                        if (t++, 128 == (192 & a)) return 63 & a;
                        throw Error("Invalid continuation byte")
                    }

                    function m() {
                        var a, b, c, d, e;
                        if (t > s) throw Error("Invalid byte index");
                        if (t == s) return !1;
                        if (a = 255 & r[t], t++, 0 == (128 & a)) return a;
                        if (192 == (224 & a)) {
                            var b = l();
                            if (e = (31 & a) << 6 | b, e >= 128) return e;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & a)) {
                            if (b = l(), c = l(), e = (15 & a) << 12 | b << 6 | c, e >= 2048) return h(e), e;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & a) && (b = l(), c = l(), d = l(), e = (15 & a) << 18 | b << 12 | c << 6 | d, e >= 65536 && 1114111 >= e)) return e;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function n(a) {
                        r = f(a), s = r.length, t = 0;
                        for (var b, c = []; (b = m()) !== !1;) c.push(b);
                        return g(c)
                    }

                    var o = "object" == typeof d && d, p = "object" == typeof c && c && c.exports == o && c,
                        q = "object" == typeof b && b;
                    q.global !== q && q.window !== q || (e = q);
                    var r, s, t, u = String.fromCharCode, v = {version: "2.0.0", encode: k, decode: n};
                    if ("function" == typeof a && "object" == typeof a.amd && a.amd) a(function () {
                        return v
                    }); else if (o && !o.nodeType) if (p) p.exports = v; else {
                        var w = {}, x = w.hasOwnProperty;
                        for (var y in v) x.call(v, y) && (o[y] = v[y])
                    } else e.utf8 = v
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        32: [function (a, b, c) {
            (function (a) {
                var c = /^[\],:{}\s]*$/, d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    e = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, f = /(?:^|:|,)(?:\s*\[)+/g,
                    g = /^\s+/, h = /\s+$/;
                b.exports = function (b) {
                    return "string" == typeof b && b ? (b = b.replace(g, "").replace(h, ""), a.JSON && JSON.parse ? JSON.parse(b) : c.test(b.replace(d, "@").replace(e, "]").replace(f, "")) ? new Function("return " + b)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        33: [function (a, b, c) {
            c.encode = function (a) {
                var b = "";
                for (var c in a) a.hasOwnProperty(c) && (b.length && (b += "&"), b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b
            }, c.decode = function (a) {
                for (var b = {}, c = a.split("&"), d = 0, e = c.length; e > d; d++) {
                    var f = c[d].split("=");
                    b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
                }
                return b
            }
        }, {}],
        34: [function (a, b, c) {
            var d = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            b.exports = function (a) {
                var b = a, c = a.indexOf("["), f = a.indexOf("]");
                -1 != c && -1 != f && (a = a.substring(0, c) + a.substring(c, f).replace(/:/g, ";") + a.substring(f, a.length));
                for (var g = d.exec(a || ""), h = {}, i = 14; i--;) h[e[i]] = g[i] || "";
                return -1 != c && -1 != f && (h.source = b, h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"), h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), h.ipv6uri = !0), h
            }
        }, {}],
        35: [function (a, b, c) {
            function d(a, b, c) {
                var d;
                return d = b ? new f(a, b) : new f(a)
            }

            var e = function () {
                return this
            }(), f = e.WebSocket || e.MozWebSocket;
            b.exports = f ? d : null, f && (d.prototype = f.prototype)
        }, {}],
        36: [function (a, b, c) {
            (function (c) {
                function d(a) {
                    function b(a) {
                        if (!a) return !1;
                        if (c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File) return !0;
                        if (e(a)) {
                            for (var d = 0; d < a.length; d++) if (b(a[d])) return !0
                        } else if (a && "object" == typeof a) {
                            a.toJSON && (a = a.toJSON());
                            for (var f in a) if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f])) return !0
                        }
                        return !1
                    }

                    return b(a)
                }

                var e = a("isarray");
                b.exports = d
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {isarray: 37}],
        37: [function (a, b, c) {
            b.exports = Array.isArray || function (a) {
                return "[object Array]" == Object.prototype.toString.call(a)
            }
        }, {}],
        38: [function (a, b, c) {
            var d = a("global");
            try {
                b.exports = "XMLHttpRequest" in d && "withCredentials" in new d.XMLHttpRequest
            } catch (e) {
                b.exports = !1
            }
        }, {global: 39}],
        39: [function (a, b, c) {
            b.exports = function () {
                return this
            }()
        }, {}],
        40: [function (a, b, c) {
            var d = [].indexOf;
            b.exports = function (a, b) {
                if (d) return a.indexOf(b);
                for (var c = 0; c < a.length; ++c) if (a[c] === b) return c;
                return -1
            }
        }, {}],
        41: [function (a, b, c) {
            var d = Object.prototype.hasOwnProperty;
            c.keys = Object.keys || function (a) {
                var b = [];
                for (var c in a) d.call(a, c) && b.push(c);
                return b
            }, c.values = function (a) {
                var b = [];
                for (var c in a) d.call(a, c) && b.push(a[c]);
                return b
            }, c.merge = function (a, b) {
                for (var c in b) d.call(b, c) && (a[c] = b[c]);
                return a
            }, c.length = function (a) {
                return c.keys(a).length
            }, c.isEmpty = function (a) {
                return 0 == c.length(a)
            }
        }, {}],
        42: [function (a, b, c) {
            var d = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            b.exports = function (a) {
                for (var b = d.exec(a || ""), c = {}, f = 14; f--;) c[e[f]] = b[f] || "";
                return c
            }
        }, {}],
        43: [function (a, b, c) {
            (function (b) {
                var d = a("isarray"), e = a("./is-buffer");
                c.deconstructPacket = function (a) {
                    function b(a) {
                        if (!a) return a;
                        if (e(a)) {
                            var f = {_placeholder: !0, num: c.length};
                            return c.push(a), f
                        }
                        if (d(a)) {
                            for (var g = new Array(a.length), h = 0; h < a.length; h++) g[h] = b(a[h]);
                            return g
                        }
                        if ("object" == typeof a && !(a instanceof Date)) {
                            var g = {};
                            for (var i in a) g[i] = b(a[i]);
                            return g
                        }
                        return a
                    }

                    var c = [], f = a.data, g = a;
                    return g.data = b(f), g.attachments = c.length, {packet: g, buffers: c}
                }, c.reconstructPacket = function (a, b) {
                    function c(a) {
                        if (a && a._placeholder) {
                            var e = b[a.num];
                            return e
                        }
                        if (d(a)) {
                            for (var f = 0; f < a.length; f++) a[f] = c(a[f]);
                            return a
                        }
                        if (a && "object" == typeof a) {
                            for (var g in a) a[g] = c(a[g]);
                            return a
                        }
                        return a
                    }

                    return a.data = c(a.data), a.attachments = void 0, a
                }, c.removeBlobs = function (a, c) {
                    function f(a, i, j) {
                        if (!a) return a;
                        if (b.Blob && a instanceof Blob || b.File && a instanceof File) {
                            g++;
                            var k = new FileReader;
                            k.onload = function () {
                                j ? j[i] = this.result : h = this.result, --g || c(h)
                            }, k.readAsArrayBuffer(a)
                        } else if (d(a)) for (var l = 0; l < a.length; l++) f(a[l], l, a); else if (a && "object" == typeof a && !e(a)) for (var m in a) f(a[m], m, a)
                    }

                    var g = 0, h = a;
                    f(h), g || c(h)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"./is-buffer": 45, isarray: 46}],
        44: [function (a, b, c) {
            function d() {
            }

            function e(a) {
                var b = "", d = !1;
                return b += a.type, c.BINARY_EVENT != a.type && c.BINARY_ACK != a.type || (b += a.attachments, b += "-"), a.nsp && "/" != a.nsp && (d = !0, b += a.nsp), null != a.id && (d && (b += ",", d = !1), b += a.id), null != a.data && (d && (b += ","), b += l.stringify(a.data)), k("encoded %j as %s", a, b), b
            }

            function f(a, b) {
                function c(a) {
                    var c = n.deconstructPacket(a), d = e(c.packet), f = c.buffers;
                    f.unshift(d), b(f)
                }

                n.removeBlobs(a, c)
            }

            function g() {
                this.reconstructor = null
            }

            function h(a) {
                var b = {}, d = 0;
                if (b.type = Number(a.charAt(0)), null == c.types[b.type]) return j();
                if (c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type) {
                    for (var e = ""; "-" != a.charAt(++d) && (e += a.charAt(d), d != a.length);) ;
                    if (e != Number(e) || "-" != a.charAt(d)) throw new Error("Illegal attachments");
                    b.attachments = Number(e)
                }
                if ("/" == a.charAt(d + 1)) for (b.nsp = ""; ++d;) {
                    var f = a.charAt(d);
                    if ("," == f) break;
                    if (b.nsp += f, d == a.length) break
                } else b.nsp = "/";
                var g = a.charAt(d + 1);
                if ("" !== g && Number(g) == g) {
                    for (b.id = ""; ++d;) {
                        var f = a.charAt(d);
                        if (null == f || Number(f) != f) {
                            --d;
                            break
                        }
                        if (b.id += a.charAt(d), d == a.length) break
                    }
                    b.id = Number(b.id)
                }
                if (a.charAt(++d)) try {
                    b.data = l.parse(a.substr(d))
                } catch (h) {
                    return j()
                }
                return k("decoded %s as %j", a, b), b
            }

            function i(a) {
                this.reconPack = a, this.buffers = []
            }

            function j(a) {
                return {type: c.ERROR, data: "parser error"}
            }

            var k = a("debug")("socket.io-parser"), l = a("json3"), m = (a("isarray"), a("component-emitter")),
                n = a("./binary"), o = a("./is-buffer");
            c.protocol = 4, c.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], c.CONNECT = 0, c.DISCONNECT = 1, c.EVENT = 2, c.ACK = 3, c.ERROR = 4, c.BINARY_EVENT = 5, c.BINARY_ACK = 6, c.Encoder = d, c.Decoder = g, d.prototype.encode = function (a, b) {
                if (k("encoding packet %j", a), c.BINARY_EVENT == a.type || c.BINARY_ACK == a.type) f(a, b); else {
                    var d = e(a);
                    b([d])
                }
            }, m(g.prototype), g.prototype.add = function (a) {
                var b;
                if ("string" == typeof a) b = h(a), c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type ? (this.reconstructor = new i(b), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", b)) : this.emit("decoded", b); else {
                    if (!o(a) && !a.base64) throw new Error("Unknown type: " + a);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    b = this.reconstructor.takeBinaryData(a), b && (this.reconstructor = null, this.emit("decoded", b))
                }
            }, g.prototype.destroy = function () {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, i.prototype.takeBinaryData = function (a) {
                if (this.buffers.push(a), this.buffers.length == this.reconPack.attachments) {
                    var b = n.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), b
                }
                return null
            }, i.prototype.finishedReconstruction = function () {
                this.reconPack = null, this.buffers = []
            }
        }, {"./binary": 43, "./is-buffer": 45, "component-emitter": 9, debug: 10, isarray: 46, json3: 47}],
        45: [function (a, b, c) {
            (function (a) {
                function c(b) {
                    return a.Buffer && a.Buffer.isBuffer(b) || a.ArrayBuffer && b instanceof ArrayBuffer
                }

                b.exports = c
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        46: [function (a, b, c) {
            b.exports = a(37)
        }, {}],
        47: [function (b, c, d) {
            !function (b) {
                function c(a) {
                    if (c[a] !== g) return c[a];
                    var b;
                    if ("bug-string-char-index" == a) b = "a" != "a"[0]; else if ("json" == a) b = c("json-stringify") && c("json-parse"); else {
                        var d, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == a) {
                            var f = k.stringify, i = "function" == typeof f && l;
                            if (i) {
                                (d = function () {
                                    return 1
                                }).toJSON = d;
                                try {
                                    i = "0" === f(0) && "0" === f(new Number) && '""' == f(new String) && f(h) === g && f(g) === g && f() === g && "1" === f(d) && "[1]" == f([d]) && "[null]" == f([g]) && "null" == f(null) && "[null,null,null]" == f([g, h, null]) && f({a: [d, !0, !1, null, "\x00\b\n\f\r	"]}) == e && "1" === f(null, d) && "[\n 1,\n 2\n]" == f([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == f(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == f(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == f(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == f(new Date(-1))
                                } catch (j) {
                                    i = !1
                                }
                            }
                            b = i
                        }
                        if ("json-parse" == a) {
                            var m = k.parse;
                            if ("function" == typeof m) try {
                                if (0 === m("0") && !m(!1)) {
                                    d = m(e);
                                    var n = 5 == d.a.length && 1 === d.a[0];
                                    if (n) {
                                        try {
                                            n = !m('"	"')
                                        } catch (j) {
                                        }
                                        if (n) try {
                                            n = 1 !== m("01")
                                        } catch (j) {
                                        }
                                        if (n) try {
                                            n = 1 !== m("1.")
                                        } catch (j) {
                                        }
                                    }
                                }
                            } catch (j) {
                                n = !1
                            }
                            b = n
                        }
                    }
                    return c[a] = !!b
                }

                var e, f, g, h = {}.toString, i = "function" == typeof a && a.amd, j = "object" == typeof JSON && JSON,
                    k = "object" == typeof d && d && !d.nodeType && d;
                k && j ? (k.stringify = j.stringify, k.parse = j.parse) : k = b.JSON = j || {};
                var l = new Date(-0xc782b5b800cec);
                try {
                    l = -109252 == l.getUTCFullYear() && 0 === l.getUTCMonth() && 1 === l.getUTCDate() && 10 == l.getUTCHours() && 37 == l.getUTCMinutes() && 6 == l.getUTCSeconds() && 708 == l.getUTCMilliseconds()
                } catch (m) {
                }
                if (!c("json")) {
                    var n = "[object Function]", o = "[object Date]", p = "[object Number]", q = "[object String]",
                        r = "[object Array]", s = "[object Boolean]", t = c("bug-string-char-index");
                    if (!l) var u = Math.floor, v = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        w = function (a, b) {
                            return v[b] + 365 * (a - 1970) + u((a - 1969 + (b = +(b > 1))) / 4) - u((a - 1901 + b) / 100) + u((a - 1601 + b) / 400)
                        };
                    (e = {}.hasOwnProperty) || (e = function (a) {
                        var b, c = {};
                        return (c.__proto__ = null, c.__proto__ = {toString: 1}, c).toString != h ? e = function (a) {
                            var b = this.__proto__, c = a in (this.__proto__ = null, this);
                            return this.__proto__ = b, c
                        } : (b = c.constructor, e = function (a) {
                            var c = (this.constructor || b).prototype;
                            return a in this && !(a in c && this[a] === c[a])
                        }), c = null, e.call(this, a)
                    });
                    var x = {"boolean": 1, number: 1, string: 1, undefined: 1}, y = function (a, b) {
                        var c = typeof a[b];
                        return "object" == c ? !!a[b] : !x[c]
                    };
                    if (f = function (a, b) {
                        var c, d, g, i = 0;
                        (c = function () {
                            this.valueOf = 0
                        }).prototype.valueOf = 0, d = new c;
                        for (g in d) e.call(d, g) && i++;
                        return c = d = null, i ? f = 2 == i ? function (a, b) {
                            var c, d = {}, f = h.call(a) == n;
                            for (c in a) f && "prototype" == c || e.call(d, c) || !(d[c] = 1) || !e.call(a, c) || b(c)
                        } : function (a, b) {
                            var c, d, f = h.call(a) == n;
                            for (c in a) f && "prototype" == c || !e.call(a, c) || (d = "constructor" === c) || b(c);
                            (d || e.call(a, c = "constructor")) && b(c)
                        } : (d = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], f = function (a, b) {
                            var c, f, g = h.call(a) == n,
                                i = !g && "function" != typeof a.constructor && y(a, "hasOwnProperty") ? a.hasOwnProperty : e;
                            for (c in a) g && "prototype" == c || !i.call(a, c) || b(c);
                            for (f = d.length; c = d[--f]; i.call(a, c) && b(c)) ;
                        }), f(a, b)
                    }, !c("json-stringify")) {
                        var z = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"},
                            A = "000000", B = function (a, b) {
                                return (A + (b || 0)).slice(-a)
                            }, C = "\\u00", D = function (a) {
                                var b, c = '"', d = 0, e = a.length, f = e > 10 && t;
                                for (f && (b = a.split("")); e > d; d++) {
                                    var g = a.charCodeAt(d);
                                    switch (g) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            c += z[g];
                                            break;
                                        default:
                                            if (32 > g) {
                                                c += C + B(2, g.toString(16));
                                                break
                                            }
                                            c += f ? b[d] : t ? a.charAt(d) : a[d]
                                    }
                                }
                                return c + '"'
                            }, E = function (a, b, c, d, i, j, k) {
                                var l, m, n, t, v, x, y, z, A, C, F, G, H, I, J, K;
                                try {
                                    l = b[a]
                                } catch (L) {
                                }
                                if ("object" == typeof l && l) if (m = h.call(l), m != o || e.call(l, "toJSON")) "function" == typeof l.toJSON && (m != p && m != q && m != r || e.call(l, "toJSON")) && (l = l.toJSON(a)); else if (l > -1 / 0 && 1 / 0 > l) {
                                    if (w) {
                                        for (v = u(l / 864e5), n = u(v / 365.2425) + 1970 - 1; w(n + 1, 0) <= v; n++) ;
                                        for (t = u((v - w(n, 0)) / 30.42); w(n, t + 1) <= v; t++) ;
                                        v = 1 + v - w(n, t), x = (l % 864e5 + 864e5) % 864e5, y = u(x / 36e5) % 24, z = u(x / 6e4) % 60, A = u(x / 1e3) % 60, C = x % 1e3
                                    } else n = l.getUTCFullYear(), t = l.getUTCMonth(), v = l.getUTCDate(), y = l.getUTCHours(), z = l.getUTCMinutes(), A = l.getUTCSeconds(), C = l.getUTCMilliseconds();
                                    l = (0 >= n || n >= 1e4 ? (0 > n ? "-" : "+") + B(6, 0 > n ? -n : n) : B(4, n)) + "-" + B(2, t + 1) + "-" + B(2, v) + "T" + B(2, y) + ":" + B(2, z) + ":" + B(2, A) + "." + B(3, C) + "Z"
                                } else l = null;
                                if (c && (l = c.call(b, a, l)), null === l) return "null";
                                if (m = h.call(l), m == s) return "" + l;
                                if (m == p) return l > -1 / 0 && 1 / 0 > l ? "" + l : "null";
                                if (m == q) return D("" + l);
                                if ("object" == typeof l) {
                                    for (I = k.length; I--;) if (k[I] === l) throw TypeError();
                                    if (k.push(l), F = [], J = j, j += i, m == r) {
                                        for (H = 0, I = l.length; I > H; H++) G = E(H, l, c, d, i, j, k), F.push(G === g ? "null" : G);
                                        K = F.length ? i ? "[\n" + j + F.join(",\n" + j) + "\n" + J + "]" : "[" + F.join(",") + "]" : "[]"
                                    } else f(d || l, function (a) {
                                        var b = E(a, l, c, d, i, j, k);
                                        b !== g && F.push(D(a) + ":" + (i ? " " : "") + b)
                                    }), K = F.length ? i ? "{\n" + j + F.join(",\n" + j) + "\n" + J + "}" : "{" + F.join(",") + "}" : "{}";
                                    return k.pop(), K
                                }
                            };
                        k.stringify = function (a, b, c) {
                            var d, e, f, g;
                            if ("function" == typeof b || "object" == typeof b && b) if ((g = h.call(b)) == n) e = b; else if (g == r) {
                                f = {};
                                for (var i, j = 0, k = b.length; k > j; i = b[j++], g = h.call(i), (g == q || g == p) && (f[i] = 1)) ;
                            }
                            if (c) if ((g = h.call(c)) == p) {
                                if ((c -= c % 1) > 0) for (d = "", c > 10 && (c = 10); d.length < c; d += " ") ;
                            } else g == q && (d = c.length <= 10 ? c : c.slice(0, 10));
                            return E("", (i = {}, i[""] = a, i), e, f, d, "", [])
                        }
                    }
                    if (!c("json-parse")) {
                        var F, G, H = String.fromCharCode,
                            I = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "	", 110: "\n", 102: "\f", 114: "\r"},
                            J = function () {
                                throw F = G = null, SyntaxError()
                            }, K = function () {
                                for (var a, b, c, d, e, f = G, g = f.length; g > F;) switch (e = f.charCodeAt(F)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        F++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return a = t ? f.charAt(F) : f[F], F++, a;
                                    case 34:
                                        for (a = "@", F++; g > F;) if (e = f.charCodeAt(F), 32 > e) J(); else if (92 == e) switch (e = f.charCodeAt(++F)) {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                a += I[e], F++;
                                                break;
                                            case 117:
                                                for (b = ++F, c = F + 4; c > F; F++) e = f.charCodeAt(F), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || J();
                                                a += H("0x" + f.slice(b, F));
                                                break;
                                            default:
                                                J()
                                        } else {
                                            if (34 == e) break;
                                            for (e = f.charCodeAt(F), b = F; e >= 32 && 92 != e && 34 != e;) e = f.charCodeAt(++F);
                                            a += f.slice(b, F)
                                        }
                                        if (34 == f.charCodeAt(F)) return F++, a;
                                        J();
                                    default:
                                        if (b = F, 45 == e && (d = !0, e = f.charCodeAt(++F)), e >= 48 && 57 >= e) {
                                            for (48 == e && (e = f.charCodeAt(F + 1), e >= 48 && 57 >= e) && J(), d = !1; g > F && (e = f.charCodeAt(F), e >= 48 && 57 >= e); F++) ;
                                            if (46 == f.charCodeAt(F)) {
                                                for (c = ++F; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++) ;
                                                c == F && J(), F = c
                                            }
                                            if (e = f.charCodeAt(F), 101 == e || 69 == e) {
                                                for (e = f.charCodeAt(++F), 43 != e && 45 != e || F++, c = F; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++) ;
                                                c == F && J(), F = c
                                            }
                                            return +f.slice(b, F)
                                        }
                                        if (d && J(), "true" == f.slice(F, F + 4)) return F += 4, !0;
                                        if ("false" == f.slice(F, F + 5)) return F += 5, !1;
                                        if ("null" == f.slice(F, F + 4)) return F += 4, null;
                                        J()
                                }
                                return "$"
                            }, L = function (a) {
                                var b, c;
                                if ("$" == a && J(), "string" == typeof a) {
                                    if ("@" == (t ? a.charAt(0) : a[0])) return a.slice(1);
                                    if ("[" == a) {
                                        for (b = []; a = K(), "]" != a; c || (c = !0)) c && ("," == a ? (a = K(), "]" == a && J()) : J()), "," == a && J(), b.push(L(a));
                                        return b
                                    }
                                    if ("{" == a) {
                                        for (b = {}; a = K(), "}" != a; c || (c = !0)) c && ("," == a ? (a = K(), "}" == a && J()) : J()), "," != a && "string" == typeof a && "@" == (t ? a.charAt(0) : a[0]) && ":" == K() || J(), b[a.slice(1)] = L(K());
                                        return b
                                    }
                                    J()
                                }
                                return a
                            }, M = function (a, b, c) {
                                var d = N(a, b, c);
                                d === g ? delete a[b] : a[b] = d
                            }, N = function (a, b, c) {
                                var d, e = a[b];
                                if ("object" == typeof e && e) if (h.call(e) == r) for (d = e.length; d--;) M(e, d, c); else f(e, function (a) {
                                    M(e, a, c)
                                });
                                return c.call(a, b, e)
                            };
                        k.parse = function (a, b) {
                            var c, d;
                            return F = 0, G = "" + a, c = L(K()), "$" != K() && J(), F = G = null, b && h.call(b) == n ? N((d = {}, d[""] = c, d), "", b) : c
                        }
                    }
                }
                i && a(function () {
                    return k
                })
            }(this)
        }, {}],
        48: [function (a, b, c) {
            function d(a, b) {
                var c = [];
                b = b || 0;
                for (var d = b || 0; d < a.length; d++) c[d - b] = a[d];
                return c
            }

            b.exports = d
        }, {}]
    }, {}, [1])(1)
}), function (a, b) {
    function c(a) {
        return function (b) {
            return Object.prototype.toString.call(b) === "[object " + a + "]"
        }
    }

    function d(a, b) {
        return f[a] ? void alert("modules: " + a + " already exists!!") : this instanceof d ? f[a] ? void 0 : (this.id = a, this.factory = b || g, f[a] = this, this) : new d(a, b)
    }

    function e(a, b) {
        var c, d = [], g = null;
        return (i(a) ? a : [a]).forEach(function (a) {
            if (g = f[a], !g) throw window.alert("modules: " + a + " is not found!!"), new Error("modules: " + a + " is not found!!");
            if (!g.exports) {
                var b = g.factory;
                c = b.call(null, e, g.exports || (g.exports = {}), g), "undefined" != typeof c ? (g.exports = c, g.factory = null) : g.exports = {}
            }
            d.push(g.exports)
        }), b ? b.apply(null, d) : d[0]
    }

    var f = {}, g = function () {
    }, h = Object.prototype.hasOwnProperty, i = c("Array");
    "function" != typeof Array.prototype.forEach && (Array.prototype.forEach = function (a, b) {
        for (var c = 0, d = this.length; d > c; c++) "function" == typeof a && h.call(this, c) && a.call(b, this[c], c, this)
    }), d.prototype.autoRun = function () {
        var a = this;
        setTimeout(function () {
            e(a.id)
        }, 1)
    }, a.define = d, a.require = e, a.modules = f, window.App = a
}({}), App.define("configuration", function () {
    return {TALK_URL: "http://ziker-talk.yun.pingan.com", FILE_URL: "https://ziker-static.yun.pingan.com/static"}
}), App.define("ioSocket", function (a) {
    var b = null, c = a("utils"), d = window.location, e = a("proxySocketEvent");
    a("configuration");
    return {
        socketId: null, initSocket: function (a, f) {
            if (b) return b;
            var g = d.protocol + "//" + d.host + "/" + a.channel.toLowerCase();
            return console.log("[socket_with_room:location]:" + g), b = io(g, {
                query: c.queryStringify(a),
                path: "/socket.io-client"
            }), e.set(b), this.onDisconnect(), this.onConnet(f), this.onReconneting(), this.onReconnet(), this
        }, isSocketActive: function () {
            return null !== b
        }, clearSocket: function () {
            b = null
        }, onDisconnect: function (a) {
            e.on("disconnect", function () {
                a && a()
            })
        }, onConnet: function (a) {
            var c = this;
            e.on("connect", function () {
                c.socketId = b.id, a && a(b), console.log("socket:连接成功")
            })
        }, onReconneting: function (a) {
            e.on("reconnecting", function () {
                console.log("socket:正在重新连接...."), a && a()
            })
        }, onReconnet: function (a) {
            e.on("reconnect", function () {
                console.log("socket:[重新]连接成功...."), a && a()
            })
        }, on: function (a, b) {
            this.isSocketActive() ? e.on(a, b) : alert("socket:监听失效:" + a)
        }, emit: function (a, b, c) {
            this.isSocketActive() ? e.emit(a, b, c) : alert("socket:发送失效" + a)
        }
    }
}), App.define("proxySocketEvent", function () {
    function a(a, b) {
        var d = c[a] || (c[a] = []);
        return d.push(b), c[a]
    }

    function b(a, b) {
        var d = c[a];
        if (d) {
            var e = d.length;
            if (e) for (var f = 0; e > f; f++) d[f](b)
        }
    }

    var c = {}, d = null;
    return {
        set: function (a) {
            d = a
        }, on: function (c, e) {
            if (/^local:/g.test(c)) return a(c, e);
            var f = a(c, e);
            1 === f.length && d.on(c, function (a) {
                b(c, a)
            })
        }, emit: function (a, c, e) {
            return /^local:/g.test(a) ? void b(a, c) : (d.emit(a, c), void(e && "function" == typeof e && e(c)))
        }, getAllSocketEvents: function () {
            return Object.keys(c)
        }
    }
}), App.define("message", function (a) {
    function b(a) {
        this.toUserName = a.toUserName, this.fromUserName = a.fromUserName, this.createTime = a.createTime || (new Date).getTime(), this.authorizerAppid = a.authorizerAppid, this.enterpriseId = a.enterpriseId, this.content = a.content, this.msgType = a.msgType, this.channel = a.channel, this.flow = a.flow, this.type = a.type || "text", this.displayType = a.displayType, this.msgId = "m" + (new Date).getTime() + 1e10 * Math.random(), this.receipt = !1, this.isFail = !1
    }

    var c = a("ioSocket"), d = a("utils"), e = document.getElementById("webim"),
        f = document.getElementById("chatboard"), g = "APPIM";
    (e || f) && (g = "WEBIM");
    var h = {msgType: "text", channel: g, displayType: "normal"};
    return {
        convertToStandardPackage: function (a, c) {
            if (a instanceof b) return a;
            var e = new b(h);
            return "string" != typeof a && (e = d.extend(e, a)), e.flow = c, e
        }, send: function (a, b) {
            a = this.convertToStandardPackage(a, "out"), c.emit("front:back:message", a), console.log("[out]:", a), b && b(a)
        }, sessionTimeout: function (a, b) {
            c.emit("session_timeout", a), b && b(a)
        }, listen: function (a, b) {
            1 === arguments.length && (b = a, a = "back:front:message"), c.on(a, function (a) {
                b(a)
            })
        }
    }
}), App.define("process", function () {
    var a = ["close_session", "first_response", "err", "text", "image", "image_upload", "leave_message", "leave_message_send", "leave_message_tip", "robot_transfer_man", "satisfaction_survey_send", "satisfaction_survey", "begin_queue", "agent_assign_success", "voice"],
        b = !0, c = function () {
        }, d = function () {
            this.handlers = {}
        };
    d.prototype.setHandler = function (a, b) {
        return this.handlers[a] = b || c, this
    };
    for (var e = 0; e < a.length; e++) !function () {
        var b = a[e];
        d.prototype[b] = function (a) {
            return this.setHandler(b, a)
        }
    }();
    return d.prototype.getHandler = function (a) {
        return this.handlers[a] || c
    }, d.prototype.middlewarify = function () {
        var a = this;
        return function (c) {
            var d = c.actionType || "MESSAGE", e = c.msgType || "text";
            switch (console.log("[in]:", c), b && (a.getHandler("first_response")(c), b = !1), d.toLowerCase()) {
                case"message":
                    e = e.toLowerCase(), a.getHandler(e)(c);
                    break;
                case"event":
                    var f = c.event.toLowerCase();
                    a.getHandler(f)(c)
            }
        }
    }, new d
}), App.define("utils", function () {
    function a(a, b) {
        if (a) for (var c in b) a[c] || (a[c] = b[c])
    }

    var b = window, c = Object.prototype.hasOwnProperty, d = Array.prototype.slice, e = document, f = {_cookie: {}};
    a(Date.prototype, {
        Format: function (a) {
            var b = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var c in b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 === RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
            return a
        }
    }), a(String.prototype, {
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)/g, "")
        }, escapeHTML: function () {
            return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
        }, escapeScript: function () {
            return this.replace(/(onerror|onunload)=[^<]*(?=\>)/gi, "").replace(/<script.*?>.*?<\/script>/gi, "")
        }
    }), a(Array.prototype, {
        indexOf: function (a) {
            var b = this.length, c = Number(arguments[1]) || 0;
            for (c = 0 > c ? Math.ceil(c) : Math.floor(c), 0 > c && (c += b); b > c; c++) if (c in this && this[c] === a) return c;
            return -1
        }, filter: function (a, b) {
            var c = this.length;
            if ("function" != typeof a) throw new TypeError;
            for (var d = [], e = 0; c > e; e++) if (e in this) {
                var f = this[e];
                a.call(b, f, e, this) && d.push(f)
            }
            return d
        }, map: function (a) {
            var b = this.length;
            if ("function" != typeof a) throw new TypeError;
            for (var c = new Array(b), d = arguments[1], e = 0; b > e; e++) e in this && (c[e] = a.call(d, this[e], e, this));
            return c
        }
    });
    var g = {
        isAttached: function (a, b) {
            return a.scrollTop + a.clientHeight + 1 >= a.scrollHeight && b && b(), g
        }, scroll: function (a) {
            a.scrollTop = a.scrollHeight
        }
    }, h = {
        isAttached: function (a, b) {
            return a.scrollTop <= 1 && b && b(), h
        }, scroll: function (a) {
            a.scrollTop = 0
        }
    };
    return {
        applyIf: a, bottom: g, top: h, debounce: function (a, b, c) {
            var d;
            return function () {
                var e = this, f = arguments, g = function () {
                    d = null, c || a.apply(e, f)
                }, h = c && !d;
                clearTimeout(d), d = setTimeout(g, b || 500), h && a.apply(e, f)
            }
        }, cache: function (a, b) {
            return 2 !== arguments.length ? f[a] : void(f[a] = b)
        }, createGuestId: function (a) {
            return a ? a + ":" + this.uuid() : this.uuid()
        }, uuid: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                var b = 16 * Math.random() | 0, c = "x" === a ? b : 3 & b | 8;
                return c.toString(16)
            })
        }, queryStringify: function (a) {
            var b = Object.keys(a).filter(function (b) {
                return void 0 !== a[b] && "" !== a[b]
            }).map(function (b) {
                return b + "=" + a[b]
            }).join("&");
            return b
        }, getUrlparams: function (a, c) {
            var d = {};
            return (c || b.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, b, c) {
                d[b] = c
            }), a ? d[a] : d
        }, buildTemplate: function (a, b) {
            if (!b) return a;
            for (var c = [], d = /\\?\{+([^{}]+)\}+/gim, e = b.constructor === Array ? b : [b], f = 0, g = e.length; g > f; f++) c.push(a.replace(d, function (a, b) {
                var c = e[f][b];
                return c ? c : ""
            }));
            return c.join("").escapeScript()
        }, appendUrlParams: function (a, b) {
            return b = "object" == typeof b ? this.queryStringify(b) : b, (a + "&" + b).replace(/[&?]{1,2}/, "?")
        }, extend: function () {
            var a, b, d = arguments[0] || {}, e = 1, f = arguments.length;
            for (f === e && (d = this, --e); a = arguments[e++];) for (b in a) c.call(a, b) && (d[b] = a[b]);
            return d
        }, setCookie: function (a, b, c) {
            var d = "";
            if (c) {
                var f = new Date;
                f.setTime(f.getTime() + 1e3 * c), d = "; expires=" + f.toGMTString()
            }
            e.cookie = a + "=" + b + d + "; path=/"
        }, getCookie: function (a) {
            for (var b = a + "=", c = e.cookie.split(";"), d = 0; d < c.length; d++) {
                for (var f = c[d]; " " === f.charAt(0);) f = f.substring(1, f.length);
                if (0 === f.indexOf(b)) {
                    var g = f.substring(b.length, f.length);
                    return g
                }
            }
            return null
        }, getTimeDifference: function (a, b) {
            return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 1e3
        }, getRealLength: function (a) {
            if (a) {
                for (var b = 0, c = a.length, d = -1, e = 0; c > e; e++) d = a.charCodeAt(e), b += d >= 0 && 128 >= d ? 1 : 3;
                return b
            }
        }, queueTask: function (a, b) {
            !function c() {
                a.length > 0 && a.shift().apply(b || a, [c].concat(d.call(arguments, 0)))
            }()
        }, isEmptyObject: function (a) {
            for (var b in a) if (a.hasOwnProperty(b)) return !1;
            return !0
        }, delay: function (a, b) {
            var c = d.call(arguments, 2);
            return setTimeout(function () {
                return a.apply(null, c)
            }, b || 7)
        }, listen: function (a, c) {
            b.addEventListener ? b.addEventListener(a, c, !1) : b.attachEvent("on" + a, c)
        }, isTel: function (a) {
            var b = /^\d{6,20}$/;
            return b.test(a)
        }, isEmail: function (a) {
            var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return b.test(a)
        }, runParamsCheck: function (a) {
            return a.eid && a.authorizerAppid ? !0 : (window.alert("缺少企业eid或者authorizerAppid"), !1)
        }, randomString: function (a) {
            a = a || 32;
            for (var b = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", c = b.length, d = "", e = 0; a > e; e++) d += b.charAt(Math.floor(Math.random() * c));
            return d
        }, createRichView: function (a, b) {
            var c = $("<div></div>").attr("contenteditable", "false").css({width: "100%", height: "100%"}).html(b);
            $(a).html(c)
        }, removeTableStyle: function (a) {
            if (!(a && a.indexOf("table") > -1)) return a;
            try {
                return a.replace(/width="?\d+"?/, "").replace(/width:\s+?\d+pt/, "").replace(/ %/, "").replace(/""/, '"').replace(/%"/, "")
            } catch (b) {
                return a
            }
        }, stringToObject: function (a) {
            return "string" == typeof a && a.constructor === String ? JSON.parse(a) : a
        }
    }
}), App.define("piczoom", function (a) {
    function b(a) {
        if (jQuery.browser.msie) {
            var b = a.value, c = new Image;
            return c.src = b, c.fileSize / 1048576 > 2 ? (alert("图片超过2M，请选择小于2M图片"), !1) : !0
        }
        return a.files[0].size / 1048576 > 2 ? (alert("图片超过2M，请选择小于2M图片"), !1) : !0
    }

    function c(a) {
        var b = a.value;
        return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(b) ? !0 : (alert("图片类型必须是.gif,jpeg,jpg,png中的一种"), !1)
    }

    function d(a) {
        var b;
        return b = void 0 !== window.createObjectURL ? window.createObjectURL(p.getElementById(a).files.item(0)) : void 0 !== window.URL ? window.URL.createObjectURL(p.getElementById(a).files.item(0)) : void 0 !== window.webkitURL ? window.webkitURL.createObjectURL(p.getElementById(a).files.item(0)) : p.getElementById(a).value
    }

    function e(a, b) {
        var c = p.createElement("img");
        c.src = a, c.setAttribute("id", "img" + b), c.setAttribute("class", "thumbnailImage");
        var d = c.outerHTML;
        p.getElementById("reditor").focus(), g(d)
    }

    function f(a, b) {
        var c = p.createElement("img");
        c.src = a, c.setAttribute("id", "img" + b), c.setAttribute("class", "thumbnailImage");
        var d = c.outerHTML;
        return d
    }

    function g(a) {
        var b, c;
        if (window.getSelection) {
            if (b = window.getSelection(), b.getRangeAt && b.rangeCount) {
                c = b.getRangeAt(0), c.deleteContents();
                var d = p.createElement("div");
                d.innerHTML = a;
                for (var e, f, g = p.createDocumentFragment(); e = d.firstChild;) f = g.appendChild(e);
                c.insertNode(g), f && (c = c.cloneRange(), c.setStartAfter(f), c.collapse(!0), b.removeAllRanges(), b.addRange(c))
            }
        } else p.selection && "Control" !== p.selection.type && p.selection.createRange().pasteHTML(a)
    }

    function h(a) {
        var b = A ? A.attr("path") : "", c = $(a.target) ? $(a.target).attr("path") : "", d = A ? A.attr("class") : "";
        if (b && c) {
            try {
                z.pause(), z.currentTime = 0
            } catch (a) {
            }
            A.removeClass("voice-gif")
        }
        if (!(c === b && d.indexOf("voice-gif") > -1) && c) {
            a.preventDefault(), A = $(a.target);
            try {
                z.src = c, z.play(), A.addClass("voice-gif"), A.children().hide(), z.onended = function () {
                    A.removeClass("voice-gif")
                }
            } catch (a) {
                console.error(a)
            }
        }
    }

    function i(a) {
        if (!x) {
            var b = $(a.target).attr("src");
            "IMG" === $(a.target)[0].tagName && "thumbnailImage" === $(a.target).attr("class") && (a.preventDefault(), $("#mskeLayBg").length ? (B.attr("src", b), $("#mskeLayBg").show()) : ($("body").append(t.htmlPicView), B = $("#mskelayBox img"), B.attr("src", b).attr("class", "contentImg")), $(".img-status").hide())
        }
    }

    function j() {
        $("#mskeLayBg").hide(), $(".img-status").show()
    }

    function k() {
        var a = "div" + Date.parse(new Date), b = p.createElement("div");
        return b.setAttribute("id", a), $(b).hide(), p.body.appendChild(b), $(b).append($("#content_icon input[type=file]")), a
    }

    function l() {
        $("#content_icon").children().each(function () {
            var a, b = $(this)[0].id.replace(/[^0-9]/gi, "");
            $("#reditor").children().each(function () {
                var c = $(this)[0].id.replace(/[^0-9]/gi, "");
                c === b && (a = 1)
            }), !a && $("#content_icon").children().remove("#" + b)
        })
    }

    function m() {
        var a = this.contentCashe();
        $("#" + a).children("input[type=file]").each(function () {
            var a = "img" + $(this)[0].id.replace(/[^0-9]/gi, "");
            n(a)
        }), p.body.removeChild(p.getElementById(a))
    }

    function n(a, b) {
        var c = q.getCookie(r.official.authorizerAppid + "_guestId");
        console.log("[uploadImageToNas]:", c);
        var d = "";
        isNaN(a) ? d = "file" + a.replace(/[^0-9]/gi, "") : (d = "chooseInput", a = "img" + a), d && ($("#" + d).upload({
            url: "/backend/talk/client/image/save",
            params: {channel: C.channel, authorizerAppid: C.authorizerAppid, imageId: a, guestId: c},
            onSend: function (a, b) {
                return alert(a + b), !0
            },
            onComplate: function (a) {
                b(null, a)
            },
            onError: function (c) {
                var d = JSON.parse(c.responseText);
                "000000" !== d.resultCode && $("#" + a).trigger("image_empty", c), b(c, null)
            }
        }), $("#" + d).upload("ajaxSubmit"))
    }

    function o(a) {
        s.on("change", function () {
            if ("close" === r.status.session) return void alert("会话已关闭");
            if (c($(this)[0])) {
                var b = Date.parse(new Date) + 1e17 * Math.random();
                console.log(b), a(null, null, b), n(b, function (a, b) {
                }), $(this)[0].value = ""
            }
        })
    }

    var p = document, q = a("utils"), r = a("imService"), s = $("#chooseInput"), t = a("uiHtmlPiece"),
        u = q.getUrlparams(), v = u.channel, w = u.authorizerAppid, x = p.getElementById("chatboard"),
        y = (p.getElementById("webim"), p.getElementById("appim")), z = null, A = null, B = null;
    window.Audio && "function" == typeof window.Audio && (z = new window.Audio), s || alert("缺少图片上传按钮");
    var C = {authorizerAppid: w, channel: v};
    return q.setCookie("eid", u.eid), $(document).on(y ? "touchend" : "click", function (a) {
        i(a), h(a)
    }), {
        hasFormData: window.FormData,
        appendImage: o,
        removeInputFile: l,
        contentCashe: k,
        getFileUrl: d,
        uploadPic: m,
        insertHtmlToDiv: e,
        checkPictureType: c,
        checkFileChange: b,
        closeBackgrundPop: j,
        reviewImageToDiv: f,
        uploadImageToNas: n
    }
}), App.define("imService", function (a, b) {
    function c() {
        return ca ? (sa = "PLUS", ta = "WEBIM") : ea ? (sa = "MINI", ta = "CHATBOARD") : da && (sa = "H5", ta = "APPIM"), sa
    }

    function d() {
        return ta
    }

    function e(a, b) {
        y(a, function (a, c) {
            "OFF" === c && pa.hide(), "ON" !== c || "CLOSE_SESSION" !== b && 200 !== b.agentId && 0 !== b.agentId ? pa.hide() : pa.show(), console.log("[机器人开关:]", ra.robot), "OFF" === ra.robot && (window.robot_transfer_man = !0)
        })
    }

    function f(a) {
        "ON" !== ra.robot || 200 !== a.agentId && 0 !== a.agentId ? pa.hide() : pa.show()
    }

    function g(a) {
        return -1 !== a.content.indexOf(oa)
    }

    function h(a) {
        return V.getRealLength(a) > 600 ? (alert("文字长度不宜超过600个字符"), !1) : "" === a ? (alert("你懂的,输入不能为空"), !1) : "close" === ra.session ? (alert("本次会话已结束,请重新请求服务."), !1) : !0
    }

    function i(a, b, c) {
        window.robot_transfer_man && "OFF" !== ra.overTimeStatus && a && (M(), window._stime = setInterval(function () {
            (new Date).getTime() - a >= ra.overTime && b()
        }, ra.overTime), window._sinterv = setTimeout(c, ra.overTimeNotice))
    }

    function j(a) {
        return m("/backend/open/api/enterprise/logo/get").success(function (b) {
            "000000" === b.resultCode ? a(null, b) : a("err", null)
        }).error(function (b) {
            a(b, null)
        })
    }

    function k() {
        var a = {cid: _, channel: fa};
        return m("/backend/talk/client/get/guestid", a)
    }

    function l(a) {
        var b = null;
        try {
            b = JSON.stringify({
                enterpriseId: Y.enterPriseId,
                authorizerAppid: Y.authorizerAppid,
                guestId: a,
                channel: fa,
                nickname: decodeURIComponent(Y.nickname || ""),
                cid: _,
                headimgurl: Y.headimgurl,
                msgInfo: Y.msgInfo,
                mpOpenId: Y.openid,
                mpAuthorizerAppid: Y.appid,
                extraInfo: JSON.stringify({
                    sex: Y.sex,
                    mail: Y.mail,
                    tel: Y.tel,
                    browser: platform.name + ":" + platform.version,
                    platform: platform.table(),
                    os: platform.os.toString()
                })
            })
        } catch (c) {
            throw new Error(c)
        }
        return n("/backend/talk/client/update", b)
    }

    function m(a, b) {
        return o(a, b, "GET")
    }

    function n(a, b) {
        return o(a, b, "POST")
    }

    function o(a, b, c) {
        var d = {url: a, timeout: 4e3, data: b, dataType: "json", type: c, headers: {enterpriseId: Z}};
        if ("POST" === c && (d.contentType = "application/json; charset=utf-8"), b && b.headers) for (var e in b.headers) d.headers[e] = b.headers[e];
        var f = $.ajax(d);
        return f
    }

    function p() {
        var a = Y.nickname || "第三方匿名";
        return {
            cid: _,
            headimgurl: Y.headimgurl,
            nickname: decodeURIComponent(a),
            sex: Y.sex,
            mail: Y.mail,
            tel: Y.tel,
            remark: Y.remark,
            msgInfo: Y.msgInfo
        }
    }

    function q() {
        var a = {
            guestId: qa.fromUserName,
            enterPriseId: Z,
            authorizerAppid: Y.authorizerAppid,
            channel: fa,
            inBoundUrl: encodeURIComponent(window.location.href)
        };
        a.mpOpenId = Y.openid, a.mpAuthorizerAppid = Y.appid;
        try {
            a.browser = platform.otherBrowser() || platform.name + " " + platform.version || "未知浏览器", a.os = platform.os.toString(), a.platform = platform.table()
        } catch (b) {
            a.browser = "未知浏览器", a.os = "window", a.platform = "window"
        }
        return Y.spolicy && (a.spolicy = Y.spolicy), console.log("[socketQuery4]:", a), _ && V.extend(a, p()), a
    }

    function r(a) {
        var b = {};
        return "string" == typeof a ? (V.extend(b, qa), b.content = a) : V.extend(b, qa, a), b
    }

    function s(a) {
        var b = Y.msgInfo && decodeURIComponent(Y.msgInfo) || "[系统提示] 您的客户 {{nickname}} 正在请求服务";
        W.send(r({firstInbound: !0, displayType: "system", content: a || b}))
    }

    function t(a) {
        if (_ && a && !ua) {
            var b = p(), c = JSON.stringify({
                clientId: a,
                cid: b.cid,
                mobile: b.tel,
                remark: b.remark,
                gender: b.sex,
                name: b.nickname,
                headimgurl: b.headimgurl,
                msgInfo: b.msgInfo,
                email: b.mail,
                channel: fa
            });
            return n("/backend/talk/client/customer/save", c).success(function (a) {
                ua = !0
            })
        }
    }

    function u(a, b) {
        if (!(ra.totalPage && ha > ra.totalPage) && ra.hasHistory) {
            var c = {count: ha++};
            return v(c).success(function (a) {
                if ("000000" !== a.resultCode) return void(ra.hasHistory = !1);
                ra.totalPage = a.data.totalPage;
                var c = a.data.listData;
                c.length >= 1 ? (c = c.reverse(), b && b(c)) : ra.hasHistory = !1
            })
        }
    }

    function v(a) {
        var b = JSON.stringify({
            guestId: qa.fromUserName || ga,
            channel: fa || "WEBIM",
            pageSize: a.pageSize || 20,
            currentPage: a.count || 1,
            chatTime: a.now || ra.firstSessionTimestamp || ia
        });
        return n("/backend/talk/client/chat_log", b)
    }

    function w() {
        ra.unread = 0, ja.html("")
    }

    function x() {
        W.send(r("人工客服"), function (a) {
            console.log("转人工" + JSON.stringify(a))
        })
    }

    function y(a, b) {
        return m("/backend/talk/client/robot/channel/switch/get/" + a).success(function (a) {
            "000000" === a.resultCode ? (ra.robot = a.data, b && b(null, ra.robot)) : b && b(a, ra.robot)
        }).error(function (a) {
            ra.robot = "OFF", b && b(a, null)
        })
    }

    function z(a, b) {
        return m("/backend/talk/client/enterprise/get/switch/" + a).success(function (a) {
            if ("000000" === a.resultCode) {
                var c = a.data;
                if ("string" == typeof a.data) try {
                    c = JSON.parse(a.data), ra.overTimeStatus = c.overTimeStatus || "OFF", ra.overTime = 1e3 * c.overTime, ra.overTimeReply = c.overTimeReply, ra.overTimeNotice = 1e3 * c.overTimeNotice, ra.overTimeNoticeReply = c.overTimeNoticeReply, ra.systemPush = c.systemPush
                } catch (d) {
                    console.error("getCurrChannelReply:", d)
                }
                b && b(null, c)
            } else b && b(a, null)
        }).error(function (a) {
            b && b(a, null)
        })
    }

    function A(a) {
        var b = JSON.stringify({guestId: qa.fromUserName, channel: fa});
        return n("/backend/talk/client/get/artificial/session", b).success(function (b) {
            "000000" === b.resultCode && a && a(null, b.data)
        }).error(function (b) {
            a && a(b, null)
        })
    }

    function B(a) {
    }

    function C(a, b) {
        return n("/backend/talk/client/work_order/add", JSON.stringify(a)).success(function (a) {
            b && b(null, a)
        }).error(function (a) {
            b && b(a, null)
        })
    }

    function D(a) {
        return m("/backend/talk/client/work_order/effective").success(function (b) {
            "000000" === b.resultCode && (ra.leaveMessageRight = b.data, a && a())
        })
    }

    function E(a) {
        return m("/backend/talk/client/customer_ib_queue/before/" + qa.fromUserName).success(function (b) {
            b.data = b.data > -1 ? b.data : 0, a && a(null, b)
        }).error(function (b) {
            a && a(b, null)
        })
    }

    function F(a) {
        return m("/backend/talk/client/customer_ib_queue/remove/" + qa.fromUserName).success(function (b) {
            a && a(null, b)
        }).error(function (b) {
            a && a(b, null)
        })
    }

    function G(a, b) {
        return n("/backend/talk/client/satisfaction_survey/comment", JSON.stringify(a)).success(function (a) {
            b && b(null, a)
        }).error(function (a) {
            b && b(a, null)
        })
    }

    function H(a) {
        return m("/backend/talk/client/robot/nickname/get").success(function (b) {
            "000000" === b.resultCode ? (ra.robotname = b.data || "小伺", a && a(null, b.data)) : a && a(b, b.data)
        }).error(function (b) {
            a && a(b, null)
        })
    }

    function I(a) {
        if (ka) if (0 === a.agentId) ma.show(), ka.html("客服全忙"), la.attr("src", "/assets/images/icon_50_2.png"); else if (200 === a.agentId) ma.hide(), ka.html("机器人 [" + a.agentName.escapeHTML() + "] 正在为您服务..."), la.attr("src", "/assets/images/head_r.png"); else {
            ma.show();
            var b = a.nickName || a.agentName;
            ka.html("客服 [" + b.escapeHTML() + "] 正在为您服务...");
            var c = a.headImgUrl ? X.FILE_URL + "/" + a.headImgUrl : "/assets/images/icon_50_2.png";
            la.attr("src", c)
        }
    }

    function J(a) {
        return n("/backend/talk/client/function_effective/get", JSON.stringify({channel: fa})).success(function (b) {
            "000000" === b.resultCode ? (ra.isFunctionEffective = b.data, a && a(null, ra.isFunctionEffective)) : a && a(b, ra.isFunctionEffective)
        }).error(function (b) {
            ra.isFunctionEffective = !1, a && a(b, null)
        })
    }

    function K(a, b) {
        var c = aa + "_guestId";
        if ("anonymous" === a) {
            var d = V.getCookie(c);
            return d && /^temp/.test(d) ? V.setCookie(c, d, ra.lasttime) : V.setCookie(c, V.createGuestId("temp"), ra.lasttime), void(qa.fromUserName = V.getCookie(c))
        }
        a ? V.setCookie(c, a) : V.setCookie(c, V.createGuestId()), qa.fromUserName = V.getCookie(c)
    }

    function L() {
        V.bottom.scroll(na)
    }

    function M() {
        try {
            clearInterval(window._stime), clearTimeout(window._sinterv)
        } catch (a) {
        }
    }

    function N(a) {
        "granted" === $.notification.permissionLevel() && $.notification({
            iconUrl: "/assets/images/head_server.png",
            title: "im提醒",
            body: a
        })
    }

    function O() {
        0 === $("#leaveWordsContent").val().length ? $("#leaveWordsContent").css("border", "1px solid red") : $("#leaveWordsContent").css("border", "1px solid #cbd3dd")
    }

    function P() {
        A(function (a, b) {
            "Y" === b ? alert("您当前正和人工客服沟通中") : s()
        })
    }

    function Q(a, b) {
        var c = JSON.stringify(a);
        return n("/backend/talk/client/official_account/get", c).success(function (a) {
            b && b(null, a)
        }).error(function (a) {
            b && b(a, null)
        })
    }

    function R(a, b) {
        return m("/backend/open/api/knowledge/content/get/" + a).success(function (a) {
            "000000" === a.resultCode ? b(null, a.data) : b("err", null)
        }).error(function (a) {
            b(a, null)
        })
    }

    function S(a) {
        return m("/backend/talk/client/enterprise/advertisement_config/get").success(function (b) {
            "000000" === b.resultCode ? a(null, b) : a && a(b, null)
        }).error(function (b) {
            a && a(b, null)
        })
    }

    function T(a) {
        return n("/backend/talk/client/advertisement_log/add", JSON.stringify(a))
    }

    function U(a) {
        return n("/backend/open/api/talk/unread_message/reset", JSON.stringify(a))
    }

    var V = a("utils"), W = a("message"), X = a("configuration"), Y = V.getUrlparams(), Z = Y.eid || "xxxx", _ = Y.cid,
        aa = Y.authorizerAppid, ba = Y.agentId, ca = document.getElementById("webim"),
        da = document.getElementById("appim"), ea = document.getElementById("chatboard"), fa = "APPIM";
    (ca || ea) && (fa = "WEBIM"), "null" !== _ && "undefined" !== _ || (_ = "");
    var ga = V.uuid(), ha = 1, ia = +new Date, ja = $("#unread-msg"), ka = $("#agentName"), la = $("#imlogo"),
        ma = $("#ball-scale-multiple"), na = document.getElementById("chatContent"), oa = "WorkOrderMessage",
        pa = $("#btnTransferMan");
    $.notification.requestPermission(function () {
        console.log("notification:", $.notification.permissionLevel())
    });
    var qa = {fromUserName: "{guestId}", toUserName: aa, authorizerAppid: aa, enterpriseId: Z, agentId: ba}, ra = {
        inited: !1,
        robot: null,
        leaveMessageRight: null,
        session: null,
        hasHistory: !0,
        totalPage: null,
        firstSessionTimestamp: ia,
        isOpen: !1,
        lasttime: 43200,
        unread: 0,
        overTime: "",
        overTimeNotice: "",
        overTimeReply: "",
        overTimeNoticeReply: "",
        overTimeStatus: "",
        systemPush: "Y",
        isFunctionEffective: !1
    }, sa = "APPIM", ta = "APPIM", ua = !1;
    return {
        status: ra,
        setTransferManBtnStatus: e,
        isRobotTransferShow: f,
        official: qa,
        contentValid: O,
        sendReceipt: B,
        isValidMessage: h,
        resetUnreadMsg: w,
        inBound: s,
        autoWire: r,
        collectParams: q,
        getThirdPartyInfo: p,
        doGet: m,
        doPost: n,
        getEnterPriseLogo: j,
        fetchHistoryLog: u,
        recognizeGuest: k,
        saveGuest: l,
        createGuest: K,
        sendKayWordsMessage: x,
        getCurrChannelRobotSwitch: y,
        getArtificialSession: A,
        saveGuestSurveyInfo: G,
        saveGuestLeaveWords: C,
        isHaveLeaveMessageRight: D,
        getNicknameOfRobot: H,
        getAgentName: I,
        imgDone: L,
        isLeaveMessage: g,
        getCurrChannelReply: z,
        clearTimer: M,
        notify: N,
        getGuestQueueCount: E,
        quitQueue: F,
        reconnectService: P,
        saveCustomerInfo: t,
        getEnterpriseFunctionStatus: J,
        getEnterpriseInfo: Q,
        getStyle: c,
        getType: d,
        getKnowledgecontentById: R,
        getAdvertisement: S,
        advertisementLog: T,
        resetGuestUnreadMessage: U,
        sessionChecker: i
    }
}), App.define("themeColor", function (a) {
    function b(a) {
        var b, f, g, h = e[a];
        if (!d) {
            h ? (document.body.classList.add(a), b = h.customColor, f = h.customHeader, g = h.customTheme) : (c = !0, b = f = g = "#" + a);
            var i = '<style type="text/css">.header {background:' + f + "}.send-btn {background:" + g + "}.ball-beat > div {background:" + g + "}.user-message .ico-triangle {background:" + b + "}.user-message .ico-triangle:after{  border-color: transparent transparent transparent " + b + "}.saveSurvey{  background-color:" + g + "}.guestSurveyText textarea:focus {  border-color: " + g + "}.header-img{  background:" + g + "}.message_tip p,.leave-message-tip p{ background:" + b + ";color:" + g + "}.qq-face:hover,.upload-btn:hover,.btnTransferMan:hover,.leaveWords:hover,.satisfication_survey:hover{  color:" + g + "}</style>";
            c && (i += i + '<style type="text/css">.user-message .ico-triangle {opacity:0.7;color:white}.header-img{opacity:0.9}.message_tip p,.leave-message-tip p{color:white}.guestSurveyOption .active{border:1px solid ' + b + "}</style>"), $("head").append(i)
        }
    }

    var c = !1, d = document.getElementById("chatboard"), e = {
        defaults: {customTheme: "#07c5ba", customColor: "#cbf4f9", customHeader: "#07c5ba"},
        orange: {customTheme: "#f55848", customColor: "#ffefed", customHeader: "#f55848"},
        white: {customTheme: "#ffac8d", customColor: "#ffefed", customHeader: "#ffffff"}
    };
    return {render: b}
}), App.define("htmlPiece", function () {
    var a = '<div class="message-warp"><div class="date-time">{{timer}}</div><div class="{{owner}}-message message clearfix"><div class="header-img"><img src="{{headimgurl}}" /> </div><div class="chat-msg-cont {{direction}}"><div class="ico-triangle editcontent" id={{eleid}}></div></div></div></div>',
        b = '<div class="message-warp"><div class="date-time">{{timer}}</div><div class="{{owner}}-message message clearfix"><div class="header-img"><img src="{{headimgurl}}" /> </div><div class="chat-msg-cont {{direction}}"><div class="ico-triangle" id={{knowledgeId}}>{{content}}</div></div></div></div>',
        c = '<div class="message-warp"><div class="msg-title msg-title-{{direction}}"> <span class="date-time">{{timer}}</span></div>    <div class="{{owner}}-message message clearfix">      <div class="chat-msg-cont {{direction}}">        <div class="ico-triangle" id={{eleid}}>{{content}}}</div>      </div>    </div></div>',
        d = '<div class="message-warp">      <div class="date-time">{{timer}}</div>      <div class="{{owner}}-message message clearfix">        <div class="header-img"><img src="{{headimgurl}}"></div>        <div class="chat-msg-cont {{direction}}">          <div class="ico-triangle">            <a class="product-news" href="{{productUrl}}" target="_blank">              <img class="product-news-img" src="{{productImage}}">              <div class="product-news-content">                <p class="product-news-title" title="{{productTitle}}">{{productTitle}}</p>                <p class="product-news-description" title="{{productDescription}}">{{productDescription}}</p>              </div>            </a>          </div>        </div>      </div>    </div>',
        e = '<div class="message-warp">      <div class="msg-title msg-title-{{direction}}"><span class="date-time">{{timer}}</span></div>      <div class="{{owner}}-message message clearfix">        <div class="chat-msg-cont {{direction}}">          <div class="ico-triangle">            <a class="product-news" href="{{productUrl}}" target="_blank">              <img class="product-news-img" src="{{productImage}}">              <div class="product-news-content">                <p class="product-news-title" title="{{productTitle}}">{{productTitle}}</p>                <p class="product-news-description" title="{{productDescription}}">{{productDescription}}</p>              </div>            </a>          </div>        </div>      </div>    </div>',
        f = "<div class='message_tip'><p onclick=\"App.modules.imService.exports.reconnectService()\">本次服务已结束,<span> 点击这里 </span>重新请求服务</p></div>",
        g = "<div class='message_tip'><p onclick=\"App.modules.imService.exports.reconnectService()\">{{content}}<span> 点击这里 </span>重新请求服务</p></div>",
        h = "<div class='message_tip'><p>{{content}}</div>",
        i = "<div class='message_tip' onclick=\"App.modules.messageOrder.exports.toggleGuestLeavewords()\"><p>留言</p></div>",
        j = "<div class='leave-message-tip'><p>您已成功提交留言</p></div>",
        k = "<div class='message_tip'><p>已帮您连通客服【客服昵称】</p></div>", l = "<div class='message_tip'><p>您已成功提交评价</p></div>",
        m = '<div id="guestSurveyBox" style="width:{{width}}px;margin:20px auto">    <div class="guestSurveyBox">    <p class="guestSurveyTitle"><span>您对本次服务是否满意?</span> <i></i></p>  <ul class="guestSurveyOption">    <li data-option="HIGH" class="active" onclick="App.modules.guestSurvey.exports.selectGuestSurvey(this)"><i class="dface hight_face"></i>满&nbsp;&nbsp;意</li>    <li data-option="MIDDLE" onclick="App.modules.guestSurvey.exports.selectGuestSurvey(this)"><i class="dface middle_face"></i>一&nbsp;&nbsp;般</li>    <li data-option="LOW" onclick="App.modules.guestSurvey.exports.selectGuestSurvey(this)"><i class="dface low_face"></i>不满意</li>    </ul>    <div class="guestSurveyText">    <textarea style="height:{{height}}px" id="guestSurveyContent" class="guestSurveyContent" placeholder="称赞or吐槽" maxlength="100"></textarea>    <button class="saveSurvey satisfaction_pos" onclick="App.modules.guestSurvey.exports.saveGuestSurvey()">提&nbsp;&nbsp;交</button></div></div></div>',
        n = '<div id="leaveWordsBox" style="width:60%;margin:20px auto"><div class="leaveWordsBox"><p class="leaveWordsTitle"><span>留言</span> <i></i></p><div class="leaveWordsText"><input class="leaveWordsPhone" placeholder="电话" maxlength="20" onchange="App.modules.messageOrder.exports.phoneValid()"><input class="leaveWordsEmail" placeholder="邮箱" onchange="App.modules.messageOrder.exports.emailValid()"><textarea id="leaveWordsContent" placeholder="问题描述(必填)" maxlength="400" required onchange="App.modules.imService.exports.contentValid()"></textarea><button class="saveSurvey leavemessage_pos" onclick="App.modules.messageOrder.exports.saveGuestLeaveWords()">提&nbsp;&nbsp;交</button><p class="leaveWordsFail"><span>提交失败 !</span> </p></div></div></div>',
        o = '<div class="message_tip"><p class="quene_tip" onclick="App.modules.guestQueue.exports.getGuestQueueCount()" >前面还有【{{count}}】位客户在等待。<br>每隔一分钟系统自动为您<span class="quene_tip_query">查询排队情况</span>。',
        p = '<div class="message_tip"><p class="quene_tip" onclick="App.modules.guestQueue.exports.getGuestQueueCount()" >前面还有【{{count}}】位客户在等待。每隔一分钟系统自动为您<span class="quene_tip_query">查询排队情况</span>。',
        q = '<div class="message_tip"><p onclick="App.modules.guestQueue.exports.quitQueue()" ><span class="quene_tip_query">点击这里</span>退出排队</p></div>',
        r = '<div class="message_tip"><p onclick="App.modules.messageOrder.exports.toggleGuestLeavewords()">您已退出排队。<span class="quene_tip_query">点击这里</span>留言，稍后客服联系您</p></div>';
    return {
        htmlText: b,
        htmlMinText: c,
        htmlProductNews: d,
        htmlMinProductNews: e,
        htmlCloseTip: f,
        htmlRobotTransferManTip: k,
        htmlSurvey: m,
        htmlLeaveWords: n,
        guestSurvyTip: l,
        htmlLeaveMessage: i,
        htmlTimeout: g,
        leaveMessageTip: j,
        htmlNotify: h,
        htmlCountQueneAppIm: o,
        htmlCountQueneWebIm: p,
        htmlQueryQueneInfo: q,
        afterQuitQueneMessage: r,
        richText: a
    }
}), App.define("uiHtmlPiece", function () {
    var a = '<div class="mskeLayBg" id="mskeLayBg" onclick="App.modules.piczoom.exports.closeBackgrundPop()"><div class="mskelayBox" id="mskelayBox"><img></div><img class="mskeClaose" src="../../assets/images/icon_close_01.png"/></div>';
    return {htmlPicView: a}
}), App.define("htmlTemplate", function (a) {
    function b(a, g) {
        a.content && a.richText === !1 && (a.content = a.content.replace(/\n/g, "<br/>")), a.richText && (a.richTextContent = i.removeTableStyle(a.richTextContent || ""));
        var h = null, j = "";
        a = a instanceof Array ? a : [a];
        var k = a.length;
        g && (h = "out" !== g.toLowerCase());
        for (var m = 0; k > m; m++) g || (h = "out" === a[m].flowDirection.toLowerCase()), j = a[m].type, j && "image" === j.toLowerCase() && b.image(a[m]), j && "voice" === j.toLowerCase() && b.voice(a[m]), b.agentName(a[m], h), a[m].owner = h ? "agent" : "user", a[m].direction = h ? "fl" : "fr", b.headimgurl(a[m], h), a[m].timer = e(a[m].chatTime || a[m].createTime), f(a[m]), l.faceFilter(a[m]), a[m].channelExtendMessage && d(a[m]), g || (h = null), "link_news" !== a[m].msgType && "LINK_NEWS" !== a[m].type || (a[m].content = c(a[m].content))
    }

    function c(a) {
        return i.buildTemplate('<a class="product-news" href="{{url}}" target="_blank"><img class="product-news-img" src="{{image}}"><div class="product-news-content"><p class="product-news-title" title="{{title}}">{{title}}</p><p class="product-news-description" title="{{description}}">{{description}}</p></div></a>', i.stringToObject(a))
    }

    function d(a) {
        try {
            var b = JSON.parse(a.channelExtendMessage);
            if (b.richText) {
                var c = b.encryptKnowledgeId, d = "K" + x++;
                return a.knowledgeId = d, k.getKnowledgecontentById(c, function (a, b) {
                    $("#" + d).html(i.removeTableStyle(b))
                }), c
            }
        } catch (e) {
            return ""
        }
    }

    function e(a) {
        return a = a || +new Date, u ? void(i.getTimeDifference(u, a) > r && (u = "")) : (u = a, new Date(a).Format("MM-dd hh:mm"))
    }

    function f(a) {
        if (v.test(a.content) || w.test(a.content)) {
            var b = "", c = "", d = "", e = a.content.indexOf(" ");
            e > 0 ? (b = a.content.slice(0, e), c = a.content.slice(e, a.content.length)) : b = a.content, d = (w.test(b) ? "http://" : "") + b, a.content = '<a target=_blank href="' + d + '">' + b + "</a>" + c
        }
    }

    var g = document, h = a("htmlPiece"), i = a("utils"), j = a("configuration"), k = a("imService"), l = a("qqface"),
        m = "./images/head_visitor.png", n = "./images/head_server.png", o = "./images/robot_head.png", p = "点击这里留言",
        q = {WorkOrderMessage: p}, r = 180, s = 200, t = "小 C", u = "", v = /^((http)|(https))\:\/\//, w = /^www/;
    k.getNicknameOfRobot(function (a, b) {
        b && (t = b)
    });
    var x = 100;
    b.image = function (a) {
        var b = g.createElement("img");
        b.src = j.FILE_URL + "/" + a.content, b.setAttribute("class", "thumbnailImage"), a.content = b.outerHTML
    }, b.voice = function (a) {
        var b = j.FILE_URL + "/" + a.content;
        a.content = '<div class="voice" path=' + b + "></div>"
    }, b.agentName = function (a, b) {
        b ? a.agentId === s ? a.agentName = t : /undefined/g.test(a.agentName) || !a.agentName ? a.agentName = "" : a.agentName = a.agentName : a.agentName = ""
    }, b.headimgurl = function (a, b) {
        b ? a.agentId === s ? a.headimgurl = o : a.headimgurl = a.headImgUrl ? j.FILE_URL + "/" + a.headImgUrl : n : a.headimgurl = m
    };
    var y = {
        rich: function (a, c) {
            b(a, c), a.eleid = "E" + +new Date;
            var d = i.buildTemplate(h.richText, a);
            return k.getKnowledgecontentById(a.encryptKnowledgeId, function (b, c) {
                i.createRichView("#" + a.eleid, i.removeTableStyle(c))
            }), d
        }, text: function (a, c) {
            return b(a, c), i.buildTemplate(h.htmlText, a)
        }, textMin: function (a, c) {
            b(a, c), a.richText && (a.content = "", a.eleid = "E" + +new Date, k.getKnowledgecontentById(a.encryptKnowledgeId, function (b, c) {
                console.log("[getKnowledgecontentById]:", c), i.createRichView("#" + a.eleid, i.removeTableStyle(c))
            }));
            var d = i.buildTemplate(h.htmlMinText, a);
            return d
        }, link_news: function (a, c) {
            return b(a, c), i.buildTemplate(h.htmlProductNews, a)
        }, link_news_min: function (a, c) {
            return b(a, c), i.buildTemplate(h.htmlMinProductNews, a)
        }, close_session: function () {
            return i.buildTemplate(h.htmlCloseTip)
        }, timeout: function (a) {
            return i.buildTemplate(h.htmlTimeout, a)
        }, notify: function (a) {
            return i.buildTemplate(h.htmlNotify, a)
        }, guest_survy_tip: function () {
            return i.buildTemplate(h.guestSurvyTip)
        }, leave_message: function (a) {
            return i.buildTemplate(h.htmlLeaveMessage.replace(/留言/, i.buildTemplate(a.content, q)))
        }, quit_quene_leave_message: function (a) {
            return i.buildTemplate(h.afterQuitQueneMessage, a)
        }, leave_message_send: function (a) {
            return i.buildTemplate(h.htmlLeaveWords, a)
        }, leave_message_tip: function () {
            return i.buildTemplate(h.leaveMessageTip)
        }, robot_transfer_man: function (a) {
            return i.buildTemplate(h.htmlRobotTransferManTip.replace(/客服昵称/, a.detailEventInfo))
        }, satisfaction_survey_send: function (a) {
            return i.buildTemplate(h.htmlSurvey, a)
        }, satisfaction_survey: function (a) {
            return i.buildTemplate(h.htmlSurvey, a)
        }, guest_quene_query_appim: function (a) {
            return i.buildTemplate(h.htmlCountQueneAppIm, a)
        }, guest_quene_query_webim: function (a) {
            return i.buildTemplate(h.htmlCountQueneWebIm, a)
        }, guest_quene_quit: function (a) {
            return i.buildTemplate(h.htmlQueryQueneInfo, a)
        }
    };
    return {
        render: function (a, b, c) {
            return b = b || null, c = c || "text", "text" === c && f(a), y[c.toLowerCase()](a, b)
        }, renderMin: y.textMin, renderProductNewsMin: y.link_news_min
    }
}), App.define("qqface", function (a) {
    function b() {
        var a = "37";
        if (h && (a = "45"), !f) {
            var b = "";
            g.delegate("li", "click", function () {
                g.trigger("chooseFace", $(this).attr("data-face")).hide()
            });
            var c = document.createElement("ul");
            for (var d in e) {
                if (e[d] === a) break;
                b += "<li data-face=" + d + '><img class="qqface" src=/assets/qqface/' + e[d] + ".png ></li>"
            }
            c.innerHTML = b, g.append(c), f = !0
        }
    }

    function c(a) {
        return e[a] ? '<img class="qqface" src=/assets/qqface/' + e[a] + ".png />" : void 0
    }

    function d(a) {
        return a.replace(/\\?\[+([^\[\]]+)\]+/gim, function (a, b) {
            var c = e[a];
            return console.log("[getFace]:", c), c ? '<img class="qqface" src=/assets/qqface/' + c + ".png />" : a
        })
    }

    var e = (a("utils"), {}), f = !1, g = $("#face_panel"), h = document.getElementById("webim"), i = {
        BRACKET: /(\[[\u4e00-\u9fa5]{1,3}\])|(\[NO\])|(\[OK\])/g,
        SLASH_CHN_ONE: /(\/[\u4e00-\u9fff]{1})|(\/NO)|(\/OK)/g,
        SLASH_CHN_TWO: /\/[\u4e00-\u9fff]{2}/g,
        SLASH_CHN_THREE: /\/[\u4e00-\u9fff]{3}/g,
        SLASH_CHAR_TWO: /(\/\:v)|(\/\:\?)|(\/\:.{2})/g,
        SLASH_CHAR_THREE: /\/\:.{3}/g,
        SLASH_CHAR_FOUR: /\/\:.{4}/g,
        SLASH_CHAR_FIVE: /\/\:\w{5}/g,
        SLASH_CHAR_SIX_OR_MORE: /\/\:(handclap|basketb|coffee|showlove|ladybug|strong|circle|hiphop)/g
    };
    return e["[微笑]"] = "1", e["[撇嘴]"] = "2", e["[色]"] = "3", e["[发呆]"] = "4", e["[得意]"] = "5", e["[流泪]"] = "6", e["[害羞]"] = "7", e["[闭嘴]"] = "8", e["[睡]"] = "9", e["[大哭]"] = "10", e["[尴尬]"] = "11", e["[发怒]"] = "12", e["[调皮]"] = "13", e["[呲牙]"] = "14", e["[惊讶]"] = "15", e["[难过]"] = "16", e["[酷]"] = "17", e["[冷汗]"] = "18", e["[抓狂]"] = "19", e["[吐]"] = "20", e["[偷笑]"] = "21", e["[愉快]"] = "22", e["[白眼]"] = "23", e["[傲慢]"] = "24", e["[饥饿]"] = "25", e["[困]"] = "26", e["[惊恐]"] = "27", e["[流汗]"] = "28", e["[憨笑]"] = "29", e["[悠闲]"] = "30", e["[奋斗]"] = "31", e["[咒骂]"] = "32", e["[疑问]"] = "33", e["[嘘]"] = "34", e["[晕]"] = "35", e["[疯了]"] = "36", e["[衰]"] = "37", e["[骷髅]"] = "38", e["[敲打]"] = "39", e["[再见]"] = "40", e["[擦汗]"] = "41", e["[抠鼻]"] = "42", e["[鼓掌]"] = "43", e["[糗大了]"] = "44", e["[坏笑]"] = "45", e["[左哼哼]"] = "46", e["[右哼哼]"] = "47", e["[哈欠]"] = "48", e["[鄙视]"] = "49", e["[委屈]"] = "50", e["[快哭了]"] = "51", e["[阴险]"] = "52", e["[亲亲]"] = "53", e["[吓]"] = "54", e["[可怜]"] = "55", e["[菜刀]"] = "56", e["[西瓜]"] = "57", e["[啤酒]"] = "58", e["[篮球]"] = "59", e["[乒乓]"] = "60", e["[咖啡]"] = "61", e["[饭]"] = "62", e["[猪头]"] = "63", e["[玫瑰]"] = "64", e["[凋谢]"] = "65", e["[嘴唇]"] = "66", e["[爱心]"] = "67", e["[心碎]"] = "68", e["[蛋糕]"] = "69", e["[闪电]"] = "70", e["[炸弹]"] = "71", e["[刀]"] = "72", e["[足球]"] = "73", e["[瓢虫]"] = "74", e["[便便]"] = "75", e["[月亮]"] = "76", e["[太阳]"] = "77", e["[礼物]"] = "78", e["[拥抱]"] = "79", e["[强]"] = "80", e["[弱]"] = "81", e["[握手]"] = "82", e["[胜利]"] = "83", e["[抱拳]"] = "84", e["[勾引]"] = "85", e["[拳头]"] = "86", e["[差劲]"] = "87", e["[爱你]"] = "88", e["[NO]"] = "89", e["[OK]"] = "90", e["[爱情]"] = "91", e["[飞吻]"] = "92", e["[跳跳]"] = "93", e["[发抖]"] = "94", e["[怄火]"] = "95", e["[转圈]"] = "96", e["[磕头]"] = "97", e["[回头]"] = "98", e["[跳绳]"] = "99", e["[投降]"] = "100", e["[激动]"] = "101",e["[乱舞]"] = "102",e["[献吻]"] = "103",e["[左太极]"] = "104",e["[右太极]"] = "105",$("#qqface").on("click", function (a) {
        a.stopPropagation(), g.toggle(), b()
    }),$("body").on("click", function () {
        g.hide()
    }),{
        init: b, make: c, faceFilter: function (a) {
            if (a && a.content) {
                var b = a.content.match(i.BRACKET);
                b && (a.content = d(a.content))
            }
        }
    }
}), App.define("advs", function (a) {
    function b() {
        var a = document.getElementById("webim");
        a && (a.className = "advs"), $("#com-advs").show()
    }

    function c(a) {
        var b = [], c = a.advertList;
        return c.forEach(function (a) {
            b.push({url: a[k[i]]})
        }), b
    }

    function d(a, b) {
        var c = i;
        $("#com-advs").advs({
            advs: a || [],
            delay: 1e3 * b,
            button: !1,
            vertical: "WEBIM" !== i,
            events: {
                click: function (a) {
                    var b = f[a];
                    "CHATBOARD" === i && (c = "MINI"), g.advertisementLog({
                        channel: c,
                        clientId: j,
                        name: b.name,
                        action: "CLICK"
                    }), window.open(b.redirectUrl)
                }, close: function (a) {
                    "CHATBOARD" === i && (c = "MINI"), g.advertisementLog({
                        channel: c,
                        clientId: j,
                        name: f[a].name,
                        action: "CLOSE"
                    })
                }
            }
        })
    }

    function e(a) {
        var b = i;
        "CHATBOARD" === i && (b = "MINI"), f && h.delay(function () {
            g.advertisementLog({channel: b, clientId: a, name: "打开广告", action: "OPEN"})
        }, 1e3)
    }

    var f, g = a("imService"), h = a("utils"), i = g.getType(), j = "",
        k = {WEBIM: "imageWebIMUrl", APPIM: "imageAppIMUrl", CHATBOARD: "imageWebIMMiniUrl"};
    return g.getAdvertisement(function (a, e) {
        f = e && e.data && e.data.advertList;
        var g = e && e.data && e.data.slideTime || 2;
        if (!a && e && f) {
            b();
            var h = c(e.data);
            d(h, g)
        } else console.log("暂无广告!")
    }), {
        setClientId: function (a, b) {
            console.log("[currClientId]:", a), j = a, b && e(a)
        }
    }
}), App.define("recognizeService", function (a) {
    function b(a) {
        var b = i.hasOwnProperty("theme") && i.theme;
        b && "07c5ba" === b && (b = "defaults"), f.getEnterpriseFunctionStatus(function (c, d) {
            d ? ($("#cikeCopyright").hide(), j.render(b || a || "defaults")) : i.preview ? j.render(b) : ($("#cikeCopyright").show(), j.render(a || "defaults")), console.log("[企业是否使用在线客服高级版]", f.status.isFunctionEffective)
        })
    }

    function c(a) {
        return b(a), i.cid ? void f.recognizeGuest().success(function (a) {
            var b = a.data;
            console.log("[GuestId]:" + b), b ? (f.createGuest(b), f.saveGuest(b), h.cache("recognizeGuest", b)) : f.createGuest(b), e()
        }).error(function () {
            f.createGuest("anonymous", f.status.lasttime), e()
        }) : (f.createGuest("anonymous", f.status.lasttime), void e())
    }

    function d(a, b) {
        if (a) c(); else if ("000000" === b.resultCode) try {
            var d = JSON.parse(b.data && b.data.extendInfo);
            console.log("[official_account_extendInfo]:", d), c(d.themeColor)
        } catch (e) {
            c()
        } else window.location.href = "/?authorizerAppid=" + i.authorizerAppid + "&code=" + b.resultCode + "&msg=" + b.resultMesg
    }

    function e() {
        var b = f.collectParams();
        g.initSocket(b, function (b) {
            console.log("[socketId]:" + b.id), a("chatWindow"), i.cid && i.channel && f.resetGuestUnreadMessage({
                cid: i.cid,
                channel: i.channel
            })
        })
    }

    var f = a("imService"), g = a("ioSocket"), h = a("utils"), i = h.getUrlparams(), j = a("themeColor"),
        k = f.getStyle(), l = f.getType();
    if (!h.runParamsCheck(i)) throw new Error("参数错误!");
    return i.preview && "true" === i.preview ? (b(), void("WEBIM" !== l && "CHATBOARD" !== l || a("chatWindow"))) : void f.getEnterpriseInfo({
        authorizerAppid: i.authorizerAppid,
        style: k
    }, d)
}), App.define("main", function (a) {
    a("recognizeService")
}).autoRun(), App.define("chatWindow", function (a) {
    function b(a) {
        return -1 !== a.content.indexOf(I)
    }

    function c() {
        G.productInfo && s.send(u.autoWire({
            msgType: "link_news",
            content: decodeURIComponent(G.productInfo)
        }), function (a) {
            d(a, "out")
        })
    }

    function d(a, b) {
        !a.soothingWords && a.agentId && (200 !== a.agentId && 0 !== a.agentId ? u.sessionChecker((new Date).getTime(), g, f) : u.clearTimer());
        var c = a.richText ? "rich" : "text";
        D.append(x.render(a, b, c)), r.bottom.scroll(z)
    }

    function e(a, b) {
        D.prepend(x.render(a, b)), r.top.scroll(z)
    }

    function f() {
        u.notify(u.status.overTimeNoticeReply), i({content: u.status.overTimeNoticeReply}, "notify")
    }

    function g() {
        u.status.session = "close", window.robot_transfer_man = !1, s.sessionTimeout({}, function () {
            "Y" === u.status.systemPush && E.isNeedSendSurvey()
        }), i({content: u.status.overTimeReply}, "timeout"), u.clearTimer()
    }

    function h() {
        u.fetchHistoryLog(null, function (a) {
            D.html(""), e(a), r.bottom.scroll(z)
        })
    }

    function i(a, b) {
        console.log("[" + b + ":]", a), D.append(x.render(a, null, b)), r.bottom.scroll(z)
    }

    function j(a) {
        var b = $.parseJSON(a.detailEventInfo), c = b.imageId, d = y.FILE_URL + "/" + b.thumbnailImagePath;
        $("#" + c).attr("src", d), s.send(u.autoWire({fileFullName: b.soureImagePath, msgType: "image"}))
    }

    function k(a) {
        var b = y.FILE_URL + "/" + a.content;
        console.log("image_appim:", a);
        var c = u.autoWire('<img onload="App.modules.imService.exports.imgDone()" src=' + b + ' class="thumbnailImage" />'),
            e = s.convertToStandardPackage(c, "in");
        e.headImgUrl = a.headImgUrl, d(e, "in"), r.bottom.scroll(z)
    }

    function l(a) {
        var b = y.FILE_URL + "/" + a.content;
        console.log("voice_appim:", a);
        var c = u.autoWire('<div class="voice" path=' + b + '><span class="voice-unread"></span></div>'),
            e = s.convertToStandardPackage(c, "in");
        e.headImgUrl = a.headImgUrl, d(e, "in"), r.bottom.scroll(z)
    }

    function m() {
        var a = C.value.trim().escapeHTML();
        u.isValidMessage(a) && s.send(u.autoWire(a), function (a) {
            u.clearTimer(), d(a, "out"), C.value = ""
        })
    }

    function n() {
        A.on("click touchstart", function () {
            return console.log("click touchstart"), m(), !1
        }), $("#reditor").keydown(function (a) {
            return 13 === a.keyCode ? (a.preventDefault(),
                m(), !1) : void 0
        }), u.fetchHistoryLog(null, function (a) {
            e(a), r.bottom.scroll(z)
        }), D.on("scroll", function (a) {
            r.top.isAttached(z, function () {
                u.fetchHistoryLog(null, function (a) {
                    e(a)
                })
            })
        })
    }

    function o() {
        u.getArtificialSession(function (a, b) {
            console.log(b), "Y" === b ? alert("您当前正和人工客服沟通中") : u.sendKayWordsMessage()
        })
    }

    a("scrollFixed");
    var p = a("advs"), q = document, r = a("utils"), s = a("message"), t = a("ioSocket"), u = a("imService"),
        v = a("piczoom"), w = a("process"), x = a("htmlTemplate"), y = a("configuration"),
        z = q.getElementById("chatContent"), A = (q.getElementById("btn-sender"), $("#btn-sender")),
        B = $("#icon-leave-message"), C = q.getElementById("reditor"), D = $(z), E = a("guestSurvey"),
        F = a("guestQueue"), G = r.getUrlparams(), H = a("qqface"), I = (a("messageOrder"), "WorkOrderMessage"),
        J = $("#btnTransferMan"), K = $("#cikeCopyright");
    return window.queryQueneTimer = null, window.robot_transfer_man = !1, u.getCurrChannelReply("APPIM_MANUAL_REPLY", function (a, b) {
        console.log("getCurrChannelReply:", u.status)
    }), u.getEnterpriseFunctionStatus(function (a, b) {
        b ? K.hide() : K.show(), console.log("[企业是否使用在线客服高级版:]", u.status.isFunctionEffective)
    }), u.inBound(), u.isHaveLeaveMessageRight(function () {
        u.status.leaveMessageRight || B.hide()
    }), t.on("reconnect", function () {
        u.inBound(), h()
    }), s.listen(w.first_response(function (a) {
        console.log("[first_response]:", a), p.setClientId(a.clientId, !0), u.setTransferManBtnStatus("APPIM", a)
    }).text(function (a) {
        return u.isRobotTransferShow(a), p.setClientId(a.clientId, !1), b(a) ? void(u.status.leaveMessageRight && i(a, "leave_message")) : (u.saveCustomerInfo(a.clientId), u.status.session = "on", H.faceFilter(a), d(a, "in", "text"), void u.sendReceipt(a))
    }).image(function (a) {
        k(a)
    }).voice(function (a) {
        l(a)
    }).close_session(function (a) {
        u.setTransferManBtnStatus("APPIM", "CLOSE_SESSION"), window.robot_transfer_man = !1, u.status.session = "close", i(a, "close_session"), u.sendReceipt(a), u.clearTimer()
    }).image_upload(function (a) {
        console.log("[image_upload:]", a), j(a)
    }).robot_transfer_man(function (a) {
        J.hide(), window.queryQueneTimer && clearInterval(window.queryQueneTimer), F.startQueueFlag(!1), window.robot_transfer_man = !0, u.status.session = "on", u.status.robot = "OFF", i(a, "robot_transfer_man"), E.resetSurveyConfig(), setTimeout(function () {
            u.sessionChecker((new Date).getTime(), g, f), "ON" === u.status.robot && (u.status.session = "on", i(a, "robot_transfer_man"), u.inBound()), c()
        }, 1e3)
    }).agent_assign_success(function (a) {
        c(), E.resetSurveyConfig(), window.robot_transfer_man = !0
    }).satisfaction_survey_send(function (a) {
        E.setSessionId(a)
    }).satisfaction_survey(function (a) {
        E.setSessionId(a)
    }).begin_queue(function (a) {
        F.startQueueFlag(!0), F.getGuestQueueCount()
    }).middlewarify()), v.appendImage(function (a, b, c) {
        var e = "img" + c,
            f = u.autoWire('<img onload="App.modules.imService.exports.imgDone()" id=' + e + ' class="thumbnailImage" src="./images/uploading.gif" />'),
            g = s.convertToStandardPackage(f, "out");
        g.msgType = "IMAGE", d(g, "out"), r.bottom.scroll(z)
    }), n(), {sendTransferManMessage: o}
}), App.define("guestQueue", function (a) {
    function b() {
        k && (clearInterval(window.queryQueneTimer), e(function (a) {
            a && c()
        }))
    }

    function c() {
        window.queryQueneTimer = setInterval(function () {
            e(function (a) {
                a || (clearInterval(window.queryQueneTimer), d())
            })
        }, 6e4)
    }

    function d() {
        j-- && e(function (a) {
            a ? (j = 5, c()) : d()
        })
    }

    function e(a) {
        h.getGuestQueueCount(function (b, c) {
            if (b && (console.log("获取客户排队状况失败", b), a(!1)), "000000" === c.resultCode) {
                var d = {count: String(c.data)};
                i.showEventTips(d, "guest_quene_query_appim"), i.showEventTips(d, "guest_quene_quit"), a(!0)
            } else a(!1)
        })
    }

    function f(a) {
        k = a
    }

    function g() {
        k && h.quitQueue(function (a, b) {
            return a ? console.log("退出排队失败,请稍后再试", a) : void("000000" === b.resultCode && (clearInterval(window.queryQueneTimer), j = 5, i.showEventTips({}, "quit_quene_leave_message")))
        })
    }

    var h = a("imService"), i = a("messageOrder"), j = 5, k = !1;
    return {getGuestQueueCount: b, quitQueue: g, startQueueFlag: f}
}), App.define("scrollFixed", function (a) {
    var b = document, c = window;
    /Android [4-6]/.test(navigator.appVersion) ? c.addEventListener("resize", function () {
        "INPUT" !== b.activeElement.tagName && "TEXTAREA" !== b.activeElement.tagName || c.setTimeout(function () {
            b.activeElement.scrollIntoViewIfNeeded()
        }, 200)
    }) : $("#reditor").click(function () {
        $(this).is(":focus") && setTimeout(function () {
            $(this).scrollTop = $(this).scrollHeight
        }, 200)
    })
}), App.define("guestSurvey", function (a) {
    function b(a) {
        r.sessionId = Number(a.detailEventInfo), d()
    }

    function c() {
        u || d()
    }

    function d() {
        m.toggle(), n.toggle(), o.addClass("active").siblings().removeClass("active"), p.val("")
    }

    function e(a) {
        a = $(a), r.grade = a.attr("data-option"), a.addClass("active").siblings().removeClass("active")
    }

    function f() {
        r.channel = "APPIM", r.guestId = l.official.fromUserName, r.source = "CLIENT", r.comment = p.val().trim().escapeHTML().escapeScript()
    }

    function g() {
        f(), l.saveGuestSurveyInfo(r, function (a, b) {
            h(), j(), d()
        }), r.grade = "HIGH"
    }

    function h() {
        u = !0, t.addClass("disable-survey")
    }

    function i() {
        u = !1, t.removeClass("disable-survey")
    }

    function j() {
        s.append(k.render(null, null, "guest_survy_tip")), window.robot_transfer_man && l.inBound("您的客户已经发送满意度调查")
    }

    var k = (a("utils"), a("htmlTemplate")), l = a("imService"), m = $(".guestSurveyBg"), n = $(".guestSurveyBox"),
        o = $(".guestSurveyOption").children(":first"), p = $(".guestSurveyContent"), q = $("#chatContent"),
        r = {grade: "HIGH", sessionId: "", guestId: "", channel: "", source: ""}, s = $(q), t = $("#satisfy-survey"),
        u = !1;
    return {
        toggleGuestSurvey: d,
        selectGuestSurvey: e,
        saveGuestSurvey: g,
        setSessionId: b,
        isNeedSendSurvey: c,
        resetSurveyConfig: i
    }
}), App.define("messageOrder", function (a) {
    function b() {
        h.removeClass("active")
    }

    function c(a) {
        var b = /^\d{6,20}$/;
        return !!b.test(a)
    }

    function d(a) {
        var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return !!b.test(a)
    }

    function e() {
        q.toggle(), r.toggle(), s.val(""), t.val(""), u.val(""), u.css("border", "1px solid #d6dce5"), v.hide()
    }

    function f() {
        if (w.description = u.val().trim().escapeHTML().escapeScript(), w.phoneNum = s.val(), w.email = t.val(), w.guestId = k.official.fromUserName, !u.val()) return u.css("border", "1px solid red"), void v.show();
        if (w.description && w.guestId) {
            if (w.phoneNum && !c(w.phoneNum)) return void v.show();
            if (w.email && !d(w.email)) return void v.show();
            k.saveGuestLeaveWords(w, function (a, b) {
                g(w, "leave_message_tip")
            }), e()
        }
    }

    function g(a, b) {
        console.log("[" + b + ":]", a), o.append(m.render(a, null, b)), l.bottom.scroll(n)
    }

    var h = $("#toolbar"), i = ($("#footer"), $("#toolbar-icon")), j = $("#reditor"), k = a("imService"),
        l = a("utils"), m = a("htmlTemplate"), n = document.getElementById("chatContent"), o = $(n),
        p = $("#icon-leave-message"), q = $(".guestLeaveMessageBg"), r = $(".guestLeaveMessageBox"),
        s = $(".leaveWordsPhone"), t = $(".leaveWordsEmail"), u = $("#guestSurveyContent"),
        v = $(".guestLeaveMessageFail"), w = {guestId: "", phoneNum: "", email: "", description: "", channel: "APPIM"};
    return i.on("click", function () {
        h.hasClass("active") ? h.removeClass("active") : (k.status.isFunctionEffective ? h.css("bottom", "1.5625rem") : h.css("bottom", "2.1725rem"), h.addClass("active"))
    }), j.focus(function () {
        b()
    }), j.onfocus = b, s.change(function () {
        c(s.val()) ? s.css("color", "black") : s.css("color", "red")
    }), t.change(function () {
        d(t.val()) ? t.css("color", "black") : t.css("color", "red")
    }), u.change(function () {
        u.val() ? u.css("border", "1px solid #d6dce5") : u.css("border", "1px solid red")
    }), p.on("click", function () {
        e()
    }), {showEventTips: g, saveGuestLeaveWords: f, toggleGuestLeavewords: e}
});