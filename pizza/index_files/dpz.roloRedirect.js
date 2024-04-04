function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  function hashParamsQualifyForRedirect(hashRouteParams) {
    return !["b", "c", "g", "s"].some(function (param) {
      return hashRouteParams.get(param);
    });
  }

  function decideROLORedirect($event) {
    try {
      var urlHash = window.location.hash;

      var _urlHash$split = urlHash.split("?"),
          _urlHash$split2 = _slicedToArray(_urlHash$split, 2),
          _urlHash$split2$ = _urlHash$split2[1],
          hashRouteParamsString = _urlHash$split2$ === void 0 ? "" : _urlHash$split2$;

      var hashRouteParams = new URLSearchParams(hashRouteParamsString);
      /**
       * - Check if we are in the US market
       * - Check if we have a hash and it's for a #!/locations/ route that would show the store locator form
       */

      if (dpz.market.marketCode === "US" && urlHash && urlHash.includes("/locations/") && hashParamsQualifyForRedirect(hashRouteParams)) {
        var restaurantsPath = "".concat(dpz.market.activeLanguageCode, "/restaurants");
        var restaurantsUrl = new URL("".concat(window.location.origin, "/").concat(restaurantsPath));
        var urlSearchParams = new URLSearchParams(window.location.search);
        var restaurantsSearchParams = new URLSearchParams(_objectSpread(_objectSpread({}, Object.fromEntries(hashRouteParams)), Object.fromEntries(urlSearchParams)));
        restaurantsUrl.search = restaurantsSearchParams.toString();
        window.location.replace(restaurantsUrl.href);
      }
    } catch (error) {
      window.rg4js("send", {
        error: new Error("rolo-redirect.failed"),
        customData: {
          onerrorData: JSON.parse(JSON.stringify(error)),
          page_name: document.title
        },
        tags: [dpz.market.marketName, dpz.market.activeLanguageCode, dpz.market.marketCode + "/_" + dpz.market.activeLanguageCode, "rolo-redirect.failed", window.innerWidth > 640 ? "desktop" : "handheld"]
      });
    }
  }

  $(window).on("hashchange", decideROLORedirect);
  decideROLORedirect();
})();
//# sourceMappingURL=dpz.roloRedirect.js.map
