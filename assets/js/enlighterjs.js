var EnlighterJS = function(e) {
    "use strict";
    var u = {
        indent: 4,
        ampersandCleanup: !0,
        linehover: !0,
        rawcodeDbclick: !1,
        textOverflow: "break",
        linenumbers: !0,
        lineoffset: 0,
        highlight: "",
        layout: "standard",
        language: "generic",
        theme: "enlighter",
        title: ""
    };
    var t = {
        sqStrings: {
            regex: /('(?:[^'\\]|\\.)*')/g,
            type: "s0"
        },
        dqStrings: {
            regex: /"(?:[^"\\]|\\.)*"/g,
            type: "s0"
        },
        bqStrings: {
            regex: /`(?:[^`\\]|\\.)*`/g,
            type: "s0"
        },
        char: {
            regex: /('(\\.|.|\\\w+)')/g,
            type: "s1"
        },
        slashComments: {
            regex: /(?:^|[^\\])\/\/.*$/gm,
            type: "c0"
        },
        poundComments: {
            regex: /(?:^|[^\\])#.*$/gm,
            type: "c0"
        },
        blockComments: {
            regex: /\/\*[\s\S]*?\*\//g,
            type: "c1"
        },
        docComments: {
            regex: /\/\*\*[\s\S]*?\*\//g,
            type: "c2"
        },
        heredoc: {
            regex: /(<<[<-]?\s*?(['"]?)([A-Z0-9_]+)\2\s*\n[\s\S]*?\n\3)/gi,
            type: "s5"
        },
        brackets: {
            regex: /[[\](){}<>]+/g,
            type: "g1"
        },
        floats: {
            regex: /[\b\W](-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))/gi,
            type: "n0"
        },
        complex: {
            regex: /[\b\W](?:-?(?:(?:\d+\.\d+|\.\d+|\d+\.|\d+)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))[ij]/gi,
            type: "n5"
        },
        int: {
            regex: /[\b\W](-?\d+)(?!\.)\b/g,
            type: "n1"
        },
        hex: {
            regex: /[\b\W](-?0x[A-F0-9]+)\b/gi,
            type: "n2"
        },
        bin: {
            regex: /[\b\W](-?0b[01]+)\b/gi,
            type: "n3"
        },
        octal: {
            regex: /[\b\W](-?0[0-7]+)(?!\.)\b/g,
            type: "n4"
        },
        prop: {
            regex: /[\w\])]\.(\w+)\b/g,
            type: "m3"
        },
        fCalls: {
            regex: /\b([\w]+)\s*\(/gm,
            type: "m0"
        },
        mCalls: {
            regex: /\.([\w]+)\s*\(/gm,
            type: "m1"
        },
        boolean: {
            regex: /\b(true|false)\b/gi,
            type: "e0"
        },
        null: {
            regex: /\b(null)\b/gi,
            type: "e1"
        }
    };

    function _(e, t, r, n, s) {
        return {
            text: e,
            type: t,
            index: n || 0,
            end: e.length + n,
            filter: r || null,
            priority: s || 0
        }
    }
    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var n = function(e, t, r) {
        return t && s(e.prototype, t), r && s(e, r), e
    };

    function s(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    function o(e, t, r) {
        null === e && (e = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === n) {
            var s = Object.getPrototypeOf(e);
            return null === s ? void 0 : o(s, t, r)
        }
        if ("value" in n) return n.value;
        var i = n.get;
        return void 0 !== i ? i.call(r) : void 0
    }
    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }
    var g = function(e) {
        if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r
        }
        return Array.from(e)
    }, l = (n(p, [{
                key: "setupLanguage",
                value: function() {
                    this.rules = [t.sqStrings, t.dqStrings, t.prop, t.slashComments, t.poundComments, t.blockComments, t.brackets, {
                            regex: /\W(true|false|null|nil|if|then|else|for|while|do|class|implements|extends|function|end|void|return|in|of|new|this|try|catch|def|except)\W/gi,
                            type: "k1"
                        },
                        t.mCalls, t.fCalls, t.octal, t.bin, t.hex, t.floats, t.int, {
                            regex: /[\b\s]([$&|~*:;]+)[\b\s]/g,
                            type: "g0"
                        }
                    ]
                }
            }, {
                key: "analyze",
                value: function(e) {
                    return function(e, t, r) {
                        for (var n = 2 < arguments.length && void 0 !== r ? r : "text", s = [], i = 0, o = 0; o < t.length; o++) {
                            var a = t[o];
                            if (!a || !a.type || !a.regex) return;
                            for (var g = void 0; null != (g = a.regex.exec(e));) {
                                if (5e4 < ++i) throw new Error("Infinite tokenizer loop detected; more than 50k tokens - language rule [" + o + "] " + a.regex + " seems to be broken");
                                if (0 != g[0].length) {
                                    a.regex.lastIndex = g.index + 1 + g[0].length / 3;
                                    var l = Array.isArray(a.type) ? a.type[0] : a.type,
                                        p = (Array.isArray(a.filter) ? a.filter[0] : a.filter) || null;
                                    if (1 < g.length) {
                                        for (var u = 1; u < g.length; u++) if (g[u]) {
                                                var c = Array.isArray(a.type) && a.type.length >= u ? a.type[u - 1] : l,
                                                    y = Array.isArray(a.filter) && a.filter.length >= u ? a.filter[u - 1] : p;
                                                s.push(_(g[u], c, y, g.index + g[0].indexOf(g[u]), o))
                                            }
                                    } else s.push(_(g[0], l, p, g.index, o))
                                }
                            }
                        }
                        s = s.sort(function(e, t) {
                            return e.index == t.index ? e.priority < t.priority ? -1 : 1 : e.index < t.index ? -1 : 1
                        });
                        for (var b = [], f = 0, h = 0; h < s.length; h++) {
                            if (f < s[h].index && b.push(_(e.substring(f, s[h].index), n, null, f)), s[h].filter) for (var d = s[h].filter(s[h]) || [], x = 0; x < d.length; x++) b.push(d[x]);
                            else b.push(s[h]);
                            f = s[h].end;
                            for (var m = !1, k = h + 1; k < s.length; k++) if (s[k].index >= f) {
                                    h = k - 1, m = !0;
                                    break
                                }
                            if (!1 === m) break
                        }
                        return f < e.length && b.push(_(e.substring(f), n, null, f)), b
                    }(e, this.rules)
                }
            }
        ]), p);

    function p() {
        r(this, p), this.rules = [], this.setupLanguage()
    }
    var c = (i(y, l), n(y, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.sqStrings, {
                        regex: /\|.*?\|/g,
                        type: "s2"
                    }, {
                        regex: /(".*)$/gm,
                        type: "c0"
                    }, {
                        regex: /^\s*(\*.*)$/gm,
                        type: "c0"
                    }, {
                        regex: /(data):?\s*(\w+)\s*/gi,
                        type: ["k2", "k7"]
                    }, {
                        regex: /(type)\s+(\w+)\s*/gi,
                        type: ["k2", "k5"]
                    }, {
                        regex: /\b(abap_true|abap_false)\b/gi,
                        type: "e0"
                    }, {
                        regex: /\b(abap_undefined)\b/gi,
                        type: "e1"
                    }, {
                        regex: /\b[A-Z_][A-Za-z0-9_]*\b/g,
                        type: "k0"
                    },
                    t.fCalls, t.int, t.brackets
                ]
            }
        }
    ]), y);

    function y() {
        return r(this, y), a(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments))
    }
    var b = (i(f, l), n(f, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /(;.*)$/gm,
                        type: "co0"
                    }, {
                        regex: /(\$.*)$/gm,
                        type: "k4"
                    },
                    t.sqStrings, t.dqStrings, {
                        regex: /(^|:)\s*?(\w+)\s+/gm,
                        type: "k0"
                    }, {
                        regex: /^\s*?([A-Z?_][A-Z0-9?_]+:)\s*?/gim,
                        type: "k6"
                    }, {
                        regex: /@\w+/gi,
                        type: "k9"
                    }, {
                        regex: /#\w+/gi,
                        type: "k9"
                    }, {
                        regex: /[A-F0-9][A-F0-9$]+?H/gi,
                        type: "n2"
                    }, {
                        regex: /\d[\d$]+?D/gi,
                        type: "n1"
                    }, {
                        regex: /[01][01$]+?B/gi,
                        type: "n3"
                    }, {
                        regex: /[0-7][0-7$]+?(?:Q|O)/gi,
                        type: "nu4"
                    }, {
                        regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                        type: "n2"
                    }, {
                        regex: /(0b[01]+)/g,
                        type: "n3"
                    }, {
                        regex: /\b(\d+)/g,
                        type: "n1"
                    },
                    t.fCalls
                ]
            }
        }
    ]), f);

    function f() {
        return r(this, f), a(this, (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments))
    }
    var h = (i(d, l), n(d, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /(;.*)$/gm,
                        type: "co0"
                    },
                    t.sqStrings, t.dqStrings, {
                        regex: /^\s*?\.\w+\s+/gm,
                        type: "kw4"
                    }, {
                        regex: /\b(r\d{1,2})/gi,
                        type: "kw0"
                    }, {
                        regex: /(@[0-9])/gi,
                        type: "k2"
                    }, {
                        regex: /^\s*?(\w+:)\s*?/gm,
                        type: "kw6"
                    }, {
                        regex: /(^|:)\s*?(\w+)\s+/gm,
                        type: "kw0"
                    }, {
                        regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi,
                        type: "nu2"
                    },
                    t.bin, t.int, t.fCalls, {
                        regex: /\b[A-Z]{2,}[0-9]?[0-9]?\b/g,
                        type: "kw9"
                    }
                ]
            }
        }
    ]), d);

    function d() {
        return r(this, d), a(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments))
    }
    var x = (i(m, l), n(m, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.char, {
                        regex: /@[\W\w_][\w]+/gm,
                        type: "s9"
                    },
                    t.boolean, t.null, t.prop, {
                        regex: /#.*$/gm,
                        type: "k4"
                    }, {
                        regex: /\b(break|case|catch|continue|do|else|for|if|goto|switch|try|throw|while)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(__[A-Z][A-Z0-9_]+__|__cplusplus)\b/g,
                        type: "e3"
                    }, {
                        regex: /\b(\w+\d+?_t)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(enum|struct|typedef|union)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(asm|auto|class|auto|default|explicit|export|extern|friend|inline|thread_local|static_assert|nullptr|noexcept|friend|decltype|constexpr|alignof|alignas|virtual|using|typename|typeid|this|template|static|return|register|public|protected|private|operator|namespace|mutable|inline)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(new|delete|cast|const_cast|dynamic_cast|static_cast|reinterpret_cast|sizeof|and|bitand|and_eq|not|not_eq|or|bitor|or_eq|xor|xor_eq|compl)\b/g,
                        type: "k3"
                    },
                    t.mCalls, t.fCalls, t.slashComments, t.blockComments, t.octal, t.bin, t.hex, t.floats, t.brackets
                ]
            }
        }
    ]), m);

    function m() {
        return r(this, m), a(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments))
    }
    function k(e, t, r) {
        for (var n = [], s = 0, i = void 0; null != (i = t.exec(e.text));) {
            s < i.index && n.push(_(e.text.substring(s, i.index), e.type, null, s));
            for (var o = r(i, e.type) || [], a = 0; a < o.length; a++) n.push(o[a]);
            s = i.index + i[0].length, t.lastIndex = s
        }
        return 0 == n.length ? [e] : (s < e.text.length && n.push(_(e.text.substring(s), e.type, null, s)), n)
    }
    var v = (i(w, l), n(w, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /\$("(?:[^"\\]|\\.)*")/g,
                        type: "s0",
                        filter: function(e) {
                            return k(e, /\{.*?}/g, function(e) {
                                return [_(e[0], "s3")]
                            })
                        }
                    },
                    t.dqStrings, t.char, {
                        regex: /@[\W\w_][\w]+/gm,
                        type: "s9"
                    },
                    t.null, t.boolean, t.prop, {
                        regex: /\b(bool|byte|char|decimal|double|float|int|long|sbyte|short|uint|ulong|ushort|void)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(while|try|throw|switch|if|goto|foreach|for|finally|else|do|continue|catch|case|break)\b/g,
                        type: "k1"
                    }, {
                        regex: /^((?:using|namespace)\s+)(\w[\w._]+[;{\n])/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(enum|struct|var)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const|in|out)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(using|volatile|virtual|using|unsafe|unchecked|static|stackalloc|sealed|return|ref|readonly|public|protected|private|params|override|operator|object|namespace|lock|is|internal|interface|implicit|fixed|extern|explicit|event|delegate|default|class|checked|base|as|abstract)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(this)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(new|sizeof|typeof)\b/g,
                        type: "k3"
                    },
                    t.fCalls, t.mCalls, t.slashComments, t.blockComments, t.docComments, t.int, t.floats, t.bin, t.hex, t.octal, t.brackets
                ]
            }
        }
    ]), w);

    function w() {
        return r(this, w), a(this, (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments))
    }
    var C = (i(O, l), n(O, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.sqStrings, {
                        regex: /\W@(charset|import|namespace|page|font-face|keyframes|viewport|document|supports)\b/gi,
                        type: "k4"
                    }, {
                        regex: /(url\s*)(\(.*?\))/gi,
                        type: ["m0", "s0"]
                    }, {
                        regex: /(#[a-z0-9]+)\W/gi,
                        type: "x14"
                    }, {
                        regex: /\b(\d+[.\d+-]?\s*(%|[a-z]{1,3})?)/gi,
                        type: "x13"
                    }, {
                        regex: /[\w\]](::?[\w-]+)\b/g,
                        type: "x15"
                    }, {
                        regex: /(#[\w-]+)\W/g,
                        type: "x10"
                    }, {
                        regex: /(\.[\w-]+)\W/g,
                        type: "x11"
                    }, {
                        regex: /([\w-]+)\s*:/g,
                        type: "x12"
                    },
                    t.blockComments, t.brackets
                ]
            }
        }
    ]), O);

    function O() {
        return r(this, O), a(this, (O.__proto__ || Object.getPrototypeOf(O)).apply(this, arguments))
    }
    var S = (i(A, l), n(A, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /^("""[\s\S]*?"""|'''[\s\S]*?''')/gm,
                        type: "c9"
                    }, {
                        regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
                        type: "s5"
                    },
                    t.dqStrings, t.sqStrings, {
                        regex: /\b(__[a-z]+__)\b/g,
                        type: "e3"
                    }, {
                        regex: /[^;]\s*(from\s+)([\w.]+)(\s+import)/gi,
                        type: ["k0", "k10", "k0"]
                    }, {
                        regex: /\b(raise|while|try|if|for|finally|else|elif|continue|break)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(yield|with|return|pass|lambda|is|in|import|global|from|except|def|class|assert|as|async|await)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(and|or|not|del)\b/g,
                        type: "k3"
                    }, {
                        regex: /\b(True|False)\b/g,
                        type: "e0"
                    }, {
                        regex: /\b(None)\b/g,
                        type: "e1"
                    },
                    t.mCalls, t.fCalls, t.poundComments, t.int, t.hex, t.floats, t.octal, t.brackets
                ]
            }
        }
    ]), A);

    function A() {
        return r(this, A), a(this, (A.__proto__ || Object.getPrototypeOf(A)).apply(this, arguments))
    }
    var L = (i(j, S), n(j, [{
            key: "setupLanguage",
            value: function() {
                o(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "setupLanguage", this).call(this), this.rules = [{
                        regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(enum|struct|typedef|union|object)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(readonly|extern|namespace|public|privat|include|cimport|pyximport|cythonize|cdef|cpdef|ctypedef|property|IF|ELIF|ELSE|DEF)\b/g,
                        type: "k0"
                    }
                ].concat(this.rules)
            }
        }
    ]), j);

    function j() {
        return r(this, j), a(this, (j.__proto__ || Object.getPrototypeOf(j)).apply(this, arguments))
    }
    var E = (i(q, l), n(q, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.poundComments, t.brackets, {
                        regex: /\[(\w+)\]/gm,
                        type: "k9"
                    }, {
                        regex: /\{([\w_-]+)\s*(?::\s*(.*?))?}/gm,
                        type: ["k7", "s0"]
                    }
                ]
            }
        }
    ]), q);

    function q() {
        return r(this, q), a(this, (q.__proto__ || Object.getPrototypeOf(q)).apply(this, arguments))
    }
    var P = (i(W, l), n(W, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /^([+-]{3}.*)$/gm,
                        type: "c0"
                    }, {
                        regex: /^(@@.*@@\s*)/gm,
                        type: "t2"
                    }, {
                        regex: /^(\+.*)/gm,
                        type: "t5"
                    }, {
                        regex: /^(-.*)/gm,
                        type: "t6"
                    }
                ]
            }
        }
    ]), W);

    function W() {
        return r(this, W), a(this, (W.__proto__ || Object.getPrototypeOf(W)).apply(this, arguments))
    }
    var $ = (i(I, l), n(I, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, {
                        regex: /\$\{\w+\}/gi,
                        type: "k7"
                    }, {
                        regex: /ARG\s+(\w+)(?:(=)(.*?)$)?/gim,
                        type: ["k7", "k3", "s0"]
                    }, {
                        regex: /ENV\s+(\w+)(?:(\s+|=)(.*?)$)?/gim,
                        type: ["k7", "k3", "s0"]
                    }, {
                        regex: /(?:^|[^\\])#\s*\w+=.*$/gm,
                        type: "k4"
                    },
                    t.poundComments, {
                        regex: /^([a-z]+)\b/gim,
                        type: "k0"
                    }, {
                        regex: /\b(AS)\b/gi,
                        type: "k0"
                    }, {
                        regex: /^\s+(&&)/gim,
                        type: "k3"
                    },
                    t.brackets
                ]
            }
        }
    ]), I);

    function I() {
        return r(this, I), a(this, (I.__proto__ || Object.getPrototypeOf(I)).apply(this, arguments))
    }
    var N = (i(F, l), n(F, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.bqStrings, t.char, t.boolean, {
                        regex: /\b(nil)\b/gi,
                        type: "e1"
                    },
                    t.prop, {
                        regex: /\b(var)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(case|break|default|else|goto|switch|if|continue|for)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(func|interface|select|defer|go|map|chan|package|fallthrough|range|import|return)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(iota)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(bool|string|u?int(8|16|32|64)?|uintptr|byte|rune|float32|float64|complex64|complex128)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(struct|type)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const)\b/g,
                        type: "k8"
                    },
                    t.mCalls, t.fCalls, t.slashComments, t.octal, t.int, t.complex, t.floats, t.hex, t.brackets
                ]
            }
        }
    ]), F);

    function F() {
        return r(this, F), a(this, (F.__proto__ || Object.getPrototypeOf(F)).apply(this, arguments))
    }
    var D = (i(T, l), n(T, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
                        type: "s5"
                    },
                    t.dqStrings, t.sqStrings, t.char, t.slashComments, t.blockComments, t.docComments, {
                        regex: /(\/(?:[^/\\]|\\.)*\/)/g,
                        type: "s5"
                    },
                    t.prop, {
                        regex: /\b(byte|char|short|int|long|float|double|String)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(break|case|catch|continue|default|do|else|finally|for|goto|if|switch|throw|try|while)\b/g,
                        type: "k1"
                    }, {
                        regex: /^(package|import)(\s+[\w.]+)/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(const|enum|def)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(as|assert|class|extends|goto|implements|in|interface|return|thows|trait)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(this|super)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(instanceof|new)\b/g,
                        type: "k3"
                    },
                    t.fCalls, t.mCalls, t.null, t.boolean, {
                        regex: /^#.*/g,
                        type: "k9"
                    }, {
                        regex: /[\b\W](-?0[0-7][0-7_]+[GLIDF]?)\b/gi,
                        type: "n4"
                    }, {
                        regex: /[\b\W](-?\d[\d_]*[GLIDF]?)(?!\.)\b/gi,
                        type: "n1"
                    }, {
                        regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+[GLIDF]?)\b/gi,
                        type: "n2"
                    }, {
                        regex: /[\b\W](-?0b[01][01_]+[GLIDF]?)\b/gi,
                        type: "n3"
                    }, {
                        regex: /(-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+)?)/gi,
                        type: "n0"
                    },
                    t.brackets
                ]
            }
        }
    ]), T);

    function T() {
        return r(this, T), a(this, (T.__proto__ || Object.getPrototypeOf(T)).apply(this, arguments))
    }
    var R = (i(Z, l), n(Z, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, {
                        regex: /(;.*)$/gm,
                        type: "c0"
                    },
                    t.poundComments, {
                        regex: /^\s*?(\[.*])\s*?$/gm,
                        type: "t2"
                    }, {
                        regex: /^(\s*?[a-z0-9._-]+\s*?)(=)/gim,
                        type: ["k2", "k3"]
                    }, {
                        regex: /\b(true|false|on|off|yes|no)\b/gim,
                        type: "e0"
                    },
                    t.octal, t.bin, t.hex, t.floats, t.brackets
                ]
            }
        }
    ]), Z);

    function Z() {
        return r(this, Z), a(this, (Z.__proto__ || Object.getPrototypeOf(Z)).apply(this, arguments))
    }
    var z = (i(B, l), n(B, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.char, {
                        regex: /@[\W\w_][\w]+/gm,
                        type: "s9"
                    },
                    t.prop, {
                        regex: /\b(boolean|byte|char|short|int|long|float|double|String|void|Integer|Double|BigInt|Float|Boolean|Byte|Char|Long)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(while|try|catch|case|else|throw|break|if|do|goto|switch|for|continue)\b/g,
                        type: "k1"
                    }, {
                        regex: /^(package|import)(\s+[\w.]+)/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(enum)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(native|volatile|strictfp|finally|class|static|interface|final|extends|transient|return|throws|public|protected|implements|private|synchronized|default|assert|abstract)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(this|super)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(instanceof|new)\b/g,
                        type: "k3"
                    },
                    t.fCalls, t.mCalls, t.null, t.boolean, t.slashComments, t.blockComments, t.docComments, t.int, t.floats, t.bin, t.hex, t.octal, t.brackets
                ]
            }
        }
    ]), B);

    function B() {
        return r(this, B), a(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments))
    }
    var G = (i(M, l), n(M, [{
            key: "setupLanguage",
            value: function() {
                function e(e) {
                    return k(e, /\\(x[A-F0-9]{2}|u[A-F0-9]{4}|.)/gi, function(e) {
                        return [_(e[0], "s4")]
                    })
                }
                this.rules = [{
                        regex: t.sqStrings.regex,
                        type: "s0",
                        filter: e
                    }, {
                        regex: t.dqStrings.regex,
                        type: "s0",
                        filter: e
                    }, {
                        regex: /`(?:[^`\\]|\\.)*`/g,
                        type: "s2",
                        filter: function(e) {
                            return k(e, /\$\{.*?}/g, function(e) {
                                return [_(e[0], "s3")]
                            })
                        }
                    },
                    t.boolean, t.null, t.prop, {
                        regex: /\b(var|let|enum|const)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(document|window|console)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(break|case|catch|continue|do|else|finally|for|if|switch|try|while|throw)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(as|async|class|constructor|debugger|default|export|extends|function|import|return|with|yield|implements|package|protected|static|interface|private|public|await|module)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(this|super)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(instanceof|new|delete|typeof|void|in)\b/g,
                        type: "k3"
                    }, {
                        regex: /\W(=>)\W/g,
                        type: "k3"
                    },
                    t.slashComments, t.blockComments, {
                        regex: /\W(\/(?:[^/\\]|\\.)*\/\w*)/g,
                        type: "e2"
                    },
                    t.mCalls, t.fCalls, {
                        regex: /\{|}|\(|\)|\[|]/g,
                        type: "g1"
                    }, {
                        regex: /[\b\W](-?0o[0-7]+)(?!\.)\b/g,
                        type: "n4"
                    },
                    t.bin, t.hex, t.floats, t.int
                ]
            }
        }
    ]), M);

    function M() {
        return r(this, M), a(this, (M.__proto__ || Object.getPrototypeOf(M)).apply(this, arguments))
    }
    var U = (i(H, l), n(H, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /"(?:[^"\\]|\\.)*"\s*:/g,
                        type: "k2"
                    },
                    t.dqStrings, t.boolean, t.null, {
                        regex: /\{|}|\(|\)|\[|]/g,
                        type: "g1"
                    },
                    t.int, t.floats, {
                        regex: /,|:/g,
                        type: "g0"
                    }
                ]
            }
        }
    ]), H);

    function H() {
        return r(this, H), a(this, (H.__proto__ || Object.getPrototypeOf(H)).apply(this, arguments))
    }
    var J = (i(V, l), n(V, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.char, {
                        regex: /"""[\s\S]*?"""/g,
                        type: "s5"
                    },
                    t.prop, {
                        regex: /\b(Double|Float|Long|Int|Short|Byte|Any|String|Array)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(break|continue|do|else|for|if|throw|try|when|while|catch|finally)\b/g,
                        type: "k1"
                    }, {
                        regex: /^(package|import)(\s+[\w.]+)/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(enum|typealias|object|companion|val|var)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(actual|abstract|annotation|companion|crossinline|data|expect|external|final|infix|inline|inner|internal|lateinit|noinline|open|operator|out|override|private|protected|public|reified|sealed|suspend|tailrec|vararg)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(as|class|fun|in|interface|is|return|by|constructor|delegate|dynamic|field|file|get|init|param|property|receiver|set|setparam|where|field|it)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(this|super)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(instanceof|new)\b/g,
                        type: "k3"
                    }, {
                        regex: /(@\w+|\w+@)/gm,
                        type: "k6"
                    },
                    t.fCalls, t.mCalls, t.null, t.boolean, t.slashComments, t.blockComments, {
                        regex: /[\b\W](-?\d[\d_]*L?)(?!\.)\b/g,
                        type: "n1"
                    },
                    t.floats, {
                        regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi,
                        type: "n2"
                    }, {
                        regex: /[\b\W](-?0b[01][01_]+)\b/gi,
                        type: "n3"
                    },
                    t.brackets
                ]
            }
        }
    ]), V);

    function V() {
        return r(this, V), a(this, (V.__proto__ || Object.getPrototypeOf(V)).apply(this, arguments))
    }
    var Y = (i(X, C), n(X, [{
            key: "setupLanguage",
            value: function() {
                o(X.prototype.__proto__ || Object.getPrototypeOf(X.prototype), "setupLanguage", this).call(this);
                var e = [t.slashComments, {
                        regex: /\b([\w][\w-]+)\s*\(/gm,
                        type: "m0"
                    }, {
                        regex: /@[\w-]+\b/g,
                        type: "k7"
                    }, {
                        regex: /&/gi,
                        type: "k3"
                    }
                ];
                this.rules = this.rules.concat(e)
            }
        }
    ]), X);

    function X() {
        return r(this, X), a(this, (X.__proto__ || Object.getPrototypeOf(X)).apply(this, arguments))
    }
    var Q = (i(K, l), n(K, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /---\[\[[\s\S]*?(]])/g,
                        type: "c1"
                    }, {
                        regex: /--\[\[[\s\S]*?]]/g,
                        type: "c1"
                    }, {
                        regex: /(--.*)$/gm,
                        type: "c0"
                    },
                    t.dqStrings, t.sqStrings, {
                        regex: /(\[(=*)\[[\S\s]*?]\2])/g,
                        type: "s5"
                    }, {
                        regex: /\b(true|false)\b/gi,
                        type: "e0"
                    }, {
                        regex: /\b(nil)\b/gi,
                        type: "e1"
                    }, {
                        regex: /\b(local)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(break|do|else|elseif|end|for|if|repeat|then|until|while)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(function|return|and|in|or|not)\b/g,
                        type: "k0"
                    },
                    t.brackets, t.floats, t.mCalls, t.fCalls
                ]
            }
        }
    ]), K);

    function K() {
        return r(this, K), a(this, (K.__proto__ || Object.getPrototypeOf(K)).apply(this, arguments))
    }
    var ee = (i(te, l), n(te, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /[\r|\n](```[a-z_-]*[\r|\n][\S\s]+?```)/gi,
                        type: "t8"
                    }, {
                        regex: /^\s*#{1,6}.+$/gm,
                        type: "t1"
                    }, {
                        regex: /(.+[\r|\n][=-]{3,})[\r|\n]/g,
                        type: "t1"
                    }, {
                        regex: /`.+?`/g,
                        type: "t8"
                    }, {
                        regex: /^(?:\*|_|-){3,}$/gm,
                        type: "t2"
                    }, {
                        regex: /\W(\*\*|\*|~~|~|__|_)(.*?\1)\W/gm,
                        type: "t4"
                    }, {
                        regex: /!?\[.*?]\(.*?\)/g,
                        type: "t3"
                    }
                ]
            }
        }
    ]), te);

    function te() {
        return r(this, te), a(this, (te.__proto__ || Object.getPrototypeOf(te)).apply(this, arguments))
    }
    var re = (i(ne, l), n(ne, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /%.*$/gm,
                        type: "c0"
                    }, {
                        regex: /%%.*$/gm,
                        type: "c1"
                    },
                    t.sqStrings, t.dqStrings, t.boolean, t.mCalls, t.prop, {
                        regex: /\b(break|case|catch|continue|do|else|elseif|end|end_try_catch|endfor|endif|endmethods|endparfor|endproperties|endswitch|endwhile|for|if|switch|try|until|while)\b/gi,
                        type: "k1"
                    }, {
                        regex: /\b(__FILE__|__LINE__|classdef|end_unwind_protect|endclassdef|endenumeration|endevents|endfunctionenumeration|events|function|global|methods|otherwise|parfor|persistent|properties|return|static|unwind_protect|unwind_protect_cleanup)\b/gi,
                        type: "k0"
                    }, {
                        regex: /(@[\w]+)\s*/gm,
                        type: "k7"
                    },
                    t.fCalls, t.floats, t.brackets
                ]
            }
        }
    ]), ne);

    function ne() {
        return r(this, ne), a(this, (ne.__proto__ || Object.getPrototypeOf(ne)).apply(this, arguments))
    }
    var se = (i(ie, l), n(ie, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.sqStrings, t.bqStrings, {
                        regex: /^\s*(Var(\s+\\GLOBAL)?)(\s+\w+)\b/g,
                        type: ["k2", "k7"]
                    }, {
                        regex: /\W(\$\{\w+})\W/g,
                        type: "k9"
                    }, {
                        regex: /\W(\$\w+)\b/g,
                        type: "k7"
                    }, {
                        regex: /^\s*([A-Z]\w+)\s+/gm,
                        type: "k0"
                    }, {
                        regex: /\b[A-Z][A-Z_]*[A-Z]\b/g,
                        type: "e3"
                    }, {
                        regex: /^\s*(!\w+)\s+/gm,
                        type: "k4"
                    }, {
                        regex: /^\s*(\w+:)\s*$/gim,
                        type: "k6"
                    }, {
                        regex: /\b(admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user)\b/gi,
                        type: "k9"
                    },
                    t.blockComments, {
                        regex: /[#;].*?$/gm,
                        type: "c0"
                    },
                    t.int, t.hex, t.octal, t.brackets
                ]
            }
        }
    ]), ie);

    function ie() {
        return r(this, ie), a(this, (ie.__proto__ || Object.getPrototypeOf(ie)).apply(this, arguments))
    }
    var oe = (i(ae, l), n(ae, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.sqStrings, t.dqStrings, t.heredoc, t.boolean, t.null, {
                        regex: /(self|parent|\$this)/gi,
                        type: "k9"
                    }, {
                        regex: /\b(as|break|case|catch|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|finally|for|foreach|goto|if|switch|throw|try|while)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b__[A-Z][A-Z0-9_]+__\b/g,
                        type: "e3"
                    }, {
                        regex: /\b(__halt_compiler|abstract|array|callable|class|const|continue|declare|default|die|echo|empty|eval|exit|extends|final|function|global|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|print|private|protected|public|require|require_once|return|static|trait|use|var|yield)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(and|or|xor|clone|new|unset)\b/g,
                        type: "k3"
                    }, {
                        regex: /\b(int|float|bool|string|resource|object|mixed|numeric)\b/g,
                        type: "k5"
                    },
                    t.slashComments, t.blockComments, {
                        regex: /\$[A-Z_][\w]*/gim,
                        type: "k7"
                    },
                    t.fCalls, {
                        regex: /->([\w]+)/gim,
                        type: "m1"
                    }, {
                        regex: /::([\w]+)/gim,
                        type: "m2"
                    },
                    t.octal, t.bin, t.hex, t.floats, t.brackets
                ]
            }
        }
    ]), ae);

    function ae() {
        return r(this, ae), a(this, (ae.__proto__ || Object.getPrototypeOf(ae)).apply(this, arguments))
    }
    var ge = (i(le, l), n(le, [{
            key: "setupLanguage",
            value: function() {
                function e(e) {
                    return k(e, /\$(?:\w+|\(.*?\))/g, function(e) {
                        return [_(e[0], "k7")]
                    })
                }
                this.rules = [{
                        regex: /"(?:[^"`]|`.)*"/g,
                        type: "s2",
                        filter: e
                    },
                    t.sqStrings, {
                        regex: /@"[\S\s]*?\n\s*"@/g,
                        type: "s5",
                        filter: e
                    }, {
                        regex: /@'[\S\s]*?\n\s*'@/g,
                        type: "s5"
                    }, {
                        regex: /\b(Begin|Break|Catch|Continue|Else|Elseif|End|Finally|For|ForEach|If|Switch|Throw|Try|Until|While)\b/gi,
                        type: "k1"
                    }, {
                        regex: /\b(Data|Do|DynamicParam|Exit|Filter|From|Function|In|InlineScript|Hidden|Parallel|Param|Process|Return|Sequence|Trap|Workflow)\b/gi,
                        type: "k0"
                    }, {
                        regex: /\b([A-Z]\w+(?:-\w+)+)\b/g,
                        type: "m0"
                    }, {
                        regex: /<#[\S\s]+?#>/gi,
                        type: "c1"
                    },
                    t.poundComments, {
                        regex: /\$[A-Z_][\w]*/gim,
                        type: "k7"
                    },
                    t.mCalls, t.fCalls, t.int, t.floats, t.brackets
                ]
            }
        }
    ]), le);

    function le() {
        return r(this, le), a(this, (le.__proto__ || Object.getPrototypeOf(le)).apply(this, arguments))
    }
    var pe = (i(ue, l), n(ue, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /(%.*)$/gm,
                        type: "c0"
                    },
                    t.blockComments, t.dqStrings, t.sqStrings, {
                        regex: /^(\w+)(?:\(.*?\))?\s*(?::-|\.)/gm,
                        type: "k9"
                    }, {
                        regex: /\b(true|false|Yes|No|not|fail)\b/gi,
                        type: "e0"
                    }, {
                        regex: /\b(catch|throw|repeat)\b/g,
                        type: "k1"
                    }, {
                        regex: /^(\?-)/g,
                        type: "k9"
                    }, {
                        regex: /\b(is)\b/g,
                        type: "k3"
                    }, {
                        regex: /[A-Z_][\w]*/g,
                        type: "k7"
                    },
                    t.brackets, t.floats, t.int, t.fCalls
                ]
            }
        }
    ]), ue);

    function ue() {
        return r(this, ue), a(this, (ue.__proto__ || Object.getPrototypeOf(ue)).apply(this, arguments))
    }
    var ce = (i(ye, l), n(ye, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.prop, {
                        regex: /\b([A-Z]\w+)\b/g,
                        type: "k5"
                    }, {
                        regex: /^(import)(\s+[\w.]+)/gm,
                        type: ["k0", "k5"]
                    }, {
                        regex: /\b(bool|char|double|float|int|long|short|void|string)\b/g,
                        type: "k5"
                    },
                    t.mCalls, t.null, t.boolean, t.slashComments, t.blockComments, t.int, t.floats, t.brackets
                ]
            }
        }
    ]), ye);

    function ye() {
        return r(this, ye), a(this, (ye.__proto__ || Object.getPrototypeOf(ye)).apply(this, arguments))
    }
    var be = (i(fe, l), n(fe, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /^(.*?)$/g,
                        type: "text"
                    }
                ]
            }
        }
    ]), fe);

    function fe() {
        return r(this, fe), a(this, (fe.__proto__ || Object.getPrototypeOf(fe)).apply(this, arguments))
    }
    var he = (i(de, l), n(de, [{
            key: "setupLanguage",
            value: function() {
                function e(e) {
                    return e.text.match(/^%r/) ? e.type = "e2" : e.text.match(/^%x/) && (e.type = "e4"), [e]
                }
                this.rules = [t.dqStrings, t.sqStrings, t.heredoc, {
                        regex: /(`(?:[^`\\]|\\.)*`)/g,
                        type: "e4"
                    },
                    t.boolean, {
                        regex: /\b(nil)\b/gi,
                        type: "e1"
                    },
                    t.fCalls, t.prop, {
                        regex: /@{1,2}[A-Za-z_]\w*\W/g,
                        type: "k7"
                    }, {
                        regex: /[^:](:[\w]+)\b/g,
                        type: "k6"
                    }, {
                        regex: /(\$[a-z0-9_-]+|\$.)\W/gi,
                        type: "k9"
                    }, {
                        regex: /\b(begin|break|case|do|else|elsif|end|ensure|for|if|in|next|redo|rescue|retry|then|unless|until|when|while)\b/gi,
                        type: "k1"
                    }, {
                        regex: /\b((?:__)?[A-Z][A-Z0-9_]+)\b/g,
                        type: "e3"
                    }, {
                        regex: /\b(alias|class|defined\?|undef|def|module|return|self|super|yield)\W/gi,
                        type: "k0"
                    }, {
                        regex: /\b(and|not|or)\b/gi,
                        type: "k3"
                    },
                    t.poundComments, {
                        regex: /^=begin[\S\s]*?^=end/gim,
                        type: "c2"
                    }, {
                        regex: /(%[iqrswx](\W)(?:[^\2\n\\]|\\.)*\2[iomx]*)/gim,
                        type: "s2",
                        filter: e
                    }, {
                        regex: /(%[iqrswx]?(\{(?:[^}\\]|\\.)*}|\[(?:[^}\\]|\\.)*]|\((?:[^)\\]|\\.)*\))[iomx]*)/gim,
                        type: "s2",
                        filter: e
                    }, {
                        regex: /\W(\/(?:[^/\\]|\\.)*\/\w*)\W/g,
                        type: "e2"
                    }, {
                        regex: /\W\?(?:\w|\\M|\\C)(?:-\w|-\\M|-\\C)*\b/g,
                        type: "n1"
                    }, {
                        regex: /[\b\W](-?\d[\d_]+?)(?!\.)\b/g,
                        type: "n1"
                    }, {
                        regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi,
                        type: "n2"
                    }, {
                        regex: /[\b\W](-?0b[01][01_]+)\b/gi,
                        type: "n3"
                    }, {
                        regex: /[\b\W](-?[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?[ji]?)\b/gi,
                        type: "n0"
                    },
                    t.brackets
                ]
            }
        }
    ]), de);

    function de() {
        return r(this, de), a(this, (de.__proto__ || Object.getPrototypeOf(de)).apply(this, arguments))
    }
    var xe = (i(me, l), n(me, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.char, {
                        regex: /r((#+)".*?"\2)/gm,
                        type: "s0"
                    }, {
                        regex: /("(?:\\.|\\\s*\n|\\s*\r\n|[^\\"])*")/g,
                        type: "s0"
                    }, {
                        regex: /^\s*#.*$/gm,
                        type: "k4"
                    }, {
                        regex: /fn\s+([\w]+)\s*(<\w+\s*>)?\(/gm,
                        type: "k0"
                    }, {
                        regex: /\b\.?([\w]+)\s*(\(|::)/gm,
                        type: "k1"
                    }, {
                        regex: /\b([\w]+)!/gm,
                        type: "k9"
                    }, {
                        regex: /\bself\b/gi,
                        type: "k9"
                    },
                    t.boolean, {
                        regex: /\b(while|loop|in|for|if|else|do|continue|break)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(type|struct|let|enum)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(const)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(yield|where|virtual|use|unsized|unsafe|trait|super|static|return|ref|pure|pub|proc|priv|override|offsetof|mut|move|mod|match|macro|impl|fn|final|extern|crate|box|become|as|alignof|abstract)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(sizeof|typeof)\b/g,
                        type: "k3"
                    }, {
                        regex: /\b([0-9_]+\.?[0-9_]+?(e\+[0-9_]+)?)(?:f32|f64)?\b/gim,
                        type: "n0"
                    }, {
                        regex: /\b([0-9_]+|0o[0-9_]+|0x[A-F0-9_]+|0b[0-1_]+)(?:u8|i8|u16|i16|u32|i32|u64|i64|isize|usize)?\b/gim,
                        type: "n1"
                    },
                    t.slashComments, t.blockComments, {
                        regex: /(?:^|[^\\])\/\/[/!].*$/gm,
                        type: "c2"
                    }, {
                        regex: /\/\*[*!][\s\S]*?\*\//gm,
                        type: "c2"
                    },
                    t.brackets, {
                        regex: /\W(&)\w/g,
                        type: "k3"
                    }
                ]
            }
        }
    ]), me);

    function me() {
        return r(this, me), a(this, (me.__proto__ || Object.getPrototypeOf(me)).apply(this, arguments))
    }
    var ke = (i(_e, l), n(_e, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.char, {
                        regex: /s"(?:[^"\\]|\\.)*"/g,
                        type: "s2"
                    }, {
                        regex: /`(?:[^`\\]|\\.)*`/g,
                        type: "k7"
                    }, {
                        regex: /@[\W\w_][\w]+/g,
                        type: "s9"
                    }, {
                        regex: /\b([A-Z]\w*)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(while|try|catch|else|throw|break|if|do|goto|switch|for|match)\b/g,
                        type: "k1"
                    }, {
                        regex: /(package|import)(\s+[\w.]+)/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /[\b\w\s)](_|:|@|#|<-|←|<:|<%|=|=>|⇒|>:)[\b\w\s]/g,
                        type: "k3"
                    }, {
                        regex: /\b(abstract|class|case|extends|final|finally|forSome|implicit|lazy|object|override|private|protected|return|sealed|trait|with|yield)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(def)\s+(\w+)\b/gm,
                        type: ["k2", "m0"]
                    }, {
                        regex: /\b(type)\s+(\w+)\b/gm,
                        type: ["k2", "k5"]
                    }, {
                        regex: /\b(val)\s+(\w+)\b/gm,
                        type: ["k2", "k7"]
                    }, {
                        regex: /\b(var)\s+(\w+)\b/gm,
                        type: ["k2", "k7"]
                    }, {
                        regex: /\b(this|super)\b/g,
                        type: "k9"
                    }, {
                        regex: /\b(new)\b/g,
                        type: "k3"
                    },
                    t.mCalls, t.fCalls, t.null, t.boolean, t.slashComments, t.blockComments, t.docComments, t.int, t.floats, t.bin, t.brackets
                ]
            }
        }
    ]), _e);

    function _e() {
        return r(this, _e), a(this, (_e.__proto__ || Object.getPrototypeOf(_e)).apply(this, arguments))
    }
    var ve = (i(we, C), n(we, [{
            key: "setupLanguage",
            value: function() {
                o(we.prototype.__proto__ || Object.getPrototypeOf(we.prototype), "setupLanguage", this).call(this);
                var e = [t.slashComments, {
                        regex: /\b([\w-]+)\s*\(/gm,
                        type: "m0"
                    }, {
                        regex: /\$[\w-]+\b/g,
                        type: "k7"
                    }, {
                        regex: /@[\w-]+\b/g,
                        type: "k9"
                    }, {
                        regex: /&/gi,
                        type: "k3"
                    }
                ];
                this.rules = this.rules.concat(e)
            }
        }
    ]), we);

    function we() {
        return r(this, we), a(this, (we.__proto__ || Object.getPrototypeOf(we)).apply(this, arguments))
    }
    var Ce = (i(Oe, l), n(Oe, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /(^#!.*?)\n/gi,
                        type: "k4"
                    },
                    t.poundComments, t.dqStrings, {
                        regex: /`.*?`/gm,
                        type: "s2"
                    }, {
                        regex: /(\$)\(/gm,
                        type: "s2"
                    }, {
                        regex: /(\$\d)\b/gim,
                        type: "k9"
                    }, {
                        regex: /(\$\w+)\b/gim,
                        type: "k7"
                    }, {
                        regex: /^(\s*\w+)=/gm,
                        type: "k7"
                    }, {
                        regex: /^\s*\w+\)\s*$/gm,
                        type: "k6"
                    }, {
                        regex: /\b(if|fi|then|elif|else|for|do|done|until|while|break|continue|case|esac|in|eq|ne|gt|lt|ge|le)\b/gi,
                        type: "k1"
                    }, {
                        regex: /\b(return|function)\b/gi,
                        type: "k0"
                    }, {
                        regex: /^\s*\w+\(\)\s*\{/gm,
                        type: "k0"
                    },
                    t.floats
                ]
            }
        }
    ]), Oe);

    function Oe() {
        return r(this, Oe), a(this, (Oe.__proto__ || Object.getPrototypeOf(Oe)).apply(this, arguments))
    }
    var Se = (i(Ae, l), n(Ae, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.poundComments, t.blockComments, t.null, t.sqStrings, {
                        regex: /--.*$/g,
                        type: "c0"
                    }, {
                        regex: /`\w+?`(?:\.`\w+?`)*/g,
                        type: "k9"
                    }, {
                        regex: /\b(all|and|any|between|exists|in|like|not|or|is null|is not null|unique|=|!=|<>|>|<|>=|<=|!<|!>)\b/gi,
                        type: "k3"
                    }, {
                        regex: /\b[A-Z]+\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(SELECT|INSERT|UPDATE|DELETE|INTO|FROM|CREATE|TABLE|VIEW|TRIGGER|ALTER|ORDER BY|DESC|ASC|AS|BETWEEN|IN|JOIN|LEFT|RIGHT|INNER|OUTER|USING|ON)b/gi,
                        type: "k0"
                    },
                    t.fCalls, t.floats
                ]
            }
        }
    ]), Ae);

    function Ae() {
        return r(this, Ae), a(this, (Ae.__proto__ || Object.getPrototypeOf(Ae)).apply(this, arguments))
    }
    var Le = (i(je, l), n(je, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, {
                        regex: t.sqStrings.regex,
                        type: "n0"
                    },
                    t.prop, t.slashComments, t.poundComments, t.blockComments, t.brackets, {
                        regex: /\b(const|enum|local)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(break|case|catch|continue|else|for|foreach|if|switch|while|try|do)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(base|class|clone|constructor|default|extends|false|function|null|resume|return|static|this|throw|true|yield)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(delete|in|instanceof|typeof)\b/g,
                        type: "k3"
                    },
                    t.mCalls, t.fCalls, t.octal, t.hex, t.floats, t.int
                ]
            }
        }
    ]), je);

    function je() {
        return r(this, je), a(this, (je.__proto__ || Object.getPrototypeOf(je)).apply(this, arguments))
    }
    var Ee = (i(qe, l), n(qe, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.boolean, {
                        regex: /#.*$/gm,
                        type: "k4"
                    },
                    t.prop, {
                        regex: /(import )(.*?)$/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(nil)\b/gi,
                        type: "e1"
                    }, {
                        regex: /\b(break|case|continue|default|do|else|for|if|switch|while|catch|throw|try)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(var|let|enum|struct)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(Int|UInt|Float|Double|Bool|String|Character|Optional|Array|Dictionary)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(associatedtype|class|deinit|extension|func|init|inout|internal|operator|private|protocol|public|static|subscript|typealias|defer|fallthrough|guard|in|as|repeat|return|where|dynamicType|is|rethrows|super|self|Self|throws|associativity|convenience|dynamic|didSet|final|get|infix|indirect|lazy|left|mutating|none|nonmutating|optional|override|postfix|precedence|prefix|Protocol|required|right|set|Type|unowned|weak|willSet)\b/g,
                        type: "k0"
                    },
                    t.mCalls, t.fCalls, {
                        regex: /(?:^|[^\\])\/\/\/.*$/gm,
                        type: "c2"
                    },
                    t.docComments, t.slashComments, t.blockComments, {
                        regex: /[\b\W](-?0b[01_]+)\b/gi,
                        type: "n3"
                    }, {
                        regex: /[\b\W](-?0x[A-F0-9_]+)(?!\.)\b/gi,
                        type: "n2"
                    }, {
                        regex: /[\b\W](-?0o[0-7_]+)(?!\.)\b/g,
                        type: "n4"
                    }, {
                        regex: /[\b\W](-?[\d_]+)(?!\.)\b/g,
                        type: "n1"
                    }, {
                        regex: /(-?(?:[\d_]+\.[\d_]+(?:e[+-]?[\d_]+)?))/gi,
                        type: "n0"
                    }, {
                        regex: /(-?0x(?:[A-F0-9_]+\.[A-F0-9_]+(?:p[+-]?[A-F0-9_]+)?))/gi,
                        type: "n2"
                    },
                    t.brackets
                ]
            }
        }
    ]), qe);

    function qe() {
        return r(this, qe), a(this, (qe.__proto__ || Object.getPrototypeOf(qe)).apply(this, arguments))
    }
    var Pe = (i(We, G), n(We, [{
            key: "setupLanguage",
            value: function() {
                o(We.prototype.__proto__ || Object.getPrototypeOf(We.prototype), "setupLanguage", this).call(this), this.rules = [{
                        regex: /\b(boolean|number|string|any|void|undefined|never|symbol)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(type|interface)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(abstract|implements|readonly)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(declare|namespace)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b([\w]+)\s*</gm,
                        type: "m0"
                    }, {
                        regex: /[<>]/g,
                        type: "g1"
                    }
                ].concat(this.rules)
            }
        }
    ]), We);

    function We() {
        return r(this, We), a(this, (We.__proto__ || Object.getPrototypeOf(We)).apply(this, arguments))
    }
    var $e = (i(Ie, l), n(Ie, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /((?:^\s*|\s+)--.*$)/gm,
                        type: "c0"
                    }, {
                        regex: /^\s*(?:use|library)\s*(\S+);/gim,
                        type: "k9"
                    },
                    t.fCalls, {
                        regex: /\*\*|\*|\/|\+|-|&|=|\/=|<|<=|>|>=/g,
                        type: "g0"
                    },
                    t.dqStrings, t.sqStrings, t.brackets, {
                        regex: /\b(alias|array|variable|downto|range|to|type|units)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(array|buffer|bus|file)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(if|else|elsif|end|for|while|loop|when|begin|block|case|exit|next|then)\b/g,
                        type: "k1"
                    }, {
                        regex: /\b(access|after|all|architecture|attribute|assert|body|component|configuration|constant|disconnect|entity|function|generate|generic|group|guarded|impure|in|inertial|inout|is|label|library|linkage|literal|map|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|record|return|select|severity|signal|shared|subtype|transport|unaffected|use|vaiable|with|wait|until)\b/g,
                        type: "k0"
                    }, {
                        regex: /\b(abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|nor|xor|xnor|new)\b/g,
                        type: "k3"
                    },
                    t.floats
                ]
            }
        }
    ]), Ie);

    function Ie() {
        return r(this, Ie), a(this, (Ie.__proto__ || Object.getPrototypeOf(Ie)).apply(this, arguments))
    }
    var Ne = (i(Fe, l), n(Fe, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.dqStrings, t.boolean, t.prop, {
                        regex: /(#.*?)(?:'|$)/gim,
                        type: "k4"
                    }, {
                        regex: /\b(Case|Catch|Continue|Each|Else|ElseIf|End|EndIf|Do|Finally|For|If|Loop|Next|OrElse|Then|Throw|Try|When|While)\b/g,
                        type: "k1"
                    }, {
                        regex: /(Imports )(.*?)$/gm,
                        type: ["k0", "k10"]
                    }, {
                        regex: /\b(Boolean|Byte|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|CLng|CObj|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|Decimal|Double|Integer|Long|ParamArray|SByte|Short|Single|String|UInteger|ULong|UShort)\b/g,
                        type: "k5"
                    }, {
                        regex: /\b(Dim|Enum|Let|ReDim)\b/g,
                        type: "k2"
                    }, {
                        regex: /\b(Const|Shared|Static)\b/g,
                        type: "k8"
                    }, {
                        regex: /\b(AddHandler|AddressOf|Alias|As|ByRef|ByVal|Call|Class|Date|Declare|Default|Delegate|DirectCast|Erase|Error|Event|Exit|Friend|Function|Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|Handles|Implements|In|Inherits|Interface|Lib|Like|Me|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|Narrowing|Nothing|NotInheritable|NotOverridable|Object|Of|On|Operator|Option|Optional|Out|Overloads|Overridable|Overrides|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|REM|RemoveHandler|Resume|Return|Select|Set|Shadows|Step|Stop|Structure|Sub|SyncLock|To|TryCast|Using|Variant|Wend|Widening|With|WithEvents|WriteOnly)\b/gi,
                        type: "k0"
                    }, {
                        regex: /\b(And|AndAlso|Is|IsNot|Mod|New|Not|Or|TypeOf|Xor)\b/g,
                        type: "k3"
                    },
                    t.mCalls, t.fCalls, {
                        regex: /'.*$/gm,
                        type: "c0"
                    },
                    t.int, t.floats, t.brackets
                ]
            }
        }
    ]), Fe);

    function Fe() {
        return r(this, Fe), a(this, (Fe.__proto__ || Object.getPrototypeOf(Fe)).apply(this, arguments))
    }
    var De = (i(Te, l), n(Te, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [{
                        regex: /<!DOCTYPE[\s\S]+?>/g,
                        type: "k9"
                    }, {
                        regex: /<\?xml[\s\S]+\?>/gi,
                        type: "k4"
                    }, {
                        regex: /<!--[\s\S]*?-->/g,
                        type: "c1"
                    }, {
                        regex: /(<!\[CDATA\[)([\s\S]*?)(]]>)/gim,
                        type: ["c9", "text", "c9"]
                    }, {
                        regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                        type: ["g1", "x1", "text", "g1"],
                        filter: [null, null, function(e) {
                                return k(e, /\b([\w:-]+)(\s*=\s*)(['"][^'"]*['"]|[^'" \t]+)/gi, function(e) {
                                    return [_(e[1], "x2"), _(e[2], "k3"), _(e[3], "s0")]
                                })
                            },
                            null
                        ]
                    }, {
                        regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                        type: ["g1", "x1", "g1"]
                    }
                ]
            }
        }
    ]), Te);

    function Te() {
        return r(this, Te), a(this, (Te.__proto__ || Object.getPrototypeOf(Te)).apply(this, arguments))
    }
    var Re = (i(Ze, l), n(Ze, [{
            key: "setupLanguage",
            value: function() {
                this.rules = [t.poundComments, t.boolean, t.null, {
                        regex: /^%[A-Z]+\s+.*$/gm,
                        type: "k4"
                    }, {
                        regex: /\b!{1,2}[A-Z]+\b/gi,
                        type: "k5"
                    }, {
                        regex: /\b[a-z][a-z0-9_-]*:/gim,
                        type: "k7"
                    }, {
                        regex: /\{|}|\(|\)|\[|]/g,
                        type: "g1"
                    }, {
                        regex: /\s+(?:>|\|)[\r|\n]+((?:\s+[^\r\n]+[\r|\n]+)+)/gi,
                        type: "s5"
                    },
                    t.dqStrings, t.sqStrings, t.floats
                ]
            }
        }
    ]), Ze);

    function Ze() {
        return r(this, Ze), a(this, (Ze.__proto__ || Object.getPrototypeOf(Ze)).apply(this, arguments))
    }
    var ze = Object.freeze({
        generic: l,
        abap: c,
        assembly: b,
        avrassembly: h,
        cpp: x,
        csharp: v,
        css: C,
        cython: L,
        cordpro: E,
        diff: P,
        dockerfile: $,
        go: N,
        groovy: D,
        ini: R,
        java: z,
        javascript: G,
        json: U,
        kotlin: J,
        less: Y,
        lua: Q,
        markdown: ee,
        matlab: re,
        nsis: se,
        php: oe,
        powershell: ge,
        prolog: pe,
        python: S,
        qml: ce,
        raw: be,
        ruby: he,
        rust: xe,
        scala: ke,
        scss: ve,
        shell: Ce,
        sql: Se,
        squirrel: Le,
        swift: Ee,
        typescript: Pe,
        vhdl: $e,
        visualbasic: Ne,
        xml: De,
        yaml: Re
    }),
        Be = {
            standard: "generic",
            js: "javascript",
            md: "markdown",
            gfm: "markdown",
            "c++": "cpp",
            c: "cpp",
            "c#": "csharp",
            styles: "css",
            bash: "shell",
            py: "python",
            html: "xml",
            conf: "ini",
            avrasm: "avrassembly",
            asm: "assembly",
            sass: "scss",
            golang: "go",
            vb: "visualbasic",
            docker: "dockerfile"
        };

    function Ge(e, t, r) {
        if (e) if (Array.isArray(e)) for (var n = 0; n < e.length; n++) t.apply(r || t, [e[n], n]);
            else for (var s in e) e.hasOwnProperty(s) && t.apply(r || t, [e[s], s])
    }
    var Me = document,
        Ue = window,
        He = {
            document: Me,
            window: Ue
        };

    function Je() {
        return Me
    }
    function Ve() {
        return Ue
    }
    function Ye(e) {
        var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        e.style.display = !0 === t ? "block" : "none"
    }
    function Xe(e) {
        e.parentNode.removeChild(e)
    }
    function Qe(e) {
        return null != e && 0 < e.length ? Me.querySelectorAll(e) : []
    }
    function Ke(e, t) {
        return e.getAttribute("data-" + t) || null
    }
    function et(e, t) {
        return e.parentNode.insertBefore(t, e)
    }
    function tt(e, t) {
        e.classList.contains(t) || e.classList.add(t)
    }
    function rt(e, t) {
        e.classList.contains(t) && e.classList.remove(t)
    }
    function nt(e, t) {
        return e.classList.contains(t)
    }
    function st(e, t) {
        e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t)
    }
    function it(e, t) {
        for (var r = arguments.length, n = Array(2 < r ? r - 2 : 0), s = 2; s < r; s++) n[s - 2] = arguments[s];
        if ("function" == typeof e) return e.apply(void 0, [t || {}].concat(n));
        var i = Me.createElement(e);

        function o(e, t) {
            i.addEventListener(e, function(e) {
                e.preventDefault(), e.stopPropagation(), t && t.apply(i, [e, i])
            })
        }
        return 0 < n.length && Ge(n, function(e) {
            e && (e.push ? Ge(e, function(e) {
                e.appendChild ? i.appendChild(e) : i.appendChild(Me.createTextNode(e))
            }) : e.appendChild ? i.appendChild(e) : i.appendChild(Me.createTextNode(e)))
        }), Ge(t, function(e, t) {
            if ("on" === t.substr(0, 2)) {
                if (null === e) return;
                o(t.substr(2).toLowerCase(), e)
            } else "className" === t && (t = "class"), i.setAttribute(t, e)
        }), i.on = o, i
    }
    var ot = Object.freeze({
        globals: He,
        getDocument: Je,
        getWindow: Ve,
        displayElement: Ye,
        disposeElement: Xe,
        getElements: Qe,
        getElement: function(e) {
            return null != e && 0 < e.length ? Me.querySelector(e) : null
        },
        getElementDataAttribute: Ke,
        insertBefore: et,
        addClass: tt,
        removeClass: rt,
        hasClass: nt,
        toggleClass: st,
        createElement: it
    });

    function at(e) {
        var t = e.tokens,
            r = e.options,
            n = function(e, t) {
                if ("string" != typeof e || 0 === e.length) return function() {
                        return !1
                };
                var r = parseInt(t),
                    i = !isNaN(r) && 1 < r ? r - 1 : 0,
                    o = {};
                return e.split(",").forEach(function(e) {
                    var t = e.match(/([0-9]+)-([0-9]+)/);
                    if (null != t) {
                        var r = parseInt(t[1]) - i,
                            n = parseInt(t[2]) - i;
                        if (r < n) for (var s = r; s <= n; s++) o["" + s] = !0
                    } else o["" + (parseInt(e) - i)] = !0
                }),
                function(e) {
                    return o["" + e] || !1
                }
            }(r.highlight, r.lineoffset),
            s = [],
            i = [];
        t.forEach(function(t) {
            var e = t.text.split("\n");
            1 === e.length ? i.push([t.type, t.text]) : (i.push([t.type, e.shift()]), e.forEach(function(e) {
                s.push(i), (i = []).push([t.type, e])
            }))
        }), s.push(i);
        var o = [];
        return 0 < r.lineoffset && o.push("counter-reset: enlighter " + (parseInt(r.lineoffset) - 1)), it("div", {
            className: "enlighter",
            style: o.join(";")
        }, s.map(function(e, t) {
            return it("div", {
                className: n(t + 1) ? "enlighter-special" : ""
            }, it("div", null, e.map(function(e) {
                return it("span", {
                    className: "enlighter-" + e[0]
                }, e[1])
            })))
        }))
    }
    function gt(e) {
        var t = [];
        e.name && t.push("enlighter-" + e.name), e.className && ("string" == typeof e.className ? t.push(e.className) : t.push.apply(t, g(e.className)));
        for (var r = arguments.length, n = Array(1 < r ? r - 1 : 0), s = 1; s < r; s++) n[s - 1] = arguments[s];
        return it.apply(ot, ["div", {
                className: t.join(" ")
            }
        ].concat(n))
    }
    function lt(e) {
        var t = ["enlighter-btn"];
        return e.name && t.push("enlighter-btn-" + e.name), it("div", {
            className: t.join(" "),
            onClick: e.onClick
        }, e.text || null)
    }
    function pt(r) {
        var n = Ve();
        return it(gt, {
            name: "toolbar"
        }, it(lt, {
            name: "copy",
            tooltip: "Copy to clipboard",
            onClick: function() {
                ! function (e) {
                    var t = Je(),
                        r = Ve(),
                        n = it("pre", {
                            className: "enlighter-clipboard"
                        }, e);
                    t.body.appendChild(n);
                    try {
                        var s = t.createRange();
                        s.selectNodeContents(n);
                        var i = r.getSelection();
                        i.removeAllRanges(), i.addRange(s)
                    } catch (e) {
                        return
                    }
                    var o = function () {
                        try {
                            return t.execCommand("copy")
                        } catch (e) {
                            return !1
                        }
                    }();
                    r.getSelection().removeAllRanges(), Xe(n)
                }(r.getRawCode())
            }
        }))
    }
    function ut(e, t) { 
        return it("div", {
            className: "enlighter-footer",
            "data-language": t.language
            },
            it("div", {
                    className: "pre-language",
                },
                it("span", { className: "enlighter-ico enlighter-code" }), (t.params.language === 'null' ? '-' : t.params.language)
            ), 
            it("div", {
                    className: "pre-size",
                },
                it("span", { className: "enlighter-ico enlighter-size" }), to_b(t.code.length)
            ),
            it("div", {
                    className: "copyright",
                }, t.params.title
            )
        )
    }
    function ct(e) {
        var t = null,
            r = e[0].params,
            n = ["enlighter-default", "enlighter-v-standard", "enlighter-t-" + e[0].params.theme];

        function s() {
            st(t, "enlighter-show-rawcode")
        }
        return !0 === r.linehover && n.push("enlighter-hover"), !0 === r.linenumbers && n.push("enlighter-linenumbers"), "scroll" === r.textOverflow && n.push("enlighter-overflow-scroll"), t = it(gt, {
            className: n
        }, it(pt, {
            toggleRawCode: s,
            getRawCode: function () {
                t.childNodes[0].getElementsByClassName("enlighter-btn-copy")[0].classList.add("copied");
                return e[0].code
            }
        }), it(at, {
            tokens: e[0].tokens,
            options: e[0].params
        }), it(ut, null, e[0])), r.rawcodeDbclick && t.on("dbclick", s), t
    }
    function yt(e) {
        return it("span", {
            className: "enlighter"
        }, e.tokens.map(function(e) {
            return it("span", {
                className: "enlighter-" + e.type
            }, e.text)
        }))
    }
    function bt(r) {
        var n = 0,
            s = [];
        return tt((s = r.dataset.map(function(e, t) {
            return it(lt, {
                onClick: function() {
                    return function(e) {
                        rt(s[n], "enlighter-active"), tt(s[e], "enlighter-active"), n = e, r.onChange(e)
                    }(t)
                },
                text: e.params.title || e.params.language
            })
        }))[0], "enlighter-active"), it(gt, {
            name: "codegroup-switch"
        }, s)
    }
    function to_b(a,b){
        if(0==a)return"0 Bytes";
        var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
        return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
    }
    var ft = Object.freeze({
        standard: ct,
        inline: function(e) {
            return it(gt, {
                className: ["enlighter-default", "enlighter-v-inline", "enlighter-t-" + e[0].params.theme]
            }, it(yt, {
                tokens: e[0].tokens,
                options: e[0].params
            }))
        },
        codegroup: function(e) {
            var t, r = null,
                n = e[0].params,
                s = 0,
                i = ["enlighter-default", "enlighter-v-codegroup", "enlighter-t-" + n.theme];

            function o() {
                st(r, "enlighter-show-rawcode")
            }
            function a(e) {
                Ye(t[s], !1), Ye(t[e], !0), s = e
            }
            return !0 === n.linehover && i.push("enlighter-hover"), !0 === n.linenumbers && i.push("enlighter-linenumbers"), "scroll" === n.textOverflow && i.push("enlighter-overflow-scroll"), t = e.map(function(e) {
                return it("div", {
                    style: "display:none"
                }, it(at, {
                    tokens: e.tokens,
                    options: e.params
                }), it(ut, null, e.code))
            }), a(0), r = it(gt, {
                className: i
            }, it(bt, {
                onChange: function(e) {
                    return a(e)
                },
                dataset: e
            }), it(gt, {
                name: "codegroup-wrapper"
            }, it(pt, {
                toggleRawCode: o,
                getRawCode: function() {
                    return e[s].code
                }
            }), t)), n.rawcodeDbclick && r.on("dbclick", o), r
        }
    });

    function ht(e) {
        return e = (e || "").toLowerCase(), e = Be[e] || e, ze[e] ? e : null
    }
    function dt(e) {
        return function(e) {
            return e = (e || "").toLowerCase(), ft[e] ? ft[e] : ct
        }(e[0].params.layout)(e.map(function(e) {
            var t = e.code,
                r = e.params;
            if ("string" != typeof t) throw new TypeError("EnlighterJS Engine requires string input");
            var n = ht(r.language) || ht(function(e) {
                return u[e] || null
            }("language")) || "generic";
            return {
                tokens: (new ze[n]).analyze(t),
                params: r,
                code: t
            }
        }))
    }
    function xt(s, t) {
        function i(e) {
            return function() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                for (var n = t.pop(), s = 0; s < t.length; s++) {
                    var i = t[s];
                    if (null != i) return i
                }
                return n
            }(t[e], u[e], null)
        }
        function e(e, t) {
            var r = Ke(s, "enlighter-" + e),
                n = i(e);
            if (!(r && 0 < r.length)) return n;
            switch (t) {
                case "boolean":
                    return "true" === (r = r.toLowerCase().trim()) || "false" !== r && n;
                case "int":
                    return r = parseInt(r), isNaN(r) ? n : r;
                default:
                    return r
            }
        }
        return {
            language: e("language"),
            theme: e("theme"),
            layout: e("layout"),
            title: e("title"),
            highlight: e("highlight"),
            linenumbers: e("linenumbers", "boolean"),
            lineoffset: e("lineoffset", "int"),
            indent: i("indent"),
            ampersandCleanup: i("ampersandCleanup"),
            linehover: i("linehover"),
            rawcodeDbclick: i("rawcodeDbclick"),
            textOverflow: i("textOverflow")
        }
    }
    var mt = [];

    function kt(e) {
        var t = function(e) {
            for (var t = 0; t < mt.length; t++) for (var r = 0; r < mt[t].elements.length; r++) if (mt[t].elements[r] === e) return t;
            return !1
        }(e);
        if (!1 === t) return !1;
        var r = mt.splice(t, 1);
        return Xe(r[0].wrapper), r[0].elements.map(function(e) {
            return rt(e, "enlighter-origin")
        }), !0
    }
    function _t(e) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        try {
            if (Array.isArray(e) || (e = [e]), 0 === e.length) return !1;
            if (!1 === n) return kt(e[0]);
            if (nt(e[0], "enlighter-origin")) return !1;
            var t = dt(e.map(function(e) {
                var t = xt(e, n),
                    r = function(e, t) {
                        var r = e.innerHTML || "";
                        r = r.replace(/(^\s*\n|\n\s*$)/gi, ""), !0 === t.ampersandCleanup && (r = r.replace(/&amp;/gim, "&")), r = r.replace(/&lt;/gim, "<").replace(/&gt;/gim, ">").replace(/&nbsp;/gim, " ");
                        var n = t.indent;
                        return !1 !== n && -1 < n && (r = r.replace(/(\t*)/gim, function(e, t) {
                            return new Array(n * t.length + 1).join(" ")
                        })), r
                    }(e, t);
                return tt(e, "enlighter-origin"), {
                    element: e,
                    code: r,
                    params: t
                }
            }));
            return et(e[0], t),
            function(e, t) {
                mt.push({
                    elements: e,
                    wrapper: t
                })
            }(e, t), !0
        } catch (e) {
            return console.error("EnlighterJS Internal Error:", e), !1
        }
    }
    return e.version = "3.0.0", e.enlight = _t, e.init = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "pre.ejs",
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "code.ejs",
            r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        ! function(e) {
            Object.assign(u, e || {})
        }(2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
        for (var n = Qe(e), s = Qe(t), i = function(e) {
                for (var t = {}, r = [], n = 0; n < e.length; n++) {
                    var s = Ke(e[n], "enlighter-group");
                    s ? (t[s] || (t[s] = []), t[s].push(e[n])) : r.push(e[n])
                }
                return {
                    standalone: r,
                    groups: Object.keys(t).map(function(e) {
                        return t[e]
                    })
                }
            }(n), o = i.standalone, a = i.groups, g = 0; g < o.length; g++) _t(o[g], {
                layout: r.block || "standard"
            });
        for (var l = 0; l < a.length; l++) _t(a[l], {
                layout: r.codegroup || "codegroup"
            });
        for (var p = 0; p < s.length; p++) _t(s[p], {
                layout: r.inline || "inline"
            })
    }, e
}({});
! function(n) {
    "function" == typeof n && n.fn && (n.fn.enlight = function(n) {
        return n = !0 === (n = void 0 === n ? {} : n) ? {} : n, this.each(function() {
            EnlighterJS.enlight(this, n)
        })
    })
}(window.jQuery);

(function ($) { 
    if($('pre[data-lang]')[0]) {
        $('pre[data-lang]').each(function () {
            var t = $(this);
            t.children().attr({
                'data-enlighter-language': t.data('lang'),
                'data-enlighter-highlight': t.data('line'),
            });
        });
    }
    $('pre code').enlight({
        linenumbers: !0,
        indent: 2,
        textOverflow: 'scroll',
        theme: 'enlighter', 
        title: io_code_settings.pre_c,
    });
})(jQuery);