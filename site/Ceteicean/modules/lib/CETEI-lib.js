'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaultBehaviors = require('./defaultBehaviors.js');

var _defaultBehaviors2 = _interopRequireDefault(_defaultBehaviors);

var _utilities = require('./utilities.js');

var utilities = _interopRequireWildcard(_utilities);

var _behaviors = require('./behaviors.js');

var _dom = require('./dom.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CETEI = function () {
  function CETEI(options) {
    _classCallCheck(this, CETEI);

    this.options = options ? options : {};

    // Bind methods
    this.addBehaviors = _behaviors.addBehaviors.bind(this);
    this.addBehavior = _behaviors.addBehavior.bind(this);
    this.applyBehaviors = _behaviors.applyBehaviors.bind(this);
    this.removeBehavior = _behaviors.removeBehavior.bind(this);

    // Bind selected utilities
    this.utilities = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(utilities)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var u = _step.value;

        if (["getPrefixDef", "rw", "resolveURI"].includes(u)) {
          this.utilities[u] = utilities[u].bind(this);
        } else {
          this.utilities[u] = utilities[u];
        }
      }

      // Set properties
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.els = [];
    this.namespaces = new Map();
    this.behaviors = {};
    this.hasStyle = false;
    this.prefixDefs = [];
    this.debug = this.options.debug === true ? true : false;
    this.discardContent = this.options.discardContent === true ? true : false;

    if (this.options.base) {
      this.base = this.options.base;
    } else {
      try {
        if (window) {
          this.base = window.location.href.replace(/\/[^\/]*$/, "/");
        }
      } catch (e) {
        this.base = "";
      }
    }
    if (!this.options.omitDefaultBehaviors) {
      this.addBehaviors(_defaultBehaviors2.default);
    }
    if (this.options.ignoreFragmentId) {
      if (window) {
        window.removeEventListener("ceteiceanload", CETEI.restorePosition);
      }
    }
  }

  /*
    Returns a Promise that fetches an XML source document from the URL
    provided in the first parameter and then calls the makeHTML5 method
    on the returned document.
  */


  _createClass(CETEI, [{
    key: 'getHTML5',
    value: function getHTML5(XML_url, callback, perElementFn) {
      var _this = this;

      if (window && window.location.href.startsWith(this.base) && XML_url.indexOf("/") >= 0) {
        this.base = XML_url.replace(/\/[^\/]*$/, "/");
      }
      // Get XML from XML_url and create a promise
      var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open('GET', XML_url);
        client.send();
        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      }).catch(function (reason) {
        console.log("Could not get XML file.");
        if (this.debug) {
          console.log(reason);
        }
      });

      return promise.then(function (XML) {
        return _this.makeHTML5(XML, callback, perElementFn);
      });
    }

    /*
      Converts the supplied XML string into HTML5 Custom Elements. If a callback
      function is supplied, calls it on the result.
    */

  }, {
    key: 'makeHTML5',
    value: function makeHTML5(XML, callback, perElementFn) {
      // XML is assumed to be a string
      this.XML_dom = new DOMParser().parseFromString(XML, "text/xml");
      return this.domToHTML5(this.XML_dom, callback, perElementFn);
    }

    /*
      Converts the supplied XML DOM into HTML5 Custom Elements. If a callback
      function is supplied, calls it on the result.
    */

  }, {
    key: 'domToHTML5',
    value: function domToHTML5(XML_dom, callback, perElementFn) {
      var _this2 = this;

      this.els = (0, _dom.learnElementNames)(XML_dom, this.namespaces);

      var convertEl = function convertEl(el) {
        // Elements with defined namespaces get the prefix mapped to that element. All others keep
        // their namespaces and are copied as-is.
        var newElement = void 0;
        if (_this2.namespaces.has(el.namespaceURI ? el.namespaceURI : "")) {
          var prefix = _this2.namespaces.get(el.namespaceURI ? el.namespaceURI : "");
          newElement = document.createElement(prefix + '-' + el.localName);
        } else {
          newElement = document.importNode(el, false);
        }
        // Copy attributes; @xmlns, @xml:id, @xml:lang, and
        // @rendition get special handling.
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Array.from(el.attributes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var att = _step2.value;

            if (att.name == "xmlns") {
              //Strip default namespaces, but hang on to the values
              newElement.setAttribute("data-xmlns", att.value);
            } else {
              newElement.setAttribute(att.name, att.value);
            }
            if (att.name == "xml:id") {
              newElement.setAttribute("id", att.value);
            }
            if (att.name == "xml:lang") {
              newElement.setAttribute("lang", att.value);
            }
            if (att.name == "rendition") {
              newElement.setAttribute("class", att.value.replace(/#/g, ""));
            }
          }
          // Preserve element name so we can use it later
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        newElement.setAttribute("data-origname", el.localName);
        if (el.hasAttributes()) {
          newElement.setAttribute("data-origatts", el.getAttributeNames().join(" "));
        }
        // If element is empty, flag it
        if (el.childNodes.length == 0) {
          newElement.setAttribute("data-empty", "");
        }
        // <head> elements need to know their level
        if (el.localName == "head") {
          var level = XML_dom.evaluate("count(ancestor::*[tei:head])", el, function (ns) {
            if (ns == "tei") return "http://www.tei-c.org/ns/1.0";
          }, XPathResult.NUMBER_TYPE, null);
          newElement.setAttribute("data-level", level.numberValue);
        }
        // Turn <rendition scheme="css"> elements into HTML styles
        if (el.localName == "tagsDecl") {
          var style = document.createElement("style");
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = Array.from(el.childNodes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var node = _step3.value;

              if (node.nodeType == Node.ELEMENT_NODE && node.localName == "rendition" && node.getAttribute("scheme") == "css") {
                var rule = "";
                if (node.hasAttribute("selector")) {
                  //rewrite element names in selectors
                  rule += node.getAttribute("selector").replace(/([^#, >]+\w*)/g, "tei-$1").replace(/#tei-/g, "#") + "{\n";
                  rule += node.textContent;
                } else {
                  rule += "." + node.getAttribute("xml:id") + "{\n";
                  rule += node.textContent;
                }
                rule += "\n}\n";
                style.appendChild(document.createTextNode(rule));
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          if (style.childNodes.length > 0) {
            newElement.appendChild(style);
            _this2.hasStyle = true;
          }
        }
        // Get prefix definitions
        if (el.localName == "prefixDef") {
          _this2.prefixDefs.push(el.getAttribute("ident"));
          _this2.prefixDefs[el.getAttribute("ident")] = {
            "matchPattern": el.getAttribute("matchPattern"),
            "replacementPattern": el.getAttribute("replacementPattern")
          };
        }
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = Array.from(el.childNodes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _node = _step4.value;

            if (_node.nodeType == Node.ELEMENT_NODE) {
              newElement.appendChild(convertEl(_node));
            } else {
              newElement.appendChild(_node.cloneNode());
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        if (perElementFn) {
          perElementFn(newElement, el);
        }
        return newElement;
      };

      this.dom = convertEl(XML_dom.documentElement);
      this.utilities.dom = this.dom;

      this.applyBehaviors();
      this.done = true;
      if (callback) {
        callback(this.dom, this);
        if (window) {
          window.dispatchEvent(ceteiceanLoad);
        }
      } else {
        if (window) {
          window.dispatchEvent(ceteiceanLoad);
        }
        return this.dom;
      }
    }

    /*
      Convenience method for HTML pages containing pre-processed CETEIcean Custom
      Elements. Usage:
        const c = new CETEI();
        c.processPage();
    */

  }, {
    key: 'processPage',
    value: function processPage() {
      this.els = (0, _dom.learnCustomElementNames)(document);
      this.applyBehaviors();
    }

    /*
      To change a namespace -> prefix mapping, the namespace must first be
      unset. Takes a namespace URI. In order to process a TEI P4 document, e.g.,
      the TEI namespace must be unset before it can be set to the empty string.
    */

  }, {
    key: 'unsetNamespace',
    value: function unsetNamespace(ns) {
      this.namespaces.delete(ns);
    }

    /*
      Sets the base URL for the document. Used to rewrite relative links in the
      XML source (which may be in a completely different location from the HTML
      wrapper).
    */

  }, {
    key: 'setBaseUrl',
    value: function setBaseUrl(base) {
      this.base = base;
    }

    /*
    Appends any element returned by the function passed in the first
    parameter to the element in the second parameter. If the function
    returns nothing, this is a no-op aside from any side effects caused
    by the provided function.
     Called by getHandler() and fallback()
    */

  }, {
    key: 'append',
    value: function append(fn, elt) {
      var self = this;
      if (elt) {
        var content = fn.call(self.utilities, elt);
        if (content && !self.childExists(elt.firstElementChild, content.nodeName)) {
          self.appendBasic(elt, content);
        }
      } else {
        return function () {
          if (!this.hasAttribute("data-processed")) {
            var _content = fn.call(self.utilities, this);
            if (_content && !self.childExists(this.firstElementChild, _content.nodeName)) {
              self.appendBasic(this, _content);
            }
          }
        };
      }
    }
  }, {
    key: 'appendBasic',
    value: function appendBasic(elt, content) {
      if (this.discardContent) {
        elt.innerHTML = "";
      } else {
        utilities.hideContent(elt, true);
      }
      elt.appendChild(content);
    }

    // Given an element, return its qualified name as defined in a behaviors object

  }, {
    key: 'bName',
    value: function bName(e) {
      return e.tagName.substring(0, e.tagName.indexOf("-")).toLowerCase() + ":" + e.getAttribute("data-origname");
    }

    /*
      Private method called by append(). Takes a child element and a name, and recurses through the
      child's siblings until an element with that name is found, returning true if it is and false if not.
    */

  }, {
    key: 'childExists',
    value: function childExists(elt, name) {
      if (elt && elt.nodeName == name) {
        return true;
      } else {
        return elt && elt.nextElementSibling && this.childExists(elt.nextElementSibling, name);
      }
    }

    /*
      Takes a template in the form of either an array of 1 or 2
      strings or an object with CSS selector keys and either functions
      or arrays as described above. Returns a closure around a function
      that can be called in the element constructor or applied to an
      individual element. An empty array is considered a no-op.

      Called by the getHandler() and getFallback() methods
    */

  }, {
    key: 'decorator',
    value: function decorator(template) {
      if (Array.isArray(template) && template.length == 0) {
        return function (e) {};
      }
      if (Array.isArray(template) && !Array.isArray(template[0])) {
        return this.applyDecorator(template);
      }
      var self = this;
      return function (elt) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = template[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var rule = _step5.value;

            if (elt.matches(rule[0]) || rule[0] === "_") {
              if (Array.isArray(rule[1])) {
                return self.decorator(rule[1]).call(this, elt);
              } else {
                return rule[1].call(this, elt);
              }
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      };
    }
  }, {
    key: 'applyDecorator',
    value: function applyDecorator(strings) {
      var self = this;
      return function (elt) {
        var copy = [];
        for (var i = 0; i < strings.length; i++) {
          copy.push(self.template(strings[i], elt));
        }
        return self.insert(elt, copy);
      };
    }

    /*
      Returns the fallback function for the given element name.
      Called by fallback().
    */

  }, {
    key: 'getFallback',
    value: function getFallback(behaviors, fn) {
      if (behaviors[fn]) {
        if (behaviors[fn] instanceof Function) {
          return behaviors[fn];
        } else {
          return decorator(behaviors[fn]);
        }
      }
    }

    /*
      Returns the handler function for the given element name
      Called by define().
    */

  }, {
    key: 'getHandler',
    value: function getHandler(behaviors, fn) {
      if (behaviors[fn]) {
        if (behaviors[fn] instanceof Function) {
          return this.append(behaviors[fn]);
        } else {
          return this.append(this.decorator(behaviors[fn]));
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(elt, strings) {
      var span = document.createElement("span");
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = Array.from(elt.childNodes)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var node = _step6.value;

          if (node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute("data-processed")) {
            this.processElement(node);
          }
        }
        // If we have before and after tags have them parsed by
        // .innerHTML and then add the content to the resulting child
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (strings[0].match("<[^>]+>") && strings[1] && strings[1].match("<[^>]+>")) {
        span.innerHTML = strings[0] + elt.innerHTML + (strings[1] ? strings[1] : "");
      } else {
        span.innerHTML = strings[0];
        span.setAttribute("data-before", strings[0].replace(/<[^>]+>/g, "").length);
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = Array.from(elt.childNodes)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _node2 = _step7.value;

            span.appendChild(_node2.cloneNode(true));
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        if (strings.length > 1) {
          span.innerHTML += strings[1];
          span.setAttribute("data-after", strings[1].replace(/<[^>]+>/g, "").length);
        }
      }
      return span;
    }

    // Runs behaviors recursively on the supplied element and children

  }, {
    key: 'processElement',
    value: function processElement(elt) {
      if (elt.hasAttribute("data-origname") && !elt.hasAttribute("data-processed")) {
        var fn = this.getFallback(this.bName(elt));
        if (fn) {
          this.append(fn, elt);
          elt.setAttribute("data-processed", "");
        }
      }
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = Array.from(elt.childNodes)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var node = _step8.value;

          if (node.nodeType === Node.ELEMENT_NODE) {
            this.processElement(node);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }

    // Given a qualified name (e.g. tei:text), return the element name

  }, {
    key: 'tagName',
    value: function tagName(name) {
      if (name.includes(":"), 1) {
        return name.replace(/:/, "-").toLowerCase();;
      } else {
        return "ceteicean-" + name.toLowerCase();
      }
    }
  }, {
    key: 'template',
    value: function template(str, elt) {
      var result = str;
      if (str.search(/\$(\w*)(@([a-zA-Z:]+))/)) {
        var re = /\$(\w*)@([a-zA-Z:]+)/g;
        var replacements = void 0;
        while (replacements = re.exec(str)) {
          if (elt.hasAttribute(replacements[2])) {
            if (replacements[1] && this.utilities[replacements[1]]) {
              result = result.replace(replacements[0], this.utilities[replacements[1]](elt.getAttribute(replacements[2])));
            } else {
              result = result.replace(replacements[0], elt.getAttribute(replacements[2]));
            }
          } else {
            result = result.replace(replacements[0], "");
          }
        }
      }
      return result;
    }

    /*
      Registers the list of elements provided with the browser.
      Called by makeHTML5(), but can be called independently if, for example,
      you've created Custom Elements via an XSLT transformation instead.
    */

  }, {
    key: 'define',
    value: function define(names) {
      var _this3 = this;

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = names[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var name = _step9.value;

          try {
            (function () {
              var fn = _this3.getHandler(_this3.behaviors, name);
              window.customElements.define(_this3.tagName(name), function (_HTMLElement) {
                _inherits(_class, _HTMLElement);

                function _class() {
                  _classCallCheck(this, _class);

                  var _this4 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

                  if (!_this4.matches(":defined")) {
                    // "Upgraded" undefined elements can have attributes & children; new elements can't
                    if (fn) {
                      fn.call(_this4);
                    }
                    // We don't want to double-process elements, so add a flag
                    _this4.setAttribute("data-processed", "");
                  }
                  return _this4;
                }
                // Process new elements when they are connected to the browser DOM


                _createClass(_class, [{
                  key: 'connectedCallback',
                  value: function connectedCallback() {
                    if (!this.hasAttribute("data-processed")) {
                      if (fn) {
                        fn.call(this);
                      }
                      this.setAttribute("data-processed", "");
                    }
                  }
                }]);

                return _class;
              }(HTMLElement));
            })();
          } catch (error) {
            // When using the same CETEIcean instance for multiple TEI files, this error becomes very common.
            // It's muted by default unless the debug option is set.
            if (this.debug) {
              console.log(tagName(name) + " couldn't be registered or is already registered.");
              console.log(error);
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }

    /*
      Provides fallback functionality for browsers where Custom Elements
      are not supported.

      Like define(), this is called by makeHTML5(), but can be called
      independently.
    */

  }, {
    key: 'fallback',
    value: function fallback(names) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = names[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var name = _step10.value;

          var fn = getFallback(this.behaviors, name);
          if (fn) {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
              for (var _iterator11 = Array.from((this.dom && !this.done ? this.dom : document).getElementsByTagName(tagName(name)))[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var elt = _step11.value;

                if (!elt.hasAttribute("data-processed")) {
                  append(fn, elt);
                }
              }
            } catch (err) {
              _didIteratorError11 = true;
              _iteratorError11 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }
              } finally {
                if (_didIteratorError11) {
                  throw _iteratorError11;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }

    /**********************
     * Utility functions  *
     **********************/

  }], [{
    key: 'savePosition',
    value: function savePosition() {
      window.sessionStorage.setItem(window.location + "-scroll", window.scrollY);
    }
  }, {
    key: 'restorePosition',
    value: function restorePosition() {
      if (!window.location.hash) {
        var scroll = void 0;
        if (scroll = window.sessionStorage.getItem(window.location + "-scroll")) {
          setTimeout(function () {
            window.scrollTo(0, scroll);
          }, 100);
        }
      } else {
        setTimeout(function () {
          var h = document.querySelector(window.decodeURI(window.location.hash));
          if (h) {
            h.scrollIntoView();
          }
        }, 100);
      }
    }
  }]);

  return CETEI;
}();

try {
  if (window) {
    window.CETEI = CETEI;
    window.addEventListener("beforeunload", CETEI.savePosition);
    var ceteiceanLoad = new Event("ceteiceanload");
    window.addEventListener("ceteiceanload", CETEI.restorePosition);
  }
} catch (e) {
  console.log(e);
}

exports.default = CETEI;
