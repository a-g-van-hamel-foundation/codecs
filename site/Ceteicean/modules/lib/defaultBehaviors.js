"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "namespaces": {
    "tei": "http://www.tei-c.org/ns/1.0",
    "teieg": "http://www.tei-c.org/ns/Examples",
    "rng": "http://relaxng.org/ns/structure/1.0"
  },
  "tei": {
    "eg": ["<pre>", "</pre>"],
    // inserts a link inside <ptr> using the @target; the link in the
    // @href is piped through the rw (rewrite) function before insertion
    "ptr": ["<a href=\"$rw@target\">$@target</a>"],
    // wraps the content of the <ref> in an HTML link
    "ref": [["[target]", ["<a href=\"$rw@target\">", "</a>"]]],
    "graphic": function graphic(elt) {
      var content = new Image();
      content.src = this.rw(elt.getAttribute("url"));
      if (elt.hasAttribute("width")) {
        content.setAttribute("width", elt.getAttribute("width"));
      }
      if (elt.hasAttribute("height")) {
        content.setAttribute("height", elt.getAttribute("height"));
      }
      return content;
    },
    "list": [
    // will only run on a list where @type="gloss"
    ["[type=gloss]", function (elt) {
      var dl = document.createElement("dl");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(elt.children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.nodeType == Node.ELEMENT_NODE) {
            if (child.localName == "tei-label") {
              var dt = document.createElement("dt");
              dt.innerHTML = child.innerHTML;
              dl.appendChild(dt);
            }
            if (child.localName == "tei-item") {
              var dd = document.createElement("dd");
              dd.innerHTML = child.innerHTML;
              dl.appendChild(dd);
            }
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

      return dl;
    }]],
    "note": [
    // Make endnotes
    ["[place=end]", function (elt) {
      if (!this.noteIndex) {
        this["noteIndex"] = 1;
      } else {
        this.noteIndex++;
      }
      var id = "_note_" + this.noteIndex;
      var link = document.createElement("a");
      link.setAttribute("id", "src" + id);
      link.setAttribute("href", "#" + id);
      link.innerHTML = this.noteIndex;
      var content = document.createElement("sup");
      content.appendChild(link);
      var notes = this.dom.querySelector("ol.notes");
      if (!notes) {
        notes = document.createElement("ol");
        notes.setAttribute("class", "notes");
        this.dom.appendChild(notes);
      }
      var note = document.createElement("li");
      note.id = id;
      note.innerHTML = elt.innerHTML;
      notes.appendChild(note);
      return content;
    }], ["_", ["(", ")"]]],
    "teiHeader": function teiHeader(e) {
      this.hideContent(e, false);
    },
    "title": [["tei-titlestmt>tei-title", function (elt) {
      var title = document.createElement("title");
      title.innerHTML = elt.innerText;
      document.querySelector("head").appendChild(title);
    }]]
  },
  "teieg": {
    "egXML": function egXML(elt) {
      var pre = document.createElement("pre");
      var content = this.serialize(elt, true).replace(/</g, "&lt;");
      var ws = content.match(/^[\t ]+/);
      if (ws) {
        content = content.replace(new RegExp("^" + ws[0], "mg"), "");
      }
      pre.innerHTML = content;
      return pre;
    }
  }
};