"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrdinality = getOrdinality;
exports.copyAndReset = copyAndReset;
exports.first = first;
exports.hideContent = hideContent;
exports.normalizeURI = normalizeURI;
exports.repeat = repeat;
exports.resolveURI = resolveURI;
exports.getPrefixDef = getPrefixDef;
exports.rw = rw;
exports.serialize = serialize;
exports.unEscapeEntities = unEscapeEntities;
function getOrdinality(elt, name) {
  var pos = 1;
  var e = elt;
  while (e && e.previousElementSibling !== null && (name ? e.previousElementSibling.localName == name : true)) {
    pos++;
    e = e.previousElementSibling;
    if (!e.previousElementSibling) {
      break;
    }
  }
  return pos;
}

/* 
  Performs a deep copy operation of the input node while stripping
  out child elements introduced by CETEIcean.
*/
function copyAndReset(node) {
  var clone = function clone(n) {
    var result = n.nodeType === Node.ELEMENT_NODE ? document.createElement(n.nodeName) : n.cloneNode(true);
    if (n.attributes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(n.attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var att = _step.value;

          if (att.name !== "data-processed") {
            result.setAttribute(att.name, att.value);
          }
        }
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
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Array.from(n.childNodes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var nd = _step2.value;

        if (nd.nodeType == Node.ELEMENT_NODE) {
          if (!n.hasAttribute("data-empty")) {
            if (nd.hasAttribute("data-original")) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = Array.from(nd.childNodes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var childNode = _step3.value;

                  var child = result.appendChild(clone(childNode));
                  if (child.nodeType === Node.ELEMENT_NODE && child.hasAttribute("data-origid")) {
                    child.setAttribute("id", child.getAttribute("data-origid"));
                    child.removeAttribute("data-origid");
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

              return result;
            } else {
              result.appendChild(clone(nd));
            }
          }
        } else {
          result.appendChild(nd.cloneNode());
        }
      }
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

    return result;
  };
  return clone(node);
}

/* 
  Given a space-separated list of URLs (e.g. in a ref with multiple
  targets), returns just the first one.
*/
function first(urls) {
  return urls.replace(/ .*$/, "");
}

/* 
  Wraps the content of the element parameter in a <span data-original>
  with display set to "none".
*/
function hideContent(elt) {
  var rewriteIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (elt.childNodes.length > 0) {
    var hidden = document.createElement("span");
    elt.appendChild(hidden);
    hidden.setAttribute("hidden", "");
    hidden.setAttribute("data-original", "");
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = Array.from(elt.childNodes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var node = _step4.value;

        if (node !== hidden) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            node.setAttribute("data-processed", "");
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = node.querySelectorAll("*")[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _e = _step6.value;

                _e.setAttribute("data-processed", "");
              }
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
          }
          hidden.appendChild(elt.removeChild(node));
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

    if (rewriteIds) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = Array.from(hidden.querySelectorAll("*"))[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var e = _step5.value;

          if (e.hasAttribute("id")) {
            e.setAttribute("data-origid", e.getAttribute("id"));
            e.removeAttribute("id");
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
    }
  }
}

function normalizeURI(urls) {
  return this.rw(this.first(urls));
}

/* 
  Takes a string and a number and returns the original string
  printed that number of times.
*/
function repeat(str, times) {
  var result = "";
  for (var i = 0; i < times; i++) {
    result += str;
  }
  return result;
}

/* 
  Resolves URIs that use TEI prefixDefs into full URIs.
  See https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-prefixDef.html
*/
function resolveURI(uri) {
  var prefixdef = this.prefixDefs[uri.substring(0, uri.indexOf(":"))];
  return uri.replace(new RegExp(prefixdef["matchPattern"]), prefixdef["replacementPattern"]);
}

/*
  Convenience function for getting prefix definitions, Takes a prefix
  and returns an object with "matchPattern" and "replacementPattern"
  keys.
*/
function getPrefixDef(prefix) {
  return this.prefixDefs[prefix];
}

/* 
  Takes a relative URL and rewrites it based on the base URL of the
  HTML document
*/
function rw(url) {
  if (!url.match(/^(?:http|mailto|file|\/|#).*$/)) {
    return this.base + this.utilities.first(url);
  } else {
    return url;
  }
}

/* 
  Takes an element and serializes it to an XML string or, if the stripElt
  parameter is set, serializes the element's content. The ws parameter, if
  set, will switch on minimal "pretty-printing" and indenting of the serialized
  result.
*/
function serialize(el, stripElt, ws) {
  var str = "";
  var ignorable = function ignorable(txt) {
    return !/[^\t\n\r ]/.test(txt);
  };
  if (!stripElt && el.nodeType == Node.ELEMENT_NODE) {
    if (typeof ws === "string" && ws !== "") {
      str += "\n" + ws + "<";
    } else {
      str += "<";
    }
    str += el.getAttribute("data-origname");
    // HTML5 lowercases all attribute names; @data-origatts contains the original names
    var attrNames = el.hasAttribute("data-origatts") ? el.getAttribute("data-origatts").split(" ") : [];

    var _loop = function _loop(attr) {
      if (!attr.name.startsWith("data-") && !["id", "lang", "class"].includes(attr.name)) {
        str += " " + attrNames.find(function (e) {
          return e.toLowerCase() == attr.name;
        }) + "=\"" + attr.value + "\"";
      }
      if (attr.name == "data-xmlns") {
        str += " xmlns=\"" + attr.value + "\"";
      }
    };

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = Array.from(el.attributes)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var attr = _step7.value;

        _loop(attr);
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

    if (el.childNodes.length > 0) {
      str += ">";
    } else {
      str += "/>";
    }
  }
  //TODO: Be smarter about skipping generated content with hidden original
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = Array.from(el.childNodes)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var node = _step8.value;

      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          if (typeof ws === "string") {
            str += this.serialize(node, false, ws + "  ");
          } else {
            str += this.serialize(node, false, ws);
          }
          break;
        case Node.PROCESSING_INSTRUCTION_NODE:
          str += "<?" + node.nodeValue + "?>";
          break;
        case Node.COMMENT_NODE:
          str += "<!--" + node.nodeValue + "-->";
          break;
        default:
          if (stripElt && ignorable(node.nodeValue)) {
            str += node.nodeValue.replace(/^\s*\n/, "");
          }
          if (typeof ws === "string" && ignorable(node.nodeValue)) {
            break;
          }
          str += node.nodeValue;
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

  if (!stripElt && el.childNodes.length > 0) {
    if (typeof ws === "string") {
      str += "\n" + ws + "</";
    } else {
      str += "</";
    }
    str += el.getAttribute("data-origname") + ">";
  }
  return str;
}

function unEscapeEntities(str) {
  return str.replace(/&gt;/, ">").replace(/&quot;/, "\"").replace(/&apos;/, "'").replace(/&amp;/, "&");
}