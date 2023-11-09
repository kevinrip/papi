function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

define("dpz.tealiumAdapterOverride", [], function () {
  ///define(["exports"], function (a) {
  // CA modification of official tealium-adapter file to fix bug This should be removed once bug it fixed.
  ////"use strict";
  var prepareUDO;

  var getTargetAndAncestors = function getTargetAndAncestors(el, nodeArr) {
    nodeArr === undefined ? nodeArr = [el] : nodeArr.push(el);
    return el.nodeName !== "BODY" && el.parentNode !== null ? getTargetAndAncestors(el.parentNode, nodeArr) : nodeArr;
  };

  function init(tealiumProfile, tealiumEnv, _prepareUDO) {
    var bindLinkEvents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var appTrackedElements = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var protocol = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

    if (typeof tealiumProfile !== "string") {
      throw Error("tealiumProfile string must be provided to utag.init. Got ".concat(_typeof(tealiumProfile), "."));
    }

    if (typeof tealiumEnv !== "string") {
      throw Error("tealiumEnv string must be provided to utag.init. Got ".concat(_typeof(tealiumEnv), "."));
    }

    if (typeof _prepareUDO !== "function") {
      throw Error("_prepareUDO function must be provided to utag.init. Got ".concat(_typeof(_prepareUDO), "."));
    }

    if (protocol && !["https"].includes(protocol)) {
      throw new Error("protocol can only be \"https\". Got ".concat(protocol));
    }

    loadExternalUtag(tealiumProfile, tealiumEnv, protocol);
    prepareUDO = _prepareUDO;

    if (bindLinkEvents) {
      var bindListener = function bindListener(trackedEventType) {
        document.body.addEventListener(trackedEventType, function (e) {
          var matchedElement = getTargetAndAncestors(e.target).find(function isTrackedElement(el) {
            return (document.documentElement.matches || document.documentElement.msMatchesSelector).call(el, trackedElements[trackedEventType].join(","));
          });
          matchedElement && link({
            el: matchedElement,
            trackedEventType: trackedEventType
          });
        });
      };

      var trackedElements = {
        click: ["a", "button:not([data-dpz-no-track])", 'input[type="submit"]', "[data-dpz-track-evt]"].concat(_toConsumableArray(appTrackedElements.click || [])),
        change: ['input[type="checkbox"]', 'input[type="radio"]', "select"].concat(_toConsumableArray(appTrackedElements.change || []))
      };
      Object.keys(trackedElements).forEach(bindListener);
    }
  }

  function loadExternalUtag(tealiumProfile, tealiumEnv, protocol) {
    // Create a global promise that the remote tealium js file will resolve as a signal that it has loaded
    // and is ready to receive view and link calls
    window.remoteUtagPromise = new Promise(function (resolve, reject) {
      window.remoteUtagReady = resolve;
    });
    var a = "".concat(protocol ? "".concat(protocol, "://") : "//", "tags.tiqcdn.com/utag/dominos/").concat(tealiumProfile, "/").concat(tealiumEnv, "/utag.js");
    var b = document;
    var c = "script";
    var d = b.createElement(c);
    d.src = a;
    d.type = "text/java" + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
  }

  function view() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof window.remoteUtagPromise === "undefined" || typeof window.remoteUtagPromise.then !== "function") {
      throw Error("window.remoteUtagPromise must be a Promise.");
    }

    var udo = _objectSpread({
      page_name: options.title || document.title,
      page_url: window.location.href
    }, prepareUDO(options.eventData));

    window.remoteUtagPromise.then(function (value) {
      window.utag.view(udo);
    });
  }

  function link() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var optionsPropertyBlackList = ["el", "trackedEventType", "eventData"];

    if (typeof window.remoteUtagPromise === "undefined" || typeof window.remoteUtagPromise.then !== "function") {
      throw Error("window.remoteUtagPromise must be a Promise.");
    } // this comes from calling link directly


    var filteredOptionsProperties = Object.keys(options).filter(function (property) {
      return !optionsPropertyBlackList.includes(property);
    }).reduce(function (obj, property) {
      obj[property] = options[property];
      return obj;
    }, {}); // this comes from the global click event on buttons and other tracked elements

    var variablesFromDataDpzTrack = options.el ? prepareLink.getTealiumVariablesFromDataDpzTrack(options.el) : {};

    var udo = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, prepareUDO(options.eventData)), filteredOptionsProperties), variablesFromDataDpzTrack), {}, {
      page_name: document.title,
      page_url: window.location.href,
      event_name: options.el && prepareLink.getName(options.el),
      event_action: options.el && prepareLink.getAction(options.el, options.trackedEventType) || "click",
      event_category: prepareLink.getCategory(options.el),
      event_label: options.el && prepareLink.getLabel(options.el) || null
    });

    window.remoteUtagPromise.then(function (value) {
      window.utag.link(udo);
    });
  }

  var prepareLink = {
    getName: function getName(el) {
      return el.getAttribute("data-dpz-track-evt-name") || prepareLink.getNameFromContents(el) || el.getAttribute("value") || el.getAttribute("name");
    },
    getNameFromContents: function getNameFromContents(el) {
      if (el.nodeName === "SELECT" && el.value) {
        // Select the selected option from the select
        return el.getAttribute("name") + " - " + el.value;
      } else if (/\S/.test(el.textContent)) {
        // If the text contains any non-whitespace character, return that text
        return el.textContent.trim();
      } else {
        // else, see if it has a child image, and use its alt attribute
        var childImg = el.querySelector("img");
        return childImg && childImg.getAttribute("alt");
      }
    },
    getNameFromInputLabel: function getNameFromInputLabel() {// TODO when we need to handle radios and checkboxes
    },
    getAction: function getAction(el, trackedEventType) {
      return el.getAttribute("data-dpz-track-evt-type") || el.getAttribute("data-dpz-track-event-type") || trackedEventType || "click";
    },
    getCategory: function getCategory(el) {
      return el && (el.getAttribute("data-dpz-track-evt-category") || el.getAttribute("data-dpz-track-event-category") || prepareLink.getCategoryFromContents(el) || el.getAttribute("type")) || "text";
    },
    getCategoryFromContents: function getCategoryFromContents(el) {
      if (el.nodeName === "BUTTON" || el.nodeName === "INPUT" && el.type === "submit") {
        return "button";
      }

      if (el.nodeName === "SELECT") {
        return "select";
      }

      if (el.querySelectorAll("img").length) {
        return "image";
      }

      return null;
    },
    getLabel: function getLabel(el) {
      return el.getAttribute("data-dpz-track-evt-label") || el.getAttribute("data-dpz-track-event-label") || prepareLink.getLabelFromAncestors(el) || null;
    },
    getLabelFromAncestors: function getLabelFromAncestors(el) {
      var parentGroup = getTargetAndAncestors(el).find(function (el) {
        return (document.documentElement.matches || document.documentElement.msMatchesSelector).call(el, "[data-dpz-track-group]");
      });
      return parentGroup && parentGroup.getAttribute("data-dpz-track-group");
    },
    getTealiumVariablesFromDataDpzTrack: function getTealiumVariablesFromDataDpzTrack(el) {
      var variables = {};

      var _iterator = _createForOfIteratorHelper(el.attributes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attribute = _step.value;
          var name = attribute.name,
              value = attribute.value;

          if (name.startsWith("data-dpz-track-")) {
            variables[name.replace(/^data-dpz-track-(.*)/, "$1").replace(/-/g, "_")] = value;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return variables;
    }
  };
  return {
    init: init,
    view: view,
    link: link
  };
});
//# sourceMappingURL=dpz.tealiumAdapterOverride.js.map
