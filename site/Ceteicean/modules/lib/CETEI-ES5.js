"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e13) { throw _e13; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e14) { didErr = true; err = _e14; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CETEI = function () {
  "use strict";

  var e = {
    namespaces: {
      tei: "http://www.tei-c.org/ns/1.0",
      teieg: "http://www.tei-c.org/ns/Examples",
      rng: "http://relaxng.org/ns/structure/1.0"
    },
    tei: {
      eg: ["<pre>", "</pre>"],
      ptr: ['<a href="$rw@target">$@target</a>'],
      ref: [["[target]", ['<a href="$rw@target">', "</a>"]]],
      graphic: function graphic(e) {
        var t = new Image();
        return t.src = this.rw(e.getAttribute("url")), e.hasAttribute("width") && t.setAttribute("width", e.getAttribute("width")), e.hasAttribute("height") && t.setAttribute("height", e.getAttribute("height")), t;
      },
      list: [["[type=gloss]", function (e) {
        var t = document.createElement("dl");

        for (var _i = 0, _Array$from = Array.from(e.children); _i < _Array$from.length; _i++) {
          var _i2 = _Array$from[_i];

          if (_i2.nodeType == Node.ELEMENT_NODE) {
            if ("tei-label" == _i2.localName) {
              var _e = document.createElement("dt");

              _e.innerHTML = _i2.innerHTML, t.appendChild(_e);
            }

            if ("tei-item" == _i2.localName) {
              var _e2 = document.createElement("dd");

              _e2.innerHTML = _i2.innerHTML, t.appendChild(_e2);
            }
          }
        }

        return t;
      }]],
      note: [["[place=end]", function (e) {
        this.noteIndex ? this.noteIndex++ : this.noteIndex = 1;
        var t = "_note_" + this.noteIndex,
            i = document.createElement("a");
        i.setAttribute("id", "src" + t), i.setAttribute("href", "#" + t), i.innerHTML = this.noteIndex;
        var s = document.createElement("sup");
        s.appendChild(i);
        var r = this.dom.querySelector("ol.notes");
        r || (r = document.createElement("ol"), r.setAttribute("class", "notes"), this.dom.appendChild(r));
        var n = document.createElement("li");
        return n.id = t, n.innerHTML = e.innerHTML, r.appendChild(n), s;
      }], ["_", ["(", ")"]]],
      teiHeader: function teiHeader(e) {
        this.hideContent(e, !1);
      },
      title: [["tei-titlestmt>tei-title", function (e) {
        var t = document.createElement("title");
        t.innerHTML = e.innerText, document.querySelector("head").appendChild(t);
      }]]
    },
    teieg: {
      egXML: function egXML(e) {
        var t = document.createElement("pre"),
            i = this.serialize(e, !0).replace(/</g, "&lt;"),
            s = i.match(/^[\t ]+/);
        return s && (i = i.replace(new RegExp("^" + s[0], "mg"), "")), t.innerHTML = i, t;
      }
    }
  };

  function t(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

    if (e.childNodes.length > 0) {
      var _i3 = document.createElement("span");

      e.appendChild(_i3), _i3.setAttribute("hidden", ""), _i3.setAttribute("data-original", "");

      for (var _i4 = 0, _Array$from2 = Array.from(e.childNodes); _i4 < _Array$from2.length; _i4++) {
        var _t = _Array$from2[_i4];

        if (_t !== _i3) {
          if (_t.nodeType === Node.ELEMENT_NODE) {
            _t.setAttribute("data-processed", "");

            var _iterator = _createForOfIteratorHelper(_t.querySelectorAll("*")),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _e3 = _step.value;

                _e3.setAttribute("data-processed", "");
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          _i3.appendChild(e.removeChild(_t));
        }
      }

      if (t) for (var _i5 = 0, _Array$from3 = Array.from(_i3.querySelectorAll("*")); _i5 < _Array$from3.length; _i5++) {
        var _e4 = _Array$from3[_i5];
        _e4.hasAttribute("id") && (_e4.setAttribute("data-origid", _e4.getAttribute("id")), _e4.removeAttribute("id"));
      }
    }
  }

  var i = Object.freeze({
    __proto__: null,
    getOrdinality: function getOrdinality(e, t) {
      var i = 1,
          s = e;

      for (; s && null !== s.previousElementSibling && (!t || s.previousElementSibling.localName == t) && (i++, s = s.previousElementSibling, s.previousElementSibling);) {
        ;
      }

      return i;
    },
    copyAndReset: function copyAndReset(e) {
      var t = function t(e) {
        var i = e.nodeType === Node.ELEMENT_NODE ? document.createElement(e.nodeName) : e.cloneNode(!0);
        if (e.attributes) for (var _i6 = 0, _Array$from4 = Array.from(e.attributes); _i6 < _Array$from4.length; _i6++) {
          var _t2 = _Array$from4[_i6];
          "data-processed" !== _t2.name && i.setAttribute(_t2.name, _t2.value);
        }

        for (var _i7 = 0, _Array$from5 = Array.from(e.childNodes); _i7 < _Array$from5.length; _i7++) {
          var _s = _Array$from5[_i7];

          if (_s.nodeType == Node.ELEMENT_NODE) {
            if (!e.hasAttribute("data-empty")) {
              if (_s.hasAttribute("data-original")) {
                for (var _i8 = 0, _Array$from6 = Array.from(_s.childNodes); _i8 < _Array$from6.length; _i8++) {
                  var _e5 = _Array$from6[_i8];

                  var _s2 = i.appendChild(t(_e5));

                  _s2.nodeType === Node.ELEMENT_NODE && _s2.hasAttribute("data-origid") && (_s2.setAttribute("id", _s2.getAttribute("data-origid")), _s2.removeAttribute("data-origid"));
                }

                return i;
              }

              i.appendChild(t(_s));
            }
          } else i.appendChild(_s.cloneNode());
        }

        return i;
      };

      return t(e);
    },
    first: function first(e) {
      return e.replace(/ .*$/, "");
    },
    hideContent: t,
    normalizeURI: function normalizeURI(e) {
      return this.rw(this.first(e));
    },
    repeat: function repeat(e, t) {
      var i = "";

      for (var _s3 = 0; _s3 < t; _s3++) {
        i += e;
      }

      return i;
    },
    resolveURI: function resolveURI(e) {
      var t = this.prefixDefs[e.substring(0, e.indexOf(":"))];
      return e.replace(new RegExp(t.matchPattern), t.replacementPattern);
    },
    getPrefixDef: function getPrefixDef(e) {
      return this.prefixDefs[e];
    },
    rw: function rw(e) {
      return e.match(/^(?:http|mailto|file|\/|#).*$/) ? e : this.base + this.utilities.first(e);
    },
    serialize: function serialize(e, t, i) {
      var s = "",
          r = function r(e) {
        return !/[^\t\n\r ]/.test(e);
      };

      if (!t && e.nodeType == Node.ELEMENT_NODE) {
        s += "string" == typeof i && "" !== i ? "\n" + i + "<" : "<", s += e.getAttribute("data-origname");

        var _t3 = e.hasAttribute("data-origatts") ? e.getAttribute("data-origatts").split(" ") : [];

        var _loop = function _loop() {
          var i = _Array$from7[_i9];
          i.name.startsWith("data-") || ["id", "lang", "class"].includes(i.name) || (s += " " + _t3.find(function (e) {
            return e.toLowerCase() == i.name;
          }) + '="' + i.value + '"'), "data-xmlns" == i.name && (s += ' xmlns="' + i.value + '"');
        };

        for (var _i9 = 0, _Array$from7 = Array.from(e.attributes); _i9 < _Array$from7.length; _i9++) {
          _loop();
        }

        e.childNodes.length > 0 ? s += ">" : s += "/>";
      }

      for (var _i10 = 0, _Array$from8 = Array.from(e.childNodes); _i10 < _Array$from8.length; _i10++) {
        var _n = _Array$from8[_i10];

        switch (_n.nodeType) {
          case Node.ELEMENT_NODE:
            s += "string" == typeof i ? this.serialize(_n, !1, i + "  ") : this.serialize(_n, !1, i);
            break;

          case Node.PROCESSING_INSTRUCTION_NODE:
            s += "<?" + _n.nodeValue + "?>";
            break;

          case Node.COMMENT_NODE:
            s += "\x3c!--" + _n.nodeValue + "--\x3e";
            break;

          default:
            if (t && r(_n.nodeValue) && (s += _n.nodeValue.replace(/^\s*\n/, "")), "string" == typeof i && r(_n.nodeValue)) break;
            s += _n.nodeValue;
        }
      }

      return !t && e.childNodes.length > 0 && (s += "string" == typeof i ? "\n" + i + "</" : "</", s += e.getAttribute("data-origname") + ">"), s;
    },
    unEscapeEntities: function unEscapeEntities(e) {
      return e.replace(/&gt;/, ">").replace(/&quot;/, '"').replace(/&apos;/, "'").replace(/&amp;/, "&");
    }
  });

  function s(e) {
    if (e.namespaces) for (var _i11 = 0, _Object$keys = Object.keys(e.namespaces); _i11 < _Object$keys.length; _i11++) {
      var _t4 = _Object$keys[_i11];
      this.namespaces.has(e.namespaces[_t4]) || Array.from(this.namespaces.values()).includes(_t4) || this.namespaces.set(e.namespaces[_t4], _t4);
    }

    var _iterator2 = _createForOfIteratorHelper(this.namespaces.values()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _t6 = _step2.value;
        if (e[_t6]) for (var _i13 = 0, _Object$keys3 = Object.keys(e[_t6]); _i13 < _Object$keys3.length; _i13++) {
          var _i14 = _Object$keys3[_i13];
          this.behaviors["".concat(_t6, ":").concat(_i14)] = e[_t6][_i14];
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (e.functions) for (var _i12 = 0, _Object$keys2 = Object.keys(e.functions); _i12 < _Object$keys2.length; _i12++) {
      var _t5 = _Object$keys2[_i12];
      this.utilities[_t5] = e.functions[_t5];
    }
    e.handlers && console.log("Behavior handlers are no longer used."), e.fallbacks && console.log("Fallback behaviors are no longer used.");
  }

  function r(e, t, i) {
    var s;
    if (e === Object(e)) for (var _i15 = 0, _Object$keys4 = Object.keys(e); _i15 < _Object$keys4.length; _i15++) {
      var _t7 = _Object$keys4[_i15];
      this.namespaces.has(e[_t7]) || (this.namespaces.set(e[_t7], _t7), s = _t7);
    } else s = e;
    this.behaviors["".concat(s, ":").concat(t)] = i;
  }

  function n(e, t) {
    var i;
    if (e === Object(e)) for (var _i16 = 0, _Object$keys5 = Object.keys(e); _i16 < _Object$keys5.length; _i16++) {
      var _t8 = _Object$keys5[_i16];
      this.namespaces.has(e[_t8]) || (this.namespaces.set(e[_t8], _t8), i = _t8);
    } else i = e;
    delete this.behaviors["".concat(i, ":").concat(t)];
  }

  var a = /*#__PURE__*/function () {
    function a(t) {
      _classCallCheck(this, a);

      this.options = t || {}, this.addBehaviors = s.bind(this), this.addBehavior = r.bind(this), this.removeBehavior = n.bind(this), this.utilities = {};

      for (var _i17 = 0, _Object$keys6 = Object.keys(i); _i17 < _Object$keys6.length; _i17++) {
        var _e6 = _Object$keys6[_i17];
        ["getPrefixDef", "rw", "resolveURI"].includes(_e6) ? this.utilities[_e6] = i[_e6].bind(this) : this.utilities[_e6] = i[_e6];
      }

      if (this.els = [], this.namespaces = new Map(), this.behaviors = {}, this.hasStyle = !1, this.prefixDefs = [], this.debug = !0 === this.options.debug, this.discardContent = !0 === this.options.discardContent, this.options.base) this.base = this.options.base;else try {
        window && (this.base = window.location.href.replace(/\/[^\/]*$/, "/"));
      } catch (e) {
        this.base = "";
      }
      this.options.omitDefaultBehaviors || this.addBehaviors(e), this.options.ignoreFragmentId && window && window.removeEventListener("ceteiceanload", a.restorePosition);
    }

    _createClass(a, [{
      key: "getHTML5",
      value: function getHTML5(e, t, i) {
        var _this = this;

        return window && window.location.href.startsWith(this.base) && e.indexOf("/") >= 0 && (this.base = e.replace(/\/[^\/]*$/, "/")), new Promise(function (t, i) {
          var s = new XMLHttpRequest();
          s.open("GET", e), s.send(), s.onload = function () {
            this.status >= 200 && this.status < 300 ? t(this.response) : i(this.statusText);
          }, s.onerror = function () {
            i(this.statusText);
          };
        })["catch"](function (e) {
          console.log("Could not get XML file."), this.debug && console.log(e);
        }).then(function (e) {
          return _this.makeHTML5(e, t, i);
        });
      }
    }, {
      key: "makeHTML5",
      value: function makeHTML5(e, t, i) {
        return this.XML_dom = new DOMParser().parseFromString(e, "text/xml"), this.domToHTML5(this.XML_dom, t, i);
      }
    }, {
      key: "domToHTML5",
      value: function domToHTML5(e, t, i) {
        var _this2 = this;

        this.els = function (e, t) {
          var i = e.documentElement;

          var s = 1,
              r = function r(e) {
            return t.has(e.namespaceURI ? e.namespaceURI : "") || t.set(e.namespaceURI, "ns" + s++), t.get(e.namespaceURI ? e.namespaceURI : "") + ":" + e.localName;
          };

          var n = new Set(Array.from(i.querySelectorAll("*"), r));
          return n.add(r(i)), n;
        }(e, this.namespaces);

        var s = function s(t) {
          var r;

          if (_this2.namespaces.has(t.namespaceURI ? t.namespaceURI : "")) {
            var _e7 = _this2.namespaces.get(t.namespaceURI ? t.namespaceURI : "");

            r = document.createElement("".concat(_e7, "-").concat(t.localName));
          } else r = document.importNode(t, !1);

          for (var _i18 = 0, _Array$from9 = Array.from(t.attributes); _i18 < _Array$from9.length; _i18++) {
            var _e8 = _Array$from9[_i18];
            "xmlns" == _e8.name ? r.setAttribute("data-xmlns", _e8.value) : r.setAttribute(_e8.name, _e8.value), "xml:id" == _e8.name && r.setAttribute("id", _e8.value), "xml:lang" == _e8.name && r.setAttribute("lang", _e8.value), "rendition" == _e8.name && r.setAttribute("class", _e8.value.replace(/#/g, ""));
          }

          if (r.setAttribute("data-origname", t.localName), t.hasAttributes() && r.setAttribute("data-origatts", t.getAttributeNames().join(" ")), 0 == t.childNodes.length && r.setAttribute("data-empty", ""), "head" == t.localName) {
            var _i19 = e.evaluate("count(ancestor::*[tei:head])", t, function (e) {
              if ("tei" == e) return "http://www.tei-c.org/ns/1.0";
            }, XPathResult.NUMBER_TYPE, null);

            r.setAttribute("data-level", _i19.numberValue);
          }

          if ("tagsDecl" == t.localName) {
            var _e9 = document.createElement("style");

            for (var _i20 = 0, _Array$from10 = Array.from(t.childNodes); _i20 < _Array$from10.length; _i20++) {
              var _i21 = _Array$from10[_i20];

              if (_i21.nodeType == Node.ELEMENT_NODE && "rendition" == _i21.localName && "css" == _i21.getAttribute("scheme")) {
                var _t9 = "";
                _i21.hasAttribute("selector") ? (_t9 += _i21.getAttribute("selector").replace(/([^#, >]+\w*)/g, "tei-$1").replace(/#tei-/g, "#") + "{\n", _t9 += _i21.textContent) : (_t9 += "." + _i21.getAttribute("xml:id") + "{\n", _t9 += _i21.textContent), _t9 += "\n}\n", _e9.appendChild(document.createTextNode(_t9));
              }
            }

            _e9.childNodes.length > 0 && (r.appendChild(_e9), _this2.hasStyle = !0);
          }

          "prefixDef" == t.localName && (_this2.prefixDefs.push(t.getAttribute("ident")), _this2.prefixDefs[t.getAttribute("ident")] = {
            matchPattern: t.getAttribute("matchPattern"),
            replacementPattern: t.getAttribute("replacementPattern")
          });

          for (var _i22 = 0, _Array$from11 = Array.from(t.childNodes); _i22 < _Array$from11.length; _i22++) {
            var _e10 = _Array$from11[_i22];
            _e10.nodeType == Node.ELEMENT_NODE ? r.appendChild(s(_e10)) : r.appendChild(_e10.cloneNode());
          }

          return i && i(r, t), r;
        };

        if (this.dom = s(e.documentElement), this.utilities.dom = this.dom, this.applyBehaviors(), this.done = !0, !t) return window && window.dispatchEvent(o), this.dom;
        t(this.dom, this), window && window.dispatchEvent(o);
      }
    }, {
      key: "processPage",
      value: function processPage() {
        var e;
        this.els = (e = document, Array.from(e.querySelectorAll("*[data-origname]"), function (e) {
          return e.localName.replace(/(\w+)-.+/, "$1:") + e.getAttribute("data-origname");
        })), this.applyBehaviors();
      }
    }, {
      key: "unsetNamespace",
      value: function unsetNamespace(e) {
        this.namespaces["delete"](e);
      }
    }, {
      key: "setBaseUrl",
      value: function setBaseUrl(e) {
        this.base = e;
      }
    }, {
      key: "append",
      value: function append(e, t) {
        var i = this;
        if (!t) return function () {
          if (!this.hasAttribute("data-processed")) {
            var _t10 = e.call(i.utilities, this);

            _t10 && !i.childExists(this.firstElementChild, _t10.nodeName) && i.appendBasic(this, _t10);
          }
        };
        {
          var _s4 = e.call(i.utilities, t);

          _s4 && !i.childExists(t.firstElementChild, _s4.nodeName) && i.appendBasic(t, _s4);
        }
      }
    }, {
      key: "appendBasic",
      value: function appendBasic(e, i) {
        this.discardContent ? e.innerHTML = "" : t(e, !0), e.appendChild(i);
      }
    }, {
      key: "bName",
      value: function bName(e) {
        return e.tagName.substring(0, e.tagName.indexOf("-")).toLowerCase() + ":" + e.getAttribute("data-origname");
      }
    }, {
      key: "childExists",
      value: function childExists(e, t) {
        return !(!e || e.nodeName != t) || e && e.nextElementSibling && this.childExists(e.nextElementSibling, t);
      }
    }, {
      key: "decorator",
      value: function decorator(e) {
        if (Array.isArray(e) && 0 == e.length) return function (e) {};
        if (Array.isArray(e) && !Array.isArray(e[0])) return this.applyDecorator(e);
        var t = this;
        return function (i) {
          var _iterator3 = _createForOfIteratorHelper(e),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _s5 = _step3.value;
              if (i.matches(_s5[0]) || "_" === _s5[0]) return Array.isArray(_s5[1]) ? t.decorator(_s5[1]).call(this, i) : _s5[1].call(this, i);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        };
      }
    }, {
      key: "applyDecorator",
      value: function applyDecorator(e) {
        var t = this;
        return function (i) {
          var s = [];

          for (var _r = 0; _r < e.length; _r++) {
            s.push(t.template(e[_r], i));
          }

          return t.insert(i, s);
        };
      }
    }, {
      key: "getFallback",
      value: function getFallback(e, t) {
        if (e[t]) return e[t] instanceof Function ? e[t] : decorator(e[t]);
      }
    }, {
      key: "getHandler",
      value: function getHandler(e, t) {
        if (e[t]) return e[t] instanceof Function ? this.append(e[t]) : this.append(this.decorator(e[t]));
      }
    }, {
      key: "insert",
      value: function insert(e, t) {
        var i = document.createElement("span");

        for (var _i23 = 0, _Array$from12 = Array.from(e.childNodes); _i23 < _Array$from12.length; _i23++) {
          var _t11 = _Array$from12[_i23];
          _t11.nodeType !== Node.ELEMENT_NODE || _t11.hasAttribute("data-processed") || this.processElement(_t11);
        }

        if (t[0].match("<[^>]+>") && t[1] && t[1].match("<[^>]+>")) i.innerHTML = t[0] + e.innerHTML + (t[1] ? t[1] : "");else {
          i.innerHTML = t[0], i.setAttribute("data-before", t[0].replace(/<[^>]+>/g, "").length);

          for (var _i24 = 0, _Array$from13 = Array.from(e.childNodes); _i24 < _Array$from13.length; _i24++) {
            var _t12 = _Array$from13[_i24];
            i.appendChild(_t12.cloneNode(!0));
          }

          t.length > 1 && (i.innerHTML += t[1], i.setAttribute("data-after", t[1].replace(/<[^>]+>/g, "").length));
        }
        return i;
      }
    }, {
      key: "processElement",
      value: function processElement(e) {
        if (e.hasAttribute("data-origname") && !e.hasAttribute("data-processed")) {
          var _t13 = this.getFallback(this.bName(e));

          _t13 && (this.append(_t13, e), e.setAttribute("data-processed", ""));
        }

        for (var _i25 = 0, _Array$from14 = Array.from(e.childNodes); _i25 < _Array$from14.length; _i25++) {
          var _t14 = _Array$from14[_i25];
          _t14.nodeType === Node.ELEMENT_NODE && this.processElement(_t14);
        }
      }
    }, {
      key: "tagName",
      value: function tagName(e) {
        return e.includes(":"), e.replace(/:/, "-").toLowerCase();
      }
    }, {
      key: "template",
      value: function template(e, t) {
        var i = e;

        if (e.search(/\$(\w*)(@([a-zA-Z:]+))/)) {
          var _s6,
              _r2 = /\$(\w*)@([a-zA-Z:]+)/g;

          for (; _s6 = _r2.exec(e);) {
            i = t.hasAttribute(_s6[2]) ? _s6[1] && this.utilities[_s6[1]] ? i.replace(_s6[0], this.utilities[_s6[1]](t.getAttribute(_s6[2]))) : i.replace(_s6[0], t.getAttribute(_s6[2])) : i.replace(_s6[0], "");
          }
        }

        return i;
      }
    }, {
      key: "applyBehaviors",
      value: function applyBehaviors() {
        window.customElements ? this.define.call(this, this.els) : this.fallback.call(this, this.els);
      }
    }, {
      key: "define",
      value: function define(e) {
        var _this3 = this;

        var _iterator4 = _createForOfIteratorHelper(e),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _t15 = _step4.value;

            try {
              (function () {
                var e = _this3.getHandler(_this3.behaviors, _t15);

                window.customElements.define(_this3.tagName(_t15), /*#__PURE__*/function (_HTMLElement) {
                  _inherits(_class, _HTMLElement);

                  var _super = _createSuper(_class);

                  function _class() {
                    var _this4;

                    _classCallCheck(this, _class);

                    _this4 = _super.call(this), _this4.matches(":defined") || (e && e.call(_assertThisInitialized(_this4)), _this4.setAttribute("data-processed", ""));
                    return _this4;
                  }

                  _createClass(_class, [{
                    key: "connectedCallback",
                    value: function connectedCallback() {
                      this.hasAttribute("data-processed") || (e && e.call(this), this.setAttribute("data-processed", ""));
                    }
                  }]);

                  return _class;
                }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
              })();
            } catch (e) {
              this.debug && (console.log(this.tagName(_t15) + " couldn't be registered or is already registered."), console.log(e));
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }, {
      key: "fallback",
      value: function fallback(e) {
        var _iterator5 = _createForOfIteratorHelper(e),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _t16 = _step5.value;

            var _e11 = getFallback(this.behaviors, _t16);

            if (_e11) for (var _i26 = 0, _Array$from15 = Array.from((this.dom && !this.done ? this.dom : document).getElementsByTagName(tagName(_t16))); _i26 < _Array$from15.length; _i26++) {
              var _i27 = _Array$from15[_i26];
              _i27.hasAttribute("data-processed") || append(_e11, _i27);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }], [{
      key: "savePosition",
      value: function savePosition() {
        window.sessionStorage.setItem(window.location + "-scroll", window.scrollY);
      }
    }, {
      key: "restorePosition",
      value: function restorePosition() {
        if (window.location.hash) setTimeout(function () {
          var e = document.querySelector(window.decodeURI(window.location.hash));
          e && e.scrollIntoView();
        }, 100);else {
          var _e12;

          (_e12 = window.sessionStorage.getItem(window.location + "-scroll")) && setTimeout(function () {
            window.scrollTo(0, _e12);
          }, 100);
        }
      }
    }]);

    return a;
  }();

  try {
    if (window) {
      window.CETEI = a, window.addEventListener("beforeunload", a.savePosition);
      var o = new Event("ceteiceanload");
      window.addEventListener("ceteiceanload", a.restorePosition);
    }
  } catch (e) {
    console.log(e);
  }

  return a;
}();
