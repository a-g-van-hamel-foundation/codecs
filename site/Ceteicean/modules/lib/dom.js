"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.learnElementNames = learnElementNames;
exports.learnCustomElementNames = learnCustomElementNames;
function learnElementNames(XML_dom, namespaces) {
  var root = XML_dom.documentElement;
  var i = 1;
  var qname = function qname(e) {
    if (!namespaces.has(e.namespaceURI ? e.namespaceURI : "")) {
      namespaces.set(e.namespaceURI, "ns" + i++);
    }
    return namespaces.get(e.namespaceURI ? e.namespaceURI : "") + ":" + e.localName;
  };
  var els = new Set(Array.from(root.querySelectorAll("*"), qname));

  // Add the root element to the array
  els.add(qname(root));
  return els;
}

function learnCustomElementNames(HTML_dom) {
  return Array.from(HTML_dom.querySelectorAll("*[data-origname]"), function (e) {
    return e.localName.replace(/(\w+)-.+/, "$1:") + e.getAttribute("data-origname");
  });
}