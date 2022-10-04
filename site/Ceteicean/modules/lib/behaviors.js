"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBehaviors = addBehaviors;
exports.addBehavior = addBehavior;
exports.removeBehavior = removeBehavior;
exports.applyBehaviors = applyBehaviors;

/* 
  Add a user-defined set of behaviors to CETEIcean's processing
  workflow. Added behaviors will override predefined behaviors with the
  same name.
*/
function addBehaviors(bhvs) {
  if (bhvs.namespaces) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(bhvs.namespaces)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prefix = _step.value;

        if (!this.namespaces.has(bhvs.namespaces[prefix]) && !Array.from(this.namespaces.values()).includes(prefix)) {
          this.namespaces.set(bhvs.namespaces[prefix], prefix);
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
    for (var _iterator2 = this.namespaces.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _prefix = _step2.value;

      if (bhvs[_prefix]) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = Object.keys(bhvs[_prefix])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var b = _step4.value;

            this.behaviors[_prefix + ":" + b] = bhvs[_prefix][b];
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

  if (bhvs["functions"]) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Object.keys(bhvs["functions"])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var fn = _step3.value;

        this.utilities[fn] = bhvs["functions"][fn];
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
  }
  if (bhvs["handlers"]) {
    console.log("Behavior handlers are no longer used.");
  }
  if (bhvs["fallbacks"]) {
    console.log("Fallback behaviors are no longer used.");
  }
}

/* 
  Adds or replaces an individual behavior. Takes a namespace prefix or namespace definition,
  the element name, and the behavior. E.g.
  addBehavior("tei", "add", ["`","`"]) for an already-declared namespace or
  addBehavior({"doc": "http://docbook.org/ns/docbook"}, "note", ["[","]"]) for a new one
*/
function addBehavior(ns, element, b) {
  var p = void 0;
  if (ns === Object(ns)) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = Object.keys(ns)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var prefix = _step5.value;

        if (!this.namespaces.has(ns[prefix])) {
          this.namespaces.set(ns[prefix], prefix);
          p = prefix;
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
  } else {
    p = ns;
  }
  this.behaviors[p + ":" + element] = b;
}

/*
  Removes a previously-defined or default behavior. Takes a namespace prefix or namespace definition
  and the element name.
*/
function removeBehavior(ns, element) {
  var p = void 0;
  if (ns === Object(ns)) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = Object.keys(ns)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var prefix = _step6.value;

        if (!this.namespaces.has(ns[prefix])) {
          this.namespaces.set(ns[prefix], prefix);
          p = prefix;
        }
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
  } else {
    p = ns;
  }
  delete this.behaviors[p + ":" + element];
}

// Define or apply behaviors for the document
function applyBehaviors() {
  if (window.customElements) {
    this.define.call(this, this.els);
  } else {
    this.fallback.call(this, this.els);
  }
}