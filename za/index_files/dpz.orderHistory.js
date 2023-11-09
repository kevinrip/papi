function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.orderHistory", ["dpz.orderHistory.message", "simplr"], function (_ref, simplr) {
  var getHasMessage = _ref.getHasMessage,
      getHasSeenOrderHistoryMessage = _ref.getHasSeenOrderHistoryMessage,
      renderMessage = _ref.renderMessage,
      setHasSeenOrderHistoryMessage = _ref.setHasSeenOrderHistoryMessage;

  var fetchOrders = function fetchOrders(options) {
    var customer = jsDPZ.app.customer.getCustomer();
    var customerID = customer.CustomerID || site.storage.load("CID");
    var lang = dpz.market.activeLanguageCode || document.querySelector("html").getAttribute("lang") || "en";
    var loggedIn = dpz.customer.isProfiled();
    var loyaltyIsActive = dpz.loyalty.loyaltyIsOk();
    var getOrderHistory = customer.fetchOrderHistory(_objectSpread({
      customerID: customerID,
      lang: lang,
      loggedIn: loggedIn,
      loyaltyIsActive: loyaltyIsActive
    }, options));

    var setOrderHistory = function setOrderHistory(fetchedData) {
      var _ref2 = Array.isArray(fetchedData) ? fetchedData : [fetchedData],
          _ref3 = _slicedToArray(_ref2, 1),
          orderHistoryData = _ref3[0];

      var _orderHistoryData$cus = orderHistoryData.customerOrders,
          customerOrders = _orderHistoryData$cus === void 0 ? [] : _orderHistoryData$cus,
          easyOrder = orderHistoryData.easyOrder;
      var Session = customer.data.Session;
      Session.EasyOrder = easyOrder;
      Session.hasEasyOrder = !!easyOrder;
      Session.RecentOrderCount = customerOrders.length;
      if (!customerID) $("#homeWrapper").addClass("is-anon").removeClass("is-profiled");
      return site.sessionTools.save().then(function () {
        return orderHistoryData;
      });
    };

    return getOrderHistory.then(setOrderHistory);
  };

  var getOrderHistory = function getOrderHistory(options) {
    var handleError = function handleError(error) {
      jsDPZ.topic("fetchOrders.error").publish(error);
      var logoutRoute = site.func.buildURL({
        url: "#!/customer/logout/"
      });
      simplr.controller.mRouteAndExecute(logoutRoute);
    };

    var triggerLogin = function triggerLogin() {
      return $(document).trigger("/customer/profile/login/", jsDPZ.app.customer.getCustomer());
    };

    return fetchOrders(options)["catch"](handleError).always(triggerLogin);
  };

  var setLocalStoreData = function setLocalStoreData(localStoreOrder) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return $.Deferred(function (_ref4) {
      var resolve = _ref4.resolve,
          reject = _ref4.reject;
      if (localStoreOrder && site.isHomepage) jsDPZ.ajax.menu(_objectSpread(_objectSpread({}, options), {}, {
        StoreID: localStoreOrder.order.StoreID,
        includeAssets: killConfig.isMarketEnabled("wamImages")
      })).then(function (menu) {
        jsDPZ.app.catalog.setCatalog(menu);
        resolve();
      }).fail(reject);else resolve();
    });
  };

  return {
    getHasMessage: getHasMessage,
    getHasSeenOrderHistoryMessage: getHasSeenOrderHistoryMessage,
    getOrderHistory: getOrderHistory,
    renderMessage: renderMessage,
    setHasSeenOrderHistoryMessage: setHasSeenOrderHistoryMessage,
    setLocalStoreData: setLocalStoreData
  };
});
//# sourceMappingURL=dpz.orderHistory.js.map
