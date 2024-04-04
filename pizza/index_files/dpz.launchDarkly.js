var _excluded = ["message"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.launchDarkly", ["marketconfig/dpz.app", "external/ua-parser.min"], function (marketConfig, uaParser) {
  return {
    load: function load(name, req, onLoad) {
      var _name$split = name.split("?"),
          _name$split2 = _slicedToArray(_name$split, 2),
          resource = _name$split2[0],
          _name$split2$ = _name$split2[1],
          clientId = _name$split2$ === void 0 ? "launchDarklyClientId" : _name$split2$;

      req([resource], function (ld) {
        var noOp = function noOp(resolve) {
          return resolve();
        };

        var module = {
          client: {},
          identify: function identify() {
            return new Promise(noOp);
          }
        };
        var environment = urlConfig[clientId];

        if (!environment) {
          /* startDevBlock */
          // eslint-disable-next-line no-console
          console.warn("dpz.launchDarkly: No ".concat(clientId, " found for this market."));
          /* endDevBlock */

          return onLoad(module);
        }

        var timeLengthForLaunchDarklyInitializeTimeout = marketConfig.thirdParty.timeLengthForLaunchDarklyInitializeTimeout;

        var logError = function logError() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var topic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "launchdarkly.initialization_error";
          var defaultMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "LaunchDarkly initialization timed out.";

          var message = _ref.message,
              customData = _objectWithoutProperties(_ref, _excluded);

          var error = _objectSpread(_objectSpread({}, message && {
            customData: customData
          }), {}, {
            error: new Error(message || defaultMessage)
          });

          jsDPZ.topic(topic).publish(error);
        };

        function identify(partialContext) {
          var _this = this;

          var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var shouldOverwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var identifyTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : timeLengthForLaunchDarklyInitializeTimeout;
          return new Promise(function (resolve) {
            var timeout = null;

            var onIdentify = function onIdentify(error, flags) {
              clearTimeout(timeout);
              if (error) logError(error, "launchdarkly.identify_error", "LaunchDarkly identify timed out.");
              resolve(flags || {});
            };

            var nextContext = null;
            if (shouldOverwrite) nextContext = partialContext;else {
              var _context = _this.client.getUser();

              nextContext = $.extend(true, _context, partialContext);
            }
            timeout = setTimeout(onIdentify, identifyTimeout);

            _this.client.identify(nextContext, hash, onIdentify);
          });
        }

        var clientTime = new Date().getTime();
        var isHandheld = document.body.clientWidth <= site.data.breakpoint.handheldMaxSize;
        var _window = window,
            _window$isKiosk = _window.isKiosk,
            isKiosk = _window$isKiosk === void 0 ? false : _window$isKiosk;
        var market = dpz.market.marketName;
        var key = jsDPZ.util.localStorage("X-DPZ-D");
        var customer = jsDPZ.app.customer.getCustomer();
        var storeInfo = jsDPZ.util.localStorage("dpz_store_data") || customer.getSessionData();

        if (site.isConfirmationPage) {
          var lastOrder = JSON.parse(jsDPZ.util.sessionStorage("LastOrder"));
          if (lastOrder !== null && lastOrder !== void 0 && lastOrder.Details) storeInfo = lastOrder.Details;
        }

        var _storeInfo = storeInfo,
            storeId = _storeInfo.StoreID;

        var _uaParser = uaParser(),
            os = _uaParser.os;

        var isHybrid = !!(dpz.util.getQueryParameters("hybrid") || jsDPZ.util.localStorage("dpz_hybrid"));
        var custom = {
          clientTime: clientTime,
          isHandheld: isHandheld,
          isHybrid: isHybrid,
          isKiosk: isKiosk,
          market: market,
          osName: os.name,
          osVersion: os.version,
          platform: "NOLO",
          storeId: storeId
        };
        var context = {
          custom: custom,
          key: key
        };
        var options = {
          fetchGoals: false
        };
        var client = ld.initialize(environment, context, options);
        module = {
          client: _objectSpread(_objectSpread({}, client), {}, {
            key: key
          }),
          identify: identify
        };

        var handleErrorOrTimeout = function handleErrorOrTimeout(error) {
          logError(error);
          onLoad(module);
        };

        var timeout = setTimeout(handleErrorOrTimeout, timeLengthForLaunchDarklyInitializeTimeout);

        var onReady = function onReady() {
          clearTimeout(timeout);
          onLoad(module);
        };

        client.on("ready", onReady);

        var onError = function onError(e) {
          clearTimeout(timeout);
          handleErrorOrTimeout(e);
        };

        client.on("error", onError);
        return null;
      });
    }
  };
});
//# sourceMappingURL=dpz.launchDarkly.js.map
